import React, { useState, useEffect } from "react";
import DarkMode from "./DarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTranslation } from "react-i18next";

export default function Switch() {
  const [theme, setTheme] = DarkMode();
  const colorTheme = theme === "dark" ? "light" : "dark";
  const [darkMode, setDarkMode] = useState(colorTheme === 'dark');
  const { t } = useTranslation();

  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);

  const toggleDarkMode = (checked) => {
      setTheme(checked ? "dark" : "light");
      setDarkMode(checked);
  };

  return (
    <>
      <div className="flex justify-end items-center">
        <div className="space-y-4 flex py-2 px-4 dark:hover:bg-dark-purple hover:bg-dark-mode-purple hover:bg-opacity-50 rounded">
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="#ffc677"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-110 transition duration-300"
          />
          <span className="text-sm text-gold font-primary font-extrabold ml-2 hover:text-light-purple transition duration-300">
            {darkMode ? t("header.darkmode") : t("header.lightmode")}
          </span>
        </div>
      </div>
    </>
  );
}