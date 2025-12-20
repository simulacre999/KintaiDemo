import './App.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createContext, useState } from 'react';
import { SettingModal } from './components/SettingModal';
import type { GetAllPjResponse, PJ } from './api/schema';
import axios from 'axios';
import { worker } from './api/mocks/browser.ts'
import { MonthlyAttendanceWrapper } from './components/widgets/MonthlyAttendance/MonthlyAttendanceWarpper.tsx';
import { DailyPerformance } from './components/widgets/DailyPerformance/DailyPerformance.tsx';
import { MonthlyPerformance } from './components/widgets/MonthlyPerformance/MonthlyPerformance.tsx';
import { Notification } from './components/widgets/Notification/Notification.tsx';

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

  const contextValue = {
    remove,
    add,
    setting:{
      allpj,
      availablePjs
    }
  }

  return (
    <div>
      <header style={{ textAlign: 'right' }}>
        <PjContext value={contextValue}>
          <SettingModal />
        </PjContext>
      </header>
      <Grid container spacing={10} size='grow' >
        <Grid size={{ xs: 7, md: 8 }} sx={{ minHeight: '500px' }} className='hover-card'>
          <PjContext value={contextValue}>
            <DailyPerformance />
          </PjContext>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }} className='hover-card'>
          <PjContext value={contextValue}>
            <MonthlyPerformance/>
          </PjContext>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }} className='hover-card'>
          <MonthlyAttendanceWrapper />
        </Grid>
        <Grid size={{ xs: 6, md: 8 }} className='hover-card'>
          <Notification/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App