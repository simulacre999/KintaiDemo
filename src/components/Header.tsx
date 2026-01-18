import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { SettingModal } from "./SettingModal";

export const Header = () => {
    return (
        <AppBar position="fixed" sx={{
            width:'100%',
            backgroundColor:'#223b6c',
            zIndex:1500
        }}>
            <Toolbar >
                <IconButton>
                    <MenuIcon style={{color:'white'}}/>
                </IconButton>
                <Typography color="white" variant="h5">
                    作業実績管理
                </Typography>
                <SettingModal />
            </Toolbar>
        </AppBar>
    )
}