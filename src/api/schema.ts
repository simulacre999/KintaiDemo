//PJ一覧取得(GET)
//リクエスト
export type GetAllPjRequest = {
    //なし
}

//レスポンス
export type PJ = {
    //プロジェクトID
    pj_id: number,
    //プロジェクト名
    pj_name: string
}
export type GetAllPjResponse = {
    pjs: PJ[]
}

//日次勤怠入力(POST)
//リクエスト
type PerformanceByPj = {
    pj_id: number,
    //稼働時間
    working_hours: number,
}

export type UpdatePerformanceRequest = {
    user_id: string,
    performances: PerformanceByPj[],
    //勤務開始時刻
    start_time: string //hh:mm,
    //勤務終了時刻
    end_time: string //hh:mm
}

//レスポンス
export type UpdatePerformanceResponse = {
    //なし
    //失敗時は400とかで例外処理になる
}

//月次勤怠一覧(GET)
//リクエスト
export type GetMonthlyAttendanceRequest = {
    user_id: string
    year_month: string//yyyy-mm
}

//レスポンス
type PJPerformance = {
    //プロジェクト名
    pj_name: string,
    //稼働時間
    time: number
}

type DailyPerformance = {
    date: string, //yyyy-mm
    //勤務開始時刻
    start_time: string, //hh:mm
    //勤務終了時刻
    end_time: string, //hh:mm
    pj_performance: PJPerformance[]
}
export type GetMonthlyAttendanceResponse = {
    data: DailyPerformance[]
}