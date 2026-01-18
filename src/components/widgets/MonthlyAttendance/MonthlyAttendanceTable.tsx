import TableContainer from "@mui/material/TableContainer"
import type { GetMonthlyAttendanceResponse } from "../../../api/schema"
import Table from "@mui/material/Table"
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import { BarGraph } from "../../BarGraph";

/**
 * 月次勤怠テーブル
 */
export const MonthlyAttendanceTable = ({ response }: { response: GetMonthlyAttendanceResponse | null }) => {

    if (!response) {
        return (
            <></>
        )
    }

    const { data } = response

    return (
        <Box sx={{ ...style, width:'1500px',height:'70%'}}>
            <TableContainer sx={{maxHeight:'100%'}}>
            <Table sx={{ height: '100%', width: '100%', overflow:'auto', position:'relative'}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width:'100px'}}>日付</TableCell>
                        <TableCell sx={{width:'100px'}}>勤務時間</TableCell>
                        <TableCell>作業割合</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map(x => {
                            return (
                                <TableRow>
                                    <TableCell size='small' sx={{width:'300px'}}>{`${x.date}(${getDayJp(new Date(x.date).getDay())})`}</TableCell>
                                    <TableCell sx={{width:'400px'}}>{`${x.start_time} 〜 ${x.end_time}`}</TableCell>
                                    <TableCell>
                                        <BarGraph 
                                            setting={
                                                {
                                                    width:'700px',
                                                    data:
                                                        x.pj_performance.map(y => {
                                                            return {
                                                                label:y.pj_name,
                                                                value:y.time
                                                            }
                                                        })
                                                }
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    )
}

const style = {
    // position: 'absolute',
    // top: '75%',
    // left: '55%',
    // width:'1500px',
    // transform: 'translate(-50%, -50%)',
    // bgcolor: 'background.paper',
    // border: '1px solid #f6f6f6',
    // boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const dayOfWeek = [
    '日',
    '月',
    '火',
    '水',
    '木',
    '金',
    '土'
]

const getDayJp = (index:number) => {
    return dayOfWeek[index]
}