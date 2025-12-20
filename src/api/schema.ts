//PJ一覧取得(GET)
//リクエスト
export type GetAllPjRequest = {
    //なし
}

//レスポンス
export type PJ = {
    //プロジェクトID
    pj_id:number,
    //プロジェクト名
    pj_name:string
}
export type GetAllPjResponse = {
    pjs:PJ[]
}

//日次勤怠入力(POST)
//リクエスト
type PerformanceByPj = {
    pj_id:number,
    //稼働時間
    working_hours:number,
}

export type UpdatePerformanceRequest = {
    user_id:string,
    performances:PerformanceByPj[]
}

//レスポンス
export type UpdatePerformanceResponse = {
    //なし
    //失敗時は400とかで例外処理になる
}

//月次勤怠一覧(GET)
//リクエスト
export type GetMonthlyAttendanceRequest = {
    user_id:string
    date:string//yyyy-mm-dd
}

//レスポンス
export type GetMonthlyAttendanceResponse = {

}