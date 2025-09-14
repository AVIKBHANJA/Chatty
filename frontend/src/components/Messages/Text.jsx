import React from "react";
import extractLinks from "../../utils/extractLinks";
import Microlink from "@microlink/react";

export default function Text({ incoming, author, timestamp, content }) {
  const { links, originalString } = extractLinks(content, incoming);

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
        <div className="inline-block rounded-2xl rounded-tl-md bg-gray-100 dark:bg-gray-700 px-4 py-2 space-y-2">
          <p
            className="text-gray-900 dark:text-white text-sm break-words"
            dangerouslySetInnerHTML={{ __html: originalString }}
          ></p>
          {links.length > 0 && (
            <Microlink style={{ width: "100%" }} url={links[0]} />
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-start justify-end space-x-2 max-w-[80%] ml-auto">
      <div className="flex-1 min-w-0 flex flex-col items-end">
        <div className="inline-block rounded-2xl rounded-tr-md bg-blue-500 px-4 py-2 space-y-2">
          <p
            className="text-white text-sm break-words"
            dangerouslySetInnerHTML={{ __html: originalString }}
          ></p>
          {links.length > 0 && (
            <Microlink style={{ width: "100%" }} url={links[0]} />
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  );
}
