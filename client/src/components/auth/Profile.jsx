import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import ManageProfil from "./ManageProfil";
import Header from "../Header";
import ManageCommand from "./ManageCommand";
import { useTranslation } from "react-i18next";
import Delete from "../../assets/delete.svg";
import Cart from "../../assets/cart.svg";
import { useCart } from "../../CartContext";

export default function Profile() {
  const [profil, setProfil] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { state: cart, dispatch } = useCart([]);

  const { t } = useTranslation();
  let navigate = useNavigate();

  const fetchWishlist = async (id) => {
    const response = await fetch(`${localhost}/api/UserWishlist/${id}`);
    if (response.ok) {
      const data = await response.json();
      setWishlists(data.wishlist);
    }
  };

  const fetchData = async (email) => {
    const response = await fetch(`${localhost}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (response.status === 200) {
      const data = await response.json();
      setProfil(data.user);
      fetchWishlist(data.user[0].id);
    }
  };

  useEffect(() => {
    const fetchIsLog = async () => {
      const email = localStorage.getItem("user");
      if (email) {
        fetchData(email);
        setRefresh(false);
      } else {
        navigate("/authentication", { replace: true });
      }
    };

    fetchIsLog();
  }, [refresh]);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "RESET_CART", payload: [] });
    navigate("/", { replace: true });
  };

  const deleteProduct = async (elem) => {
    const response = await fetch(`${localhost}/api/wishlist/${elem.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        setRefresh(true);
      }
    }
  };

  const handleAddToCart = async (elem) => {
    const formData = {
      product: parseInt(elem.product.id),
      quantity: parseInt(elem.itemQty),
      size: elem.size,
      user: localStorage.getItem("user"),
    };

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

    deleteProduct(elem);
  };

  return (
    <>
      <div className="bg-light-purple bg-opacity-30 dark:bg-dark-mode-purple">
        <Header></Header>
        <div className="mr-24	ml-24	flex justify-between font-secondary">
          <div className="w-3/5	 mr-8">
            <h1 className="mt-16 text-3xl	text-light-purple mb-2">
              {t("profilPage.profil")}
            </h1>
            <div className="border border-gray-400	w-4/4	"></div>
            <br></br>
            <ManageProfil data={profil} />
            <div className="text-center">
              <button
            className="p-2 m-2 font-primary text-xl font-bold md:px-4 bg-light-purple border text-white rounded-md hover:bg-light-purple transition duration-300"
            onClick={() => logout()}
              >
                {t("profilPage.logout")}
              </button>
            </div>
            <h1 className="mt-16 text-3xl	text-light-purple mb-2">My wishlist</h1>
            <div className="border border-gray-400	w-4/4	"></div>
            <br></br>
            {wishlists.length > 0 &&
              wishlists.map((elem, index) => (
                <div key={index} className="ml-8">
                  <div className="flex flex-col m-8">
                    <div className="flex">
                      <img
                        className="w-1/3 h-1/3 border border-grey"
                        src={`${elem.product.images[0]}`}
                        alt={elem.product.name}
                      />
                      <div className="flex flex-col ml-4">
                        <h2 className="font-primary text-3xl text-light-purple">
                          {elem.product.name}
                        </h2>
                        <span className="font-primary flex text-2xl p-2">
                          Size:&nbsp;<h2>{elem.size}</h2>
                        </span>
                        <span className="font-primary flex text-2xl p-2">
                          Material:&nbsp;<h2>{elem.product.material.name}</h2>
                        </span>
                        {elem.product.stone && (
                          <span className="font-primary flex text-2xl p-2">
                            Stone:&nbsp;
                            <h2>{elem.product.stone.name}</h2>
                          </span>
                        )}
                        {elem.product.promotion.id != 1 && (
                          <span className="font-primary flex text-2xl p-2">
                            Price:&nbsp;
                            <h2 className="line-through">
                              ${elem.product.price * elem.itemQty}&nbsp;
                            </h2>
                            <h2>
                              $
                              {elem.product.price * elem.itemQty -
                                (
                                  elem.product.price *
                                  elem.itemQty *
                                  ((elem.product.promotion.id != 1
                                    ? elem.product.promotion.pourcentage
                                    : 0) /
                                    100)
                                ).toFixed()}
                            </h2>
                          </span>
                        )}
                        {elem.product.promotion.id == 1 && (
                          <span className="font-primary flex text-2xl p-2">
                            Price:&nbsp;
                            <h2>{elem.product.price * elem.itemQty}€</h2>
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-around text-2xl p-2 mt-6">
                        <div>
                          <button
                            className="flex font-primary"
                            onClick={() => deleteProduct(elem)}
                          >
                            <img className="mr-4" src={Delete} alt="" />
                            Delete
                          </button>
                        </div>
                        <div>
                          <button
                            className="flex font-primary"
                            onClick={() => handleAddToCart(elem)}
                          >
                            <img className="mr-4" src={Cart} alt="" />
                            {t("specProduct.cart")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-2/5">
            <h1 className="mt-16 text-3xl	text-light-purple mb-2">
              {t("profilPage.command")}
            </h1>
            <div className="border border-gray-400 w-4/4 dark:border-light-purple"></div>
            <br></br>
            <ManageCommand />
          </div>
        </div>
      </div>
    </>
  );
}
