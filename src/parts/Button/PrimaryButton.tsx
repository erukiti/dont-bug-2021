import { VFC } from "react";

type Props = {
  children?: string | string[] | JSX.Element | JSX.Element[];
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border-2 px-4 py-1 text-lg border-[#cc711d] text-[#cc711d] rounded-lg hover:bg-[#cc711d] hover:text-gray-100 hover:cursor-pointer duration-100"
    >
      {children}
    </button>
  );
};
