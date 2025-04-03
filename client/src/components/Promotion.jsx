import { useEffect, useState, useContext } from "react";
import localhost from "../config";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";
import { Link } from "react-router-dom";

export default function Promotion() {
  const [productsPromo, setProductsPromo] = useState([]);
  const { t } = useTranslation();

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/allProductsInPromo`);
      if (response.ok) {
        const data = await response.json();
        setProductsPromo(data.products);
      }
    };
    fetchData();
  }, [language]);

  return (
    <>
      <h1 className="text-gold text-3xl md:text-5xl font-bold font-primary m-8 text-center">
        {t("promotion.translated-text")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {productsPromo.length > 0 &&
          productsPromo.map(
            (elem) =>
              elem.stockQty !== 0 && (
                <Link to={`/product/${elem.id}`}>
                  <div
                    key={elem.id}
                    className="flex flex-col justify-between h-full bg-white-purple dark:bg-dark-mode-purple border border-gold rounded-lg p-5 shadow-lg dark:shadow-gold"
                  >
                    <img
                      src={elem.images}
                      alt={elem.name}
                      className="w-full h-80 object-cover rounded-t-lg"
                    />
              <h3 className="font-primary text-gold font-extrabold text-center p-2 text-3xl mt-4">
              {language === "FR" ? elem.name : elem.nameEn}
                    </h3>
                    <p className="font-bold p-2 font-secondary text-3xl text-light-purple text-right dark:text-white">
                    <span className="line-through">${elem.price}</span>{" "}
                      <span>
                        $
                        {elem.price -
                          (elem.price * elem.promotion.pourcentage) / 100}
                      </span>
                    </p>
                    <p className="font-primary text-light-purple dark:text-white text-center p-2 font-bold text-lg">
                    {language === "FR"
                        ? elem.description
                        : elem.descriptionEn}
                    </p>
                  </div>
                </Link>
              )
          )}
      </div>
    </>
  );
}
