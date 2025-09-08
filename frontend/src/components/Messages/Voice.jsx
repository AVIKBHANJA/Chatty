import { Check, Checks } from "@phosphor-icons/react";
import React from "react";
import Waveform from "../Waveform";

export default function Voice({ incoming, timestamp, audioUrl }) {
  return incoming ? (
    <div className="max-w-125">
      {/* <div className="mb-2.5 rounded-2xl rounded-tl-none px-5 py-3 dark:bg-boxdark-2"></div> */}
      {/* Waveform */}
      <Waveform incoming={incoming} audioUrl={audioUrl} />
      <p className="text-xs">{timestamp}</p>
    </div>
  ) : (
    <div className="ml-auto max-w-125">
      <div className="mb-2.5 rounded-2xl rounded-br-none px-5 py-3">
        {/* Waveform */}
        <Waveform incoming={incoming} audioUrl={audioUrl} />
      </div>

      <div className="flex flex-row items-center justify-end space-x-2">
        <p className="text-xs text-right">{timestamp}</p>
      </div>
    </div>
  );
}
