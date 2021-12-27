import { VFC } from "react";

type Props = {
  src: string;
  alt?: string;
};

export const UserIcon: VFC<Props> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="rounded-full w-[48px] h-[48px]" />;
};
