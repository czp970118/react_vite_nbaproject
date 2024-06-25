import { useContext } from "react";
import BaseStoreContext from "./context/base-store-context";
import { Route, Routes } from "react-router-dom";
import UserRedirect from "./components/use-redirect";
import BaseLayout from "./components/layout";
import TeamCenter from "./pages/team/team-enter";
import PlayerCards from "./pages/player/player-cards";
import UserInfo from "./pages/user-info";
import PlayerInfo from "./pages/player/player-info";
import TeamList from "./pages/team/team-list";
import TeamCreate from "./pages/team/team-create";
import ContextStudy from "./pages/study/context-study";
import ReducerStudy from "./pages/study/reducer-study";
import RefStudy from "./pages/study/reducer-study/ref-study";
import TeamDetail from "./pages/team/team-detail";
import MobxStudy from "./pages/study/mobx-study";
import "./App.css";

function App() {
   const baseStore = useContext(BaseStoreContext);

   return (
      <UserRedirect>
         <BaseStoreContext.Provider value={baseStore}>
            <div className="contenter">
               <BaseLayout>
                  <Routes>
                     <Route path="team/center" element={<TeamCenter />} />
                     <Route path="team/detail/:id" element={<TeamDetail />} />
                     <Route path="team/list" element={<TeamList />} />
                     <Route path="team/create" element={<TeamCreate />} />
                     <Route path="player/cards" element={<PlayerCards />} />
                     <Route path="user/info" element={<UserInfo />} />
                     <Route path="player/info" element={<PlayerInfo />} />
                     <Route path="study/reducer" element={<ReducerStudy />} />
                     <Route path="study/context" element={<ContextStudy />} />
                     <Route path="study/ref" element={<RefStudy />} />
                     <Route path="study/mobx" element={<MobxStudy />} />
                  </Routes>
               </BaseLayout>
            </div>
         </BaseStoreContext.Provider>
      </UserRedirect>
   );
}

export default App;
