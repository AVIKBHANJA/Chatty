import React from "react";

export default function Giphy({ incoming, author, timestamp, content, giphy }) {
  return incoming ? (
    <div className="max-w-100 w-fit">
      <p className="mb-2.5 text-sm font-medium">{author}</p>
      <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 space-y-2">
        <img src={giphy} className="w-full mt-3" />
        <p>{content}</p>
      </div>
      <p className="text-xs">{timestamp}</p>
    </div>
  ) : (
    <div className="max-w-100 ml-auto w-fit">
      <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3 space-y-2">
        <img src={giphy} className="w-full mt-3" />
        <p className="text-white">{content}</p>
      </div>

      <div className="flex flex-row items-center justify-end space-x-2">
        <p className="text-xs">{timestamp}</p>
      </div>
    </div>
  );
}
