import React from "react";

function LoadingSpinner() {
   return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-white"></div>
    </div>
  );
}

export default LoadingSpinner;
