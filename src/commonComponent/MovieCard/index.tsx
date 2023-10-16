import { memo } from "react";
import { Link } from "react-router-dom";

import Image from "../Image";
import { IMovie } from "../../types";
import './styles.scss'

const MovieCard = ({
  movie,
}: {
  movie: IMovie;
}) => {
  const { poster_path, original_title: title, name, id } = movie;
  return (
    <>
      <Link
        to={`/movie/${id}`}
        className="card-container"
      >
        <Image
          height={window.innerWidth > 380 ? 250 : 216}
          width={170}
          className="card-container__img pointer-none"
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={movie.original_title}
          zoomInEffect
        />
      </Link>

      <h4 className="card-container__title ">
        {(title?.length > 50 ? title.split(":")[0] : title) || name}
      </h4>
    </>
  );
};

export default memo(MovieCard, (prevProps, newProps) => {
  return prevProps.movie.id === newProps.movie.id;
});