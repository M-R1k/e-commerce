import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/profile');
    onClose();
  };

  const handleCartRedirect = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      <div className="bg-white-purple dark:bg-dark-mode-purple p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLoginRedirect}
            className="bg-gold hover:bg-light-purple text-white-purple font-medium p-2 rounded-3xl transition duration-200"
          >
            Se connecter
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleCartRedirect}
            className="bg-light-purple hover:bg-gold text-white-purple font-medium p-2 rounded-3xl transition duration-200"
          >
            Continuer la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
