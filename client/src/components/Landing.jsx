import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import localhost from "../config";
import { Link } from "react-router-dom";
import Carousel from "./utils/Carousel";
import Promotion from "./Promotion";
import { LanguageContext } from "../LanguageContext";
import Footer from "./Footer";
import Search from "./Search";
import Novelties from "./Novelties";

export default function Accueil() {
  const { language } = useContext(LanguageContext);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/categorie/${language}`);
      if (response.status === 200) {
        const data = await response.json();
        setCategory(data.allCategory);
      }
    };

    fetchData();
  }, [language]);

  return (
    <div className="bg-light-purple bg-opacity-20 dark:bg-dark-mode-purple shadow-md">
      <Header />
      <div className="mt-8 flex flex-col items-center justify-center bg-white dark:bg-light-purple shadow-md hover:shadow-lg p-4 m-2 rounded-lg">
        <ul className="flex flex-wrap lg:flex-nowrap justify-center gap-4 md:gap-6 lg:gap-8">
          {category &&
            category.map((elem) => (
              <Link to={`/category/${elem.id}`} key={elem.id}>
                <li className="flex flex-wrap justify-center items-center font-primary text-gold text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold hover:text-light-purple transition duration-300">
                <img
                    src={elem.image}
                    alt={language === "FR" ? elem.name : elem.nameEn}
                    className="w-40 h-40 object-cover mb-2 border-2 border-grey hover:scale-110 duration-300 ease-in-out bg-white rounded-md"
                  />
                  {language === "FR" ? elem.name : elem.nameEn}
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <Search />
      <Carousel />
      <Promotion />
      <Novelties />
      <Footer />
    </div>
  );
}
