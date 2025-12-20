import TextField from "@mui/material/TextField"
import { Item } from "../../../App"
import MenuItem from "@mui/material/MenuItem"
import { PjPerformanceList } from "../../PjPerformanceList"
import Button from "@mui/material/Button"
import { useState } from "react"
import { sum } from "../../../Utilts"

export const DailyPerformance = () => {

    const [performance, setPerformance] = useState([0, 0, 0])
    const [biko, setBiko] = useState('')
    const [errors, setErrors] = useState<string[]>([]);

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
    const handleChangePerformance = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        performance[index] = parseFloat(e.target.value)
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
    return (

        <Item>
            <span style={{ fontSize: 20 }}>
                日次稼働実績({new Date().toLocaleDateString('sv-SE')})
            </span>
            <div style={{ display: 'flex', marginTop: '10px', height: '80px' }}>
                <div style={{ marginRight: 'auto', display: 'block' }}>
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
                <div style={{ marginRight: 'auto', marginTop: '10px', width: '50%', marginLeft: '50px' }}>
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