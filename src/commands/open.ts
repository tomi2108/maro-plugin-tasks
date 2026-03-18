import { Command } from "@maro/maro";

import { getTasksFromDir } from "../lib/utils";

const OpenCommand: Command = {
  name: "open",
  description: "Open task from cwd in editor",
  run: async ({ ctx }) => {
    const tasks = getTasksFromDir(ctx.cwd);
    const task = await ctx.ui.promptChoice(tasks, { message: "Choose task to open" });
    task.openInEditor();
  }
};

export default OpenCommand;

