import TextField from "@mui/material/TextField"
import { Item, PjContext } from "../../../App"
import MenuItem from "@mui/material/MenuItem"
import { PjPerformanceList } from "../../PjPerformanceList"
import Button from "@mui/material/Button"
import { use, useRef, useState } from "react"
import { getDayJp, range, sum } from "../../../Utilts"
import dayjs from "dayjs"
import Box from '@mui/material/Box';

/**
 * 日時作業実績を入力するコンポーネントです
 * @returns 
 */
export const DailyPerformance = () => {

    const context = use(PjContext)
    if (!context) {
        return (
            <></>
        )
    }

    const { setting } = context

    const [performance, setPerformance] = useState(setting.availablePjs.map(_ => 0))
    const [biko, setBiko] = useState('')
    const [errors, setErrors] = useState<string[]>([]);
    const [date, setDate] = useState(dayjs(new Date()))

    const rules = [
        {
            rule: () => sum(performance) < 7.5 && biko.length === 0,
            message: `・1日の勤務時間が規定より少なくなっています。\n遅刻・早退の場合は勤務時間を修正のうえ、\n理由を備考欄に入力してください。`
        }
    ]

    /**
     * 作業実績の入力イベントをハンドルします。
     * @param e 
     * @param index 
     */
    const handleChangePerformance = (e: React.ChangeEvent<HTMLInputElement> | Event & { target: { value: unknown; name: string; }; }, index: number) => {
        performance[index] = parseFloat(e.target.value as string)
        setPerformance(_ => performance)
        const errorMessages = rules.filter(x => x.rule()).map(x => x.message)
        setErrors(errorMessages);
    }

    /**
     * 備考の入力イベントをハンドルします。
     * @param e 
     */
    const handleChangeBiko = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // FIXME 消し終わったあとエラーメッセージが出てこない
        setBiko(e.target.value)
        const errorMessages = rules.filter(x => x.rule()).map(x => x.message)
        setErrors(errorMessages);
    }

    const divRef = useRef<HTMLDivElement>(null)

    const handleWheel:React.WheelEventHandler<HTMLDivElement> = (e) => {
        if(!divRef){
            return
        }
        
        if(divRef.current){
            // divRef.current.scrollLeft += e.deltaY
            divRef.current.scrollTo(
                {
                    left:divRef.current.scrollLeft + e.deltaY
                }
            )
        }
    }

    return (
        <Item sx={{backgroundColor:'white'}}>
            <span style={{ fontSize: 20 }}>
                日次稼働実績（{date.toDate().toLocaleDateString('sv-SE')}）
            </span>
            <div onWheel={handleWheel} style={{display:'flex', width:'80%', height:'90px', marginTop:'50px',overflowX:'scroll', marginLeft:'auto', marginRight:'auto'}}  ref={divRef}>
                {
                    dateInMonthFactory(date.toDate()).map(x => {
                        return (
                            <Box sx={{marginRight:'10px'}}>
                                <Button
                                    variant="contained"
                                    onClick={() => setDate(dayjs(x))}
                                    color={x.getDate() === date.date() ? 'success' : 'primary'}
                                >
                                    {
                                        `${x.getMonth() + 1}/${x.getDate()}
                                                (${getDayJp(x)})`
                                    }
                                </Button>
                            </Box>

                        )
                    })
                }
            </div>
            <div style={{ display: 'flex', marginTop: '50px', height: '80px' }}>
                <div style={{marginLeft:'200px' ,marginRight: 'auto', display: 'block' }}>
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            defaultValue="10:00"
                            helperText="勤務開始時刻"
                            disabled
                        >
                            {time.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            defaultValue="18:30"
                            helperText="勤務終了時刻"
                            sx={{ marginLeft: '20px' }}
                            disabled
                        >
                            {time.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <PjPerformanceList handleChangePerformance={handleChangePerformance} />
                </div>
                <div style={{ marginRight: 'auto', marginTop: '10px', width: '45%', marginLeft: '50px' }}>
                    <TextField
                        id="standard-multiline-static"
                        label="備考"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ width: '100%' }}
                        variant="standard"
                        onChange={handleChangeBiko}
                    />
                    <Shuseijiko errors={errors} />
                    <div style={{ textAlign: 'right' }}>
                        <Button variant='contained'>更新</Button>
                    </div>
                </div>
            </div>
        </Item>
    )
}

const Shuseijiko = ({ errors }: { errors: string[] }) => {

    return (
        <div style={{ marginTop: '50px', textAlign: 'left' }}>
            <label>修正事項</label>
            <p style={{ borderBottom: '1px grey solid', width: '100%' }}>
                {
                    errors.map(x => {
                        return (
                            <span style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
                                {x}
                            </span>
                        )
                    })
                }
            </p>
        </div>
    )
}

/**
 * 指定の月の各日のDateオブジェクトを返します
 * @param date 
 */
const dateInMonthFactory = (date:Date) => {
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const lastDay = (() => {
        if(thirtyDayMonths.find(x => x = month)){
            return 31
        }

        if(month == 2 && new Date(year, 2, 0).getDate() === 29){
            return 29
        }

        if(month == 2){
            return 28
        }
        return 30

    })()

    return range(1, lastDay + 1, 1).map(day => {
        return new Date(year, month - 1, day)
    })
}

const thirtyDayMonths = [
    1,3,5,7,8,10,12
]

const time = [
    {
        value: '10:00',
        label: '10:00'
    },
    {
        value: '11:00',
        label: '11:00'
    },
    {
        value: '12:00',
        label: '12:00'
    },
    {
        value: '13:00',
        label: '13:00'
    },
    {
        value: '14:00',
        label: '14:00'
    },
    {
        value: '15:00',
        label: '15:00'
    },
    {
        value: '16:00',
        label: '16:00'
    },
    {
        value: '17:00',
        label: '17:00'
    },
    {
        value: '18:00',
        label: '18:00'
    },
    {
        value: '18:30',
        label: '18:30'
    },
    {
        value: '19:00',
        label: '19:00'
    },
    {
        value: '20:00',
        label: '20:00'
    },
    {
        value: '21:00',
        label: '21:00'
    },
    {
        value: '22:00',
        label: '22:00'
    },
]