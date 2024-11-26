# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。

シンプルで使いやすい Todo アプリに仕上げました。

## 工夫点

- 編集機能を追加し、より使いやすい Todo アプリとなるよう心掛けました。期限の変更などによって、先延ばしにしてしまうことを防ぐため、敢えて提出期限は編集できないようになっています。
- なるべくシンプルで見やすく、かつ情報を簡潔に伝えられるようにデザインを設計しました。シンプルに情報がまとまっているようなデザインは、音楽ゲームの選曲画面から着想を得ました。
- ボタンとモーダルウィンドウを用いることで、全体的に落ち着いた見た目に仕上げました。また、誤って削除ボタンを押した場合などでもモーダルウィンドウが立ち上がるので、誤操作による被害を最小限にとどめられます。

## 開発履歴

- 2024年10月24日：ver0.0 プロジェクト開始
- 2024年11月26日：ver0.8 仮完成、GitHubにて公開を開始

## 実装予定の項目

- 期限を超過した場合に、期限の文字の色を変更する機能の追加
- 全体的なデザインの改修

## 既知の不具合

- 編集時、タスク名を入力しないまま操作を完了してしまうと、タスク名が空文字列になってしまう問題
- 編集時、備考欄を変更して操作を完了しても、変更が反映されない問題
- スマートフォン程の横幅になってしまうと、デザインが大きく崩れてしまう問題

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
