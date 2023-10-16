import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TMDB_API_BASE_URL } from "../utils/config";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_API_BASE_URL,
    prepareHeaders(headers, api) {
      const token = process.env.REACT_APP_ACCESS_TOKEN;
      headers.set("authorization", `Bearer ${token}`);
    },
  }),

  endpoints: (builder) => ({
    getListMovies: builder.query({
      query: ({
        type,
        searchQuery,
        page,
      }: {
        type: string;
        searchQuery?: string;
        page: number;
      }) => {
        if (searchQuery) {
          return `search/movie?query=${searchQuery}`;
        } else {
          return `movie/${type}?${page}`;
        }
      },
    }),
    getMovieInfo: builder.query({
      query: ({ infoType, movieId }: { infoType?: string; movieId: number }) => {
        if(infoType){
          return `movie/${movieId}/${infoType}`;
        }else{
          return`movie/${movieId}`
        }
      },
    }),
  }),
});

export const { useGetListMoviesQuery, useGetMovieInfoQuery } = tmdbApi;
