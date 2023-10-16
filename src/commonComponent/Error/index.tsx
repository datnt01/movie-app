import { memo } from "react";
import { BiError } from "react-icons/bi";
import './styles.scss'
import { Link } from "react-router-dom";

interface ErrorProps {
  className?: string | undefined;
  error: string;
}

const Error = memo(({ className = "h-screen", error }: ErrorProps) => {
  return (
    <div
      className={`error-wrapper ${className} `}
    >
        <div>
          <BiError className="icon-error" />
        </div>
        <p className=" text-error">{error}</p>
        <Link to={'/'}>Go Home</Link>
    </div>
  );
});

export default Error;