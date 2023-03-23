# **はじめに**

本サービス"Gohan"はユーザーの位置情報を元に、周辺のレストランをランダムで紹介するものです。<br>
ログイン時は履歴の確認・マイ評価の追加をしてレストランを管理する事ができます。

## 開発について

###開発の経緯
Gohan v1 (レガシー版) の改善を目的として、本プロダクト Gohan v2 を開発しました。v1 の問題点であった日本国内のレストランに限られた検索機能とシンプルすぎる UI/UX を改善し、より使いやすく友人にも広く使ってもらえるようなアプリケーションを目指しました。

###v1 開発の背景
v1 開発当初はデート等でレストランを探す際に時間がかかる事が度々あり、より効率的に食事を探せるアプリケーションがあれば便利だと感じ、Gohan v1 を開発しました。

###今後の発展

## ご利用方法

### ホーム

![ホームの画像](Home.jpg)

### ディスカバリー (検索後自動遷移)

ランダム検索後、自動で遷移されるページです。<br>
また、数秒経過後にレストラン詳細ページへ自動遷移します。

![ディスカバリーページの画像](Discover.jpg)

### レストラン詳細

未認証時

![未認証レストラン詳細ページの画像](DetailsUnauthed.jpg)

認証時

![認証済みレストラン詳細ページの画像](DetailsAuthed.jpg)

スクロール後 <br>
※全体を写すために画像のサイズは調整してあります。
![レストラン詳細ページの写真 - その2](DetailsRest.png)

### ライブラリ

未認証時

![未認証ライブラリページの画像](Library-Unauthed.jpg)

認証時

パネルを閉じた場合
![認証済みライブラリページの画像](LibraryClosedPanel.jpg)
有効なデータの場合
![認証済みライブラリページの画像 - 有効なデータの場合](LibraryContents.jpg)
データが存在しない場合
![認証済みライブラリページの画像](LibraryNoData.jpg)

## 使用技術

- フロントエンド
  - HTML / CSS
  - Tailwind CSS
  - React.js
  - Next.js
  - Typescript
  - TanStackQuery (react-query)
  - tRPC (client)
- バックエンド
  - Next.js API Routes
  - Supabase Database
  - tRPC (server)
- ORM
  - Prisma
- 認証
  - Next Auth
    - Credentials Provider (ゲスト)
    - Google Provider
- CI/CD
  - Vercel Workflow
  - Husky
    - ( ESLint
    - ( Prettier
    - ( Jest
- ホスティング
  - Vercel
- テスト
  - Jest
  - React Testing Library
- Lint ツール
  - Prettier
  - ESLint
- その他ツール
  - Docker (ローカル DB)
    - Storybook
    - OpenAPI (Swagger)

## 機能一覧

- ユーザー登録、ログイン機能 (Next auth)
- ランダム検索機能 (Places API)
- ライブラリ一覧表示 (Prisma x TRPC)
- 自分用評価追加機能 (React hook form)
- 保存済みレストランのマップ表示 (Mapbox)

## **URL 等**

**最新バージョン (v2)** : [https://gohan.place](https://gohan.place)

過去バージョン (v1) : [https://gohan-location.web.app]()

管理用 Notion : [https://spangle-erica-897.notion.site/Gohan-v2-0-defac4e40cac4e4188307cd75fe4ea40]()

Figma : [https://www.figma.com/file/KiRAjbAZa2uvjuMI8xiuE2/Gohan?node-id=1199%3A3733&t=KWZY5dWN5LulObol-1]()
