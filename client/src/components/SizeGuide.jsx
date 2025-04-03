import { useEffect, useState } from "react";
import localhost from "../config";
import { useTranslation } from "react-i18next";
import { useCart } from "../CartContext";
import { useNavigate, useParams } from "react-router-dom";

export default function SizeGuide(data) {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState([]);
  const [sizeGuide, setSizeGuide] = useState([]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("no size");
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const { state: cart, dispatch } = useCart([]);
  let navigate = useNavigate();
  const { id } = useParams();
  const [displayWishlist, setDisplayWishlist] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const fetchIsLog = () => {
    const email = localStorage.getItem("user");
    return email !== null;
  };

  useEffect(() => {
    if (fetchIsLog()) {
      setDisplayWishlist(true);
    }

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsInWishlist(savedWishlist.includes(parseInt(id)));

    const fetchData = async () => {
      setCategory(data.data.category.name);
      setProduct(data.data);

      switch (data.data.category.name) {
        case "Colliers":
          const response_sizeNecklaces = await fetch(
            `${localhost}/api/sizeNecklaces`
          );
          if (response_sizeNecklaces.ok) {
            const data = await response_sizeNecklaces.json();
            setSizeGuide(data.sizeNecklaces);
          }
          break;

        case "Alliances":
        case "Bagues":
          const response_rings = await fetch(`${localhost}/api/sizeRings`);
          if (response_rings.ok) {
            const data = await response_rings.json();
            setSizeGuide(data.sizeRings);
          }
          break;

        case "Bracelets":
          const response_bracelets = await fetch(
            `${localhost}/api/sizeBracelets`
          );
          if (response_bracelets.ok) {
            const data = await response_bracelets.json();
            setSizeGuide(data.sizeBracelets);
          }
          break;

        default:
          setSizeGuide([]);
      }
    };
    fetchData();
  }, [id, data]);

  const openSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };

  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false);
  };

  const handleAddToCart = async () => {
    const formData = {
      product: parseInt(id),
      quantity: parseInt(quantity),
      size: selectedSize,
      user: localStorage.getItem("user"),
    };

    if (fetchIsLog()) {
      const response = await fetch(`${localhost}/api/cartItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "ADD_ITEM", payload: data.success });
        navigate("/", { replace: true });
      }
    } else {
      const item = {
        itemQty: quantity,
        product: data.data,
        size: selectedSize,
      };
      dispatch({ type: "ADD_ITEM", payload: item });
    }
  };

  const toggleWishlist = async () => {
    let savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isInWishlist) {
      savedWishlist = savedWishlist.filter(item => item !== parseInt(id));
    } else {
      savedWishlist.push(parseInt(id));

      const formData = {
        product: parseInt(id),
        quantity: parseInt(quantity),
        size: selectedSize,
        user: localStorage.getItem("user"),
      };

      await fetch(`${localhost}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
    }

    localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
    setIsInWishlist(!isInWishlist);
  };

  return (
    <>
      {sizeGuide.length > 0 && (
        <div className="mb-4 flex flex-col">
          <label htmlFor="size" className="block text-3xl font-bold font-primary text-dark-purple dark:text-gold">
            {t("sizeGuidePage.tailleChoose")}
          </label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-1/3 mt-2 p-2 border font-primary border-gray-300 rounded-3xl dark:bg-dark-mode-purple text-light-purple font-bold dark:text-gold"
          >
            {sizeGuide.map((elem) => (
              <option
              className="block text-lg font-bold font-primary rounded-3xl text-light-purple dark:text-gold" 
              value={elem.name}>{elem.name}</option>
            ))}
          </select>
          <button
            onClick={openSizeGuide}
            className="mt-2 p-2 text-left text-md text-light-purple dark:text-gold underline"
          >
            {t("sizeGuidePage.button")}
          </button>
        </div>
      )}
      <div className="mb-4 flex flex-col">
        <label htmlFor="quantity" 
        className="font-bold p-2 font-primary text-3xl text-dark-purple dark:text-gold">
          {t("specProduct.quantity")}:
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-1/3 mt-2 p-2 border font-primary border-gray-300 rounded-3xl dark:bg-dark-mode-purple text-light-purple font-bold dark:text-gold"
          >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-5/6 rounded-3xl bg-gold hover:bg-light-purple duration-300 ease-in-out font-primary font-bold text-white px-4 py-2 mb-4"
      >
        {t("specProduct.cart")}
      </button>
      <div className="mb-4 flex flex-col">
      <p className="font-bold p-2 font-primary text-3xl text-dark-purple dark:text-gold">
      {t("specProduct.stockQty")} {product && product.stockQty}
        </p>
      </div>
      <div className="mb-4 flex flex-col">
      <p className="font-bold p-2 font-primary text-3xl text-dark-purple dark:text-gold">
      {t("specProduct.weight")} {product && product.weight}g
        </p>
      </div>
      {displayWishlist && (
        <div className="mt-6 p-2 flex justify-center items-center">
          <button className="flex font-primary text-3xl" onClick={toggleWishlist}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isInWishlist ? "#ffc677" : "none"}
              stroke="#ffc677"
              className="w-8 h-8 mr-4 transition-all duration-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <p className="font-bold font-primary text-3xl text-dark-purple dark:text-gold">

            {t("cartPage.productSave")}
        </p>
          </button>
        </div>
      )}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="relative bg-white dark:bg-dark-mode-purple p-4 max-w-lg max-h-full overflow-auto rounded-lg shadow-lg dark:shadow-gold">
            <button
              onClick={closeSizeGuide}
              className="absolute top-2 right-2 text-gray-500 dark:text-gold hover:text-gray-700"
            >
              &times;
            </button>

            <div className="text-center">
              {sizeGuide.length > 0 ? (
                sizeGuide[0].diameter ? (
                  <div>
                    <h2 className="text-3xl font-semibold mb-4 font-secondary text-dark-purple dark:text-gold">
                      {t("sizeGuidePage.guideRings")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                          {t("sizeGuidePage.circonférence")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                            {elem.circumference}
                          </li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                          {t("sizeGuidePage.diamètre")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">{elem.diameter}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : category === "Colliers" ? (
                  <div>
                    <h2 className="text-3xl font-semibold mb-4">
                      {t("sizeGuidePage.guideNecklaces")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                          {t("sizeGuidePage.longueur")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">{elem.value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-semibold mb-4">
                      {t("sizeGuidePage.guideBracelets")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">
                          {t("sizeGuidePage.longueur")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2 font-secondary text-dark-purple dark:text-gold">{elem.value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
