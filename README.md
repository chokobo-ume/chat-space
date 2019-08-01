# README

## Chatspace
  グループチャットアプリ

### Chatspaceの機能
  * 新規登録機能
  * グループ内でのチャット機能
  * 複数人によるグループチャット機能
  * チャット相手の検索機能
  * チャットグループへのユーザー招待機能
  * チャットの履歴表示機能
  * 画像送信機能
  * チャットの自動更新

### 開発環境（version）
  * Rails  "5.0.7.2"
  * Ruby   "2.5.1"

## データベース設計

### ①usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null :false|
|email|string|null :false, unique :true|

 * アソシエーション
   - has_many: messages
   - has_many: groups, through: :groups_users
   - has_many: group_users


### ②messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|-|
|image|string|-|
|user_id|references:user|null: false, foreign_key: true|
|group_id|references:group|null: false, foreign_key: true|

 * アソシエーション
   - belongs_to: user
   - belongs_to: group


### ③groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null :false, unique :true|

 * アソシエーション
   - has_many: group_users
   - has_many: users through: :group_users


### ④group_usersテーブル (中間テーブル)

|Column|Type|Options|
|------|----|-------|
|group_id|references:group|null: false, foreign_key: true|
|user_id|references:user|null: false, foreign_key: true|

 * アソシエーション
   - belongs_to: user
   - belongs_to: group 