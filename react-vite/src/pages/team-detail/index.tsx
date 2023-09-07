import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import http from "@/request/http";
import { TeamItem } from "@/types";

import "./index.scss";

interface TeamDetailType extends TeamItem {}

function TeamDetail() {
   const params = useParams();
   const { id } = params || {};

   const [teamDetail, setTeamDetail] = useState<TeamDetailType>();
   const [loading, setLoading] = useState<boolean>(false);

   const getTeamDetail = async (id) => {
      setLoading(true);
      const res: any = await http("get", "/api/getTeamDetails", { id });
      const { success, data } = res;
      if (success) {
         setTeamDetail(data);
      }
      setLoading(false);
   };

   console.log("teamDetail", teamDetail);

   useEffect(() => {
      getTeamDetail(Number(id));
   }, []);

   return (
      <Spin spinning={loading}>
         <div>
            <div className="team-detail-top">
               <div className="team-detail-info">
                  <div className="team-logo">
                     <img src={teamDetail?.logo} />
                  </div>
                  <div className="team-detail-container">
                     <span className="team-detail-title">{teamDetail?.teamName}</span>
                  </div>
               </div>
            </div>
         </div>
      </Spin>
   );
}

export default TeamDetail;
