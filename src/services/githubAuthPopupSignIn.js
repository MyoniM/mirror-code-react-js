import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { githubAuthProvider } from "./githubAuthProvider";
// local
import { app } from "../configs/firebaseConfig";

const auth = getAuth(app);
export const oAuth = async () => {
  try {
    const result = await signInWithPopup(auth, githubAuthProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    return token;
  } catch (_) {}
};
