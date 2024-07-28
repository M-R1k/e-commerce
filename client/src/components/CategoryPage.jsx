import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";

import localhost from "../config";

import Header from "./Header";
import Footer from "./Footer";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const { t } = useTranslation();
  
  const { language } = useContext(LanguageContext);
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

  return (
    <>
      <Header />
      <ul className="flex space-x-2 p-4">
        <li>
          <Link to={`/`}>{t('categoryPage.homepage')}</Link>
        </li>
        <li>/</li>
        {name && <li>{name}</li>}
      </ul>
      <h1 className="text-gold text-center text-5xl mb-9 font-primary">
        {name}
      </h1>
      <ul className="grid grid-cols-3 gap-6 mx-20 mb-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((elem) => (
            <li key={elem.id} className="border border-gray-300 p-4 rounded-lg">
              <Link to={`/product/${elem.id}`}>
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={elem.images}
                  alt={language === "FR" ? elem.name : elem.nameEn}
                />
                <p className="text-center font-primary">
                  {language === "FR" ? elem.name : elem.nameEn}
                </p>
              </Link>
            </li>
          ))
        ) : (
          <p className="col-span-3 text-center">{t('categoryPage.error')}</p>
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
    </>
  );
}
