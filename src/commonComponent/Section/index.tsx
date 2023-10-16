import { memo, useState, useRef, useEffect, useMemo, FC } from "react";
import { Link } from "react-router-dom";

import { SkelatonLoader } from "../Loader";
import Error from "../Error";

import { useGetListMoviesQuery } from "../../services/TMDB";

import { getErrorMessage } from "../../utils/helper";
import "./styles.scss";
import { sectionNameAlias, sections } from "../../constants";
import { motion } from "framer-motion";
import MovieCard from "../MovieCard";

interface SectionProps {
  className?: string;
  sectionKey: keyof typeof sections;
  id?: number;
  showSimilarShows?: boolean;
}

const Section: FC<SectionProps> = ({ className, sectionKey }) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const {
    data = { results: [] },
    isError,
    error,
    isLoading,
  } = useGetListMoviesQuery(
    {
      type: sections[sectionKey],
      page: 1,
    },
    {
      skip: !isInView,
    }
  );

  useEffect(() => {
    const observerHandler = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      setIsInView(true);
      observer.unobserve(entry.target);
    };

    const observer = new IntersectionObserver(observerHandler, {
      root: null,
      rootMargin: "580px",
      threshold: 0.1,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const errorMessage = useMemo(
    () => (isError ? getErrorMessage(error) : ""),
    [error, isError]
  );

  return (
    <section className={`section ${className}`} ref={ref}>
      <div className="section__header">
        <h3 className="section__header__title">
          <span>{sectionNameAlias[sectionKey]}</span>
          <div className="line" />
        </h3>

        <Link
          to={`/movie?type=${sections[sectionKey]}`}
          className="section__header__link"
        >
          View all
        </Link>
      </div>
      <div className="section__body" ref={sliderRef}>
        {isLoading ? (
          <SkelatonLoader className="section__skeleton" />
        ) : isError ? (
          <Error error={String(errorMessage)} />
        ) : (
          <motion.div
            drag="x"
            dragConstraints={sliderRef}
            animate="show"
            className="section__slide"
          >
            {data.results.slice(0, 12).map((movie: any) => {
              return (
                <div key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default memo(Section);
