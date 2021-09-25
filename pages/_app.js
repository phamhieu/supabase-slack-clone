import "~/styles/style.scss";
import React, { useState, useEffect } from "react";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { useRouter } from "next/router";
import UserContext from "lib/UserContext";
import { Database } from "@nozbe/watermelondb";
import { supabase } from "lib/Store";
import { databaseConfig } from "store/database";

const watermelonDb = new Database(databaseConfig);

export default function SupabaseSlackClone({ Component, pageProps }) {
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setUserLoaded(session ? true : false);
    if (user && !router.pathname.includes("/channels")) {
      router.push("/channels");
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
        if (currentUser && !router.pathname.includes("/channels")) {
          router.push("/channels");
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();

    try {
      // reset db on logout
      await watermelonDb.write(() => watermelonDb.unsafeResetDatabase());
    } catch (e) {
      console.log(e);
    }

    router.push("/");
  };

  return (
    <DatabaseProvider database={watermelonDb}>
      <UserContext.Provider
        value={{
          userLoaded,
          user,
          signOut,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    </DatabaseProvider>
  );
}
