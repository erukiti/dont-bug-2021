import { VFC } from "react";
import { User } from "~/logics/firebase/contest";
import { UserIcon } from "~/parts/UserIcon";

type Props = {
  users?: User[];
};

export const Online: VFC<Props> = ({ users = [] }) => {
  return (
    <div>
      <div>{users.length} users online.</div>
      <div>
        {users.map((user) => {
          return (
            <div className="flex gap-2 mt-2 items-center" key={user.uid}>
              <UserIcon src={user.photoUrl} alt={user.displayName} />
              <div>
                {user.status.results.filter((v) => v).length}
                <span className="px-1">/</span>
                {user.status.results.length}
              </div>
              <div>{user.status.code.split("\n").length}lines.</div>
              <div>{user.status.code.length}bytes.</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
