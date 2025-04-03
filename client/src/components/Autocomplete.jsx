import React, { useState, useContext, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../LanguageContext";

const Autocomplete = ({ autocompleteData, activeSuggestion, onClick }) => {
  const { language } = useContext(LanguageContext);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  useEffect(() => {
    setFilteredSuggestions(autocompleteData);
    setActiveSuggestionIndex(activeSuggestion);
  }, [autocompleteData, activeSuggestion]);

  let suggestionsListComponent;
  if (filteredSuggestions && filteredSuggestions.length > 0) {
    suggestionsListComponent = (
      <ul className="absolute border border-gold border-t-0 list-none mt-16 m-2 max-h-80 overflow-y-auto pl-0 w-full bg-grey rounded-md md:w-72">
        {filteredSuggestions.map((suggestion, index) => {
          let className = "p-4 flex items-center ";
          if (index === activeSuggestionIndex) {
            className +=
              "bg-light-purple bg-opacity-50 dark:bg-dark-mode-purple hover:text-black hover:cursor-pointer hover:font-bold"
          }

          return (
            <li
              className={`${className} border-b-2 border-gold last:border-gold`}
              key={index}
              onClick={onClick}
            >
              <img
                src={suggestion.images}
                alt={language === "FR" ? suggestion.name : suggestion.nameEn}
                className="w-10 h-10 mr-2 object-cover"
              />
              <div>
                <div className="font-bold text-gold font-primary text-lg">
                  {language === "FR" ? suggestion.name : suggestion.nameEn}
                </div>
                <div className="text-gold font-bold font-primary">
                  ${suggestion.price}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return <Fragment>{suggestionsListComponent}</Fragment>;
};

Autocomplete.propTypes = {
  autocompleteData: PropTypes.array.isRequired,
  activeSuggestion: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Autocomplete;
