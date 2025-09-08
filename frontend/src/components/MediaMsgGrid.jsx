import { DownloadSimple } from "@phosphor-icons/react";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";

export default function MediaMsgGrid({ media, incoming }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const renderMedia = () => {
    if (media?.length === 1) {
      return (
        <div className="col-span-2 row-span-2 relative rounded-2xl">
          <MediaItem media={media[0]} index={0} openLightbox={openLightbox} />
        </div>
      );
    } else if (media?.length === 2) {
      return media.map((item, index) => (
        <div
          key={item._id}
          className="col-span-1 row-span-2 relative rounded-2xl"
        >
          <MediaItem media={item} index={index} openLightbox={openLightbox} />
        </div>
      ));
    } else if (media?.length === 3) {
      return media.slice(0, 3).map((item, index) => (
        <div
          key={item._id}
          className="col-span-1 row-span-1 relative rounded-2xl"
        >
          <MediaItem media={item} index={index} openLightbox={openLightbox} />
        </div>
      ));
    } else {
      return (
        <>
          {media?.slice(0, 3).map((item, index) => (
            <div
              key={item._id}
              className="col-span-1 row-span-1 relative rounded-2xl"
            >
              <MediaItem
                media={item}
                index={index}
                openLightbox={openLightbox}
              />
            </div>
          ))}
          <div
            onClick={() => openLightbox(3)}
            className="relative rounded-2xl bg-body/50 flex flex-row items-center justify-center text-xl text-white font-semibold cursor-pointer"
          >
            <div>+{media?.length - 3}</div>
          </div>
        </>
      );
    }
  };

  return (
    <div
      className={`grid grid-cols-2 grid-rows-2 pt-4 pb-2 gap-3 rounded-2xl rounded-tl-none ${
        incoming ? "bg-gray dark:bg-boxdark-2" : "bg-transparent"
      }`}
    >
      {renderMedia()}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          plugins={[Video]}
          close={() => setLightboxOpen(false)}
          index={currentIndex}
          slides={media.map((item) => ({
            type: item.type === "video" ? "video" : "image",
            src: item.url,
            sources:
              item.type === "video"
                ? [
                    {
                      src: item.url,
                      type: "video/mp4", // Adjust format as needed
                    },
                  ]
                : undefined,
          }))}
        />
      )}
    </div>
  );
}

function MediaItem({ media, index, openLightbox }) {
  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = media.url;
    link.target = "_blank";
    link.download = "media" + Date.now();
    link.click();
  };
  return (
    <>
      {media.type === "video" ? (
        <video
          src={media.url}
          className="h-full w-full max-h-36 rounded-lg object-cover"
          controls={false}
          autoPlay={false}
          onClick={() => openLightbox(index)}
        />
      ) : (
        <img
          src={media.url}
          className="h-full w-full max-h-36 rounded-lg object-cover"
          onClick={() => openLightbox(index)}
        />
      )}
      <button
        onClick={handleDownloadClick}
        className="absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-80 hover:cursor-pointer hover:text-black dark:hover:text-white"
      >
        <DownloadSimple size={20} />
      </button>
    </>
  );
}
