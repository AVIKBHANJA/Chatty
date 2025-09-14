import { DownloadSimple, File } from "@phosphor-icons/react";
import React from "react";
import truncateString from "../../utils/truncate";

export default function Document({
  incoming,
  author,
  timestamp,
  content,
  documentFile,
}) {
  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = documentFile.url;
    link.target = "_blank";
    link.download = documentFile.name || "documentFile";
    link.click();
  };

  return incoming ? (
    <div className="flex items-start space-x-2 max-w-[80%]">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
          {author?.charAt(0)?.toUpperCase()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 capitalize">
          {author}
        </p>
        <div className="inline-block rounded-2xl rounded-tl-md bg-gray-100 dark:bg-gray-700 px-3 py-2 space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <File size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {truncateString(documentFile?.name)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {documentFile?.size}MB
                </div>
              </div>
            </div>
            <button
              onClick={handleDownloadClick}
              className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <DownloadSimple size={16} />
            </button>
          </div>
          {content && (
            <p className="text-gray-900 dark:text-white text-sm">{content}</p>
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
        <div className="inline-block rounded-2xl rounded-tr-md bg-blue-500 px-3 py-2 space-y-2">
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/20 text-white">
                <File size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {truncateString(documentFile?.name)}
                </div>
                <div className="text-xs text-white/80">
                  {documentFile?.size}MB
                </div>
              </div>
            </div>
            <button
              onClick={handleDownloadClick}
              className="p-1 text-white/80 hover:text-white"
            >
              <DownloadSimple size={16} />
            </button>
          </div>
          {content && <p className="text-white text-sm">{content}</p>}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  );
}
