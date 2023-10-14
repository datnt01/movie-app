import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetListMoviesQuery } from "../../services/TMDB";

import { MovieCard, SkelatonLoader } from "../../commonComponent";
import './styles.scss'


const Catalog = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<any[]>([]);
  const [query] = useSearchParams();

  const type = query.get("type") || "popular";
  const searchQuery = query.get("search") || "";

  const { data, isLoading, isFetching ,isSuccess} = useGetListMoviesQuery({ page, searchQuery, type });

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (isLoading || isFetching) return;

    if (data?.results) {
      if (page > 1) {
        setShows((prev: any) => [...prev, ...data.results]);
      } else {
        setShows([...data.results]);
      }
    }
  }, [data, isFetching, isLoading, page]);

  return (
    <>
      <div className="title">{`${searchQuery? `Result for " ${searchQuery}"` : 'Movies'}`}</div>
      <section >
        {isLoading  ? (
          <SkelatonLoader isMoviesSliderLoader={false}  className="catalog-skeleton"/>
        ) : (
          <div className="catalog" >
            {shows?.map((movie: any, index) => (
              <div
                key={index}
                className="catalog__movie"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )} 

        {isSuccess && shows.length>0 && (
          <div className="catalog-footer">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={isFetching}
              className="catalog-footer__button"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Catalog;