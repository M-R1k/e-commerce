import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import localhost from "../../config";
import { LanguageContext } from "../../LanguageContext";
import { useTranslation } from "react-i18next";

export default function Review(data) {
  const [reviews, setReviews] = useState([]);
  const [note, setNote] = useState(0);
  const [id, setId] = useState("");
  const stars = [1, 2, 3, 4, 5];
  const { t } = useTranslation();

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setReviews(data.data.reviews);
    setId(data.data.id);
  }, [data, language]);

  const date = (elem) => {
    const date = new Date(elem);
    return format(date, "dd-MM-yyyy HH:mm:ss", { locale: fr });
  };

  const handleSortNote = async () => {
    const response = await fetch(`${localhost}/api/filterReview/${note}`);
    if (response.ok) {
      const data = await response.json();
      setReviews(data.reviews);
    }
  };

  const handleSort = async (elem) => {
    if (elem !== "") {
      const response = await fetch(
        `${localhost}/api/reviewASCDESC/${elem}/${parseInt(id)}`
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      }
    }
  };

  return (
    <>
      <div className="m-4 p-4">
        <h2 className="font-primary font-bold text-2xl text-dark-purple dark:text-gold">{t("reviewPage.filter")}</h2>
        <select className="dark:bg-dark-mode-purple font-primary font-bold text-dark-purple dark:text-gold p-2 m-2 border-gold rounded-3xl"
          onChange={(e) => setNote(e.target.value)}
          onClick={handleSortNote}
        >
          <option className="text-xl font-primary text-dark-purple font-bold dark:text-gold" value={0}>0</option>
          {stars.map((elem) => (
            <option className="text-xl font-primary text-dark-purple font-bold dark:text-gold" value={elem}>
              {elem} 
              {t("reviewPage.stars")}
            </option>
          ))}
        </select>
        <select className="dark:bg-dark-mode-purple font-primary font-bold text-xl text-dark-purple dark:text-gold rounded-3xl border-gold border p-2" onClick={(e) => handleSort(e.target.value)}>
          <option ckassName="text-xl font-primary text-dark-purple font-bold dark:text-gold" value=""> {t("reviewPage.date")}</option>
          <option ckassName="text-xl font-primary text-dark-purple dark:text-gold" value="desc">{t("reviewPage.desc")}</option>
          <option ckassName="text-xl font-primary text-dark-purple font-bold dark:text-gold" value="acs">{t("reviewPage.asc")}</option>
        </select>
      </div>
      {reviews.length > 0 &&
        reviews.map((elem) => (
          <ul className="mb-4 dark:text-gold text-dark-purple font-primary font-bold text-xl border m-8 border-gold p-4 rounded-lg shadow-gold shadow-md">
            <li>
              {elem.stars} {t("reviewPage.stars")}
            </li>
            <li>{elem.user.email}</li>
            <li>{date(elem.publication)}</li>
            <li>{elem.description}</li>
          </ul>
        ))}
    </>
  );
}
