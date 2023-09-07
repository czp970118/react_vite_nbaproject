import { useContext } from "react";
import BaseStoreContext from "./context/base-store-context";
import { Route, Routes } from "react-router-dom";
import UserRedirect from "./components/use-redirect";
import BaseLayout from "./components/layout";
import TeamCenter from "./pages/team-enter";
import TeamInfo from "./pages/team-info";
import TeamCards from "./pages/team-cards";
import PlayerCards from "./pages/player-cards";
import UserInfo from "./pages/user-info";
import PlayerInfo from "./pages/play-info";
import TeamList from "./pages/team-list";
import ContextStudy from "./pages/context-study";
import ReducerStudy from "./pages/reducer-study";
import RefStudy from "./pages/ref-study";
import TeamDetail from "./pages/team-detail";
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
                     <Route path="team/info" element={<TeamInfo />} />
                     <Route path="team/cards" element={<TeamCards />} />
                     <Route path="team/detail/:id" element={<TeamDetail />} />
                     <Route path="team/list" element={<TeamList />} />
                     <Route path="player/cards" element={<PlayerCards />} />
                     <Route path="user/info" element={<UserInfo />} />
                     <Route path="player/info" element={<PlayerInfo />} />
                     <Route path="study/reducer" element={<ReducerStudy />} />
                     <Route path="study/context" element={<ContextStudy />} />
                     <Route path="study/ref" element={<RefStudy />} />
                  </Routes>
               </BaseLayout>
            </div>
         </BaseStoreContext.Provider>
      </UserRedirect>
   );
}

export default App;
