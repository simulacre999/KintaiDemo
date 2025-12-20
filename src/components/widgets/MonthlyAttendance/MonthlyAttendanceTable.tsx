import TableContainer from "@mui/material/TableContainer"
import type { GetMonthlyAttendanceResponse } from "../../../api/schema"
import Table from "@mui/material/Table"
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";

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
    console.log(data)

    return (
        <Box sx={{ ...style, width:'40%', height:'50%' }}>
            <TableContainer sx={{maxHeight:'100%'}}>
            <Table sx={{ height: '100%', width: '100%', overflow:'auto', position:'relative' }}>
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
                                    <TableCell size='small'>{x.date}</TableCell>
                                    <TableCell>{`${x.start_time} 〜 ${x.end_time}`}</TableCell>
                                    <TableCell>作業割合</TableCell>
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
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};