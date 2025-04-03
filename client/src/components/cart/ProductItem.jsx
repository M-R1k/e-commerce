import React from 'react';
import Delete from '../../assets/delete.svg';
import Save4later from '../../assets/save4later.svg';
import { useTranslation } from "react-i18next";

export default function ProductItem({ item, onDelete, onSaveForLater, onQtyChange }) {
    const { t } = useTranslation();  
    return (
        <div className="flex flex-col m-8">
            <div className="flex">
                <img
                      className="w-1/3 h-1/3 rounded-lg border-white-purple border-4 shadow-lg dark:shadow-gold"
                      src={`${item.product.images[0]}`}
                    alt={item.product.name}
                />
                <div className="flex flex-col m-4 items-center">
                <h3 className="font-primary text-gold font-bold text-center items-center text-3xl">
                        {item.product.name}
                    
                    <span className="font-bold p-4 font-secondary text-3xl text-light-purple text-right dark:text-white">
                        {item.product.promotion.id !== 1 ? (
                            <>
                                <h2 className="line-through">
                                    ${item.product.price * item.itemQty}&nbsp;
                                </h2>
                                <h2>
                                    $
                                    {item.product.price * item.itemQty -
                                        (
                                            item.product.price *
                                            item.itemQty *
                                            ((item.product.promotion.id !== 1
                                                ? item.product.promotion.pourcentage
                                                : 0) /
                                                100)
                                        ).toFixed()}
                                </h2>
                            </>
                        ) : (
                            <h2>{item.product.price * item.itemQty}€</h2>
                        )}
                    </span>
                    </h3>
                    <span className="font-secondary text-dark-purple dark:text-white flex flex-row p-4 font-bold text-2xl text-left">
                        {t("cartPage.productSize")}&nbsp;
                        <h2 className='font-primary text-dark-purple dark:text-white'>{item.size}</h2>
                    </span>
                    <span className="font-secondary text-dark-purple dark:text-white flex flex-row p-4 font-bold text-2xl">
                    {t("cartPage.productMaterial")}:&nbsp;
                        <h2 className='font-primary text-dark-purple dark:text-white'>{item.product.material.name}</h2>
                    </span>
                    {item.product.stone && (
                    <span className="font-secondary text-dark-purple dark:text-white flex flex-row p-4 font-bold text-2xl">
                            {t("cartPage.productStone")}&nbsp;
                            <h2 className='font-primary text-dark-purple dark:text-white'>{item.product.stone.name}</h2>
                        </span>
                    )}
                    <span className="font-secondary text-dark-purple dark:text-white flex flex-row p-4 items-center font-bold text-2xl">
                    {t("cartPage.productQuantity")}
                    :&nbsp;
                        <input
                            className="border-2 border-grey p-2 m-2 rounded-3xl dark:border-gold dark:bg-dark-mode-purple text-dark-purple dark:text-white"
                            type="number"
                            min={0}
                            max={item.product.stockQty}
                            defaultValue={item.itemQty}
                            onChange={(e) =>
                                onQtyChange({
                                    ...item,
                                    itemQty: Number(e.target.value),
                                })
                            }
                        />
                    </span>
                </div>
            </div>
            {/* <div className="border border-gold"/> */}
            <div>
            {/* <div className="border border-gold"/> */}
                <div className="flex justify-around text-2xl p-2 mt-6">
                    <div>
                        <button className="flex font-primary font-bold text-gold" 
                        onClick={() => onDelete(item)}>
                            <img className="mr-4 text-gold" src={Delete} alt="" />
                            {t("cartPage.productDelete")}
                        </button>
                    </div>
                    {localStorage.getItem('user') && (
                        <div>
                            <button className="flex font-primary font-bold text-gold" onClick={() => onSaveForLater(item)}>
                                <img className="mr-4" src={Save4later} alt="" />
                                {t("cartPage.productSave")}
                            </button>
                        </div>
                    )}
                </div>
            <div className="border border-gold"/>
            </div>
        </div>
    );
}