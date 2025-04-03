import { useEffect, useState, useContext, useTransition } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";
import { useTranslation } from "react-i18next";

export default function StoneProduct(data) {
  const [stone, setStone] = useState([]);
  const { language } = useContext(LanguageContext);
  const{ t } = useTranslation();

  useEffect(() => {
    setStone(data.data);
  }, [data, language]);


  return (
    <div className="flex flex-row justify-evenly">
      {stone.length > 0 && 
        stone.map((elem) => {
          if(elem.stone !== null) {
            return (
            <div className="flex flex-col">
              <p>
              {language === "FR" ? elem.stone.name : elem.stone.nameEn}
              </p>
            <img
              className={`w-24 h-24 cursor-pointer border-2 object-contain bg-white rounded-lg border-grey`}
              src={elem.stone.image}
              alt={elem.image} />
            </div>
            )
          }
        }
        )}
    </div>
  );
}