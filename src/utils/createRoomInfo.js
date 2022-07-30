import cuid from "cuid";
import { Octokit } from "@octokit/core";

export const createRoomInfo = async () => {
  const octokit = new Octokit({
    auth: `token ${localStorage.getItem("O2")}`,
  });
  try {
    const result = await octokit.request("GET /user", {});
    if (result.status === 200) {
      return {
        success: true,
        username: result.data.login,
        room: cuid(),
      };
    }
    return { success: false, username: null, room: null };
  } catch (error) {
    return { success: false, username: null, room: null };
  }
};
