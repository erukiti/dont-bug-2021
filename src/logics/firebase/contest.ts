import { getDatabase, ref, onValue, set } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { app } from ".";

const database = getDatabase(app);

export type UserStatus = {
  code: string;
  results: boolean[];
  updatedAt: Date;
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
  users: { [uid: string]: User };
};

const getContestRef = (contestId: string) =>
  ref(database, `contests/${contestId}`);

const getUserRef = (contestId: string, uid: string) =>
  ref(database, `contests/${contestId}/users/${uid}`);

export const useContest = (contestId: string) => {
  const [contest, setContest] = useState<Contest | undefined>();
  // contestId の assert
  const contestRef = getContestRef(contestId);
  useEffect(() => {
    onValue(contestRef, (snapshot) => {
      const data = snapshot.val();
      const examination = data.examination || "";
      const testCode = data.testCode || "";
      const users: Contest["users"] = {};
      Object.keys(data.users).forEach((uid) => {
        const user = data.users[uid];
        if (!user.displayName || !user.photoUrl || !user.uid || !user.status) {
          return;
        }
        if (
          typeof user.code !== "string" ||
          !(user.updatedAt instanceof Date) ||
          !Array.isArray(user.results)
        ) {
          return;
        }

        users[uid] = {
          displayName: user.displayName,
          photoUrl: user.photoUrl,
          uid: user.uid,
          status: {
            code: user.status.code,
            results: user.status.results,
            updatedAt: user.status.updatedAt,
          },
        };
      });

      setContest({ examination, testCode, users });
    });
  }, []);
  return contest;
};

export const useCreateContest = () => {
  return useCallback(async (contest: Contest) => {
    // Firebase になんかあったはず
    const contestId = Math.floor(Math.random() * 100000).toString();

    const contestRef = getContestRef(contestId);
    await set(contestRef, contest);
    return contestId;
  }, []);
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
