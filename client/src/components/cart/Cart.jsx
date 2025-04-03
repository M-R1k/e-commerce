import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Content from "./Content";
import { useCart } from "../../CartContext";

export default function Cart() {
  const { state: cart, dispatch } = useCart([]);
  const [nbrArticle, setNbrArticle] = useState(0);
  const { t } = useTranslation();

  const SetNbrArticle = () => {
    let nbr = 0;
    cart.map((item) => (nbr += item.itemQty));
    setNbrArticle(nbr);
};

useEffect(() => {
  SetNbrArticle();
}, [cart]);

  return (
    <>
      <Header />
      <div className="p-2 bg-light-purple bg-opacity-30 dark:bg-dark-mode-purple">
        <div className="m-8">
          {nbrArticle >= 0 && nbrArticle !== 1 && (
            <h1 className="font-primary font-bold text-3xl text-gold mr-4">
              {t("cartPage.myCart")} {` (` + nbrArticle + ` articles)`}
            </h1>
          )}
          {nbrArticle === 1 && (
            <h1 className="font-primary font-bold text-4xl text-gold mr-4">
              {t("cartPage.myCart")} {` (` + nbrArticle + ` articles)`}
              </h1>
          )}
          <div className="border border-gold w-2/4" /> 
        </div>
        <div><Content /></div>
      </div>
      <Footer />
    </>
  );
}