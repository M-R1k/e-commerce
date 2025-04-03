import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";


export default function ModeleProduct(data) {
  const [modele, setModele] = useState([]);
  const { language, t } = useContext(LanguageContext);
  
  

  useEffect(() => {
    setModele(data.data);
  }, [data, language]);

  return (
    <div className="flex flex-row justify-evenly">
      {modele &&
        modele.map((elem) => (
          <div key={elem.id} className="flex flex-col">
            <p>
              {language === "FR" ? elem.material.name : elem.material.nameEn}
            </p>
            <Link to={`/product/${elem.id}`}>
              <img
                className="w-24 h-24 cursor-pointer border-2 rounded-lg border-grey"
                src={elem.images}
                alt={elem.images}
              />
            </Link>
            {/* <div className="mb-4 flex flex-col items-center justify-center dark:text-gold">
              <h2 className="font-bold p-2 font-primary text-lg text-light-purple text-center items-center dark:text-white">
                {language === "FR" ? elem.stone.name : elem.stone.nameEn}
              </h2>
              <img
                className="w-20 h-20 cursor-pointer border-2 rounded-md border-grey"
                src={elem.stone.image}
                alt={elem.stone.name}
              />
            </div> */}
          </div>
        ))}
    </div>
  );
}