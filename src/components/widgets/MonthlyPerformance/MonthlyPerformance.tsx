import { use } from "react"
import { Item, PjContext } from "../../../App"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import TextField from "@mui/material/TextField"
import { PieChart } from '@mui/x-charts/PieChart';

const colors = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042'
]

export const MonthlyPerformance = () => {

    const context = use(PjContext)
    if (!context) {
        return (
            <></>
        )
    }

    const { setting } = context

    const data = setting.availablePjs.map((x, index) => {
        return {
            label: x.pj_name,
            value: 40,
            color: colors[index % colors.length]
        }
    })

    const settings = {
        margin: { right: 5 },
        width: 500,
        height: 200,
        hideLegend: false,
    };

    return (
        <Item sx={{ backgroundColor: 'white' }}>
            <span style={{ fontSize: 20 }}>
                {`${new Date().getMonth() + 1}月PJ別稼働時間`}
            </span>
            <div style={{display:'flex', marginLeft:'100px', marginTop:'100px'}}>
                <List dense={false}>
                    {
                        setting.availablePjs.map(pj => {
                            return (
                                <ListItem key={pj.pj_id}>
                                    <ListItemIcon sx={{ width: '100px' }}>
                                        {pj.pj_name}
                                    </ListItemIcon>
                                    <TextField
                                        disabled
                                        id="standard-disabled"
                                        defaultValue="40H"
                                        variant="standard"
                                        slotProps={
                                            {
                                                htmlInput: {
                                                    style: {
                                                        textAlign: 'center'
                                                    }
                                                }
                                            }
                                        }
                                    />
                                </ListItem>
                            )
                        })
                    }
                </List>
                <div style={{ height: '500px', width: '700px'}}>
                    <PieChart sx={{ height: '100px' }}
                        series={
                            [
                                {
                                    innerRadius: 50,
                                    outerRadius: 100,
                                    data: data,
                                    arcLabel: 'value'
                                }
                            ]
                        }
                        {
                        ...settings
                        }
                    />
                </div>
            </div>
        </Item>
    )
}