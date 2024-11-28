import React, { useState } from "react";
import Modal from "react-modal";
import { Todo } from "./types";
// import { initTodos } from "./initTodos";
import dayjs from "dayjs";
// import { v4 as uuid } from "uuid";
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
  edit: (
    id: string,
    newName: string,
    newPriority: number,
    newNotes: string
  ) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  // const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [editTodoName, setEditTodoName] = useState(todo.name);
  const [editTodoPriority, setEditTodoPriority] = useState(todo.priority);
  const [editTodoNotes, setEditTodoNotes] = useState(todo.notes);
  const [editTodoNameError, setEditTodoNameError] = useState("");
  const [editTodoNoteError, seteditTodoNoteError] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const isValidTodoName = (name: string): string => {
    if (name.length < 1 || name.length > 32) {
      return "1文字以上、32文字以内で入力してください";
    } else return "";
  };
  const isValidTodoNote = (notes: string): string => {
    if (notes.length > 32) {
      return "32文字以内で入力してください";
    } else return "";
  };

  const updateEditTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoNameError(isValidTodoName(e.target.value));
    setEditTodoName(e.target.value);
  };
  const updateEditTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoPriority(Number(e.target.value));
  };
  const updateEditTodoNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    seteditTodoNoteError(isValidTodoNote(e.target.value));
    setEditTodoNotes(e.target.value);
  };

  const editTodo = () => {
    const nameErr = isValidTodoName(editTodoName);
    if (nameErr !== "") {
      setEditTodoNameError(nameErr);
      return;
    }
    const noteErr = isValidTodoNote(editTodoNotes);
    if (noteErr !== "") {
      seteditTodoNoteError(noteErr);
      return;
    }
  };
  //   const editTodo: Todo = {
  //     id: uuid(),
  //     name: editTodoName,
  //     isDone: todo.isDone,
  //     priority: editTodoPriority,
  //     deadline: todo.deadline,
  //   };
  //   const updatedTodos = [...todos, editTodo];
  //   setTodos(updatedTodos);
  //   setEditTodoName(editTodoName);
  //   setEditTodoPriority(editTodoPriority);
  // };
  const openModalEdit = () => {
    setModalEdit(true);
  };
  const openModalDelete = () => {
    setModalDelete(true);
  };
  const closeModalEdit = () => {
    setModalEdit(false);
  };
  const closeModalDelete = () => {
    setModalDelete(false);
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
          <div className="whitespace-nowrap text-sm md:text-base">優先度</div>
          <span className="mx-4 text-base">{todo.priority}</span>
        </div>
        <div className="container ml-2 ">
          <div className="flex items-baseline">
            <div className={twMerge("ml-1.5 text-md md:text-lg font-bold")}>
              {todo.name}
            </div>
          </div>
          <div className="ml-2 text-sm text-gray-500">{todo.notes}</div>

          <div className="ml-1.5 mt-2 flex items-center border-t-2 pt-1">
            <FontAwesomeIcon
              icon={faClock}
              flip="horizontal"
              className={twMerge(
                "mr-1.5 text-slate-500 text-sm md:text-base",
                todo.deadline !== null &&
                  todo.deadline < new Date() &&
                  "text-red-500 font-bold",
                todo.isDone && "text-green-500"
              )}
            />
            <div
              className={twMerge(
                "flex text-slate-500 text-sm md:text-base",
                todo.deadline !== null &&
                  todo.deadline < new Date() &&
                  "text-red-500 font-bold",
                todo.isDone && "text-green-500"
              )}
            >
              <p className="hidden md:inline-block">期限:</p>
              {todo.deadline !== null && (
                <div className="md:ml-2">
                  {dayjs(todo.deadline).format(dtFmt)}
                </div>
              )}
              {todo.deadline === null && <div className="md:ml-2">なし</div>}
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={openModalEdit}
            className="ml-4 justify-center text-ellipsis whitespace-nowrap rounded-md bg-slate-500 px-3 py-2 text-sm text-white hover:bg-slate-700"
          >
            <FontAwesomeIcon icon={faPen} className=" text-white md:mr-1.5" />
            <p className="hidden md:inline-block">編集</p>
          </button>
          <Modal
            isOpen={modalEdit}
            className={
              "mx-auto mt-20 min-h-44 min-w-60 max-w-lg rounded-md border border-slate-500 bg-white p-3"
            }
            ariaHideApp={false}
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
                    defaultValue={todo.name}
                    value={editTodoName}
                    onChange={updateEditTodoName}
                    className={twMerge(
                      "grow rounded-md border p-2",
                      editTodoNameError && "border-red-500 outline-red-500"
                    )}
                    placeholder="32文字以内で入力してください"
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

              <div className="flex gap-5">
                <label className="font-bold">優先度</label>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      id={`priority-${value}`}
                      name="priorityGroup"
                      defaultValue={todo.priority}
                      value={value}
                      checked={editTodoPriority === value}
                      onChange={updateEditTodoPriority}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="editTodoNotes" className="font-bold">
                    備考
                  </label>
                  <input
                    type="text"
                    id="editTodoNotes"
                    defaultValue={todo.notes}
                    value={editTodoNotes}
                    onChange={updateEditTodoNotes}
                    className={twMerge(
                      "grow rouded-md border p-2",
                      editTodoNoteError && "border-red-500 outline-red-500"
                    )}
                    placeholder="メモなどを記入してください (任意)"
                  />
                </div>
                {editTodoNoteError && (
                  <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="mr-0.5"
                    />
                    <div>{editTodoNoteError}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-8 pt-2">
                <button
                  onClick={() => {
                    editTodo();
                    props.edit(
                      todo.id,
                      editTodoName,
                      editTodoPriority,
                      editTodoNotes
                    );
                    closeModalEdit();
                  }}
                  className={twMerge(
                    "whitespace-nowrap rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-700",
                    (editTodoNameError || editTodoNoteError) &&
                      "cursor-not-allowed opacity-50"
                  )}
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-1 text-white" />
                  完了
                </button>
                <button
                  onClick={closeModalEdit}
                  className="whitespace-nowrap rounded-md bg-slate-500 px-3 py-2 text-sm text-white hover:bg-slate-700"
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
            onClick={openModalDelete}
            // onClick={() => props.remove(todo.id)}
            className="ml-4 mt-2 justify-center whitespace-nowrap rounded-md bg-red-400 px-3 py-2 text-sm text-white hover:bg-red-500"
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="text-white md:mr-1.5"
            />
            <p className="hidden md:inline-block">削除</p>
          </button>
          <Modal
            isOpen={modalDelete}
            className={
              "mx-auto mt-20 max-h-80 w-80 border border-slate-600 bg-white p-3"
            }
            ariaHideApp={false}
          >
            <h1 className="mx-2 mt-3 flex items-center justify-center">
              「{todo.name}」 を削除しますか？
            </h1>
            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() => {
                  props.remove(todo.id);
                  closeModalDelete();
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
                onClick={closeModalDelete}
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
