import { VFC } from "react";
import { useAuth } from "~/logics/auth";
import Logo from "~/dont-bug-2021.svg";
import { UserIcon } from "../UserIcon";

export const Header: VFC = () => {
  const auth = useAuth();
  return (
    <div className="h-[80px] flex justify-between p-2">
      <img src={Logo} />
      <div className="flex items-center">
        {auth && <UserIcon src={auth.photoUrl} />}
      </div>
    </div>
  );
};
