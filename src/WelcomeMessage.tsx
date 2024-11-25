import React from "react";

// 引数の型を定義
// Propsという名前で定義することが一般的です。
type Props = {
  name: string;
  uncompletedCount: number;
};

// WelcomeMessage という関数コンポーネントの定義
// 関数コンポーネントはパスカルケースで名前を設定します。
const WelcomeMessage = (props: Props) => {
  // いわゆる普通のロジックを記述する
  const currentTime = new Date();
  const greeting =
    currentTime.getHours() < 12
      ? "おはようございます"
      : currentTime.getHours() < 19
        ? "こんにちは"
        : "こんばんは";

  // JSX構文で描いた「JSX要素」を return で返す
  return (
    <div className="text-blue-700">
      {greeting}、{props.name}さん。現在の未完了タスクは
      {props.uncompletedCount}個です。
    </div>
  );
};

// 他のファイルで WelcomeMessage を import できるようにする
export default WelcomeMessage;
