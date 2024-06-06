"use client";

import { useAuthContext } from "@/component/context/auth";

export default function Home() {
  const key1 = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const key2 = process.env.FIREBASE_API_KEY;
  console.log({ key1, key2 });

  const auth = useAuthContext();

  console.log(auth.user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>fast feedback</h1>
      <p>{auth.user?.email || "no-data"}</p>
      <button onClick={() => auth.signinWithGitHub()}>signin</button>
      {auth?.user && <button onClick={() => auth.signoutWithGitHub()}>signout</button>}
    </main>
  );
}
