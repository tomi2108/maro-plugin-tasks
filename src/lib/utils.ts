import { Dir, TextFile } from "@maro/maro";

import { Task } from "./task";

export const getTasksFromDir = (dir: Dir) => {
  const files = dir.traverse();
  const tasks: Task[] = [];
  for (const f of files) tasks.push(...getTasksFromFile(dir, f));
  return tasks;
};

export const getTasksFromFile = (project: Dir, fileInDir: TextFile) => {
  const lines = fileInDir.read().split(/\r?\n/);
  const results: Task[] = [];
  const regex = /TODO.*:\s*(.*)/g;
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row]!;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const col = match.index;
      const title = match[1]?.trim() ?? "";
      const file_location = { file: fileInDir, row: row + 1, col: col + 1 };
      // TODO: Task.description from file
      results.push(new Task({ title, project, file_location }));
    }
  }
  return results;
};

