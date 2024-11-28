import { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "サンプル",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 11, 25),
    notes: "",
  },
  {
    id: uuid(),
    name: "サンプル",
    isDone: false,
    priority: 3,
    deadline: null, // このTodoには期限を設定しない
    notes: "ここは備考欄です",
  },
  {
    id: uuid(),
    name: "サンプル",
    isDone: true,
    priority: 5,
    deadline: null,
    notes: "タスクが終わったら、☑を入れましょう",
  },
  {
    id: uuid(),
    name: "サンプル",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 7, 31, 8, 59),
    notes: "期限を過ぎると、赤く表示されます",
  },
];
