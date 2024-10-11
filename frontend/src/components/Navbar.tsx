import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
        <p className="mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Stay
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onConfirm}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

interface NavbarProps {
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, username, onLogout }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    onLogout();
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 top-0 fixed w-full z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl cursor-pointer" onClick={() => navigate("/blogs")}>Medium</div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button 
                  className='w-auto px-5 py-2 h-auto bg-white text-gray-800 font-semibold rounded-md'
                  onClick={()=>navigate("/publish")}
                >
                  Publish a blog
                </button>
                <div 
                  className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer" 
                  onClick={() => navigate("/profile")}
                >
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {getInitials(username)}
                  </span>
                </div>
                <button 
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                  onClick={handleLogoutClick}
                  aria-label="Logout" 
                >
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <button 
                className='w-auto px-5 py-2 h-auto bg-white text-gray-800 font-semibold rounded-md'
                onClick={handleSignupClick}
              >
                Join now
              </button>
            )}
          </div>
        </div>
      </nav>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Navbar;