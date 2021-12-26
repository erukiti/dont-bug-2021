import { VFC } from "react";
import { useAuth } from "~/logics/auth";
import { Link } from "react-location";
import { login } from "~/logics/firebase/auth";

export const Top: VFC = () => {
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

  return (
    <div>
      <div>
        <div>{auth.displayName}</div>
        {auth.photoUrl && <img src={auth.photoUrl} />}
      </div>

      <ul>
        <li>
          <Link to="/create">作成</Link>
        </li>
      </ul>
    </div>
  );
};
