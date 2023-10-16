import { FC } from "react";

import MovieCard from "../MovieCard";
import { IMovie } from "../../types";
import { motion } from "framer-motion";

interface MoviesSlidesProps {
  movies: IMovie[];

}

const MoviesSlides: FC<MoviesSlidesProps> = ({ movies }) => {
  return (
    <motion.div className=" dragSlide" drag='x'>
      {movies.map((movie: any) => {
        return (
          <div
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </div>
        );
      })}
    </motion.div>
  )
};

export default MoviesSlides;