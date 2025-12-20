## API リクエストとレスポンスの型

- プロジェクト一覧取得
```json
//リクエストの型
{
  // なし
}
//レスポンス プロジェクトのIDと名前を一覧で返します。
{
  [
    "pj_id":"number",
    "pj_name":"string"
  ]
}

```

- 日次勤怠入力
```json
//リクエストの型 一日の勤務開始と終了、プロジェクトごとの作業時間を送ります。
{
  "user_id":"string",
  "start_time":"string", //yyyy-mm-dd
  "end_time":"string", //yyyy-mm-dd
  "performances":[
    {
      "pj_id":"number",
      "working_hours":"number"
    }
  ]
}

//レスポンスの型 HTTPステータスが200ならOK
{
  //なし
}

```

- 月次勤怠一覧
```json
//リクエストの型 ユーザIDと該当の年月を送ります。
{
  "user_id":"string",
  "year_month":"string", //yyyy-mm
}
//レスポンスの型
{
  "date":"string", //yyyy-mm-dd
  "start_time":"string", //hh:mm
  "end_time":"string", //hh:mm
  "pj_performance": [
    {
      "pj_name":"string",
      "time":"number"
    }
  ]
}

```
