import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// local
import { app } from "../configs/firebaseConfig";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const signOut = () => auth.signOut().then(clear);

  // listen for Firebase user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setLoading(true);
        setAuthUser(user);
        setLoading(false);
      } else {
        // User is signed out
        setAuthUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
    /* eslint-disable no-alert, no-console */
  }, []);
  /* eslint-enable no-alert, no-console */

  return {
    authUser,
    loading,
    signOut,
  };
}
