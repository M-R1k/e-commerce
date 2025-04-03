import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, itemQty: action.payload.itemQty }
            : item
        );
      } else {
        return [...state, action.payload];
      }
    case "REMOVE_ITEM":
      if (localStorage.getItem("user")) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        const existingItem = state.find(
          (item) =>
            item.product.id === action.payload.product.id &&
            item.size === action.payload.size
        );
        return state.filter((item) => item !== existingItem);
      }
    case "UPDATE_ITEM":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    case "RESET_CART":
      return action.payload;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, [], () => {
    let localData = localStorage.getItem("cart");
    if (!localData) {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    }
    return JSON.parse(localData);
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
