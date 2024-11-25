import React from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoList = (props: Props) => {
  // const todos = [...props.todos].sort((a, b) => {
  //   if (a.isDone !== b.isDone) {
  //     return a.isDone ? 1 : -1;
  //   } else {
  //     return a.deadline === null
  //       ? 1
  //       : b.deadline === null
  //         ? 1
  //         : a.deadline.getTime() - b.deadline.getTime();
  //   }
  // });
  const todos = props.todos;

  if (todos.length === 0) {
    return <div className="ml-4">現在、登録されているタスクはありません</div>;
  }

  return (
    <div className="ml-4 space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          remove={props.remove}
          updateIsDone={props.updateIsDone}
        />
      ))}
    </div>
  );
};

export default TodoList;
