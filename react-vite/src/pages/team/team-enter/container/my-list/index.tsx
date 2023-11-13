import React, { useEffect, useState } from "react";
import { Form, Select, Button, Input, Card } from "antd";
import { useAntdTable } from "ahooks";
import { useNavigate } from "react-router-dom";
import { ParttitionData } from "@/constan";

import { getAllTeams } from "@/request/api/team";
import { TeamItem } from "@/types";
import TeamCard from "@/components/team-card";

import "./index.scss";

interface TableParams {
   current: number;
   pageSize: number;
}

export default function MyList() {
   const [form] = Form.useForm();
   const navigate = useNavigate();

   const getTeamList = async ({ current, pageSize }: TableParams) => {
      const res: any = await getAllTeams({ pageSize, pageNum: current });
      const { success, data } = res;
      if (success) return data;
   };

   const { tableProps } = useAntdTable(getTeamList, {
      form,
   });

   const handleClickCard = (id: number) => {
      navigate(`/pages/team/detail/${id}`);
   };

   return (
      <Form className="team-center-wrap" form={form} colon>
         <div className="team-card-list">
            {tableProps?.dataSource?.map((item: TeamItem) => {
               return (
                  <div
                     onClick={() => {
                        handleClickCard(item.teamId);
                     }}
                     key={item.teamId}
                  >
                     <TeamCard item={item} />
                  </div>
               );
            })}
         </div>
      </Form>
   );
}
