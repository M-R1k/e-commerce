import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import localhost from "../../config";
import { useTranslation } from "react-i18next";

export default function OrderSummary({
  subTotal,
  reduction,
  addressTo,
  shippingChoice,
  shippingOption,
  shippingOptionValid,
  isWaiting,
  cartState,
  stateManager,
  onShippingOptionChange,
  onCheckout,
  onOpenAddressPopup,
}) {
  const [gift, setGift] = useState([]);
  const date = new Date().toISOString().split("T")[0];
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/giftWrapping/${date}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setGift(data.giftWrapping);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-grey bg-opacity-50 m-4 rounded-2xl p-4">
      <h1 className="font-primary text-3xl text-center m-2">Order</h1>
      <div className="flex justify-between my-4">
        <h3 className="font-primary text-xl text-center m-2">Subtotal&nbsp;</h3>
        <h3 className="font-primary text-xl text-center m-2">
          {reduction ? (
            <>
              <span className="line-through">{subTotal}€</span>{" "}
              <span>{subTotal - (subTotal * reduction) / 100}</span>
            </>
          ) : (
            <span>{subTotal}€</span>
          )}
        </h3>
      </div>
      <div className="flex justify-between">
        <h3 className="font-primary text-xl text-center m-2">Address&nbsp;</h3>
        <h3 className="font-primary text-xl text-center m-2">
          {Object.keys(addressTo).length === 0 ? (
            <button
              onClick={onOpenAddressPopup}
              className="p-2 md:px-4 bg-light-purple border font-extrabold text-xs border-gold text-black rounded-md hover:bg-dark-purple transition duration-300 dark:text-gold dark:hover:bg-dark-mode-purple dark:bg-dark-mode-light-purple"
            >
              No address found
            </button>
          ) : (
            `${addressTo.country}, ${addressTo.state} ${addressTo.zip}, ${addressTo.city}, ${addressTo.street1}`
          )}
        </h3>
      </div>
      <div className="flex justify-between">
        <h3 className="font-primary text-xl text-center m-2">
        {t("cartPage.shippingMethod")}&nbsp;
        </h3>
        {isWaiting && cartState === 1 && <Loading />}
        <div>
          <ul>
            {!shippingOptionValid &&
              shippingChoice.length > 0 &&
              shippingChoice.map((elem, index) => (
                <div className="flex" key={index}>
                  <input
                    type="checkbox"
                    checked={shippingOption === elem}
                    onChange={() => onShippingOptionChange(elem)}
                  />
                  <li
                    className={`border-b border-gray-600:last:border-0 flex items-center p-4 hover:bg-gray-100 cursor-pointer ${
                      elem.attributes[0] === "FASTEST" ? "bg-yellow-100" : ""
                    }`}
                  >
                    <div>
                      <img
                        src={elem.providerImg}
                        alt={elem.provider}
                        className="w-4/4 h-4/4 mr-4"
                      />
                      <p>{elem.provider}</p>
                    </div>
                    <div className="flex-grow">
                      <div className="flex">
                        <p className="font-bold text-gold text-lg">
                          {elem.attributes[0]}&nbsp;
                        </p>
                        <p>{(elem.amount * 0.91).toFixed()}€</p>
                      </div>
                      <div className="text-gray-600 font-bold">
                      {t("cartPage.estimatedTime")}: {elem.estimatedDays} {t("cartPage.days")}
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            {shippingOptionValid && (
              <div className="flex">
                <input type="checkbox" checked={true} />
                <li
                  key={shippingOption.objectId}
                  className={`border-b border-gray-600:last:border-0 flex items-center p-4 hover:bg-gray-100 cursor-pointer ${
                    shippingOption.attributes[0] === "FASTEST"
                      ? "bg-yellow-100"
                      : ""
                  }`}
                >
                  <div>
                    <img
                      src={shippingOption.providerImg}
                      alt={shippingOption.provider}
                      className="w-4/4 h-4/4 mr-4"
                    />
                    <p>{shippingOption.provider}</p>
                  </div>
                  <div className="flex-grow">
                    <div className="flex">
                      <p className="font-bold text-gold text-lg">
                        {shippingOption.attributes[0]}&nbsp;
                      </p>
                      <p>{(shippingOption.amount * 0.91).toFixed()}€</p>
                    </div>
                    <div className="text-gray-600 font-bold">
                    {t("cartPage.estimatedTime")}: {shippingOption.estimatedDays} {t("cartPage.days")}
                    </div>
                  </div>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>

      <ul>
        {gift &&
          gift.map((elem) => (
            <li className="flex justify-between	mb-2">
              <input type="radio" name="gift" />
              <p>
              {t("cartPage.isGift")} <br />
                <span className="text-gold">Offert</span>
              </p>
              <img src={elem.image} alt={elem.id} className="w-1/4 h-1/4" />
            </li>
          ))}
      </ul>

      <div className="rounded-3xl bg-gold m-6 flex justify-center">
        {addressTo.name === undefined ? (
          <Loading />
        ) : (
          <button
            className="font-primary text-3xl font-bold text-center m-2"
            onClick={onCheckout}
          >
            {stateManager[cartState]}
          </button>
        )}
      </div>
    </div>
  );
}
