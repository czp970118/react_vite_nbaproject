import React, { useEffect, useState } from "react";
import { Spin, Table, Form } from "antd";
import { useParams } from "react-router-dom";
import http from "@/request/http";
import { TeamItem, TableParams } from "@/types";
import { ParttitionEnum, CourtPositionEnum } from "@/enum";
import { useAntdTable } from "ahooks";
import HeadFilter from "@/components/head-filter";

import "./index.scss";

interface TeamDetailType extends TeamItem {}

const columns = [
   {
      title: "姓名",
      dataIndex: "name",
      align: "center",
   },
   {
      title: "年龄",
      align: "center",
      dataIndex: "age",
   },
   {
      title: "号码",
      align: "center",
      dataIndex: "number",
   },
   {
      title: "位置",
      align: "center",
      dataIndex: "position",
      render: (text: string) => {
         const positionArr = text?.split("/") || [];
         return positionArr.map((item, index) => {
            return `${index > 0 ? "/" : ""}${CourtPositionEnum[item]} `;
         });
      },
   },
   {
      title: "能力值",
      align: "center",
      dataIndex: "capability",
   },
];

function TeamDetail() {
   const params = useParams();
   const { id } = params || {};
   const [form] = Form.useForm();

   const [teamDetail, setTeamDetail] = useState<TeamDetailType>();
   const [loading, setLoading] = useState<boolean>(false);

   const getTeamDetail = async (id: number) => {
      setLoading(true);
      const res: any = await http("get", "/api/getTeamDetails", { id });
      const { success, data } = res;
      if (success) {
         setTeamDetail(data);
      }
      setLoading(false);
   };

   const getPlayers = async ({ current, pageSize }: TableParams, formValues) => {
      const res: any = await http("get", "/api/getAllPlayers", {
         current,
         pageSize,
         teamId: id,
         ...formValues,
      });
      const { success, data, total } = res;
      if (success) {
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
      getTeamDetail(Number(id));
   }, []);

   const { tableProps, search } = useAntdTable(getPlayers, { form });

   const { submit } = search;

   return (
      <Spin spinning={loading}>
         <Form form={form} onFinish={submit}>
            <div className="team-detail-container">
               <div className="team-detail-top">
                  <div className="team-detail-info">
                     <div className="team-logo-wrap">
                        <img src={teamDetail?.logo} className="team-logo" />
                     </div>
                     <div className="team-info">
                        <span className="team-detail-title">{teamDetail?.teamName}</span>
                        <div className="team-info-item">
                           <span className="team-info-item-label">主教练:</span>
                           <span className="team-info-item-text">{teamDetail?.manager}</span>
                        </div>
                        <div className="team-info-item">
                           <span className="team-info-item-label">主场球馆:</span>
                           <span className="team-info-item-text">{teamDetail?.homeArena}</span>
                        </div>
                        <div className="team-info-item">
                           <span className="team-info-item-label">所在城市:</span>
                           <span className="team-info-item-text">{teamDetail?.city}</span>
                        </div>
                        <div className="team-info-item">
                           <span className="team-info-item-label">所在分区:</span>
                           <span className="team-info-item-text">
                              {ParttitionEnum[teamDetail?.partition as keyof typeof ParttitionEnum]}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="team-player-table">
                  <HeadFilter
                     fieldItems={[
                        {
                           name: "name",
                           label: "姓名",
                        },
                     ]}
                  />
                  <Table style={{ width: "100%" }} {...tableProps} columns={columns} rowKey="id" />
               </div>
            </div>
         </Form>
      </Spin>
   );
}

export default TeamDetail;
