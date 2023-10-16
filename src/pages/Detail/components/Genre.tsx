import { memo } from "react";

const Genre = ({ name }: { name: string }) => {
  return (
    <span
      className='genre-item'
    >
      {name}
    </span>
  );
}; 

export default memo(Genre);