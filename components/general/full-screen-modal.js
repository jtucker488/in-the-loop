const FullScreenModal = ({ onClose, children }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal container with equal margins */}
        <div className="relative bg-neutral-900 w-[93%] h-[95%] rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 text-2xl font-bold"
          >
            X
          </button>
          {/* Modal content */}
          <div className="p-8 h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  };
  
  export default FullScreenModal;