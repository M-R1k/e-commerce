import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../LanguageContext";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";
import { useTranslation } from "react-i18next";

export default function EditProduct() {
  let navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  ////////////////
  //  UseState  //
  ////////////////

  const [allCategorie, setAllCategorie] = useState([]);
  const [allMaterial, setAllMaterial] = useState([]);
  const [allStone, setAllStone] = useState([]);

  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [nom, setNom] = useState("");
  const [nomEN, setNomEN] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEN, setDescriptionEN] = useState("");
  const [material, setMaterial] = useState("");
  const [stone, setStone] = useState("");
  const [imageAdd, setImageAdd] = useState("");

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
    /////////////////////////////////////////////////////////////////
    //  Fetch All : Categories, Materials, Stones, Sizes, Product  //
    /////////////////////////////////////////////////////////////////

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

      const response_product = await fetch(`${localhost}/api/products/${id}`);
      if (response_product.status === 200) {
        const data_product = await response_product.json();
        setNom(data_product.products[0].name);
        setNomEN(data_product.products[0].nameEn);
        setCategory_id(data_product.products[0].category.id);
        setMaterial(data_product.products[0].material.id);
        setStone(
          data_product.products[0].stone
            ? data_product.products[0].stone.id
            : ""
        );
        setImage(data_product.products[0].images);
        setWeight(data_product.products[0].weight);
        setPrice(data_product.products[0].price);
        setStockQty(data_product.products[0].stockQty);
        setDescription(data_product.products[0].description);
        setDescriptionEN(data_product.products[0].descriptionEn);
      }
    };
    fetchData();
  }, [language]);

  ///////////////////////////////////
  //  handelSubmit : Edit Product  //
  ///////////////////////////////////

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      category_id: parseInt(category_id),
      material_id: parseInt(material),
      stone_id: stone ? parseInt(stone) : null,
      image: imageAdd ? [imageAdd] : null,
      nom: nom,
      nomEn: nomEN,
      weight: weight,
      price: price,
      stockQty: stockQty,
      description: description,
      descriptionEn: descriptionEN,
    };
    const response = await fetch(`${localhost}/api/editProduct/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.status === 200) {
      const data = await response.json();
      navigate("/admin", { replace: true });
    }
  };

  //////////////////////////////////////
  //  deleteImage : Delete One Image  //
  //////////////////////////////////////

  const deleteImage = async (elem) => {
    const response = await fetch(`${localhost}/api/deleteImage/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageURL: elem }),
    });
    if (response.status === 200) {
      const data = await response.json();
      setImage(data.image);
    }
  };

  return (
    <>
      <Header></Header>
      <form
        className="flex flex-col justify-center	items-center p-4 md:p-8 lg:p-12"
        onSubmit={handelSubmit}
      >
        {/* Name FR*/}

        <label for="nom">{t("createProduct.productFR")}</label>
        <input
          className="border	border-solid border-slate-500 w-96 sm:w-64 p-2.5 rounded-xl mb-4"
          type="text"
          name="nom"
          id="nom"
          placeholder={t("createProduct.productFR")}
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        {/* Name EN*/}

        <label for="nom">{t("createProduct.productEN")}</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="nomEn"
          id="nomEn"
          placeholder={t("createProduct.productEN")}
          required
          value={nomEN}
          onChange={(e) => setNomEN(e.target.value)}
        />

        {/* Categories */}

        <label for="categorie">{t("editProduct.chooseCategory")}</label>
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="cat"
          id="categorie"
          value={category_id}
          onChange={(e) => setCategory_id(e.target.value)}
        >
          <option value="">{t("createProduct.category")}</option>
          {allCategorie &&
            allCategorie.map((elem) => (
              <option value={elem.id}>
                {" "}
                {language === "FR" ? elem.name : elem.nameEn}
              </option>
            ))}
        </select>

        {/* Materials */}

        <label for="material">{t("editProduct.chooseMaterial")}</label>
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="material"
          id="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="">{t("editProduct.choose")}</option>
          {allMaterial &&
            allMaterial.map((elem) => (
              <option value={elem.id}>
                {" "}
                {language === "FR" ? elem.name : elem.nameEn}
              </option>
            ))}
        </select>

        {/* Stones */}

        <label for="stone">{t("editProduct.chooseStone")}</label>
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="stone"
          id="stone"
          value={stone}
          onChange={(e) => setStone(e.target.value)}
        >
          <option value="">{t("editProduct.choose")}</option>
          {allStone &&
            allStone.map((elem) => (
              <option value={elem.id}>
                {" "}
                {language === "FR" ? elem.name : elem.nameEn}
              </option>
            ))}
        </select>

        {/* Images */}

        <label for="image">{t("createProduct.image")}</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="image"
          id="image"
          placeholder={t("createProduct.image")}
          value={imageAdd}
          onChange={(e) => setImageAdd(e.target.value)}
        />
        <ul className="flex">
          {image &&
            image.map((elem) => (
              <li className="text-center">
                <img
                  className="max-w-full max-h-80 cursor-pointer"
                  src={elem}
                  alt={elem}
                />
                <span
                  className="cursor-pointer	"
                  onClick={() => deleteImage(elem)}
                >
                  X
                </span>
              </li>
            ))}
        </ul>

        {/* Weight */}

        <label for="weight">{t("createProduct.weight")}</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="weight"
          id="weight"
          placeholder={t("createProduct.weight")}
          step="0.01"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        {/* Price */}

        <label for="price">{t("createProduct.price")}</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="price"
          id="price"
          placeholder={t("createProduct.price")}
          required
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Stock Quantity */}

        <label for="stockQty">{t("createProduct.stock")}</label>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          type="number"
          name="stockQty"
          id="stockQty"
          placeholder={t("createProduct.stock")}
          required
          value={stockQty}
          onChange={(e) => setStockQty(e.target.value)}
        />

        {/* Description */}

        <label for="content">{t("createProduct.descriptionFR")}</label>
        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder={t("createProduct.descriptionFR")}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label for="content">{t("createProduct.descriptionEn")}</label>
        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder={t("createProduct.descriptionEn")}
          required
          value={descriptionEN}
          onChange={(e) => setDescriptionEN(e.target.value)}
        ></textarea>

        {/* Submit Button */}

        <button
          type="submit"
          id="submit"
          className="dark:bg-gold dark:text-white"
        >
          {t("editProduct.button")}
        </button>
      </form>

      <Footer></Footer>
    </>
  );
}
