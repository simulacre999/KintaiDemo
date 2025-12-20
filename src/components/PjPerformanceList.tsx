import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { PjContext } from "../App"
import { use } from "react"

export const PjPerformanceList = ({ handleChangePerformance }: { handleChangePerformance: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void }) => {

  const context = use(PjContext)
  if (!context) {
    return (
      <></>
    )
  }

  const { setting } = context

  return (
    <List dense={false} sx={{ maxHeight: '300px', width: '100%', overflow: 'auto', position: 'relative' }}>
      {
        setting.availablePjs.map((pj, index: number) => {
          return (
            <ListItem key={pj.pj_id} sx={{ width: '100%' }}>
              <ListItemIcon sx={{ width: '100px' }}>
                {pj.pj_name}
              </ListItemIcon>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                helperText="稼働時間を入力してください"
                onChange={(e) => handleChangePerformance(e, index)}
              >
                {performTime.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </ListItem>
          )
        })
      }
    </List>
  )
}

const performTime = [
  {
    value: 0.5,
    label: '0.5H'
  },
  {
    value: 1,
    label: '1H'
  },
  {
    value: 1.5,
    label: '1.5H'
  },
  {
    value: 2,
    label: '2H'
  },
  {
    value: 2.5,
    label: '2.5H'
  },
  {
    value: 3,
    label: '3.5H'
  },
  {
    value: 3.5,
    label: '3.5H'
  },
]