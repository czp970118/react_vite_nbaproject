import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useStore } from './hooks';
import UserRedirect from './components/use-redirect';
import BaseLayout from './components/layout';
import TeamCenter from './pages/team-enter';
import TeamInfo from './pages/team-info';
import TeamCards from './pages/team-cards';
import PlayerCards from './pages/player-cards';
import UserInfo from './pages/user-info';
import PlayerInfo from './pages/play-info';
import TeamList from './pages/team-list';
import './App.css'

function App() {
  const { userInfo } = useStore();
  console.log(userInfo)
  return (
    <UserRedirect>
      <div className='contenter'>
        <BaseLayout>
          <Routes>
            <Route path='team/center' element={<TeamCenter />} />
            <Route path='team/info' element={<TeamInfo />} />
            <Route path='team/cards' element={<TeamCards />} />
            <Route path='team/list' element={<TeamList />} />
            <Route path='player/cards' element={<PlayerCards />} />
            <Route path='user/info' element={<UserInfo />} />
            <Route path='player/info' element={<PlayerInfo />} />
          </Routes>
        </BaseLayout>
      </div>
    </UserRedirect>
  )
}

export default App
