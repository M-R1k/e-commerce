import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";
import { useTranslation } from "react-i18next";

export default function EditUser() {
  const { id } = useParams();
  let navigate = useNavigate();
  const { t } = useTranslation();

  ////////////////
  //  UseState  //
  ////////////////

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    //////////////////////
    // Fetch User Data  //
    //////////////////////

    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/user/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFirstname(data.user.firstname);
        setLastname(data.user.lastname);
        setEmail(data.user.email);
        setAdress(data.user.adress);
        setZipcode(data.user.zIPCode);
        setCity(data.user.city);
        setCountry(data.user.country);
        setPhone(data.user.phoneNumber);
        setRegion(data.user.region);
      }
    };
    fetchData();
  }, [id]);

  ///////////////////////////////
  // handelSubmit Update Data  //
  ///////////////////////////////

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password ? password : null,
      lastname: lastname,
      firstname: firstname,
      adress: adress,
      zipCode: zipCode,
      city: city,
      country: country,
      phone: phone,
      region: region,
    };
    const response = await fetch(`${localhost}/api/editUser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.status === 200) {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <>
      <Header></Header>
      <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
        {t("editUser.title")}
      </h1>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        {/* Firstname */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="firstname"
          id="firstname"
          placeholder={t("editProfil.firstname")}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        {/* Lastname */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="lastname"
          id="lastname"
          placeholder={t("editProfil.lastname")}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        {/* Email */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="email"
          name="email"
          id="email"
          placeholder={t("editProfil.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="password"
          name="password"
          id="password"
          placeholder={t("createUser.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Adress */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="adress"
          id="adress"
          placeholder={t("editProfil.adress")}
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />

        {/* ZipCode */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4  dark:bg-dark-mode-light-purple dark:text-gold"
          type="number"
          name="zipCode"
          id="zipCode"
          placeholder={t("editProfil.zip")}
          value={zipCode}
          onChange={(e) => setZipcode(e.target.value)}
        />

        {/* City */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="city"
          id="city"
          placeholder={t("editProfil.city")}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {/* Region */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="city"
          id="city"
          placeholder={t("editProfil.region")}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        {/* Country */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="country"
          id="country"
          placeholder={t("editProfil.country")}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {/* Phone Number */}

        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="phone"
          id="phone"
          placeholder={t("editProfil.phone")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          type="submit"
          id="submit"
          className="dark:bg-gold dark:text-white"
        >
          {t("editProfil.edit")}
        </button>
      </form>
      <Footer></Footer>
    </>
  );
}
