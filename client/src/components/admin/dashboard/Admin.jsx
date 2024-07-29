import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";
import NavBarAdmin from "../../utils/navbarAdmin";
import { useTranslation } from "react-i18next";

export default function Admin() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  ////////////////
  //  UseState  //
  ////////////////

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("");

  /////////////////////////////////////////
  //  Fetch Categories, Products, Users  //
  /////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      const language = localStorage.getItem("language");
      setLanguage(language);

      const response = await fetch(`${localhost}/api/products`);

      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.allArticle);
      }

      const response_users = await fetch(`${localhost}/api/users`);

      if (response_users.status === 200) {
        const data_users = await response_users.json();
        setUsers(data_users.allUsers);
      }

      const response_category = await fetch(
        `${localhost}/api/categorie/${language}`
      );

      if (response.status === 200) {
        const data_category = await response_category.json();
        setCategory(data_category.allCategory);
      }
    };
    fetchData();
    setRefresh(false);
  }, [refresh]);

  ////////////////////////////////
  //  Delete & Update Products  //
  ////////////////////////////////

  const deleteProduct = async (id) => {
    const response = await fetch(`${localhost}/api/delete/${id}`);

    const data = await response.json();

    if (data.success) {
      setRefresh(true);
    }
  };

  const editProduct = async (id) => {
    navigate(`/editProduct/${id}`, { replace: true });
  };

  ////////////////////////////////
  //  Delete & Update Users     //
  ////////////////////////////////

  const deleteUser = async (id) => {
    const response = await fetch(`${localhost}/api/deleteUser/${id}`);
    const data = await response.json();
    if (data.success) {
      setRefresh(true);
    }
  };

  const editUser = async (id) => {
    navigate(`/editAdminUser/${id}`, { replace: true });
  };

  const setAdmin = async (id) => {
    const response = await fetch(`${localhost}/api/setAdmin/${id}`);
    if (response.ok) {
      setRefresh(true);
    }
  };

  const setUser = async (id) => {
    const response = await fetch(`${localhost}/api/setUser/${id}`);
    if (response.ok) {
      // const data = await response.json();
      // console.log(data);
      setRefresh(true);
    }
  };

  ////////////////////////////////
  //  Delete & Update Category  //
  ////////////////////////////////

  const deleteCategory = async (id) => {
    const response = await fetch(`${localhost}/api/delete/category/${id}`);
    const data = await response.json();
    if (data.success) {
      setRefresh(true);
    }
  };

  const editCategory = async (id) => {
    navigate(`/editCategory/${id}`, { replace: true });
  };

  const addPromo = () => {
    navigate(`/addPromo`, { replace: true });
  };
  return (
    <>
      <Header></Header>
      <div className="mr-24	ml-24	">
        <NavBarAdmin></NavBarAdmin>
        <div className="border	border-grey	w-2/4	"></div>
        <br></br>

        {/* //////////////////////// */}
        {/* // Navigate to a CRUD // */}
        {/* //////////////////////// */}

        <div className="flex flex-col	">
          <Link to={`/createArticle`} className="w-max">
            {t("adminPage.product")}
          </Link>
          <Link to={`/createCategory`} className="w-max">
            {t("adminPage.category")}
          </Link>
          <Link to={`/createUser`} className="w-max">
            {t("adminPage.user")}
          </Link>
          <button
            className="rounded-lg bg-light-purple p-2.5 mt-2"
            onClick={() => addPromo()}
          >
            Promotion
          </button>
          <br></br>
        </div>

        <div className="flex justify-between	">
          {/* ////////////////// */}
          {/* // Manage users // */}
          {/* ////////////////// */}

          <div className="flex flex-col w-full	">
            <h2 className="text-gold">{t("adminPage.manageUser")}</h2>
            {users.length > 0 &&
              users.map((elem) => (
                <ul className="m-2.5	border-2 rounded-2xl p-2.5	bg-gray-200	">
                  <div>
                    <li>
                      {t("adminPage.FullName")}{" "}
                      {elem.firstname ? elem.firstname : t("adminPage.error")}
                    </li>
                    <li>
                      {t("editProfil.email")} : {elem.email}
                    </li>
                    <li>{t("editProfil.password")} : *******</li>
                    <li>
                      {t("editProfil.adress")}{" "}
                      {elem.adress ? elem.adress : t("adminPage.error")}
                    </li>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <li>
                      <button onClick={() => editUser(elem.id)}>
                        {t("editProfil.edit")}
                      </button>
                    </li>
                    {!elem.roles.includes("ROLE_ADMIN") ? (
                      <li>
                        <button onClick={() => setAdmin(elem.id)}>
                          {t("adminPage.Badmin")}
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button onClick={() => setUser(elem.id)}>
                          {t("adminPage.Buser")}
                        </button>
                      </li>
                    )}
                    <li>
                      <button onClick={() => deleteUser(elem.id)}>
                        {t("editProfil.delete")}
                      </button>
                    </li>
                  </div>
                </ul>
              ))}
          </div>

          {/* ///////////////////////////// */}
          {/* // Manage Produts/Articles // */}
          {/* ///////////////////////////// */}

          <div className="flex flex-col w-full	">
            <h2 className="text-gold">{t("adminPage.manageProduct")}</h2>
            {products.length > 0 &&
              products.map((elem) => (
                <ul className="m-2.5	border-2  rounded-2xl p-2.5	bg-gray-200	">
                  <div>
                    <li>
                      {t("adminPage.title")}{" "}
                      {language === "FR" ? elem.name : elem.nameEn}
                    </li>
                    <li>
                      {t("adminPage.size")} {elem.sizes.name}
                    </li>
                    <li>
                      {t("adminPage.color")}{" "}
                      {language === "FR" ? elem.color : elem.colorEn}
                    </li>
                    <li>
                      {t("adminPage.price")} ${elem.price}
                    </li>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <li>
                      <button onClick={() => editProduct(elem.id)}>
                        {t("editProfil.edit")}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => deleteProduct(elem.id)}>
                        {t("editProfil.delete")}
                      </button>
                    </li>
                  </div>
                </ul>
              ))}
          </div>
        </div>
      </div>

      {/* ///////////////////////////// */}
      {/* // Manage Category         // */}
      {/* ///////////////////////////// */}

      <div className="flex flex-col w-full	">
        <h2 className="text-gold">{t("adminPage.manageCategory")}</h2>
        {category.length > 0 &&
          category.map((elem) => (
            <ul className="m-2.5	border-2  rounded-2xl p-2.5	bg-gray-200	">
              <div>
                <li>
                  {t("adminPage.title")}{" "}
                  {language === "FR" ? elem.name : elem.nameEn}
                </li>
              </div>
              <div style={{ textAlign: "end" }}>
                <li>
                  <button onClick={() => editCategory(elem.id)}>
                    {t("editProfil.edit")}
                  </button>
                </li>
                <li>
                  <button onClick={() => deleteCategory(elem.id)}>
                    {t("editProfil.delete")}
                  </button>
                </li>
              </div>
            </ul>
          ))}
      </div>

      <Footer></Footer>
    </>
  );
}
