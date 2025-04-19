import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Electric Vehicle Population Dashboard
        </h1>
        <p className="text-blue-100 mt-2">
          Interactive analysis of EV adoption patterns and trends
        </p>
      </div>
    </header>
  );
};

export default Header;