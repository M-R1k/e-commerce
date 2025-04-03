import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import localhost from "../../config";
import { useNavigate } from "react-router-dom";

export default function ManageCommand() {
  const { t } = useTranslation();
  const [command, setCommand] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [bills, setBills] = useState([]);
  let navigate = useNavigate();

  // const [commandStatus, setCommandStatus] = useState("");

  const updateStatus = async (elem, status) => {
    const formData = {
      tracking_id: elem.id,
      status: status,
    };

    const response = await fetch(`${localhost}/api/setStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      const data = await response.json();
      setCommand(data.command);
    }
  };

  const fetchBill = async () => {
    const user = localStorage.getItem("user");
    const response = await fetch(`${localhost}/api/bills/${user}`);
    if (response.ok) {
      const data = await response.json();
      setBills(data.bills);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      const response = await fetch(`${localhost}/api/UserCommand/${user}`);

      if (response.ok) {
        const data = await response.json();
        setCommand(data.command);
        data.command.forEach(async (elem) => {
          if (elem.status === "PRE_TRANSIT") {
            setTimeout(() => {
              updateStatus(elem, "TRANSIT");

              setTimeout(() => {
                updateStatus(elem, "DELIVERED");
              }, 10000);
            }, 10000);
          }
        });
      }
    };

    fetchData();
    fetchBill();
  }, []);

  const showBill = (elem) => {
    navigate("/billExample", {
      state: {
        email: elem.email,
        products: JSON.stringify(elem.products),
        shippingAmount: elem.shippingAmount,
        lastUpdate: elem.lastUpdate,
      },
    });
  };

  return (
    <>
      <div className="overflow-auto h-80">
        {command ? (
          command.map((elem) => (
            <ul className=" bg-white dark:bg-dark-mode-light-purple text-gold border m-2.5 rounded-2xl p-2.5">
              <li key={elem.id}>
                <h3>
                  {t("commandManage.order")} : {elem.number}
                </h3>
              </li>
              <li>Status : {elem.status}</li>
            </ul>
          ))
        ) : (
          <p>test</p>
        )}
      </div>

      <div className="overflow-auto h-80">
        {bills &&
          bills.map((elem) => (
            <ul className=" bg-white dark:bg-dark-mode-light-purple text-gold border m-2.5 rounded-2xl p-2.5">
              <li key={elem.id}>
                <h3>
                  {t("commandManage.order")} : {elem.trackingNumber}
                </h3>
                <button onClick={() => showBill(elem)}>
                  Visualiser le facture
                </button>
              </li>
            </ul>
          ))}
      </div>
    </>
  );
}
