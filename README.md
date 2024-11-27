# 概要

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した Todo アプリです。
タスクの追加、編集、削除の機能を実装し、シンプルで使いやすい Todo アプリに仕上げました。

所要時間：約65時間

## 工夫点

- 編集機能を実装し、タスク内容の変更やユーザーのミスに対応しやすいようにしました。期限の変更などによって、先延ばしにしてしまうことを防ぐため、敢えて提出期限は編集できないようになっています。
- なるべくシンプルで見やすく、かつ情報を簡潔に伝えられるようにデザインを設計しました。シンプルに情報がまとまっているようなデザインは、音楽ゲームの選曲画面から着想を得ました。
- ボタンとモーダルウィンドウを用いて、全体的に落ち着いた見た目になるよう心掛けました。また、誤って削除ボタンを押した場合などでも確認画面が立ち上がるので、誤操作による被害を最小限に抑えられます。

## 開発履歴

- 2024年10月24日：ver0.0 プロジェクト開始
- 2024年11月26日：ver0.8 仮完成、GitHubにて公開を開始
- 2024年11月27日：ver0.9 細やかな要素の追加、および不具合の修正

## 実装予定の項目

- タスクの順番を入れ替える機能の追加
- タイトル部分や背景などの、全体的なデザインの改修

## 既知の不具合

- スマートフォンの縦画面ほどの幅になってしまうと、デザインが大きく崩れる問題

## ライセンス

MIT License

Copyright (c) 2024 ykNe0372

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
