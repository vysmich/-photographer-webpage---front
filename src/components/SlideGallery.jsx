import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";

const SlideGallery = ({ data }) => {
  const optionsSRL = {
    settings: {
      overlayColor: "rgba(0 0 0 / 0.97)",
      hideControlsAfter: 3000,
    },
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showThumbnailsButton: false,
    },
    caption: {
      showCaption: false,
    },
  };
  const optionsSplide = {
    type: "loop",
    height: "250px",
    perPage: 4,
    perMove: 1,
    cover: true,
    gap: 20,
    autoplay: true,
    interval: 3000,
    rewindSpeed: 3000,

    breakpoints: {
      1200: {
        perPage: 3,
      },
      992: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  };
  return (
    <SimpleReactLightbox>
      <SRLWrapper options={optionsSRL}>
        <h2 className="mt-16 mb-6 text-center">
          {data.PriceListBestPhoto.title}
        </h2>
        <Splide aria-label="My Favorite Images" options={optionsSplide}>
          {data.PriceListBestPhoto.gallery.data.map((photo) => (
            <SplideSlide>
              <a
                href={`http://localhost:1337${photo.attributes.url}`}
                className="inline-block h-full w-full"
              >
                <img
                  src={`http://localhost:1337${photo.attributes.url}`}
                  alt={photo.attributes.alternativeText}
                  className="h-full w-full object-cover"
                />
              </a>
            </SplideSlide>
          ))}
        </Splide>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
};

export default SlideGallery;
