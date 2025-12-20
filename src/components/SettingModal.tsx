/**
 * 設定を行うモーダルです
 */
import SettingsIcon from '@mui/icons-material/Settings';
import { Switch, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { use, useState } from 'react';
import { PjContext } from '../App';
import type { PJ } from '../api/schema';

export const SettingModal = () => {
    const [open, setOpen] = useState(false)
    const context = use(PjContext)
    if (!context) {
        return (
            <></>
        )
    }

    const { setting, remove, add } = context

    /**
     * スイッチのトグルイベントをハンドルします
     * @param checked 
     * @param pj_id 
     */
    const handleChange = (checked:boolean ,pj_id:number) => {
        if(checked){
            add(pj_id)
        }else{
            remove(pj_id)
        }
    }

    return (
        <>  
            {
                setting.availablePjs.length ? 
                <button style={{ backgroundColor: 'transparent', marginBottom: '10px', border:'5px' }} onClick={() => setOpen(true)}>
                    <SettingsIcon color='warning' fontSize='large' />
                </button>
                    :
                <Tooltip
                    open
                    title={<span style={{fontSize:14}}>入力するプロジェクトを設定しましょう</span>}
                    enterDelay={200}
                    placement='left'
                >
                    <button className='border-blink' style={{ backgroundColor: 'transparent', marginBottom: '10px'}} onClick={() => setOpen(true)}>
                        <SettingsIcon color='warning' fontSize='large' />
                    </button>
                </Tooltip>
            }
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={{ ...style, width: '20%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>プロジェクト</TableCell>
                                <TableCell align='right'>表示</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                setting.allpj?.map((x: PJ, index:number) => {
                                    return (
                                        <TableRow
                                            key={x.pj_id}
                                        >
                                            <TableCell component='th' scope='row'>
                                                <label htmlFor={`all-pj-${index}`}>
                                                    {x.pj_name}
                                                </label>
                                            </TableCell>
                                            <TableCell component='th' scope='row'>
                                                <Switch
                                                    id={`all-pj-${index}`}
                                                    checked={!!setting.availablePjs.find(y => y.pj_id === x.pj_id)}
                                                    onChange={(_, checked) => handleChange(checked, x.pj_id)}
                                                    slotProps={{ input: { 'aria-label': 'controlled' } }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Modal>
        </>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};