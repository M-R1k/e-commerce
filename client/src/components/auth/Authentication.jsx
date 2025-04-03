import { useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import { Link } from "react-router-dom";
import register from "../../assets/register.jpg";
import login from "../../assets/login.jpg";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";
import Header from "../Header";
import { useCart } from "../../CartContext";

import { useTranslation } from "react-i18next";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  let navigate = useNavigate();
  const { t } = useTranslation();
  const { state: cart, dispatch } = useCart([]);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Email is invalid");
      return;
    }

    const formData = {
      email: email,
      password: password,
    };

    const response = await fetch(`${localhost}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.status === 200) {
      localStorage.setItem("user", email);
      dispatch({ type: "RESET_CART", payload: [] });
      navigate("/", { replace: true });
    } else {
      setError("Email already exists.");
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Email is invalid");
      return;
    }
    const formData = {
      email: email,
      password: password,
    };

    const response = await fetch(`${localhost}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.status === 200) {
      localStorage.setItem("user", email);
      dispatch({ type: "RESET_CART", payload: [] });

      const response_cart = await fetch(`${localhost}/api/Item/${email}`, {
        method: "GET",
      });
      if (response_cart.ok) {
        const data = await response_cart.json();

        if (data.cartItem.length > 0) {
          data.cartItem.forEach((elem) => {
            dispatch({ type: "ADD_ITEM", payload: elem });
            navigate("/", { replace: true });
          });
        } else {
          dispatch({ type: "RESET_CART", payload: [] });
          navigate("/", { replace: true });
        }
      }
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-mode-purple">
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="relative w-4/5 bg-white shadow-lg rounded-lg">
            <div
              className={`absolute inset-0 flex transform transition-transform duration-500 ${
                isSignUp ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <div className="mr-60 w-full flex items-center p-6">
                <img src={login} alt="Login Image" className="w-1/2 rounded" />
                <form
                  onSubmit={handleSubmitLogin}
                  className="w-1/2 flex flex-col items-center justify-center"
                >
                  <h1 className="mt-10 text-center font-primary text-2xl font-bold leading-9 tracking-tight text-gold">
                    {t("auth.login")}
                  </h1>
                  <div className="my-6 flex flex-wrap justify-center align-items space-between">
                    <span className="block text-md font-primary font-bold leading-6 text-black dark:text-gold">
                      {t("auth.social")}
                    </span>
                    <Link to={`https://www.facebook.com/?locale=fr_FR`}>
                      <img
                        src={facebook}
                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] border-[rgba(0,32,63,.45)] dark:border-gold transition-all duration-700 ease-in-out"
                        alt="logo of Facebook that redirects to the Facebook's homepage"
                      />
                    </Link>
                    <Link to={`https://x.com/?lang=fr`}>
                      <img
                        src={twitter}
                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] dark:bg-dark-mode-light-purple border border-[rgba(0,32,63,.45)] dark:border-gold transition-all duration-700 ease-in-out"
                        alt="logo of Twitter that redirects to the Twitter's homepage"
                      />
                    </Link>
                    <Link to={`https://www.instagram.com/`}>
                      <img
                        src={instagram}
                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] dark:bg-dark-mode-light-purple border border-[rgba(0,32,63,.45)] dark:border-gold transition-all duration-700 ease-in-out"
                        alt="logo of Instagram that redirects to the Instagram's homepage"
                      />
                    </Link>
                  </div>

                  <label
                    htmlFor="mail"
                    className="block text-md font-primary font-bold leading-6 text-black dark:text-gold"
                  >
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("auth.email")}
                    className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white dark:bg-dark-mode-light-purple dark:text-gold "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="block text-md font-primary font-bold leading-6 text-black dark:text-gold"
                  >
                    {t("auth.password")}
                  </label>
                  <input
                    type="password"
                    placeholder={t("auth.password")}
                    className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white  dark:bg-dark-mode-light-purple dark:text-gold "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <a
                    href="#"
                    className="font-bold font-primary text-dark-purple hover:text-light-purple dark:text-gold"
                  >
                    {t("auth.forgot")}
                  </a>
                  <button className="w-3/4 p-3 text-3xl text-black font-bold rounded-lg bg-light-purple hover:bg-gold font-primary dark:bg-dark-mode-light-purple dark:text-gold dark:hover:bg-white">
                    {t("auth.login")}
                  </button>
                  <p
                    className="mt-4 cursor-pointer text-blue-500 dark:text-gold"
                    onClick={() => setIsSignUp(true)}
                  >
                    {t("auth.no-account")}
                  </p>
                </form>
                {error && <p>{error}</p>}
              </div>
            </div>

            <div
              className={`absolute inset-0 flex transform transition-transform duration-500 ${
                isSignUp ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="ml-60 w-full flex items-center p-6">
                <form
                  onSubmit={handleSubmitRegister}
                  className="w-1/2 flex flex-col items-center justify-center"
                >
                  <h1 className="mt-10 text-center font-primary text-2xl font-bold leading-9 tracking-tight text-gold">
                    {t("auth.register")}
                  </h1>
                  <div className="my-6 flex flex-wrap justify-center align-items space-between">
                    <span className="block text-md font-primary font-bold leading-6 text-black dark:text-gold">
                      {t("auth.social")}
                    </span>
                    <Link to={`https://www.facebook.com/?locale=fr_FR`}>
                      <img
                        src={facebook}
                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full dark:text-gold bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                        alt="logo of Facebook that redirects to the Facebook's homepage"
                      />
                    </Link>
                    <Link to={`https://x.com/?lang=fr`}>
                      <img
                        src={twitter}
                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full  dark:bg-dark-mode-light-purple dark:text-gold bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                        alt="logo of Twitter that redirects to the Twitter's homepage"
                      />
                    </Link>
                    <Link to={`https://www.instagram.com/`}>
                      <img
                        src={instagram}
                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full  dark:bg-dark-mode-light-purple dark:text-gold bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                        alt="logo of Instagram that redirects to the Instagram's homepage"
                      />
                    </Link>
                  </div>

                  <label
                    htmlFor="mail"
                    className="block text-md font-primary font-bold leading-6 text-black dark:text-gold"
                  >
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("auth.email")}
                    className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white  dark:bg-dark-mode-light-purple dark:text-gold "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="block text-md font-primary font-bold leading-6 text-black dark:text-gold"
                  >
                    {t("auth.password")}
                  </label>
                  <input
                    type="password"
                    placeholder={t("auth.password")}
                    className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white  dark:bg-dark-mode-light-purple dark:text-gold "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <a
                    href="#"
                    className="font-bold font-primary text-dark-purple hover:text-light-purple dark:text-gold"
                  >
                    {t("auth.no-account")}
                  </a>
                  <button className="w-3/4 p-3 bg-light-purple text-3xl font-bold text-black rounded-lg hover:bg-gold font-primary dark:bg-dark-mode-light-purple dark:text-gold dark:hover:bg-white">
                    {t("auth.register")}
                  </button>
                  <p
                    className="mt-4 cursor-pointer text-blue-500 dark:text-gold"
                    onClick={() => setIsSignUp(false)}
                  >
                    {t("auth.no-account")}
                  </p>
                </form>
                <img
                  src={register}
                  alt="Register Image"
                  className="w-1/2 rounded"
                />
              </div>
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
