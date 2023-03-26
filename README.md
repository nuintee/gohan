# **はじめに**

本サービス"Gohan"はユーザーの位置情報を元に、周辺のレストランをランダムで紹介するものです。<br>
ログイン時は履歴の確認・マイ評価の追加をしてレストランを管理する事ができます。

## 開発について

### 開発の経緯
Gohan v1 (レガシー版) の改善を目的として、本プロダクト Gohan v2 を開発しました。v1 の問題点であった日本国内のレストランに限られた検索機能とシンプルすぎる UI/UX を改善し、より使いやすく友人にも広く使ってもらえるようなアプリケーションを目指しました。

### v1 開発の背景
v1 開発当初はデート等でレストランを探す際に時間がかかる事が度々あり、より効率的に食事を探せるアプリケーションがあれば便利だと感じ、Gohan v1 を開発しました。

### 今後のアップデート予定
- アクセシビリティの強化
- パフォーマンス向上
- 多言語化
- レストラン検索条件の追加
- レストラン全検索機能

## 画面の説明

### ホーム

![ホームの画像](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/home/Home.jpg)

### ディスカバリー (検索後自動遷移)

ランダム検索後、自動で遷移されるページです。<br>
また、数秒経過後にレストラン詳細ページへ自動遷移します。

![ディスカバリーページの画像](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/discover/Discover.jpg?t=2023-03-23T03%3A50%3A43.210Z)

### レストラン詳細

未認証時

![未認証レストラン詳細ページの画像](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/details/DetailsUnauthed.jpg?t=2023-03-23T03%3A51%3A39.016Z)

認証時

![認証済みレストラン詳細ページの画像](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/details/DetailsAuthed.jpg?t=2023-03-23T03%3A51%3A39.016Z)

スクロール後 <br>
※全体を写すために画像のサイズは調整してあります。
![レストラン詳細ページの写真 - その2](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/details/DetailsRest.png?t=2023-03-23T03%3A52%3A03.006Z)

### ライブラリ

未認証時

![未認証ライブラリページの画像](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/library/LibraryUnauthed.jpg?t=2023-03-23T03%3A48%3A20.071Z)

認証時

パネルを閉じた場合

![認証済みライブラリページの画像](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/library/LibraryClosedPanel.jpg?t=2023-03-23T03%3A52%3A17.112Z)

有効なデータの場合

![認証済みライブラリページの画像 - 有効なデータの場合](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/library/LibraryContents.jpg?t=2023-03-23T03%3A52%3A24.926Z)

データが存在しない場合

![認証済みライブラリページの画像](https://dnjrvsrsqllhmmdvvuac.supabase.co/storage/v1/object/public/gohan-doc-images/library/LibraryNoData.jpg?t=2023-03-23T03%3A52%3A32.468Z)

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

**最新バージョン (v2)** : https://gohan.place

過去バージョン (v1) : https://gohan-location.web.app

管理用 Notion : https://spangle-erica-897.notion.site/Gohan-v2-0-defac4e40cac4e4188307cd75fe4ea40

Figma : https://www.figma.com/file/KiRAjbAZa2uvjuMI8xiuE2/Gohan?node-id=1199%3A3733&t=KWZY5dWN5LulObol-1
