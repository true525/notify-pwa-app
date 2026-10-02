# Notify PWA

iPhone用のPWA通知送信アプリです。OneSignalと連携して、大量の通知を送信できます。

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/true525/notify-pwa-app.git
cd notify-pwa-app
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. OneSignal の設定

1. https://onesignal.com に無料登録
2. 新しいアプリを作成
3. "Web Push" を選択
4. App ID と REST API Key を取得
5. プロジェクトで `.env` ファイルを作成

```env
PORT=3000
ONE_SIGNAL_APP_ID=your-app-id
ONE_SIGNAL_API_KEY=your-rest-api-key
```

### 4. アプリを起動

```bash
npm start
```

ブラウザで http://localhost:3000 を開きます。

### 5. iPhone で使用

Safariで開いたあと：
- 共有ボタンを押す
- 「ホーム画面に追加」を選ぶ
- ホーム画面からアプリのように開く

## 機能

- タイトルと本文を入力して通知を送信
- 送信先を選択可能（全員 / 重要ユーザー / スタッフ）
- OneSignal連携で大量配信対応
- PWAとして動作（ホーム画面に追加可能）

## 注意

- iPhoneのSafariでPWA通知を完全に動作させるには、HTTPS環境（本番デプロイ）が必要です
- ローカル開発時（localhost）では、一部の通知機能が制限されます
- 本番環境へのデプロイはVercel、Render、Herokuなどをお勧めします
