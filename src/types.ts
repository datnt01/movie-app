export interface ITheme {
  title: string;
  icon: any;
}

export interface INavLink extends ITheme {
  path: string;
}

export interface IMovie {
  id: string;
  title: string;
  poster_path: string;
  original_title: string;
  name: string;
  overview: string;
  backdrop_path: string;
}
