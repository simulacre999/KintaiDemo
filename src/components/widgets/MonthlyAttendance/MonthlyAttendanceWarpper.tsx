import Modal  from "@mui/material/Modal"
import {Item} from "../../../App"
import { useState } from "react";
import { MonthlyAttendanceTable } from "./MonthlyAttendanceTable";
import type { GetMonthlyAttendanceResponse } from "../../../api/schema";
import axios from "axios";

export const MonthlyAttendanceWrapper = () => {

    const [open, setOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState<GetMonthlyAttendanceResponse | null>(null)

    //TODO:スピナーを出す、awaitせずにPromiseの解決をreactに任せる
    const handleClickEvent = async () => {
       const data = (await axios.get('http://localhost:8080/api/attendance/monthly')).data as GetMonthlyAttendanceResponse
       setAttendanceData(data)
       setOpen(true)
    }

    const handleCloseEvent = () => {
        setOpen(false)
        setAttendanceData(null)
    }

    return (
        <>
            <Item sx={{ cursor: 'pointer' }} onClick={handleClickEvent}>
                <span style={{ fontSize: 20 }}>
                    月次勤怠
                </span>
            </Item>
            <Modal open={open} onClose={handleCloseEvent}>
                <MonthlyAttendanceTable response={attendanceData} />
            </Modal>
        </>
    )
}
