import React from 'react';
import bgImage from '../assets/event.jpg';

const BackgroundLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Optional overlay */}
      <div className="bg-black bg-opacity-30 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;


