import { FC, useMemo } from "react";

import { Error, Image } from "../../../commonComponent";
import { useGetMovieInfoQuery } from "../../../services/TMDB";
import { SkelatonLoader } from "../../../commonComponent";
import { getErrorMessage } from "../../../utils/helper";
import { movieInfoType } from "../../../constants";

interface CastsProps {
  movieId: number
}

const Casts: FC<CastsProps> = ({ movieId }) => {

  const { data: credits, isLoading, isError, error ,isFetching} = useGetMovieInfoQuery({ movieId, infoType: movieInfoType.CREDITS })
  const errorMessage = useMemo(
    () => (isError ? getErrorMessage(error) : ""),
    [error, isError]
  );
  return (
    <div
      className="cast-container"
    >
      {(!isFetching && !isLoading) && credits.cast.slice(0, 4).map((cast: any) => {
        const { id, profile_path: profilePath, name } = cast;
        return (
          <div
            // variants={fadeDown}
            key={id}
            className="flex flex-col justify-start gap-2"
          >
            <div className="md:h-[96px] md:w-[64px] h-[54px] w-[40px]">
              {
                isLoading ? (<SkelatonLoader />) : isError ? (<Error
                  error={String(errorMessage)}
                  className="xs:h-[250px] h-[216px] text-[18px]"
                />) : <Image
                  width={window.innerWidth >= 768 ? 64 : 40}
                  height={window.innerWidth >= 768 ? 96 : 54}
                  src={`https://image.tmdb.org/t/p/original/${profilePath}`}
                  alt={name}
                  className=" object-cover rounded-md shadow-md transition-all duration-300"
                />
              }

            </div>

            <h4 className="cast-name">
              {name}
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default Casts