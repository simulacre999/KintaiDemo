import { use } from "react"
import { Item, PjContext } from "../../../App"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import TextField from "@mui/material/TextField"

export const MonthlyPerformance = () => {

    const context = use(PjContext)
    if (!context) {
        return (
            <></>
        )
    }

    const { setting } = context

    return (
        <Item>
            <span style={{ fontSize: 20 }}>
                12月PJ別稼働時間
            </span>
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
        </Item>
    )
}