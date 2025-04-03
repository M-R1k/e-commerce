import React, { useState } from 'react';

export default function PromoCodeInput({ onApply }) {
    const [inputPromo, setInputPromo] = useState(false);
    const [tryCode, setTryCode] = useState('');

    const handleSearch = async (event) => {
        if (event.key === 'Enter') {
            onApply(tryCode);
        }
    };

    return (
        <div className="flex flex-col flex-wrap justify-between my-4">
            <h3 className="font-primary text-2xl font-bold text-center">
                Promo Code&nbsp;
            </h3>
            <button
                className="m-2 p-2 font-primary bg-gold border font-bold text-md text-white rounded-lg hover:bg-light-purple transition duration-300 dark:hover:bg-dark-mode-light-purple underline"                 
                onClick={() => setInputPromo(true)}
                >
                Add
            </button>
            
            {inputPromo && (
                <div className='flex justify-center flex-col'>
                <input
                    type="text"
                    className='bg-light-purple-20 border-2 rounded-md p-2 m-2 border-gold dark:bg-dark-mode-purple bg-white text-dark-purple font-bold dark:text-gold font-secondary'
                    onChange={(e) => setTryCode(e.target.value)}
                    onKeyDown={handleSearch}
                />
                </div>
            )}
        </div>
    );
}