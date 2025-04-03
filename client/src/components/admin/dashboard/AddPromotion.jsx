import { useEffect, useState, useContext } from "react";
import localhost from "../../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//////////////////
//  Components  //
//////////////////

import { LanguageContext } from "../../../LanguageContext";
import Footer from "../../Footer";
import Header from "../../Header";

export default function AddPromotion() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  ////////////////
  //  UseState  //
  ////////////////

  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [pourcentage, setPourcentage] = useState(1);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allPromo, setAllPromo] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("All Categories");
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const { language } = useContext(LanguageContext);

  ///////////////////////////////////////////////
  //  Fetch Categories, Products, Pourcentage  //
  ///////////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const response_search = await fetch(
        `${localhost}/api/search/${language}`
      );

      if (response_search.ok) {
        const data_search = await response_search.json();
        if (data_search.product && data_search.product.length > 0) {
          setProduct(data_search.product);
          setProducts(data_search.product);
          setCategories(data_search.category);
        }
      }

      const response_promo = await fetch(`${localhost}/api/promotion`);

      if (response_promo.ok) {
        const data_promo = await response_promo.json();
        setAllPromo(data_promo.promotion);
      }
    };

    fetchData();
  }, [language]);

  ////////////////////////////////
  //  Filter Search Product     //
  ////////////////////////////////

  const handleSearch = (e) => {
    // Handle Logic //
    e.preventDefault();
    setIsSearching(true);
    let list = [];

    if (
      categoryName !== "Toutes les catégories" &&
      categoryName !== "All Categories"
    ) {
      list = product.filter(
        (elem) =>
          (elem.category.name === categoryName &&
            elem.name
              .toLocaleLowerCase()
              .includes(productName.toLocaleLowerCase())) ||
          (elem.category.nameEn === categoryName &&
            elem.nameEn
              .toLocaleLowerCase()
              .includes(productName.toLocaleLowerCase()))
      );
    } else {
      if (productName === "") {
        list = [...product];
      } else {
        list = product.filter(
          (elem) =>
            elem.name
              .toLocaleLowerCase()
              .includes(productName.toLocaleLowerCase()) ||
            elem.nameEn
              .toLocaleLowerCase()
              .includes(productName.toLocaleLowerCase())
        );
      }
    }

    setSearchResults(list);
  };

  ////////////////////////
  //   Set Promotion    //
  ////////////////////////

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (pourcentage === 1 || !productSelected) {
      setError(language === "FR" ? "Champs invalide" : "Form invalid");
      return;
    }
    const formData = {
      product: productSelected,
      pourcentage: pourcentage,
    };
    const response = await fetch(`${localhost}/api/promotion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.ok) {
      navigate(`/admin`, { replace: true });
    }
  };

  return (
    <>
      <div className="dark:bg-dark-mode-purple">
        <Header></Header>

        {/* form for filter */}

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center justify-center gap-2 mb-5"
        >
          <div className="flex p-3 w-full md:w-auto">
            <input
              type="text"
              placeholder={t("search.searchBar")}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full md:w-80 p-2 border border-gold rounded-md font-primary mr-4"
            />
            <button
              type="submit"
              className="p-3 md:px-4 bg-light-purple dark:bg-dark-mode-light-purple border border-black dark:border-gold text-black dark:text-gold rounded-md hover:bg-gold dark:hover:bg-white transition duration-300"
            >
              {t("search.button")}
            </button>
          </div>
          <select
            value={categoryName}
            className="w-full md:w-auto p-2 font-primary border border-gold rounded-md"
            onChange={(e) => setCategoryName(e.target.value)}
          >
            <option
              value="All Categories"
              className="text-gold font-primary bg-light-purple bg-opacity-20 dark:bg-dark-mode-light-purple hover:bg-light-purple dark:hover:bg-white"
            >
              {t("search.select")}
            </option>
            {categories.length > 0 &&
              categories.map((elem) => (
                <option
                  key={elem.id}
                  value={language === "FR" ? elem.name : elem.nameEn}
                  className="text-gold font-primary"
                >
                  {language === "FR" ? elem.name : elem.nameEn}
                </option>
              ))}
          </select>
        </form>

        {/* form for setPromotion */}

        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handelSubmit}
        >
          <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
            {t("createPromotion.title")}
          </h1>
          {error && <p>{error}</p>}

          {/* select pourcentage */}

          <label htmlFor="">{t("createPromotion.pourcentage")}</label>
          <select
            className="border	border-solid border-slate-500 w-96 p-2.5	rounded-xl mb-4"
            onChange={(e) => setPourcentage(e.target.value)}
          >
            {allPromo.map((elem) => (
              <option value={elem.id}>{elem.pourcentage}</option>
            ))}
          </select>

          {/* liste of all products */}

          <label htmlFor="">{t("createPromotion.product")}</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {isSearching
              ? searchResults.length > 0 &&
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex flex-col justify-between h-full bg-white dark:bg-dark-mode-purple text-gold border border-gold rounded-lg p-5 shadow-lg"
                  >
                    <img
                      src={result.images}
                      alt={result.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <h3 className="font-primary text-gold text-2xl mt-4">
                      {language === "FR" ? result.name : result.nameEn}
                    </h3>
                    <button className="mt-4 w-full bg-light-purple dark:bg-dark-mode-light-purple text-black border dark:text-gold border-black dark:border-gold py-2 rounded-lg hover:bg-gold dark:hover:bg-white transition duration-300">
                      {t("createPromotion.button")}
                    </button>
                  </div>
                ))
              : products &&
                products.map((elem) => (
                  <div
                    key={elem.id}
                    className="flex flex-col justify-between h-full bg-white dark:bg-dark-mode-light-purple text-gold border border-gold rounded-lg p-5 shadow-lg"
                  >
                    <img
                      src={elem.images}
                      alt={elem.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <h3 className="font-primary text-gold text-2xl mt-4">
                      {language === "FR" ? elem.name : elem.nameEn}
                    </h3>
                    <button
                      className="mt-4 w-full bg-light-purple dark:bg-dark-mode-light-purple text-black dark:text-gold border border-black dark:border-gold py-2 rounded-lg hover:bg-gold transition dark:hover:bg-white duration-300"
                      onClick={() => setProductSelected(elem.id)}
                    >
                      {t("createPromotion.button")}
                    </button>
                  </div>
                ))}
          </div>
        </form>

        {error && <p>{error}</p>}

        <Footer></Footer>
      </div>
    </>
  );
}
