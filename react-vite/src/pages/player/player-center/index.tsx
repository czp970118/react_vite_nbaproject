import React, { useEffect, useState } from "react";
import http from "@/request/http";
import PlayerCard from "./player-card.tsx";

import "./index.scss";

function PlayerCnter() {
   const [players, setPlayers] = useState<any>();
   const getPlayers = async (formValues?: any) => {
      const res: any = await http("get", "/api/getAllPlayers", {
         current: 1,
         pageSize: 10,
         teamId: 1,
         ...formValues,
      });
      const { success, data, total } = res;
      console.log("res--->", res);
      if (success) {
         setPlayers(data);
         return {
            list: data,
            total: total,
         };
      }
      return {
         list: [],
         total: 0,
      };
   };

   useEffect(() => {
      getPlayers();
   }, []);

   console.log("players--->", players);

   return <div className="player-card-wrap">{/* <PlayerCard player={players} /> */}</div>;
}

export default PlayerCnter;
