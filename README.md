# NodeJS ProxyServer Sample

NodeJsにおける、Webのプロキシサーバーのサンプルです。必要に迫られた。

例えば `localhost:8888` をリクエストすると、`localhost2:8888` へのアクセスにするみたいなことができます。

## サーバー起動

```
npm run start
```

## サーバー情報

* from リクエストを受け取るこのプロキシサーバーの情報
  * host ホスト名 or IPアドレス
  * port ポート番号
* to fromできたリクエストの書き換え情報
  * host ホスト名 or IPアドレス
  * port ポート番号

## 設定

`config.json` にもろもろの設定があるので、それで設定可能。
