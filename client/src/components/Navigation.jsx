import React, { useState } from "react";
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, personCircleOutline, cartOutline, moonOutline, languageOutline } from 'ionicons/icons';

const Navigation = () => {
  const Menus = [
    { name: "Home", icon: homeOutline, dis: "translate-x-0" },
    { name: "Profile", icon: personOutline, dis: "translate-x-16" },
    { name: "Admin", icon: personCircleOutline, dis: "translate-x-32" },
    { name: "Cart", icon: cartOutline, dis: "translate-x-48" },
    { name: "Dark Mode", icon: moonOutline, dis: "translate-x-64" },
    { name: "Languages", icon: languageOutline, dis: "translate-x-80" },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="h-auto flex justify-center items-center bg-light-purple bg-opacity-20 max-h-[4.4rem] px-6 rounded-t-xl w-full overflow-x-auto">
      <ul className="flex relative flex-wrap">
        <span
          className={`bg-light-purple duration-500 ${Menus[active].dis} border-4 border-grey h-16 w-16 absolute
          -top-5 rounded-full`}
        >
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
            rounded-tr-[11px] shadow-myShadow1"
          ></span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
            rounded-tl-[11px] shadow-myShadow2"
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
            <a
              className="flex flex-col text-center pt-6"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-xl cursor-pointer duration-500 font-primary ${
                  i === active && "-mt-6 text-white"
                }`}
              >
                <IonIcon icon={menu.icon} />
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-4 duration-700 opacity-100"
                    : "opacity-0 translate-y-10"
                } `}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;