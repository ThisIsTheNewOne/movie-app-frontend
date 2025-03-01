import { robotoCondensed } from "../../../ui/fonts";

interface CastProps {
  cast: string;
}

export default function Cast({ cast }: CastProps) {

  if (!cast) return null;

  return (
    <li>
      <span className={robotoCondensed.className}>
        <strong>Cast: </strong>
      </span>
      {cast}
    </li>
  );
}