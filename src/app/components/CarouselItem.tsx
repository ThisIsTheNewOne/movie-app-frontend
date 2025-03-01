/* eslint-disable @typescript-eslint/no-unused-vars */
import MovieImage from "./MovieImage";
import MovieDescription from "./MovieDescription";

type Props = { poster: string; title: string; description: string };

export default function CarouselItem({ poster, title, description }: Props) {
  return (
    <div>
      {/* <MovieImage src={poster} /> */}
      <MovieDescription title={title} description={description} />
    </div>
  );
}