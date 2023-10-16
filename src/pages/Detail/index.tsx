import { useState } from "react";
import { useParams } from "react-router-dom";

import { Poster, Loader, Error, Section } from "../../commonComponent";
import { Casts, Videos, Genre } from "./components";

import { useGetMovieInfoQuery } from "../../services/TMDB";
import "./styles.scss";

const Detail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Boolean>(false);

  const {
    data: movie,
    isLoading,
    isFetching,
    isError,
  } = useGetMovieInfoQuery({
    movieId: Number(id),
  });

  const toggleShow = () => setShow((prev) => !prev);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Something went wrong!" />;
  }

  const { title, poster_path: posterPath, overview, name, genres } = movie;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${posterPath}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    width: "100%",
  };

  return (
    <>
      <section style={backgroundStyle}>
        <div className="container">
          <Poster title={title} posterPath={posterPath} />
          <div className="info">
            <h2 className={`md:max-w-[420px]`}>{title || name}</h2>

            <ul className="info__genre">
              {genres &&
                genres.map((genre: { name: string; id: number }) => {
                  return <Genre key={genre.id} name={genre.name} />;
                })}
            </ul>

            <p>
              <span>
                {overview.length > 280
                  ? `${show ? overview : `${overview.slice(0, 280)}...`}`
                  : overview}
              </span>
              <button
                type="button"
                className={`${
                  overview.length > 280 ? "inline-block" : "hidden"
                } `}
                onClick={toggleShow}
              >
                {!show ? "show more" : "show less"}
              </button>
            </p>

            <h3 className="text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]">
              Top Casts
            </h3>

            <Casts movieId={Number(id)} />
          </div>
        </div>
      </section>

      {/* <Videos videos={videos.results} /> */}

      {/* <Section
                // className={`${maxWidth}`}
                id={Number(id)}
                showSimilarShows
            /> */}
    </>
  );
};

export default Detail;
