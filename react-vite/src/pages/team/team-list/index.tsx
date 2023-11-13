import React, { useEffect, useState } from "react";
import { Table, Form, Select, Button, Input } from "antd";
import { useAntdTable } from "ahooks";
import { ParttitionData } from "@/constan";
import { ParttitionEnum } from "@/enum";
import { getAllTeams } from "../../../request/api/team";

import "./index.scss";

interface TableParams {
   current: number;
   pageSize: number;
}

const FormItem = Form.Item;

function TeamList() {
   const getTeamList = async ({ current, pageSize }: TableParams) => {
      const res: any = await getAllTeams({ pageSize, pageNum: current });
      const { success, data } = res;
      if (success) return data;
   };

   const { tableProps } = useAntdTable(getTeamList, {
      defaultPageSize: 4,
   });

   const columns = [
      {
         title: "队标",
         dataIndex: "logo",
         align: "center",
         render: (value: string) => {
            const mapPicSrc = new URL(value, import.meta.url).href;
            return <img src={mapPicSrc} alt="" className="team-logo" />;
         },
      },
      {
         title: "球队名称",
         align: "center",
         dataIndex: "team_name",
      },
      {
         title: "所在城市",
         align: "center",
         dataIndex: "city",
      },
      {
         title: "主场球馆",
         align: "center",
         dataIndex: "home_arena",
      },
      {
         title: "所在分区",
         dataIndex: "partition",
         align: "center",
         render: (value: keyof typeof ParttitionEnum) => {
            return ParttitionEnum[value];
         },
      },
      {
         title: "主教练",
         align: "center",
         dataIndex: "manager",
      },
   ];

   return (
      <Form className="team-list-wrap" colon>
         <div className="team-list-filter">
            <div className="filter-item">
               <FormItem label="分区" name="partition" style={{ marginRight: 12 }}>
                  <Select
                     style={{ width: 200 }}
                     options={ParttitionData}
                     placeholder="All"
                     allowClear
                  />
               </FormItem>
               <FormItem label="球队名称" name="teamName">
                  <Input placeholder="请输入球队名称" style={{ width: 200 }} />
               </FormItem>
            </div>
            <FormItem>
               <Button type="primary" style={{ marginRight: 12 }}>
                  Search
               </Button>
               <Button>Reset</Button>
            </FormItem>
         </div>
         <Table {...tableProps} columns={columns} rowKey="team_id" />
      </Form>
   );
}

export default TeamList;
