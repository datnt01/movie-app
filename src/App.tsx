import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Error,
  Header,
  // ScrollToTop,
  Loader,
} from "./commonComponent";

import "react-loading-skeleton/dist/skeleton.css";
// import "swiper/css";
// import Cursor from "./styles/cursor/Cursor";

const Catalog = lazy(() => import("./pages/Catalog"));
const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <>
      {/* <div>
        <Cursor />
      </div> */}
      <Error error="abc"/>
      {/* <Header /> */}
      <main className="main">
        {/* <ScrollToTop> */}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<Detail />} />
              <Route path="/movie" element={<Catalog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        {/* </ScrollToTop> */}
      </main>
    </>
  );
};

export default App;