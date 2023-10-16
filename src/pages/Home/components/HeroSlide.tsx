import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../../context/globalContext";

import { Poster } from "../../../commonComponent";

import { IMovie } from "../../../types";

const HeroSlide = ({ movie }: { movie: IMovie }) => {
  const { getTrailerId, toggleModal } = useGlobalContext();
  const navigate = useNavigate();

  const {
    overview,
    original_title: title,
    poster_path: posterPath,
    id,
  } = movie;

  const showTrailer = () => {
    getTrailerId(id);
    toggleModal();
  };

  const handleWatchNow = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="content">
      <div className="content__info">
        <h2 className="content__info__title">{title}</h2>
        <p className="content_info__text">
          {overview.length > 180 ? `${overview.slice(0, 180)}...` : overview}
        </p>
          <button
            type="button"
            name="watch-now"
            className='content__info__button'
            onClick={handleWatchNow}
          >
            Watch now
          </button>
      </div>

      <Poster title={title} posterPath={posterPath} className="mr-auto" />
    </div>
  );
};

export default memo(HeroSlide);
