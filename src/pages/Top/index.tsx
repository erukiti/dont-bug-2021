import { VFC } from "react";
import { useAuth } from "~/logics/auth";
import { Link } from "react-location";
import { login } from "~/logics/firebase/auth";

export const UnauthorizedTop: VFC = () => {
  const auth = useAuth();

  if (!auth.uid) {
    return (
      <div>
        <button onClick={login} className="border-2 p-2 bg-cyan-500 rounded-lg">
          ログイン
        </button>
      </div>
    );
  }
  return <></>;
};

export const Top: VFC = () => {
  return (
    <div>
      <ul className="mx-10 mt-10">
        <li>
          <Link to="/create" className="text-blue-500 hover:cursor-pointer">
            問題作成
          </Link>
        </li>
      </ul>
    </div>
  );
};
