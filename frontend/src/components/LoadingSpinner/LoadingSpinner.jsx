import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-12 h-12 border-6 border-white/30 border-t-[#efe0dc] rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
