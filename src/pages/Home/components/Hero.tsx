import HeroSlide from "./HeroSlide";
import { IMovie } from "../../../types";

import { useEffect, useState } from "react";

const Hero = ({ movies }: { movies: IMovie[] }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const lastSlideId = movies.length - 1;
  const delayTime = 5000;
  const autoNextSlide = () => {
    setCurrentSlide((prevSlideId) => {
      if (prevSlideId === lastSlideId) {
        return 0;
      }
      return prevSlideId + 1;
    });
  };
  useEffect(() => {
    const slideInterval = setInterval(autoNextSlide, delayTime);
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <div className="slider">
      {movies.map((movie, idx) => {
        return (
          <div
            key={movie.id}
            className={`${currentSlide === idx ? "slide current" : "slide"}`}
          >
            {currentSlide === idx && (
              <>
                <div
                  style={{
                    backgroundImage: `
                  linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}'`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className="slide__img"
                />
                <HeroSlide movie={movie} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Hero;
