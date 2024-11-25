import React, { useState } from "react";
import Modal from "react-modal";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClock,
  faPen,
  faTrashCan,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

const dtFmt = "YYYY/MM/DD HH:mm";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [editTodoName, setEditTodoName] = useState("");
  const [editTodoNameError, setEditTodoNameError] = useState("");
  const [modal, setModal] = useState(false);

  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else return "";
  };

  const updateEditTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoNameError(isValidTodoName(e.target.value));
    setEditTodoName(e.target.value);
  };

  const EditTodo = () => {
    const err = isValidTodoName(editTodoName);
    if (err !== "") {
      setEditTodoNameError(err);
      return;
    }
    const editTodo: Todo = {
      id: uuid(),
      name: editTodoName,
      isDone: todo.isDone,
      priority: todo.priority,
      deadline: todo.deadline,
    };
    const updatedTodos = [...todos, editTodo];
    setTodos(updatedTodos);
    setEditTodoName(editTodoName);
  };
  const openModal = (num) => {
    setModal(num);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <div
      key={todo.id}
      className={twMerge(
        "rounded-md border border-slate-700 bg-white drop-shadow-md py-4 px-3",
        todo.isDone && "opacity-50"
      )}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 scale-110 cursor-pointer"
        />
        <div className="mx-2 bg-cyan-950 px-2.5 py-5 text-sm text-slate-100">
          <div className="whitespace-nowrap">優先度</div>
          <span className="mx-4 text-base">{todo.priority}</span>
        </div>
        <div className="container ml-2">
          <div className="flex items-baseline">
            <div className={twMerge("ml-1.5 text-md md:text-lg font-bold")}>
              {todo.name}
            </div>
            <div className="ml-4 text-sm">[備考とかなんか書く欄]</div>
          </div>

          <div className="ml-1.5 mt-2 flex items-center border-t-2 pt-1">
            <FontAwesomeIcon
              icon={faClock}
              flip="horizontal"
              className="mr-1.5 text-gray-500"
            />
            <div className={twMerge("flex text-slate-500")}>
              期限:
              {todo.deadline !== null && (
                <div className="ml-2">{dayjs(todo.deadline).format(dtFmt)}</div>
              )}
              {todo.deadline === null && <div className="ml-2">なし</div>}
              <div className="ml-4">{todo.isDone ? "【済】" : ""}</div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => openModal(0)}
            className="ml-4 justify-center whitespace-nowrap rounded-md bg-slate-500 px-3   py-2 text-sm text-white hover:bg-slate-700"
          >
            <FontAwesomeIcon icon={faPen} className="mr-1.5 text-white" />
            編集
          </button>
          <Modal
            isOpen={modal === 0}
            className={
              "mx-auto mt-60 max-h-80 min-h-44 min-w-60 max-w-lg rounded-md border border-slate-500 bg-white p-3"
            }
          >
            <div className="items-center justify-center space-y-3 rounded-md px-3 py-5">
              <h2 className="text-lg font-bold">既存タスクの編集</h2>
              <div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="editTodoName" className="font-bold">
                    名前
                  </label>
                  <input
                    type="text"
                    id="editTodoName"
                    value={editTodoName}
                    onChange={updateEditTodoName}
                    className={twMerge(
                      "grow rounded-md border p-2",
                      editTodoNameError && "border-red-500 outline-red-500"
                    )}
                    placeholder="2文字以上、32文字以内で入力してください"
                  />
                </div>
                {editTodoNameError && (
                  <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="mr-0.5"
                    />
                    <div>{editTodoNameError}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-8 pt-4">
                <button
                  onClick={() => {
                    EditTodo();
                    closeModal();
                  }}
                  className={twMerge(
                    "my-2 whitespace-nowrap rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-700",
                    editTodoNameError && "cursor-not-allowed opacity-50"
                  )}
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-1 text-white" />
                  完了
                </button>
                <button
                  onClick={closeModal}
                  className="my-2 whitespace-nowrap rounded-md bg-slate-500 px-3 py-2 text-sm text-white hover:bg-slate-700"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="mr-1.5 text-white"
                  />
                  キャンセル
                </button>
              </div>
            </div>
          </Modal>
          <button
            onClick={() => openModal(1)}
            // onClick={() => props.remove(todo.id)}
            className="ml-4 mt-2 justify-center whitespace-nowrap rounded-md bg-red-400 px-3 py-2 text-sm text-white hover:bg-red-500"
          >
            <FontAwesomeIcon icon={faTrashCan} className="mr-1.5 text-white" />
            削除
          </button>
          <Modal
            isOpen={modal === 1}
            className={
              "mx-auto mt-72 max-h-80 w-80 border border-slate-600 bg-white p-3"
            }
          >
            <h1 className="mx-2 mt-3 flex items-center justify-center">
              「{todo.name}」 を削除しますか？
            </h1>
            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() => {
                  props.remove(todo.id);
                  closeModal();
                }}
                className="my-4 rounded-md bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="mr-1.5 text-white"
                />
                削除する
              </button>
              <button
                onClick={closeModal}
                className="whitespace-nowrap rounded-md bg-slate-500 px-3 py-2 text-sm text-white hover:bg-slate-700"
              >
                <FontAwesomeIcon icon={faXmark} className="mr-1.5 text-white" />
                キャンセル
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
