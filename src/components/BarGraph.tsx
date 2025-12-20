import Tooltip from "@mui/material/Tooltip"
import { sum } from "../Utilts"

type Setting = {
    width:string,
    data:Data[]
}

type Data = {
    label:string,
    value:number
}

/**
 * 帯グラフを表現します。
 */
export const BarGraph = ({setting}:{setting:Setting}) => {

    const total = sum(setting.data.map(x => x.value))
    const data = setting.data.sort((x,y) => y.value - x.value)
        .map(x => {
            return {
                ...x,
                rate:(x.value / total) * 100
            }
        })

    return (
        <div style={{width:setting.width, height:'30px', display:'flex'}}>
            {
                data.map((x, index:number) => {
                    return (
                        <Tooltip title={`${x.label}:${x.value}H`}>
                            <div style={{height:'30px', width:`${x.rate}%`, backgroundColor:colors[index]}}>
                            </div>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}

const colors = [
    '#EBF8FF',
    '#4299E1',
    '#1A365D'
]