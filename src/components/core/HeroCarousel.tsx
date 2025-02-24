import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";
import { useEffect, useState, useRef } from "react";
import MediaService from "@/server/media";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { ApiResponse, MediaList } from "@/types";
import { isMovie } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_DELAY = 4000;

export default function HeroCarousel() {
  const [slides, setSlides] = useState<MediaList | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "movie",
        "Popular"
      );

      if (response.status === 200 && response.data?.results) {
        setSlides(response.data);
      }
    };

    fetchMedia();
  }, []);

  return (
    slides && (
      <div className="relative w-full">
        {/* Custom Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background/80 p-2 rounded-full"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background/80 p-2 rounded-full"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </Button>

        <SwiperComponent
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          pagination={true}
          navigation={false} // Disable default navigation
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          className="mySwiper !pb-4"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.on("autoplayTimeLeft", (_, timeLeft, progressRatio) => {
              setProgress((1 - progressRatio) * 100);
            });
            swiper.on("slideChange", () => {
              setActiveIndex(swiper.realIndex);
              setProgress(0);
            });
          }}
        >
          {slides?.results.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              className="!max-w-xl !w-full aspect-video relative group shadow-xl shadow-primary/10"
            >
              <Link
                to={
                  isMovie(slide)
                    ? `/movie/${slide.id}/details`
                    : `/tv/${slide.id}/details`
                }
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
                    className="w-full h-full object-cover"
                  />
                  {index === activeIndex && (
                    <div className="absolute top-0 left-0 w-full h-1">
                      <div
                        className="h-full bg-secondary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Overlay for Title */}
                  <div className="absolute top-0 w-full bg-gradient-to-t from-transparent to-background/60 p-2 z-40 ">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-lg font-bold text-secondary-foreground group-hover:underline"
                    >
                      {isMovie(slide) ? slide.title : slide.name}
                    </Button>
                  </div>

                  {/* Hover Overlay for Overview */}
                  <div className="absolute -bottom-2 flex items-center justify-center bg-gradient-to-t from-background/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-32">
                    <p className="text-white text-sm text-center line-clamp-3">
                      {slide.overview}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </SwiperComponent>
      </div>
    )
  );
}
