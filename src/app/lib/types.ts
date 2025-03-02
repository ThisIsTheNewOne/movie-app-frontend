export interface Movie {
    highlighted: boolean;
    rating: number | null;
    poster: string;
    cast: string;
    thumbnail: string;
    description: string;
    id: string;
    genre: string;
    availableDate: string;
    title: string;
  }

  export interface Genre {
    id: string;
    name: string;
  }