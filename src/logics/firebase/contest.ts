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
  ref(database, `${getContestRef(contestId)}/users/${uid}`);

export const useContest = (contestId: string) => {
  const [contest, setContest] = useState<Contest | undefined>();
  // contestId の assert
  const contestRef = getContestRef(contestId);
  useEffect(() => {
    onValue(contestRef, (snapshot) => {
      setContest(snapshot.val());
    });
  }, []);
  return contest;
};

export const useCreateContest = () => {
  return useCallback(async (contest: Contest) => {
    // Firebase になんかあったはず
    const contestId = Math.floor(Math.random() * 100000).toString();

    const contestRef = getContestRef(contestId);
    console.log(contestId);
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
