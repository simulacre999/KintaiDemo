import List from "@mui/material/List"
import { Item } from "../../../App"
import ListItem from "@mui/material/ListItem"

export const Notification = () => {
    return (
        <Item>
            <List sx={{ marginLeft: '50px' }}>
                <ListItem>
                    12/01の稼働実績が未入力です!
                </ListItem>
                <ListItem>
                    12/02の稼働実績が未入力です!
                </ListItem>
            </List>
        </Item>
    )
}