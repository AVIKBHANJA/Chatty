import { Check, Checks } from "@phosphor-icons/react";
import React from "react";
import Waveform from "../Waveform";

export default function Voice({ incoming, author, timestamp, audioUrl }) {
  return incoming ? (
    <div className="flex items-start space-x-2 max-w-[80%]">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
          {author?.charAt(0)?.toUpperCase()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          {author}
        </p>
        <div className="inline-block rounded-2xl rounded-tl-md bg-gray-100 dark:bg-gray-700 px-3 py-2">
          <Waveform incoming={incoming} audioUrl={audioUrl} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-start justify-end space-x-2 max-w-[80%] ml-auto">
      <div className="flex-1 min-w-0 flex flex-col items-end">
        <div className="inline-block rounded-2xl rounded-tr-md bg-blue-500 px-3 py-2">
          <Waveform incoming={incoming} audioUrl={audioUrl} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  );
}
