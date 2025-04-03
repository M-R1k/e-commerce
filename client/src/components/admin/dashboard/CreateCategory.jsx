import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";
import { useTranslation } from "react-i18next";

export default function CreateCategory() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  ////////////////
  //  UseState  //
  ////////////////

  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [nomEn, setNomEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  useEffect(() => {
    ////////////////////////////////
    //  Check Middleware isAdmin  //
    ////////////////////////////////

    const fetchIsAdmin = async () => {
      const email = localStorage.getItem("user");

      const response = await fetch(`${localhost}/api/isAdmin/${email}`);

      if (response.status === 200) {
        const data = await response.json();

        if (data.isAdmin === false) {
          navigate("/", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    };
    fetchIsAdmin();
  }, []);

  ////////////////////
  //  HandleSubmit  //
  ////////////////////

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nom: categorie,
      description: description,
      image: image,
      nomEn: nomEn,
      descriptionEn: descriptionEn,
    };

    const response = await fetch(`${localhost}/api/admin/addCategorie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.status === 200) {
      navigate(`/createArticle`, { replace: true });
    }
  };

  return (
    <>
    <div className="dark:bg-dark-mode-purple">
      <Header></Header>
      <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
        {t("createCategory.title")}
      </h1>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        {/* Name */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4 dark:bg-dark-mode-light-purple dark:text-gold"
          type="text"
          name="nomFR"
          id="categorie"
          placeholder={t("createCategory.nameFR")}
          required
          onChange={(e) => setCategorie(e.target.value)}
        />

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          type="text"
          name="nomEN"
          id="categorie"
          placeholder={t("createCategory.nameEN")}
          required
          onChange={(e) => setNomEn(e.target.value)}
        />

        {/* Images */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl  mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          type="text"
          name="image"
          id="image"
          placeholder={t("createProduct.image")}
          required
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Description */}

        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl  mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          name="description"
          id="description"
          placeholder={t("createProduct.descriptionFR")}
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl  mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          name="descriptionEn"
          id="descriptionEn"
          placeholder={t("createProduct.descriptionEn")}
          required
          onChange={(e) => setDescriptionEn(e.target.value)}
        ></textarea>

        {/* Submit */}

        <input type="submit" value={t("createCategory.button")} className="dark:bg-gold dark:text-white" />
      </form>
      <Footer></Footer>
      </div>
    </>
  );
}
