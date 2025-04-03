import { useEffect, useState } from "react";

export default function DarkMode() {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        const removeHydratedClass = () => {
            root.classList.remove("hydrated");
        }
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        localStorage.setItem("theme", theme);
        // localStorage.setItem("colorTheme", colorTheme);
        removeHydratedClass();

        window.addEventListener('load', removeHydratedClass);
        return () => window.removeEventListener('load', removeHydratedClass);
        
    }, [theme, colorTheme]);

    return [theme, setTheme];
}   