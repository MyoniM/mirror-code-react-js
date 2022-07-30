import { Octokit } from "@octokit/core";

export const saveGist = async ({ language, document, gistName, gistDescription, saveAsPrivate }) => {
  const octokit = new Octokit({
    auth: `token ${localStorage.getItem("O2")}`,
  });
  try {
    await octokit.request("POST /gists", {
      description: gistDescription,
      public: !saveAsPrivate,
      files: {
        [`${gistName}.${language}`]: {
          content: document,
        },
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
