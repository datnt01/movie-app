import { memo, FC } from "react";
import './styles.scss'


interface SkelatonLoaderProps {
  className?: string;
  isMoviesSliderLoader?: boolean;
}

export const SkelatonLoader: FC<SkelatonLoaderProps> = memo(
  ({ className, isMoviesSliderLoader = true }) => {
    const arrSize = isMoviesSliderLoader
      ? Math.floor(window.innerWidth / 170) 
      : 10;
    console.log(className,arrSize);
    
    return (
        <div className={`${className}`}>
          {Array.from({ length: arrSize }).map((_item, index) => {
            return (
              <div
                key={index}
                className={`${!isMoviesSliderLoader ? "mb-6 skeleton" : "skeleton"}`}
              >
              </div>
            );
          })}
        </div>
    );
  }
);

export const Loader = memo(() => {
  return (
    <div className="preload">
      <div className="circle" />
    </div>
  );
});