import "~/styles/style.scss";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import UserContext from "lib/UserContext";
import { Database } from "@nozbe/watermelondb";
import { supabase } from "lib/Store";
import { databaseConfig } from "store/database";

const watermelonDb = new Database(databaseConfig);

export default function SupabaseSlackClone({ Component, pageProps }) {
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setUserLoaded(session ? true : false);
    if (user) {
      Router.push("/channels/[id]", "/channels/1");
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
        if (currentUser) {
          Router.push("/channels/[id]", "/channels/1");
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

    Router.push("/");
  };

  return (
    <UserContext.Provider
      value={{
        userLoaded,
        user,
        watermelonDb,
        signOut,
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
