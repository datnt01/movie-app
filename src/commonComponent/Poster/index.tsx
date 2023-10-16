import { memo } from "react";

import Image from "../Image";
import './styles.scss'

interface PosterPropsType {
  posterPath: string;
  title: string;
  className?: string;
}

const Poster = ({ posterPath, title, className }: PosterPropsType) => {
  return (
    <div
      className={`${className} poster`}
    >
      <Image
        width={254}
        height={380}
        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt={title}
        className="poster__img"
        zoomInEffect={true}
      />
    </div>
  );
};

export default memo(Poster);