import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex flex-row items-center space-x-3 max-w-fit bg-gray dark:bg-boxdark-2 p-4 rounded-xl rounded-tl-none">
      <div className="text-md text-body dark:text-white">Typing</div>

      <div class="ticontainer">
        <div className="flex items-center h-[17px]">
          <div class="tidot"></div>
          <div class="tidot"></div>
          <div class="tidot"></div>
        </div>
      </div>
    </div>
  );
}
