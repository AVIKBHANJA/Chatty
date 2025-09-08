import { Check, Checks } from "@phosphor-icons/react";
import React from "react";
import MediaMsgGrid from "../MediaMsgGrid";

export default function Media({ incoming, author, timestamp, media, caption }) {
  console.log(media, "media to be rendered");
  return incoming ? (
    <div className="max-w-125">
      <p className="mb-2.5 text-sm font-medium">{author}</p>
      <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 space-y-2">
        {/* Media Msg Grid */}
        <MediaMsgGrid incoming={incoming} media={media} />
        <p>{caption}</p>
      </div>
      <p className="text-xs">{timestamp}</p>
    </div>
  ) : (
    <div className="max-w-125 ml-auto">
      <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3 space-y-2">
        {/* Media Msg Grid */}
        <MediaMsgGrid incoming={incoming} media={media} />
        <p className="text-white">{caption}</p>
      </div>
      <div className="flex flex-row items-center justify-end space-x-2">
        <p className="text-xs">{timestamp}</p>
      </div>
    </div>
  );
}
