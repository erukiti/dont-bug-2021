# バグってはいけない2021

> 酒飲みながらコーディングとか執筆したりする、酒もくもく会をやりたいお気持ち表明（もちろんノンアルコール・ソフドリもうぇるかむ）

> 泥酔ハッカソンの機運

> コンパイルエラーとかバグだしたらショット一杯w

> バグってはいけない2021

という馬鹿話をとある執筆者コミュニティでしてて、ちょっと思いつきをプロトタイプしたやつ

![こんなかんじのやつ](./ss.png)

## 仕様

* 出題文が表示される
* コーディングエディタで TypeScript を書く
* 実行ボタンを押すと、出題に沿ったコードが書かれているかテストされて、実行結果が表示される
  - コードの実行は一応 sandbox で行われているが、安全性はあまり検証されてないのでイタズラ禁止。
  - コード結果が failed だったら全力で煽られる（予定）
* 参加者のリアルタイムステータスが表示される

## 動かし方

Firebase で Google Auth と Realtime Database を有効にして設定を `.env.local` に書き出して、いい感じに `yarn dev` とか `npm run dev` する。

## 予定

2022年になってもこのリポジトリとソフト名は「バグってはいけない2021」

そもそも、試しに作ってみた感じなので、もう少し真面目に作り直す予定。

## ライセンス

BSD style

### 「バグってはいけない2021」ロゴ

[mottox2神](https://twitter.com/mottox2)が提供してくれた。感謝しかない。

### ライセンス全文

```
Copyright (c) 2021-2022, erukiti@gmail.com https://github.com/erukiti/dont-bug-2021
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.
* Neither the name of the <organization> nor the names of its contributors 
  may be used to endorse or promote products derived from this software 
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```
