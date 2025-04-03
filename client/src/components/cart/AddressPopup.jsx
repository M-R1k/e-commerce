import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AddressPopup({
  displayAdressPopup,
  onClose,
  onSave,
  initialData = {},
}) {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [name, setName] = useState(initialData.name || "");
  const [company, setCompany] = useState(initialData.company || "");
  const [street1, setStreet1] = useState(initialData.street1 || "");
  const [city, setCity] = useState(initialData.city || "");
  const [state, setState] = useState(initialData.state || "");
  const [zip, setZip] = useState(initialData.zip || "");
  const [country, setCountry] = useState(initialData.country || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");
  const { t } = useTranslation();

  useEffect(() => {
    const storedAddresses =
      JSON.parse(localStorage.getItem("savedAddresses")) || [];
    setSavedAddresses(storedAddresses);
  }, []);

  useEffect(() => {
    if (selectedAddressIndex !== null && selectedAddressIndex !== "") {
      const address = savedAddresses[selectedAddressIndex];
      setName(address.name);
      setCompany(address.company);
      setStreet1(address.street1);
      setCity(address.city);
      setState(address.state);
      setZip(address.zip);
      setCountry(address.country);
      setPhone(address.phone);
      setEmail(address.email);
    } else {
      setName("");
      setCompany("");
      setStreet1("");
      setCity("");
      setState("");
      setZip("");
      setCountry("");
      setPhone("");
      setEmail("");
    }
  }, [selectedAddressIndex, savedAddresses]);

  const handleSave = () => {
    const address = {
      name,
      company,
      street1,
      city,
      state,
      zip,
      country,
      phone,
      email,
    };

    const updatedAddresses = [...savedAddresses];
    if (selectedAddressIndex !== null && selectedAddressIndex !== "") {
      updatedAddresses[selectedAddressIndex] = address;
    } else {
      updatedAddresses.push(address);
    }

    setSavedAddresses(updatedAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
    onSave(address);
    onClose();
  };

  if (!displayAdressPopup) {
    return null;
  }

  return (
    // Modal //
    <div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border dark:border-gold rounded-lg relative flex flex-col w-full bg-white dark:bg-dark-mode-purple outline-none focus:outline-none shadow-lg dark:shadow-gold">
          <div className="flex items-start justify-between p-5 border-b border-solid border-grey dark:border-gold rounded-t shadow-md dark:shadow-gold">
            {/* <form class="w-full max-w-lg"> */}
            {/* <div className="flex flex-col justifxy-center items-center"> */}
            <h1 className="font-primary font-bold text-gold text-xl mb-4">
              Delivery & Billing Address
            </h1>
            <button
              classN
              ame="p-1 ml-auto bg-transparent border-0 text-gold float-right text-4xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="bg-transparent text-gold h-6 w-6 text-3xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>

          <div className="flex flex-wrap my-2 mx-2 mb-6">
            {savedAddresses.length > 0 && (
              <div className="m-4 ml-6 px-40">
                <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
                {t("addressPopup.addressOption")}
                <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={(e) => setSelectedAddressIndex(e.target.value)}
                    value={selectedAddressIndex || ""}
                  >
                    <option value="">
                      Choose Address
                      <svg
                        class="fill-current text-gold h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </option>
                    {savedAddresses.map((address, index) => (
                      <option key={index} value={index}>
                        {`${address.name}, ${address.country}, ${address.zip}, ${address.state}, ${address.city}, ${address.street1}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            {/* <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary font-bold text-gold"> */}
            <div className="w-full md:w-1/2 px-6 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
              {t("addressPopup.addressName")}
              <input
                  // className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="required"
                  required
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 px-6">
              <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
              {t("addressPopup.addressEmail")}
                <input
                  className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="required"
                  required
                />
              </label>
            </div>
            <div className="flex my-4 mb-2 px-24">
              <div className="w-full md:w-1/3 px-6 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
                {t("addressPopup.addressPhone")}
                <input
                    className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>
              <div className="w-full md:w-1/3 px-6 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
                {t("addressPopup.addressCompany")}
                <input
                    className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </label>
              </div>
              <div className="w-full md:w-1/3 px-6 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
                {t("addressPopup.addressCountry")}
                <input
                    className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="required"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-wrap mb-2 my-2 px-24">
              <div className="w-full md:w-1/3 px-6 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
                {t("addressPopup.addressZIP")}
                <input
                    className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="required"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/3 px-6 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
                    {t("addressPopup.addressState")}
                  <input
                    className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="required"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/3 px-6 mb-4 md:mb-0">
                <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
                {t("addressPopup.addressCity")}
                <input
                    className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="required"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="w-full px-40 m-4">
              <label className="block uppercase tracking-wide text-sm font-bold mb-2 font-primary text-gold">
              {t("addressPopup.addressStreet")}
                <input
                  className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={street1}
                  onChange={(e) => setStreet1(e.target.value)}
                  placeholder="required"
                  required
                />
              </label>
            </div>
            <div className="flex justify-center w-full items-center">
              <button
                className="text-white bg-gold hover:bg-light-purple focus:ring-4 focus:outline-none focus:ring-gold font-medium rounded-lg text-sm w-1/2 px-5 py-2.5 text-center dark:bg-dark-mode-light-purple dark:hover:bg-light-purple dark:focus:ring-light-purple"
                onClick={handleSave}
              >
                      {t("addressPopup.confirm")}
              </button>
            </div>
            {/* </form> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
