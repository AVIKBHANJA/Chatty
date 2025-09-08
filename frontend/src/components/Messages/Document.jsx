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
    <div className="max-w-125 w-fit">
      <p className="mb-2.5 text-sm font-medium capitalize">{author}</p>
      <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 space-y-2">
        <div className="flex flex-row items-center justify-between p-2 bg-gray-3 rounded-md dark:bg-boxdark">
          <div className="flex flex-row items-center space-x-3">
            <div className="p-2 rounded-md bg-primary/80 text-white">
              <File size={20} />
            </div>
            <div className="flex flex-col">
              <div>{truncateString(documentFile?.name)}</div>
              <div className="text-sm font-medium">{documentFile?.size}MB</div>
            </div>
          </div>

          <button onClick={handleDownloadClick} className="pl-5">
            <DownloadSimple />
          </button>
        </div>

        <p>{content}</p>
      </div>
      <p className="text-xs">{timestamp}</p>
    </div>
  ) : (
    <div className="max-w-125 w-fit ml-auto">
      <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3 text-white space-y-2">
        <div className="flex flex-row items-center justify-between p-2 bg-white rounded-md text-primary">
          <div className="flex flex-row items-center space-x-3">
            <div className="p-2 rounded-md bg-primary/20 text-primary">
              <File size={20} />
            </div>
            <div className="flex flex-col">
              <div>{truncateString(documentFile?.name)}</div>
              <div className="text-sm font-medium">{documentFile?.size}MB</div>
            </div>
          </div>

          <button onClick={handleDownloadClick} className="pl-5">
            <DownloadSimple />
          </button>
        </div>

        <p>{content}</p>
      </div>
      <div className="flex flex-row items-center justify-end space-x-2">
        <p className="text-xs text-right">{timestamp}</p>
      </div>
    </div>
  );
}
