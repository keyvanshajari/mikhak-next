import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { useWindowSize } from "@/common/hooks/resize-window";

const button_styles =
  " absolute top-1/2 transform -translate-y-1/2 bg-neutral-5-light bg-opacity-60 text-white text-2xl p-2 rounded-lg z-10 ";

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [widthWindow, _] = useWindowSize();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.offsetWidth);
    }
  }, [carouselRef.current]);

  const aspectRatio = (): number => (widthWindow < 500 ? 8 : 4);

  return (
    <div
      className="w-full max-w-[1920px] h-fit inline-flex items-center relative"
      ref={carouselRef}
    >
      <div
        className="w-full bg-neutral-2-light max-w-[1920px] rounded-xl overflow-clip relative
        min-h-[200px]"
        style={
          width === 0
            ? { aspectRatio: "4/1" }
            : {
                height: `${(width / aspectRatio()).toFixed(0)}px`,
                maxHeight: `${(width / aspectRatio()).toFixed(0)}px`,
              }
        }
      >
        <button id="swiper-prev" className={button_styles + " left-4  "}>
          <FiChevronLeft />
        </button>
        <button id="swiper-next" className={button_styles + " right-4"}>
          <FiChevronRight />
        </button>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={true}
          pagination={{
            clickable: true,
          }}
          keyboard={{
            enabled: true,
          }}
          navigation={{
            prevEl: "#swiper-prev",
            nextEl: "#swiper-next",
          }}
          modules={[Pagination, Navigation, Keyboard]}
          className="w-full h-full"
        >
          {[
            {
              src: "https://cdn.jabama.com/image/jabama-images/1297502/9729533f-96cd-475c-8a5b-4c7f427e34f9.jpg",
              cta: "",
              alt: "slide1",
            },
            {
              src: "https://fastly.picsum.photos/id/694/1000/400.jpg?hmac=saoSLasf_f7lhOBFIQttX06prODAdQIkDwWxPXYv6p0",
              cta: "",
              alt: "slide2",
            },
          ].map((item, index) => (
            <SwiperSlide key={"slide" + index}>
              <Link href={item.cta} className="w-full h-full object-cover">
                <img alt={item.alt} className="w-full h-full object-cover" src={item.src} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
