import './App.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, List, ListItem, ListItemIcon, MenuItem, TextField } from '@mui/material';
import React, { createContext, useState } from 'react';
import { sum } from './Utilts';
import { SettingModal } from './components/SettingModal';
import type { GetAllPjResponse, PJ } from './api/schema';
import axios from 'axios';
import { worker } from './api/mocks/browser.ts'
import { PjPerformanceList } from './components/PjPerformanceList.tsx';
import { MonthlyAttendanceWrapper } from './components/widgets/MonthlyAttendance/MonthlyAttendanceWarpper.tsx';

await worker.start()

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: '100%',
  height: '100%',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

/**
 * 入力ルール
 */
type Rule = {
  rule: boolean,
  message: string
}

/**
 * PJ一覧など共有するコンテキスト
 * @returns 
 */
type PjSetting = {
  allpj: PJ[],
  availablePjs: PJ[]
}

type PjContextType = {
  setting: PjSetting,
  remove: (pjId: number) => void,
  add: (pjId: number) => void
}
export const PjContext = createContext<PjContextType | null>(null)

//TODO:ここでawaitしない
const allpj = ((await axios.get('http://localhost:8080/api/pj/all')).data as GetAllPjResponse).pjs

function App() {
  const [performance, setPerformance] = useState([0, 0, 0])
  const [biko, setBiko] = useState('')
  const [errors, setErrors] = useState<string[]>([]);

  const [availablePjs, setPjs] = useState<PJ[]>([])

  /**
   * 入力可能なプロジェクトを削除します。
   * @param pjId 
   */
  const remove = (pjId: number) => {
    const newAvailablePjs = availablePjs.filter(x => x.pj_id !== pjId)
    setPjs(newAvailablePjs)
  }

  /**
   * 入力可能なプロジェクトを追加します。
   * @param pjId 
   */
  const add = (pjId: number) => {
    const pj = allpj.filter(x => x.pj_id === pjId)
    setPjs([...availablePjs, ...pj])
  }

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
    <div>
      <header style={{ textAlign: 'right' }}>
        <PjContext value={
          {
            setting: {
              allpj,
              availablePjs
            },
            remove,
            add
          }
        }
        >
          <SettingModal />
        </PjContext>
      </header>
      <Grid container spacing={10} size='grow' >
        <Grid size={{ xs: 7, md: 8 }} sx={{ minHeight: '500px' }} className='hover-card'>
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
                <PjContext value={
                  {
                    setting: {
                      allpj,
                      availablePjs
                    },
                    remove,
                    add
                  }
                }
                >
                  <PjPerformanceList />
                </PjContext>
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
        </Grid>
        <Grid size={{ xs: 6, md: 4 }} className='hover-card'>
          <Item>
            <span style={{ fontSize: 20 }}>
              12月PJ別稼働時間
            </span>
            <List dense={false}>
              {
                availablePjs.map(pj => {
                  return (
                    <ListItem>
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
        </Grid>
        <Grid size={{ xs: 6, md: 4 }} className='hover-card'>
            <MonthlyAttendanceWrapper/>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }} className='hover-card'>
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
        </Grid>
      </Grid>
    </div>
  );
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

export default App

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