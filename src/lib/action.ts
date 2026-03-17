import { Action, ActionRegistry, loading, MrCreateEvent } from "@maro/maro";

import { TaskTracker } from "./tracker";
import { getTasksFromDir } from "./utils";

export class CreateMissingTasksAction implements Action {
  tracker: TaskTracker;

  constructor(tracker: TaskTracker) {
    this.tracker = tracker;
  }

  register(): void {
    ActionRegistry.on(MrCreateEvent, (event) => this.execute(event));
  }

  @loading("Generating missing issues")
  async execute(event: MrCreateEvent) {
    const repo = event.ctx;
    const tasks = getTasksFromDir(repo.dir);

    await Promise.all(
      tasks.map(async (t) => {
        if (this.tracker.isTracked(t)) return;
        await this.tracker.track(t);
        await repo.add(t.file_location.file);
      }));
    await repo.commit("fix: add issues");
  }

}

