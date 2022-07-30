import { Octokit } from "@octokit/core";

export const getGists = async () => {
  const octokit = new Octokit({
    auth: `token ${localStorage.getItem("O2")!}`,
  });
  try {
    const result = await octokit.request("GET /gists", {});
    if (result.status == 200) return { success: true, gists: result.data };
    return { success: false };
  } catch (error) {
    return { success: false };
  }
};
