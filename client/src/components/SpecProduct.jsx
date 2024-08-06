import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import localhost from "../config";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";
import { CartContext } from "../context/CartContext";

import Header from "./Header";
import Footer from "./Footer";
import inStock from "../assets/inStock.svg";
import lowStock from "../assets/lowInStock.svg";
import soldOut from "../assets/soldOut.svg";
import StockAlert from "./utils/stockAlert";
import ModeleProduct from "./ModeleProduct";
import SizeGuide from "./SizeGuide";
import ReviewForm from "./review/ReviewForm";

const SpecProduct = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productSelect, setproductSelect] = useState(null);
<<<<<<< HEAD
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
=======
  const [allModele, setAllModele] = useState([]);
>>>>>>> 19f3c481d069dc771889003477dac1bd3d2c054f

  const { language } = useContext(LanguageContext);

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

  useEffect(() => {
    newEntry();
  }, [id, language]);

<<<<<<< HEAD
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.products && data.products.length > 0) {
            const productData = data.products[0];
            setProduct(productData);
            setSelectedImage(productData.images ? productData.images[0] : productData.image);
            if (Array.isArray(productData.sizes) && productData.sizes.length > 0) {
              setSelectedSize(productData.sizes[0]);
            }
            if (Array.isArray(productData.colors) && productData.colors.length > 0) {
              setSelectedColor(productData.colors[0]);
            }
            if (data.reviews) {
              setReviews(data.reviews);
            }
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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      console.log(`Added ${quantity} of ${product.name} to cart`);
    }
  };

=======
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
    }
  };

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

>>>>>>> 19f3c481d069dc771889003477dac1bd3d2c054f
  const openModal = () => {
    setIsModalOpen(true);
    setIsZoomed(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };
<<<<<<< HEAD

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const openSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };

  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false);
  };

  const getSizeGuide = () => {
    switch (product.category.name.toLowerCase()) {
      case 'colliers':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Guide des tailles pour colliers (EU)</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Taille (EU)</th>
                  <th className="border px-4 py-2">Longueur (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Small</td>
                  <td className="border px-4 py-2">40 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Medium</td>
                  <td className="border px-4 py-2">45 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Large</td>
                  <td className="border px-4 py-2">50 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'bagues':
      case 'alliances':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Guide des tailles pour bagues/alliances (EU)</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Taille (EU)</th>
                  <th className="border px-4 py-2">Circonférence (mm)</th>
                  <th className="border px-4 py-2">Diamètre (mm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">48</td>
                  <td className="border px-4 py-2">48 mm</td>
                  <td className="border px-4 py-2">15.3 mm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">50</td>
                  <td className="border px-4 py-2">50 mm</td>
                  <td className="border px-4 py-2">15.9 mm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">52</td>
                  <td className="border px-4 py-2">52 mm</td>
                  <td className="border px-4 py-2">16.5 mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'bracelets':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Guide des tailles pour bracelets (EU)</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Taille (EU)</th>
                  <th className="border px-4 py-2">Longueur (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Small</td>
                  <td className="border px-4 py-2">17 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Medium</td>
                  <td className="border px-4 py-2">19 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Large</td>
                  <td className="border px-4 py-2">21 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return <p>Aucun guide des tailles disponible pour ce type de produit.</p>;
    }
  };

  const renderOptions = (items) => (
    Array.isArray(items) ? items.map(item => (
      <option key={item} value={item}>{item}</option>
    )) : null
  );

=======

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

>>>>>>> 19f3c481d069dc771889003477dac1bd3d2c054f
  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!product) {
<<<<<<< HEAD
    return <div className="text-center py-4">{t('specProduct.error')}</div>;
  }
=======
    return (
      <div className="text-center text-red-500 py-4">
        {t("specProduct.error")}
      </div>
    );
  }

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
    setproductSelect(productName);
    setIsOpen(true);
  };

  const handleSubmit = (email) => {
    alert(
      `You will be notified at ${email} when ${productSelect} is back in stock`
    );
    setIsOpen(false);
  };

  const [stockText, stockColorCode] = manageStock(product.stockQty);

  return (
    <>
      <div className="bg-white dark:bg-dark-mode-purple">
        <Header />
        <nav className="bg-gray-200 py-2 px-6">
          <ul className="flex space-x-4 text-gold">
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
        <h1 className="text-gold text-5xl mb-6 font-primary text-center mt-4">
          {language === "FR" ? product.name : product.nameEn}
        </h1>
        <main className="py-6 px-4 max-w-7xl mx-auto">
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div
                className="flex flex-col space-y-4 overflow-auto"
                style={{ maxHeight: "600px" }}
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
              <div className="flex items-center justify-center mb-4 w-full max-w-4xl h-[600px] bg-gray-100">
                {selectedImage && (
                  <img
                    className="object-contain w-full h-full cursor-pointer"
                    src={selectedImage}
                    alt={product.name}
                    onClick={openModal}
                  />
                )}
              </div>
            </div>
            <div className="w-1/3">
              <h2 className="text-gold text-2xl mb-6 font-primary">
                {language === "FR"
                  ? product.description
                  : product.descriptionEn}
              </h2>
              <p className="text-2xl mb-4">
                {product.promotion.id !== 1 ? (
                  <>
                    <span className=" dark:text-gold line-through">
                      ${product.price}
                    </span>{" "}
                    <span className=" dark:text-gold">
                      $
                      {product.price -
                        (product.price * product.promotion.pourcentage) / 100}
                    </span>
                  </>
                ) : (
                  <span>${product.price}</span>
                )}
              </p>
              <div className="mb-4  dark:text-gold"></div>
              <div className="mb-4  dark:text-gold">
                <label htmlFor="color" className="block text-lg font-primary">
                  {t("specProduct.material")}
                </label>
                {allModele.length > 0 && <ModeleProduct data={allModele} />}
              </div>
              <SizeGuide data={product} />
            </div>
          </div>
        </main>
        <ReviewForm id={id} />

        <Footer />
        <StockAlert
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
        />
>>>>>>> 19f3c481d069dc771889003477dac1bd3d2c054f

  const manageStock = (stockQty) => {
    if (stockQty >= 10) {
      return ['In stock', inStock];
    } else if (stockQty > 0) {
      return ['Low in stock', lowStock];
    } else {
      return ['Sold out', soldOut];
    }
  };

  const handleStockAlert = (productName) => {
    setproductSelect(productName);
    setIsOpen(true);
  };

  const handleSubmit = (email) => {
    alert(`You will be notified at ${email} when ${productSelect} is back in stock`);
    setIsOpen(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${localhost}/api/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });
      if (response.ok) {
        const newReview = await response.json();
        setReviews([...reviews, newReview]);
        setReview("");
      } else {
        console.error("Failed to submit review");
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const [stockText, stockColorCode] = manageStock(product.stockQty);

  return (
    <>
      <Header />
      <nav className="bg-gray-200 py-2 px-6">
        <ul className="flex space-x-4">
          <li>
            <Link to={`/`}>{t('specProduct.homepage')}</Link>
          </li>
          <li>/</li>
          {product.category && (
            <>
              <li>
                <Link to={`/category/${product.category.id}`}>
                  {product.category.name}
                </Link>
              </li>
              <li>/</li>
            </>
          )}
          <li className="font-semibold font-primary">{product.name}</li>
        </ul>
      </nav>
      <main className="py-6 px-4 max-w-7xl mx-auto">
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col space-y-4 overflow-auto" style={{ maxHeight: '600px' }}>
              {product.images && product.images.map((image, index) => (
                <img
<<<<<<< HEAD
                  key={index}
                  className={`w-20 h-20 cursor-pointer border-2 ${selectedImage === image ? "border-gold" : "border-gray-300"
                    }`}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-center mb-4 w-full max-w-4xl h-[600px] bg-gray-100">
              {selectedImage && (
                <img
                  className="object-contain w-full h-full cursor-pointer"
=======
                  className={`cursor-zoom-in ${
                    isZoomed ? "transform scale-150" : "transform scale-100"
                  }`}
>>>>>>> 19f3c481d069dc771889003477dac1bd3d2c054f
                  src={selectedImage}
                  alt={product.name}
                  onClick={openModal}
                />
              )}
            </div>
          </div>
<<<<<<< HEAD
          <div className="w-1/3">
            <h1 className="text-gold text-5xl mb-6 font-primary">{product.name}</h1>
            <p className="text-2xl mb-4">{product.price} €</p>
            <div className="mb-4">
              <label htmlFor="size" className="block text-lg font-primary">Sélectionner ma taille :</label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              >
                {renderOptions(product.sizes)}
              </select>
              <button
                onClick={openSizeGuide}
                className="mt-2 text-sm text-blue-500 underline"
              >
                Guide des tailles
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="color" className="block text-lg font-primary">Couleur :</label>
              <select
                id="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              >
                {renderOptions(product.colors)}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-lg font-primary">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              >
                {[...Array(10).keys()].map(num => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-gold text-white px-4 py-2 rounded-lg"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
        <div className="mt-10 space-y-2">
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            {t('specProduct.category')}
            {language === "FR"
              ? product.category.name
              : product.category.nameEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            {t('specProduct.material')}
            {language === "FR"
              ? product.material.name
              : product.material.nameEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            {t('specProduct.stone')}
            {language === "FR" ? product.stone.name : product.stone.nameEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            {t('specProduct.color')}{language === "FR" ? product.color : product.colorEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            {t('specProduct.size')} {product.sizes.name}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            {t('specProduct.weight')} {product.weight}g
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            {t('specProduct.stockQty')} {product.stockQty}
          </p>
        </div>
        <div className="mt-10">
          <label htmlFor="quantity" className="block text-lg font-primary">
            {t('specProduct.quantity')}
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-2 p-2 border border-gray-300 rounded-lg"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-gold text-white px-4 py-2 rounded-lg"
          >
            {t('specProduct.cart')}
          </button>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Write your review here"
            />
            <button
              type="submit"
              className="mt-2 bg-gold text-white px-4 py-2 rounded-lg"
            >
              Submit Review
            </button>
          </form>
          <div className="mt-6 space-y-4">
            {reviews.map((rev, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg">
                {rev.review}
              </div>
            ))}
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
                className={`cursor-zoom-in ${isZoomed ? "transform scale-150" : "transform scale-100"
                  }`}
                src={selectedImage}
                alt={product.name}
                onClick={toggleZoom}
              />
            </div>
          </div>
        </div>
      )}

      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 max-w-lg max-h-full overflow-auto">
            <button
              onClick={closeSizeGuide}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="text-center">
              {getSizeGuide()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

=======
        )}
      </div>
    </>
  );
};
>>>>>>> 19f3c481d069dc771889003477dac1bd3d2c054f
export default SpecProduct;
