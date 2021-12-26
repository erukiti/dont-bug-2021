import { VFC } from "react";
import { User } from "~/logics/firebase/contest";
import { Results } from "../Results";

type Props = {
  users?: User[];
};

export const Online: VFC<Props> = ({ users = [] }) => {
  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.uid}>
            <div>{user.displayName}</div>
            {user.photoUrl && (
              <img
                src={user.photoUrl}
                className="rounded-full w-[48px] h-[48px]"
              />
            )}
            <Results results={user.status.results} />
          </div>
        );
      })}
    </div>
  );
};
