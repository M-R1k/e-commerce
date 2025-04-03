import { Link, useParams } from "react-router-dom";
import localhost from "../config"; // Import de la configuration localhost
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next"; // Import du hook pour la traduction
import { LanguageContext } from "../LanguageContext";

import Header from "./Header"; // Composant Header
import Footer from "./Footer"; // Composant Footer
import inStock from "../assets/inStock.svg"; // Image du 'in stock'
import lowStock from "../assets/lowInStock.svg"; // Image du 'low in stock'
import soldOut from "../assets/soldOut.svg"; //Image du 'soldout'
import StockAlert from "./utils/stockAlert"; // Alerte stock
import ModeleProduct from "./ModeleProduct";
import StoneProduct from "./StoneProduct";
import SizeGuide from "./SizeGuide"; // Guide des tailles
import ReviewForm from "./review/ReviewForm"; // Avis
import ReactImageMagnify from 'react-image-magnify'; // Zoom
import { lastDayOfDecade } from "date-fns";

const SpecProduct = () => {
  const { id } = useParams(); // Récupération de l'ID du produit à partir des paramètres de l'URL
  const { t } = useTranslation(); // Utilisation du hook de traduction
  const [product, setProduct] = useState(null); // État pour stocker les informations du produit
  const [error, setError] = useState(null); // État pour stocker les erreurs
  const [selectedImage, setSelectedImage] = useState(null); // État pour stocker l'image sélectionnée
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture du modal
  const [isZoomed, setIsZoomed] = useState(false); // État pour gérer le zoom de l'image
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture de l'alerte de stock
  const [productSelect, setproductSelect] = useState(null); // État pour stocker le produit sélectionné
  const [allModele, setAllModele] = useState([]); // État pour stocker tous les modèles du produit
  const [allStones, setAllStones] = useState([]); // État pour stocker tous les modèles du produit

  const { language } = useContext(LanguageContext); // Utilisation du contexte de langue

  // Fonction pour envoyer une nouvelle entrée de statistiques au backend
  const newEntry = async () => {
    try {
      await fetch(`${localhost}/api/stats/products/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to post new entry:", err);
    }
  };

  // Effet qui se déclenche à chaque fois que l'ID ou la langue change
  useEffect(() => {
    newEntry();
  }, [id, language]);

  // Fonction pour rechercher les modèles de produits similaires
  const searchModele = async (elem) => {
    const words = elem.nameEn.split(" ");
    const firstWorld = words[0];
    let lastWord = "";

    if (words[words.length - 1] === "") {
      lastWord = words[words.length - 2];
    } else {
      lastWord = words[words.length - 1];
    }

    const response = await fetch(
      `${localhost}/api/filterModele/${firstWorld}/${lastWord}`
    );

    if (response.ok) {
      const data = await response.json();

      setAllModele(data.products);
      setAllStones(data.products);
    }
  };

  // Effet qui se déclenche à chaque fois que l'ID ou la langue change, pour récupérer les données du produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.products && data.products.length > 0) {
            const productData = data.products[0];
            setProduct(productData);
            searchModele(productData);
            setSelectedImage(
              productData.images ? productData.images[0] : productData.image
            );
          } else {
            setError(new Error("Product not found"));
          }
        } else {
          setError(new Error("Failed to fetch product"));
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchProduct();
  }, [id, language]);

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
    setIsZoomed(false);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  // Fonction pour basculer le zoom de l'image
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Affichage d'un message de chargement si le produit n'est pas encore chargé
  if (!product) {
    return (
      <div className="text-center text-red-500 py-4">
        {t("specProduct.error")}
      </div>
    );
  }

  // Fonction pour gérer l'affichage de l'état du stock
  const manageStock = (stockQty) => {
    if (stockQty >= 10) {
      return ["In stock", inStock];
    } else if (stockQty > 0) {
      return ["Low in stock", lowStock];
    } else {
      return ["Sold out", soldOut];
    }
  };

  // Fonction pour gérer l'alerte de stock
  const handleStockAlert = (productName) => {
    setproductSelect(productName);
    setIsOpen(true);
  };

  // Fonction pour gérer la soumission de l'alerte de stock
  const handleSubmit = (email) => {
    alert(
      `You will be notified at ${email} when ${productSelect} is back in stock`
    );
    setIsOpen(false);
  };

  // Appel de la fonction manageStock avec la quantité de stock du produit
  const [stockText, stockColorCode] = manageStock(product.stockQty);

  return (
    <>
      <div className="bg-light-purple bg-opacity-20 dark:bg-dark-mode-light-purple">
        <Header />
        <nav className="bg-light-blue opacity-50 py-2 px-6">
          <ul className="flex space-x-4 p-4 text-xl text-dark-mode-purple dark:text-gold font-primary font-bold hover:text-gold dark:hover:text-dark-mode-purple transition duration-300 ease-in-out">
            <li>
              <Link to={`/`}>{t("specProduct.homepage")}</Link>
            </li>
            <li>/</li>
            {product.category && (
              <>
                <li>
                  <Link to={`/category/${product.category.id}`}>
                    {language === "FR"
                      ? product.category.name
                      : product.category.nameEn}
                  </Link>
                </li>
                <li>/</li>
              </>
            )}
            <li>{language === "FR" ? product.name : product.nameEn}</li>
          </ul>
        </nav>
        <h1 className="text-dark-purple dark:text-gold font-bold text-5xl mb-6 font-primary text-center mt-4">
          {language === "FR" ? product.name : product.nameEn}
        </h1>
        <main className="py-6 px-4 max-w-7xl mx-auto">
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div
                className="flex flex-col space-y-4 overflow-auto max-h-[600px]"
              >
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      className={`w-20 h-20 cursor-pointer border-2 ${
                        selectedImage === image
                          ? "border-gold"
                          : "border-gray-300"
                      }`}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-8 w-full max-w-4xl max-h-[750px]">
              {selectedImage && (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: selectedImage,
                    },
                    largeImage: {
                      src: selectedImage,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerDimensions: {
                      width: '200%',
                      height: '200%',
                    },
                  }}
                  className="object-contain w-full h-full rounded-md border border-gold shadow-md shadow-gold dark:border-gold cursor-pointer"
                    enlargedImageContainerClassName="flex justify-center items-center"
                    enlargedImageClassName="object-contain"
                  onClick={openModal}
                  />
                )}
              </div>
            </div>
            <div className="w-1/2">
            <h2 className="font-primary text-dark-purple dark:text-gold text-left p-2 font-bold text-2xl">
            {language === "FR"
                  ? product.description
                  : product.descriptionEn}
              </h2>
              <p className="text-2xl mb-4">
                {product.promotion.id !== 1 ? (
                  <>
              <span className="font-medium line-through p-2 font-secondary text-3xl text-dark-purple text-right dark:text-gold">
              ${product.price}
                    </span>{" "}
                    <span className=" dark:text-gold font-secondary text-gold text-4xl font-bold ">
                      $
                      {product.price -
                        (product.price * product.promotion.pourcentage) / 100}
                    </span>
                  </>
                ) : (
                  <span 
                  className="font-medium p-2 font-secondary text-3xl text-dark-purple dark:text-gold"
                  >${product.price}</span>
                )}
              </p>
              {product.length > 0 ? (
                product.map((elem) => (
                  <div key={elem.id} className="flex items-center">
                    <img
                      className="w-6 h-6"
                      src={stockColorCode}
                      alt={stockText}
                    />
                    <p className="text-left font-primary font-bold text-xl text-dark-purple dark:text-gold">
                      {stockText}
                    </p>
                    {stockText === "Sold out" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleStockAlert(elem);
                        }}
                        className="text-grey-500 underline dark:text-gold"
                      >
                        Notify me when back in stock
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )}
            <div className="mb-4  dark:text-gold"></div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="color">
                <h2 className="font-bold font-primary p-2 text-3xl text-dark-purple dark:text-gold">
                {t("specProduct.material")}
                </h2>
                </label>
                <h2 className={`font-bold p-2 font-primary text-xl text-dark-purple dark:text-gold`}>
                {allModele.length > 0 && <ModeleProduct data={allModele} />}
                </h2>
                <h2 className="font-bold p-2 font-primary text-3xl text-dark-purple dark:text-gold">
                {t("specProduct.stone")}
                <h2 className={`font-bold p-2 font-primary text-lg text-dark-purple dark:text-gold`}>
                {allStones && allStones.length !== null ? <StoneProduct data={allStones} /> : <div>Aucune pierre disponible pour ce produit.</div>}
                </h2>
                </h2>
                </div>
              <SizeGuide data={product} />
              <ReviewForm id={id} />
          </div>
            </div>
        </main>

        <Footer />
        <StockAlert
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
        />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-4 max-w-3xl max-h-full overflow-auto">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <div className="flex justify-center">
                <img
                  className={`cursor-zoom-in ${
                    isZoomed ? "transform scale-150" : "transform scale-100"
                  }`}
                  src={selectedImage}
                  alt={product.name}
                  onClick={toggleZoom}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SpecProduct;
