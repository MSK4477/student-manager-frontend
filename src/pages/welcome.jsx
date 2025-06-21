import React from 'react';

const Welcome = () => {
    const navigateToHome = () => {
        window.location.href = "/dashboard";
    };

    let data = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="h-screen max-sm:text-sm flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold max-sm:text-sm mb-4">
                Welcome to My inventory app{' '}
                <span className="text-blue-600">{data?.name}</span>!
            </h1>
            <p className="text-lg mb-8  max-sm:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-7 xl:leading-10">
                Here you can manage your inventory and keep track of your products.
            </p>
            <button
                onClick={navigateToHome}
                className="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
                Get started
            </button>
        </div>
    );
};

export default Welcome;
