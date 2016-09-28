# 暗記カード

<https://yassh.github.io/20160802-flashcard/>

## ローカルでの起動方法

0. `npm install`
0. `npm start`

## 始め方

## 1つ目の方法

0. [Google スプレッドシート](https://docs.google.com/spreadsheets/)で、`id`、`front`、`back`の3カラムのシートを作成する。
0. [Sheetsu](https://sheetsu.com/)で、そのシートのAPIを作成する。
0. 暗記カードを起動し、APIの情報を入力して、接続する。

## 2つ目の方法

2つ目の方法では、カードの追加や削除はできない。

0. 次の例のようなデータ構造のJSONファイルを作成し、ウェブリソースとして取得可能にする。そのウェブリソースのレスポンスヘッダは、`Access-Control-Allow-Origin: *`を含まなければならない。（GitHubで公開するのが簡単だろう。[サンプル](https://yassh.github.io/20160802-flashcard/static/test.json)）
0. 暗記カードを起動し、JSONファイルのURLを入力して、接続する。

### JSONの例

```
[
  {
    "id": "1",
    "front": "表",
    "back": "裏"
  },
  {
    "id": "2",
    "front": "яблоко",
    "back": "りんご"
  },
  {
    "id": "3",
    "front": "円周率",
    "back": "3.14159 26535 89793 23846 26433 83279 50288 …"
  }
]
```
