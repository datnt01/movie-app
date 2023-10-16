import { useGetListMoviesQuery } from "../../services/TMDB";

import { Loader, Error, Section } from "../../commonComponent";
import { Hero } from "./components";
import './styles.scss'

import { sections } from "../../constants";
type TSectionKey = keyof typeof sections
const Home = () => {
  const { data, isLoading, isError } = useGetListMoviesQuery({
    type: sections.NOW_PLAY,
    page: 1,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Unable to fetch the movies! " />;
  }

  const popularMovies = data?.results.slice(0, 5);

  return (
    <>
      <Hero movies={popularMovies} />
      <div className='home-container'>
        {Object.keys(sections).map((sectionKey, index) => (
          <Section sectionKey={sectionKey as TSectionKey} key={index} />
        ))}
      </div>
    </>
  );
};

export default Home;