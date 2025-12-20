import { http, HttpResponse } from 'msw'
import type { GetAllPjRequest, GetAllPjResponse, UpdatePerformanceRequest, UpdatePerformanceResponse } from '../schema'
export const handlers = [
  // PJ一覧取得
  http.get<GetAllPjRequest, null, GetAllPjResponse>('http://localhost:8080/api/pj/all', () => {
    return HttpResponse.json(
      {
        pjs:[
          {
            pj_id:1,
            pj_name:'DBマイグレプロジェクト'
          },
          {
            pj_id:2,
            pj_name:'計画管理システムプロジェクト'
          },
          {
            pj_id:3,
            pj_name:'AWSリフト対応プロジェクト'
          },
          {
            pj_id:4,
            pj_name:'○○社マルチクラウド化プロジェクト'
          },
          {
            pj_id:5,
            pj_name:'モバイルアプル開発プロジェクト'
          },
        ]
      }
    )
  }),
  //日次勤怠入力
  http.post<{'':''}, UpdatePerformanceRequest, UpdatePerformanceResponse>('https://api.example.com/api/update/performance/day', async ({request}) => {

    //リクエスト例
    // const body = await request.json();
    // body = {
    //   user_id:1,
    //   performances:[
    //     {
    //       pj_id:1,
    //       working_hours:3.5
    //     },
    //     {
    //       pj_id:2,
    //       working_hours:2
    //     },
    //     {
    //       pj_id:3,
    //       working_hours:3.5
    //     },
    //   ],
    //   date:'2025-12-31'
    // }

    return HttpResponse.json(
      //HTTPステータスが200ならOK
      {}
    )
  }),
]