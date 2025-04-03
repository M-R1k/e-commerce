import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Router, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import localhost from "../../config";
import { Shippo } from "shippo";
import AddressPopup from "./AddressPopup";
import ProductItem from "./ProductItem";
import OrderSummary from "./OrderSummary";
import Promo from "./Promo";

export default function Content() {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const { state: cart, dispatch } = useCart([]);

  const [subTotal, setSubTotal] = useState(0);

  const [displayAdressPopup, setDisplayAdressPopup] = useState(false);

  const [reduction, setReduction] = useState(null);

  const [addressTo, setAddressTo] = useState({});
  const [addressFrom, setAddressFrom] = useState(null);
  const [parcels, setParcels] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [shippingChoice, setShippingChoice] = useState([]);
  const [shippingOption, setShippingOption] = useState(0);
  const [shippingOptionValid, setShippingOptionValid] = useState(false);
  const [tracking_num, setTracking_num] = useState("");

  const [isWaiting, setIsWaiting] = useState(true);
  const [cartState, setCartState] = useState(0);

  const stateManager = [
    "Confirm Address",
    "Select Shipping Method",
    "Go to Payment",
  ];

  const shippo = new Shippo({
    apiKeyHeader: "shippo_test_55d32d12f5ff622308a3b56d970d6727d8cd7dee",
  });

  const createShippoAddress = async () => {
    const data = await shippo.addresses.create({
      name: "GAMAZA",
      street1: "Broadway 1",
      city: "New York",
      state: "NY",
      zip: "10007",
      country: "US",
    });
    setAddressFrom(data);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const validateAdress = await fetch(
          `${localhost}/api/validateAdress/${user}`
        );
        const data = await validateAdress.json();
        const shippingCountry = await fetch(`${localhost}/api/shippingCountry`);
        const countryList = await shippingCountry.json();

        if (Object.keys(data.isAdressValide).length > 0) {
          countryList.blacklist.map((country) => {
            if (country.countryCode !== data.isAdressValide.country) {
              if (
                data.isAdressValide.firstname !== undefined &&
                data.isAdressValide.city !== undefined &&
                data.isAdressValide.adress !== undefined &&
                data.isAdressValide.region !== undefined &&
                data.isAdressValide.zip_code !== undefined &&
                data.isAdressValide.country !== undefined
              ) {
                const obj = {
                  name: data.isAdressValide.firstname, //required
                  street1: data.isAdressValide.adress, //required
                  city: data.isAdressValide.city, //required
                  state: data.isAdressValide.region, //required
                  zip: data.isAdressValide.zip_code.toString(), //required
                  country: data.isAdressValide.country, // iso2 country code //required
                };
                setAddressTo(obj);
                setDisplayAdressPopup(false);
              } else {
                setDisplayAdressPopup(true);
              }
            } else {
              alert(
                "Can't deliver in this country. You can change it in your profile"
              );
              navigate("/profile");
            }
          });
        }
      }
    };
    fetchUserData();

    createShippoAddress();
  }, []);

  const SetSubTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total +=
        item.product.price * item.itemQty -
        (
          item.product.price *
          item.itemQty *
          ((item.product.promotion.id !== 1
            ? item.product.promotion.pourcentage
            : 0) /
            100)
        ).toFixed();
    });
    setSubTotal(total);
  };

  useEffect(() => {
    SetSubTotal();
  }, [cart]);

  const handleQtyChange = (item) => {
    dispatch({ type: "UPDATE_ITEM", payload: item });
  };

  const deleteProduct = async (item) => {
    if (localStorage.getItem("user")) {
      const response = await fetch(`${localhost}/api/cartItem/${item.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "REMOVE_ITEM", payload: item });
      }
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: item });
    }
  };

  const saveForLater = async (elem) => {
    const formData = {
      user: parseInt(elem.cart.user.id),
      product: parseInt(elem.product.id),
      quantity: parseInt(elem.itemQty),
      size: elem.size,
    };

    const response = await fetch(`${localhost}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.sucess) {
        dispatch({ type: "REMOVE_ITEM", payload: elem });
      }
    }
  };

  const handleShipping = async (address) => {
    const shippingCountry = await fetch(`${localhost}/api/shippingCountry`);
    const countryList = await shippingCountry.json();
    let isValid = true;
    countryList.blacklist.map((country) => {
      if (country.countryCode === address.country) {
        isValid = false;
      }
    });
    if (
      address.name !== "" &&
      address.country !== "" &&
      address.zip !== "" &&
      address.state !== "" &&
      address.city !== "" &&
      address.street1 !== "" &&
      isValid
    ) {
      setAddressTo(address);
      setDisplayAdressPopup(false);
    } else {
      setAddressTo({});
      alert("Can't deliver in this country. Change your adress");
      return;
    }
  };

  const checkout = async () => {
    if (cartState === 2) {
      // console.log(`adressTo => ${JSON.stringify(addressTo)}; shippingOptions => ${JSON.stringify(shippingOption)}`)
      // console.log({adress: JSON.stringify(addressTo), shipping_amount : shippingOption.amount,shipping_name: shippingOption.attributes[0], shipping_estimatedDays: shippingOption.estimatedDays})
      navigate("/checkout", {
        state: {
          adress: JSON.stringify(addressTo),
          shipping_amount: shippingOption.amount,
          shipping_name: shippingOption.attributes[0],
          shipping_estimatedDays: shippingOption.estimatedDays,
          tracking_num: tracking_num,
        },
      });
    } else if (cartState === 1) {
      setShippingOptionValid(true);
      transaction(shippingOption);
    } else {
      const shipment = await shippo.shipments.create({
        addressFrom: addressFrom,
        addressTo: addressTo,
        parcels: parcels,
        async: false,
      });
      if (
        addressTo.name !== "" &&
        addressTo.country !== "" &&
        addressTo.zip !== "" &&
        addressTo.state !== "" &&
        addressTo.city !== "" &&
        addressTo.street1 !== ""
      ) {
        setCartState(1);
        if (shipment && shipment.rates.length > 0) {
          let tmp = [];
          shipment.rates.forEach((elem) => {
            if (elem.attributes.length > 0) {
              const obj = {
                objectId: elem.objectId,
                amount: elem.amount,
                attributes: elem.attributes,
                estimatedDays: elem.estimatedDays,
                provider: elem.provider,
                providerImg: elem.providerImage75,
                currency: elem.currency,
              };
              tmp.push(obj);
            }
          });
          setShippingChoice(tmp);
          setIsWaiting(false);
        }
      }
    }
  };

  const transaction = async (elem) => {
    const trans = await shippo.transactions.create({
      rate: elem?.objectId,
      labelFileType: "PDF",
      async: false,
    });

    if (trans) {
      setTracking_num(trans.objectId);
    }

    setCartState(2);
  };

  const openPopUp = () => {
    setDisplayAdressPopup(true);
  };

  const createParcels = () => {
    let tmp = [];
    cart.forEach((item) => {
      const parcel = {
        length: "16",
        width: "2",
        height: "22",
        distanceUnit: "cm",
        weight: item.product.weight.toString(),
        massUnit: "kg",
      };
      for (let i = 0; i < item.itemQty; i++) {
        tmp.push(parcel);
      }
    });
    setParcels(tmp);
  };

  useEffect(() => {
    createParcels();
  }, [cart]);

  return (
    <div className="flex">
      <div>
        {cart.map((elem, index) => (
          <ProductItem
            key={index}
            item={elem}
            onDelete={deleteProduct}
            onSaveForLater={saveForLater}
            onQtyChange={handleQtyChange}
          />
        ))}
      </div>
      <div className="w-2/5 mr-8 flex flex-col justify-start">
        <OrderSummary
          subTotal={subTotal}
          reduction={reduction}
          addressTo={addressTo}
          shippingChoice={shippingChoice}
          shippingOption={shippingOption}
          shippingOptionValid={shippingOptionValid}
          isWaiting={isWaiting}
          cartState={cartState}
          stateManager={stateManager}
          onShippingOptionChange={setShippingOption}
          onCheckout={checkout}
          onOpenAddressPopup={openPopUp}
        />
      </div>

      <AddressPopup
        displayAdressPopup={displayAdressPopup}
        onClose={() => setDisplayAdressPopup(false)}
        onSave={handleShipping}
        initialData={addressTo}
        savedAddresses={savedAddresses}
      />
    </div>
  );
}
