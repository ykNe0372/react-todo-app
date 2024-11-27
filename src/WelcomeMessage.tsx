import React from "react";

// 引数の型を定義
// Propsという名前で定義することが一般的です。
type Props = {
  name: string;
};

// WelcomeMessage という関数コンポーネントの定義
// 関数コンポーネントはパスカルケースで名前を設定します。
const WelcomeMessage = (props: Props) => {
  // いわゆる普通のロジックを記述する
  const currentTime = new Date();
  const greeting =
    currentTime.getHours() < 12
      ? "おはようございます！用意出来たらタスク開始！"
      : currentTime.getHours() < 19
        ? "こんにちは！時には休憩も大事。リラックスリラックス..."
        : currentTime.getHours() < 23
          ? "こんばんは～！もうご飯は食べた？"
          : "夜更かしは良くないよ！頑張って早く終わらせてね！";

  // JSX構文で描いた「JSX要素」を return で返す
  return (
    <div className="ml-8 text-slate-500">
      {props.name}さん、{greeting}
    </div>
  );
};

// 他のファイルで WelcomeMessage を import できるようにする
export default WelcomeMessage;
