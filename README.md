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
|name|string|null :false, unique :true|
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
|user_id|references:user|foreign_key: true|
|group_id|references:group|foreign_key: true|

 * アソシエーション
   - belongs_to: users
   - belongs_to: groups


### ③groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null :false, unique :true|

 * アソシエーション
   - has_many: users
   - belongs_to: users through: :group_users


### ④group_usersテーブル (中間テーブル)

|Column|Type|Options|
|------|----|-------|
|group_id|references:group|unique :true, index|
|user_id|references:user|unique :true, index|

 * アソシエーション
   - belongs_to: users
   - belongs_to: groups