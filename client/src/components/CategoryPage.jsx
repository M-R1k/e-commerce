import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";

import localhost from "../config";

import Header from "./Header";
import Footer from "./Footer";
import inStock from "../assets/inStock.svg";
import lowStock from "../assets/lowInStock.svg";
import soldOut from "../assets/soldOut.svg";
import StockAlert from "./utils/stockAlert";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const { t } = useTranslation();

  const { language } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [productSelect, setproductSelect] = useState(null);
  const [elemSelect, setElemSelect] = useState({});

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const language = localStorage.getItem("language");

      const response = await fetch(`${localhost}/api/categoryElem/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        if (data.products.length > 0) {
          setName(
            language === "FR"
              ? data.products[0].category.name
              : data.products[0].category.nameEn
          );
        }
        setProducts(data.products);
      }
    };
    fetchData();
  }, [id, language]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const manageStock = (stockQty) => {
    if (stockQty >= 10) {
      return ["In stock", inStock];
    } else if (stockQty > 0) {
      return ["Low in stock", lowStock];
    } else {
      return ["Sold out", soldOut];
    }
  };

  const handleStockAlert = (productName) => {
    setproductSelect(productName.name);
    setElemSelect(productName);
    setIsOpen(true);
  };

  const handleSubmit = (email) => {
    alert(
      `You will be notified at ${email} when ${productSelect} is back in stock`
    );
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-light-purple bg-opacity-20 dark:bg-dark-mode-purple">
        <Header />
        <ul className="flex flex-wrap space-x-4 p-4 text-gold font-primary font-bold">
          <li>
            <Link to={`/`}>{t("categoryPage.homepage")}</Link>
          </li>
          <li>/</li>
          {name && <li>{name}</li>}
        </ul>
        <h1 className="text-gold text-center text-3xl md:text-5xl mb-9 font-bold font-primary">
          {name}
        </h1>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 md:mx-20 mb-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((elem) => {
              const [stockText, stockColorCode] = manageStock(elem.stockQty);
              return (
                <li
                  key={elem.id}
                  className="border border-gold p-4 rounded-lg shadow-md shadow-gold"
                >
                  <Link to={`/product/${elem.id}`}>
                    <img
                      className="w-full rounded-t-lg h-80 object-cover mb-4"
                      src={elem.images}
                      alt={language === "FR" ? elem.name : elem.nameEn}
                    />

                    <p className="text-center font-primary text-2xl font-bold text-dark-purple dark:text-gold">
                      {language === "FR" ? elem.name : elem.nameEn}
                    </p>
                    <div className="flex items-center">
                      <img
                        className="w-6 h-6"
                        src={stockColorCode}
                        alt={stockText}
                      />
                      <p className="text-left font-primary font-bold text-xl text-dark-purple dark:text-gold">
                        {stockText}
                      </p>
                    </div>
                    {stockText === "Sold out" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleStockAlert(elem);
                        }}
                        className="text-grey-500 underline dark:text-white"
                      >
                        Notify me when back in stock
                      </button>
                    )}
                  </Link>
                </li>
              );
            })
          ) : (
            <p className="col-span-1 sm:col-span-2 md:col-span-3 text-center">
              {t("categoryPage.error")}
            </p>
          )}
        </ul>
        <div className="flex justify-center space-x-2 mb-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? "bg-gold text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <Footer />
        <StockAlert
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          data={elemSelect}
        />
      </div>
    </>
  );
}
