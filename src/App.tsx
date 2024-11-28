import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faListCheck,
  faTrashCan,
  faXmark,
  faFileCirclePlus,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNotes, setNewTodoNotes] = useState("");
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [newTodoNoteError, setNewTodoNoteError] = useState("");
  const [modalNewTodo, setModalNewTodo] = useState(false);
  const [modalCheckedDelete, setModalCheckedDelete] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  // const uncompletedCount = initTodos.filter(
  //   (todo: Todo) => !todo.isDone
  // ).length;
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
  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const openModalNewTodo = () => {
    setModalNewTodo(true);
  };
  const openModalCheckedDelete = () => {
    setModalCheckedDelete(true);
  };
  const closeModalNewTodo = () => {
    setModalNewTodo(false);
  };
  const closeModalCheckedDelete = () => {
    setModalCheckedDelete(false);
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };
  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };
  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };
  const updateNewTodoNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNoteError(isValidTodoNote(e.target.value));
    setNewTodoNoteError(isValidTodoNote(e.target.value));
    setNewTodoNotes(e.target.value);
  };
  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      } else return todo;
    });
    setTodos(updatedTodos);
  };
  const edit = (
    id: string,
    newName: string,
    newPriority: number,
    newNotes: string
  ) => {
    const emptyerr = isValidTodoName(newName);
    if (emptyerr !== "") {
      setNewTodoNameError(emptyerr);
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          name: newName,
          priority: newPriority,
          notes: newNotes,
        };
      } else return todo;
    });
    setTodos(updatedTodos);
  };

  const addNewTodo = () => {
    const nameErr = isValidTodoName(newTodoName);
    if (nameErr !== "") {
      setNewTodoNameError(nameErr);
      return;
    }
    const noteErr = isValidTodoNote(newTodoNotes);
    if (noteErr !== "") {
      setNewTodoNoteError(noteErr);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      notes: newTodoNotes,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setNewTodoNotes("");
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <div className="flex items-center">
        <h1 className="container ml-5 text-2xl font-bold text-slate-700">
          <FontAwesomeIcon icon={faClipboard} className="mr-2" />
          Todoアプリ
        </h1>
        <div>
          <button
            type="button"
            onClick={openModalNewTodo}
            className="ml-4 mr-2 mt-2 flex items-center justify-center whitespace-nowrap rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faListCheck} className="mr-1.5 text-white" />
            タスクの追加
          </button>
          <Modal
            isOpen={modalNewTodo}
            className={
              "mx-auto mt-20 min-h-44 min-w-60 max-w-lg rounded-md border border-slate-500 bg-white p-3"
            }
            ariaHideApp={false}
          >
            {/* 課題名入力用テキストボックス */}
            <div className="items-center justify-center space-y-3 rounded-md px-3 py-5">
              <h2 className="text-lg font-bold">新しいタスクの追加</h2>
              <div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="newTodoName" className="font-bold">
                    名前
                  </label>
                  <input
                    type="text"
                    id="newTodoName"
                    value={newTodoName}
                    onChange={updateNewTodoName}
                    className={twMerge(
                      "grow rounded-md border p-2",
                      newTodoNameError && "border-red-500 outline-red-500"
                    )}
                    placeholder="1文字以上、32文字以内で入力してください"
                  />
                </div>
                {newTodoNameError && (
                  <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="mr-0.5"
                    />
                    <div>{newTodoNameError}</div>
                  </div>
                )}
              </div>

              {/* 優先度用ラジオボタン */}
              <div className="flex gap-5">
                <div className="font-bold">優先度</div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      id={`priority-${value}`}
                      name="prioityGroup"
                      value={value}
                      checked={newTodoPriority === value}
                      onChange={updateNewTodoPriority}
                    />
                    <span>{value}</span>
                  </label>
                ))}
                {/* <div className="text-sm text-gray-500">（初期値: 3）</div> */}
              </div>

              {/* 提出期限用UI */}
              <div className="mb-4 flex items-center gap-x-2">
                <label htmlFor="deadline" className="font-bold">
                  期限
                </label>
                <input
                  type="datetime-local"
                  id="deadline"
                  value={
                    newTodoDeadline
                      ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                      : ""
                  }
                  onChange={updateDeadline}
                  className="rounded-md border border-gray-400 px-2 py-0.5"
                />
                <div className="text-sm text-gray-500">（任意）</div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-x-2">
                  <label htmlFor="newTodoNotes" className="font-bold">
                    備考
                  </label>
                  <input
                    type="text"
                    id="newTodoNotes"
                    value={newTodoNotes}
                    onChange={updateNewTodoNotes}
                    className={twMerge(
                      "grow rounded-md border p-2",
                      newTodoNoteError && "border-red-500 outline-red-500"
                    )}
                    placeholder="メモなどを記入してください (任意)"
                  />
                </div>
                {newTodoNoteError && (
                  <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="mr-0.5"
                    />
                    <div>{newTodoNoteError}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-x-8">
                {/* 追加ボタン */}
                <button
                  type="button"
                  onClick={() => {
                    addNewTodo();
                    closeModalNewTodo();
                  }}
                  className={twMerge(
                    "my-2 rounded-md bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-400",
                    (newTodoNameError || newTodoNoteError) &&
                      "cursor-not-allowed opacity-50"
                  )}
                >
                  <FontAwesomeIcon
                    icon={faFileCirclePlus}
                    className="mr-1.5 text-white"
                  />
                  追加
                </button>

                {/* 戻る用ボタン */}
                <button
                  onClick={closeModalNewTodo}
                  className="my-2 justify-center whitespace-nowrap rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-700"
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
        </div>
      </div>
      <div className="my-4">
        <WelcomeMessage name="■■■" />
      </div>

      <TodoList
        todos={todos}
        updateIsDone={updateIsDone}
        remove={remove}
        edit={edit}
      />
      {/* 完了タスク一括削除ボタン */}
      {/* タスクが1つもなければ表示しないようにしたい */}
      <button
        type="button"
        onClick={openModalCheckedDelete}
        className="ml-2 mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        <FontAwesomeIcon icon={faTrashCan} className="text-white md:mr-1.5" />
        完了済のタスクを削除
      </button>
      <Modal
        isOpen={modalCheckedDelete}
        className={
          "mx-auto my-20 max-h-80 w-80 border border-slate-600 bg-white p-3"
        }
        ariaHideApp={false}
      >
        <h1 className="mt-3 flex items-center justify-center">
          完了済みのタスクを全て削除します<br></br>
          本当に削除しますか？
        </h1>
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={() => {
              removeCompletedTodos();
              closeModalCheckedDelete();
            }}
            className="my-4 rounded-md bg-red-500 px-3 py-2 text-sm font-bold text-white hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faTrashCan} className="mr-1.5 text-white" />
            削除する
          </button>
          <button
            onClick={closeModalCheckedDelete}
            className="whitespace-nowrap rounded-md bg-slate-500 px-3 py-2 text-sm text-white hover:bg-slate-700"
          >
            <FontAwesomeIcon icon={faXmark} className="mr-1.5 text-white" />
            キャンセル
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
