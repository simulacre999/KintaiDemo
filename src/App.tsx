import './App.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createContext, useState, type JSX} from 'react';
import type { GetAllPjResponse, GetMonthlyAttendanceResponse, PJ } from './api/schema';
import axios from 'axios';
import { worker } from './api/mocks/browser.ts'
import { DailyPerformance } from './components/widgets/DailyPerformance/DailyPerformance.tsx';
import { MonthlyPerformance } from './components/widgets/MonthlyPerformance/MonthlyPerformance.tsx';
import { Notification } from './components/widgets/Notification/Notification.tsx';
import { Header } from './components/Header.tsx';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { MonthlyAttendanceTable } from './components/widgets/MonthlyAttendance/MonthlyAttendanceTable.tsx';
import DataUsage from '@mui/icons-material/DataUsage';
import Today from '@mui/icons-material/Today';
import BorderColor from '@mui/icons-material/BorderColor';
import NotificationsActive from '@mui/icons-material/NotificationsActive';

await worker.start()

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F6F6F6',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: '100%',
  height: '100%',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#F6F6F6',
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
type SelectedCompoentState = {
  index:number,
  component:JSX.Element
}

export const PjContext = createContext<PjContextType | null>(null)

//TODO:ここでawaitしない
const allpj = ((await axios.get('http://localhost:8080/api/pj/all')).data as GetAllPjResponse).pjs

function App() {

  const [availablePjs, setPjs] = useState<PJ[]>([])
  const [selectedComponent, setComponent] = useState<SelectedCompoentState>({index:0,component:<DailyPerformance/>})

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

  type SideBarMenu = {
    title:string,
    handler:(index:number) => void,
    icon:JSX.Element
  }
  const manuConfig:SideBarMenu[] =  [
    {
      title:'日時作業実績',
      handler:(index)=> setComponent({index ,component:<DailyPerformance/>}),
      icon:<BorderColor/>
    },
    {
      title:'月次勤怠',
      handler:async (index:number)=>{
        //TODO:ここでawaitするな
        const data = (await axios.get('http://localhost:8080/api/attendance/monthly')).data as GetMonthlyAttendanceResponse
        setComponent(
          {
            index,
            component:<MonthlyAttendanceTable response={data} />
          }
        )
      },
      icon:<Today/>
    },
    {
      title:'月次作業実績' ,
      handler:(index:number) => {
        setComponent(
          {
            index,
            component:<MonthlyPerformance/>
          }
        )
      },
      icon:<DataUsage/>
    },
    {
      title:'お知らせ',
      handler:(index: number) => 
      {
        setComponent(
          {
            index,
            component:<Notification/>
          }
        )
      },
      icon:<NotificationsActive/>
    }
  ]

  return (
    <>
      <PjContext value={contextValue}>
        <Header/>
      </PjContext>
      <div style={{display:'flex'}}>
        <Drawer open variant="permanent" sx={{height:'850px', backgroundColor:'grey'}}> 
          <List sx={{marginTop:'90px', width:'200px',height:'100%' ,backgroundColor:'#f8f8f8'}}>
              {
                manuConfig.map((x, index) => {
                  return (
                    <ListItem>
                      <ListItemButton
                        style={
                          {
                            backgroundColor:index === selectedComponent.index ? '#223b6c' : '',
                            color:index === selectedComponent.index ? 'white' : '',
                            borderRadius:index === selectedComponent.index ? '5%' : ''
                          }
                        }
                        onClick={() => x.handler(index)}>
                        <ListItemText
                          primary={x.title}
                        />
                        {x.icon}
                      </ListItemButton>
                    </ListItem>
                  )
                })
              }
          </List>
        </Drawer>
        <Grid container size='grow' sx={{maxWidth:'1720px', marginLeft:'200px', height:'600px', marginTop:'250px', backgroundColor:'white'}}>
          <PjContext value={contextValue}>
            {selectedComponent.component} 
          </PjContext>
        </Grid>
        {/* <Grid container spacing={10} size='grow' >
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
        </Grid> */}
      </div>
    </>
  );
}

export default App