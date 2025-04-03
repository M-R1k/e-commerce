////////////////////
//  Dependencies  //
////////////////////

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../LanguageContext";

////////////
// Config //
////////////

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";
import { useTranslation } from "react-i18next";

export default function CreadArticle() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  ////////////////
  //  UseState  //
  ////////////////

  const [allCategorie, setAllCategorie] = useState([]);
  const [allMaterial, setAllMaterial] = useState([]);
  const [allStone, setAllStone] = useState([]);

  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [imageAll, setImageAll] = useState([]);
  const [nom, setNom] = useState("");
  const [nomEN, setNomEN] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [material, setMaterial] = useState("");
  const [stone, setStone] = useState("");

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    ////////////////////////////////
    //  Check Middleware isAdmin  //
    ////////////////////////////////

    const fetchIsAdmin = async () => {
      const email = localStorage.getItem("user");

      const response = await fetch(`${localhost}/api/isAdmin/${email}`);

      if (response.status === 200) {
        const data = await response.json();

        if (data.isAdmin) {
          fetchData();
        } else {
          navigate("/", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    };
    fetchIsAdmin();

    /////////////////////////////////////////////////
    //  Fetch All : Categories, Materials, Stones  //
    /////////////////////////////////////////////////

    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/categorie/${language}`);

      if (response.status === 200) {
        const data = await response.json();
        setAllCategorie(data.allCategory);
      }

      const response_material = await fetch(`${localhost}/api/material`);

      if (response_material.status === 200) {
        const data_material = await response_material.json();
        setAllMaterial(data_material.allMaterial);
      }

      const response_stone = await fetch(`${localhost}/api/stone`);

      if (response_stone.status === 200) {
        const data_stone = await response_stone.json();
        setAllStone(data_stone.allStone);
      }
    };
  }, [language]);

  ////////////////////
  //  HandleSubmit  //
  ////////////////////

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      category_id: parseInt(category_id),
      material_id: parseInt(material),
      stone_id: stone ? parseInt(stone) : null,
      image: imageAll.length > 0 ? imageAll : [image],
      nom: nom,
      nomEn: nomEN,
      weight: weight,
      price: price,
      stockQty: stockQty,
      description: description,
      descriptionEn: descriptionEN,
    };

    const response = await fetch(`${localhost}/api/admin/addArticle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.status === 200) {
      navigate("/admin", { replace: true });
    }
  };

  const reset = () => {
    setImageAll([...imageAll, image]);
    setImage("");
  };
  return (
    <>
    <div className="dark:bg-dark-mode-purple">
      <Header></Header>
      <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
        {t("createProduct.title")}
      </h1>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        {/* Name */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          type="text"
          name="nom"
          id="nom"
          placeholder={t("createProduct.productFR")}
          required
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          type="text"
          name="nom"
          id="nom"
          placeholder={t("createProduct.productEN")}
          required
          onChange={(e) => setNomEN(e.target.value)}
        />

        {/* Categories */}

        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          name="cat"
          id="categorie"
          onChange={(e) => setCategory_id(e.target.value)}
        >
          <option value="">{t("createProduct.category")}</option>
          {allCategorie &&
            allCategorie.map((elem) => (
              <option value={elem.id}>
                {language === "FR" ? elem.name : elem.nameEn}
              </option>
            ))}
        </select>

        {/* Materials */}

        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          name="material"
          id="material"
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="">{t("createProduct.material")}</option>
          {allMaterial &&
            allMaterial.map((elem) => (
              <option value={elem.id}>
                {language === "FR" ? elem.name : elem.nameEn}
              </option>
            ))}
        </select>

        {/* Stones */}

        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          name="stone"
          id="stone"
          onChange={(e) => setStone(e.target.value)}
        >
          <option value="">{t("createProduct.stone")}</option>
          {allStone &&
            allStone.map((elem) => (
              <option value={elem.id}>
                {language === "FR" ? elem.name : elem.nameEn}
              </option>
            ))}
        </select>

        {/* Images */}

        <div className="flex flex-col justify-start	 items-end mb-4  dark:bg-dark-mode-light-purple dark:text-gold">
          <input
            className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl "
            type="text"
            name="image"
            id="image"
            placeholder={t("createProduct.image")}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button
            className="rounded-lg bg-light-purple dark:bg-gold text-gold dark:text-white p-2.5 mt-1"
            onClick={() => reset()}
          >
            {t("createProduct.buttonAdd")}
          </button>
        </div>

        {/* Weight */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="weight"
          id="weight"
          placeholder={t("createProduct.weight")}
          step="0.01"
          required
          onChange={(e) => setWeight(e.target.value)}
        />

        {/* Price */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="price"
          id="price"
          placeholder={t("createProduct.price")}
          step="0.01"
          required
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Stock Quantity */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="stockQty"
          id="stockQty"
          placeholder={t("createProduct.stock")}
          required
          onChange={(e) => setStockQty(e.target.value)}
        />

        {/* Description */}

        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder={t("createProduct.descriptionFR")}
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder={t("createProduct.descriptionEn")}
          required
          onChange={(e) => setDescriptionEN(e.target.value)}
        ></textarea>

        {/* Submit Button */}

        <button type="submit" id="submit">
          {t("createProduct.button")}
        </button>
      </form>
      <Footer></Footer>
      </div>
    </>
  );
}
