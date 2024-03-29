import { getDatabase, ref, onValue, set, get } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { app } from ".";
import { useAuth } from "../auth";
import { ContestResultType, CONTEST_RESULT_TYPES } from "../contest";

const database = getDatabase(app);

export type UserStatus = {
  code: string;
  resultType: ContestResultType;
  // updatedAt: Date;
};

export type User = {
  displayName: string;
  photoUrl: string;
  uid: string;
  status: UserStatus;
};

export type Contest = {
  examination: string;
  testCode: string;
};

export type ContestUsers = { [uid: string]: User };

const getContestRef = (contestId: string) =>
  ref(database, `contests/${contestId}`);

const getContestUsersRef = (contestId: string) =>
  ref(database, `contest-users/${contestId}`);

const getUserRef = (contestId: string, uid: string) =>
  ref(database, `contest-users/${contestId}/${uid}`);

export const useContest = (contestId: string) => {
  const [contest, setContest] = useState<Contest | undefined>();
  const [contestUsers, setContestUsers] = useState<ContestUsers | undefined>();

  // contestId の assert
  const contestRef = useMemo(() => getContestRef(contestId), [contestId]);
  const contestUsersRef = useMemo(
    () => getContestUsersRef(contestId),
    [contestId]
  );

  useEffect(() => {
    onValue(
      contestRef,
      (snapshot) => {
        const data = snapshot.val();
        const examination = data.examination || "";
        const testCode = data.testCode || "";
        setContest({ examination, testCode });
      },
      (err) => {
        console.error(err);
      }
    );
  }, [contestRef]);

  useEffect(() => {
    onValue(contestUsersRef, (snapshot) => {
      const data = snapshot.val();
      const users: ContestUsers = {};
      if (!data) {
        return;
      }

      Object.keys(data).forEach((uid) => {
        const user = data[uid];

        if (!user.displayName || !user.photoUrl || !user.uid || !user.status) {
          return;
        }

        if (
          typeof user.status.code !== "string" ||
          // !(user.status.updatedAt instanceof Date) ||
          !CONTEST_RESULT_TYPES.includes(user.status.resultType)
        ) {
          return;
        }

        users[uid] = {
          displayName: user.displayName,
          photoUrl: user.photoUrl,
          uid: user.uid,
          status: {
            code: user.status.code,
            resultType: user.status.resultType,
            // updatedAt: user.status.updatedAt,
          },
        };
      });

      setContestUsers(users);
    });
  }, [contestUsersRef]);

  return [contest, contestUsers] as const;
};

const RANDOM_STRING =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const createContestId = () => {
  return Array(16)
    .fill("")
    .map((_) => RANDOM_STRING[Math.floor(Math.random() * RANDOM_STRING.length)])
    .join("");
};

export const useCreateContest = () => {
  const auth = useAuth();
  return useCallback(
    async (contest: Contest) => {
      // FIXME: [a-zA-Z0-9]{10}あたりで乱数生成した方がよさそう
      const contestId = createContestId();

      const contestRef = getContestRef(contestId);
      await set(contestRef, { ...contest, uid: auth.uid });
      return contestId;
    },
    [auth]
  );
};

export const useUpdateContest = (contestId: string) => {
  return useCallback((contest: Contest) => {
    const contestRef = getContestRef(contestId);
    set(contestRef, contest);
  }, []);
};

export const useUpdateUserStatus = () => {
  return useCallback((contestId: string, uid: string, user: User) => {
    const userRef = getUserRef(contestId, uid);
    set(userRef, user);
  }, []);
};
