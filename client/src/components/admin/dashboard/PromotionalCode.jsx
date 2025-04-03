import { useState } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import localhost from "../../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PromotionalCode() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [generateCoupon, setGenerateCoupon] = useState("");
  const [reduc, setReduc] = useState(5);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const handleCoupon = () => {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setGenerateCoupon(result);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    const formData = {
      coupon: generateCoupon,
      reduc: reduc,
    };

    await fetch(`${localhost}/api/generateCoupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    navigate("/admin", { replace: true });
  };

  return (
    <>
      <Header></Header>
      <div className="flex flex-col justify-center items-center">
        <h1>{t("promotionCode.title")}</h1>
        <form
          onSubmit={handleGenerate}
          className="flex flex-col justify-center items-center"
        >
          <span
            onClick={handleCoupon}
            className="rounded-lg bg-light-purple dark:bg-dark-mode-light-purple p-2.5 mt-2 text-gold cursor-pointer"
          >
            {t("promotionCode.button")}
          </span>
          {generateCoupon && <p>{generateCoupon}</p>}
          <select
            className="border	border-solid border-slate-500 w-96 p-2.5	rounded-xl mb-4"
            onChange={(e) => setReduc(e.target.value)}
          >
            <option value={10}>-10%</option>
            <option value={15}>-15%</option>
            <option value={20}>-20%</option>
          </select>
          <button className="rounded-lg bg-light-purple dark:bg-dark-mode-light-purple p-2.5 mt-2 text-gold">
            {t("promotionCode.submit")}
          </button>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}
