import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import MenuItem from "@mui/material/MenuItem"
import { PjContext } from "../App"
import { use } from "react"
import { range } from "../Utilts"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Select from "@mui/material/Select"


export const PjPerformanceList = ({ handleChangePerformance }: { handleChangePerformance: (e: React.ChangeEvent<HTMLInputElement> | Event & { target: { value: unknown; name: string; }; }, index: number) => void }) => {

  const context = use(PjContext)
  if (!context) {
    return (
      <></>
    )
  }

  const { setting } = context

  return (
    <List dense={false} sx={{ maxHeight: '250px', width: '100%', overflow: 'auto', position: 'relative' }}>
      {
        setting.availablePjs.map((pj, index: number) => {
          return (
            <ListItem key={pj.pj_id} sx={{ width: '100%' }}>
              <ListItemIcon sx={{ width: '100px' }}>
                {pj.pj_name}
              </ListItemIcon>
              <FormControl
                sx={{m:1, width:'200px'}}
              >
                <FormHelperText>稼働実績を入力してください</FormHelperText>
                <Select
                  labelId={`select-daily-performance-${index}`}
                  onChange={(e) => handleChangePerformance(e, index)}
                  MenuProps={
                    {
                      PaperProps:{
                        style:{
                          maxHeight:'200px'
                        }
                      }
                    }
                  }
                >
                  {performTime.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          )
        })
      }
    </List>
  )
}

const performTime = range(0, 24, 0.25).map(x => {
  return {
    value:x,
    label:`${x}H`
  }
})