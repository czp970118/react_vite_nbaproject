import { useContext } from "react";
import BaseStoreContext from "./context/base-store-context";
import { Route, Routes } from "react-router-dom";
import UserRedirect from "./components/use-redirect";
import BaseLayout from "./components/layout";
import TeamCenter from "./pages/team/team-enter";
import PlayerCards from "./pages/player/player-cards";
import UserInfo from "./pages/user-info";
import PlayerCenter from "./pages/player/player-center";
import TeamCreate from "./pages/team/team-create";
import ContextStudy from "./pages/study/context-study";
import TeamDetail from "./pages/team/team-detail";
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
                     <Route path="team/create" element={<TeamCreate />} />
                     <Route path="player/cards" element={<PlayerCards />} />
                     <Route path="user/info" element={<UserInfo />} />
                     <Route path="player/center" element={<PlayerCenter />} />
                     <Route path="study/context" element={<ContextStudy />} />
                  </Routes>
               </BaseLayout>
            </div>
         </BaseStoreContext.Provider>
      </UserRedirect>
   );
}

export default App;
