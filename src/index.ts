import OpenCommand from "./commands/open";
import { PluginExport } from "../../../dist/lib";

const plugin: PluginExport = {
  name: "maro-plugin-tasks",
  commands: [
    {
      name: "task",
      description: "Track tasks asociated with TODOS",
      aliases: [],
      subcommands: [
        OpenCommand
      ]
    }
  ]
};

export default plugin;
