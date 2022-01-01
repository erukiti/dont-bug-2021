import { VFC } from "react";
import { useAuth } from "~/logics/auth";
import Logo from "~/dont-bug-2021.svg";
import { UserIcon } from "../UserIcon";
import { Link } from "react-location";

export const Header: VFC = () => {
  const year = new Date().getFullYear();

  const auth = useAuth();
  return (
    <div className="h-[80px] flex justify-between m-3 p-2">
      <div className="flex ">
        <Link to="/">
          <img src={Logo} className="w-full h-full" />
        </Link>
        {year > 2021 && (
          <span className="ml-1 text-lg text-[#cc711d]">+{year - 2021}</span>
        )}
      </div>
      <div className="flex items-center">
        {auth && <UserIcon src={auth.photoUrl} />}
      </div>
    </div>
  );
};
