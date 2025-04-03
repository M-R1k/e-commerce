import React, { useEffect, useState } from "react";
import localhost from "../../config";
import { useTranslation } from "react-i18next";

export default function Carousel() {
    const [trending, setTrending] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayCarousel, setDisplayCarousel] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        getTrendingProducts();
    }, []);

    const getTrendingProducts = async () => {
        const response = await fetch(`${localhost}/api/getStats/trending`);
        const data = await response.json();

        const trending_data = [];
        data.forEach((obj) => {
            obj.forEach((product) => {
                let data = {
                    image: JSON.parse(product[0].images),
                    id: product[0].id,
                };
                trending_data.push(data);
            });
        });

        setTrending(trending_data);
    };

    const previousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? trending.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === trending.length - 1 ? 0 : prevIndex + 1));
    };

    const getActiveImages = (index) => {
        const lastIndex = trending.length - 1;
        const prevIndex = index === 0 ? lastIndex : index - 1;
        const nextIndex = index === lastIndex ? 0 : index + 1;
        return [trending[prevIndex], trending[index], trending[nextIndex]];
    }

    const activeImages = getActiveImages(currentIndex);

    function canRender() {
        if (activeImages && activeImages[0] && activeImages[1] && activeImages[2])
            setDisplayCarousel(true);
        else
            return false;
    }

    useEffect(() => {
        canRender();
    }, [activeImages]);
    return (
        <div className="space-y-4 flex flex-col items-center justify-center m-24">
            {/* <div className="relative w-full max-w-4xl mx-auto p-4"> */}
            <h1 className="text-gold font-bold text-3xl md:text-5xl font-primary m-8 text-center">
                {t('common.translated-text')}
            </h1>
            <div className="relative items-center w-full overflow-hidden">
                <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
                    onClick={previousSlide}>
                    ❮
                </button>
                {/* <div className="flex items-center w-full overflow-hidden"> */}
                <div className="flex items-center w-10/12 transition-transform duration-500 ease-in-out mx-auto">
                    {displayCarousel &&
                        <>
                            <img
                                className="w-1/3 h-auto border-grey border-4 rounded-2xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 mx-2"
                                key={activeImages[0].id}
                                src={activeImages[0].image}
                                alt={`Image ${activeImages[0].id}`}
                            />

                            <a href={`/product/${activeImages[1].id}`}
                                className='z-10'
                                style={{ transform: 'scale(1.25)' }}
                            // className="w-1/3 h-auto border-gray-300 border-4 rounded-2xl shadow-lg transition-transform duration-500 ease-in-out transform scale-110 hover:scale-125 mx-2 z-10"
                            >
                                <img className='border-grey border-4 rounded-2xl shadow-lg'
                                    key={activeImages[1].id}
                                    src={activeImages[1].image}
                                    alt={`Image ${activeImages[1].id}`}
                                />
                            </a>
                            <img
                                className="w-1/3 h-auto border-grey border-4 rounded-2xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 mx-2"
                                key={activeImages[2].id}
                                src={activeImages[2].image}
                                alt={`Image ${activeImages[2].id}`}
                            />
                        </>
                    }
                </div>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    // className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
                    onClick={nextSlide}>
                    ❯
                </button>
            </div>
        </div>
    );
};
