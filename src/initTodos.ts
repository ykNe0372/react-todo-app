import { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "課題1",
    isDone: true,
    priority: 1,
    deadline: null, // このTodoには期限を設定しない
    notes: "",
  },
  {
    id: uuid(),
    name: "課題2",
    isDone: false,
    priority: 4,
    deadline: new Date(2025, 1, 11),
    notes: "",
  },
  {
    id: uuid(),
    name: "課題3",
    isDone: false,
    priority: 2,
    deadline: new Date(2024, 11, 6, 8, 59),
    notes: "",
  },
  {
    id: uuid(),
    name: "課題4",
    isDone: true,
    priority: 5,
    deadline: new Date(2024, 11, 22, 8, 59),
    notes: "教科書が必要",
  },
  {
    id: uuid(),
    name: "課題5",
    isDone: false,
    priority: 2,
    deadline: new Date(2024, 11, 17, 17, 30),
    notes: "",
  },
];
