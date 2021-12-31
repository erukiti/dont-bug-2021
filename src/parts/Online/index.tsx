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
              <div>{user.status.resultType}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
