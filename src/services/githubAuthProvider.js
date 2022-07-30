import { GithubAuthProvider } from "firebase/auth";

export const githubAuthProvider = new GithubAuthProvider();

githubAuthProvider.addScope("gist");
githubAuthProvider.setCustomParameters({ allow_signup: "false" });
