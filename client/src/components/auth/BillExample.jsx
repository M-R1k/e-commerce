// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import lotus from "../../assets/lotus.svg";
import { usePDF } from "react-to-pdf";
import moment from "moment";
// const ref = React.createRef();

export default function BillExample(props) {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const params = useLocation();
  const email = params.state.email;
  const products = JSON.parse(params.state.products);
  const shippingAmount = params.state.shippingAmount;
  const lastUpdate = params.state.lastUpdate;
  const array = [shippingAmount];

  products.map((elem) => {
    array.push(elem[1] * elem[2]);
  });

  const total = array.reduce(
    (previousValue, currentValue, index) => previousValue + currentValue,
    0
  );

  return (
    <>
      <div ref={targetRef} className="mx-20	p-10">
        <div>
          <img
            src={lotus}
            className="w-20 h-20"
            alt="Logo de G.A.M.A.Z.A. Co"
          />
          <h1 className="text-gold font-primary font-extrabold text-xl md:text-3xl lg:text-2xl xl:text-3xl">
            G.A.M.A.Z.A. Co
          </h1>
          <br></br>
        </div>
        <div className="flex justify-between">
          <div className="font-primary font-bold">
            <p>74 Avenue de Gamaza</p>
            <p>94270 G.A.M.A.Z.A City</p>
            <p>France</p>
            <p>gamaza@gamaza.com</p>
          </div>
          <div className="font-primary font-bold">
            <h3>Facturer à </h3>
            <p>{email}</p>
          </div>
        </div>

        <div className="font-primary font-bold">
          <div className="border border-gold w-4/4 mt-8"></div>
          <br></br>
          <h3>
            Commande effectué le : {moment(lastUpdate).format("DD MMM, YYYY")}
          </h3>
          <br></br>
          {products &&
            products.map((elem) => (
              <ul>
                <li>Nom : {elem[0]}</li>
                <li>Prix : {elem[1] * elem[2]}</li>
                <li>Quantité : {elem[2]}</li>
                <br></br>
              </ul>
            ))}
          <p>Frais de livraison : {shippingAmount}€</p>
          <p>Total : {total}€</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gold text-white font-secondary rounded-md p-2"
          onClick={() => toPDF()}
        >
          Download PDF
        </button>
      </div>
    </>
  );
}
