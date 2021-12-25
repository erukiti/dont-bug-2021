# バグってはいけない2021

> 酒飲みながらコーディングとか執筆したりする、酒もくもく会をやりたいお気持ち表明（もちろんノンアルコール・ソフドリもうぇるかむ）

> 泥酔ハッカソンの機運

> コンパイルエラーとかバグだしたらショット一杯w

> バグってはいけない2021

という馬鹿話をとある執筆者コミュニティでしてて、ちょっと思いつきをプロトタイプしたやつ

## 仕様

* 出題文が表示される
* コーディングエディタで JavaScript を書く
* 実行ボタンを押すと、出題に沿ったコードが書かれているかテストされて、実行結果が表示される
  - コードの実行は一応 sandbox で行われているが、安全性はあまり検証されてないのでイタズラ禁止。
  - コード結果が failed だったら全力で煽られる
* 参加者のリアルタイムステータスが表示される

にする予定

## 予定

2022年になってもこのリポジトリとソフト名は「バグってはいけない2021」

そもそも、試しに作ってみた感じなので、もう少し真面目に作り直す予定。
Vite楽で便利だけど、実用を考えると素直にNext.js使っておくのが正解だなと思った。
