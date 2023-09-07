import React, { useEffect, useState } from "react";
import { Form, Select, Button, Input } from "antd";
import { useAntdTable } from "ahooks";
import { ParttitionData } from "@/constan";

import { getAllTeams } from "../../../../request/api/team";

import "./index.scss";

interface TableParams {
   current: number;
   pageSize: number;
}

const FormItem = Form.Item;

export default function AllList() {
   const [form] = Form.useForm();

   const getTeamList = async ({ current, pageSize }: TableParams) => {
      const res: any = await getAllTeams({ pageSize, pageNum: current });
      const { success, data } = res;
      if (success) return data;
   };

   const { tableProps, search } = useAntdTable(getTeamList, {
      form,
   });

   const { submit } = search;

   console.log("tableProps", tableProps);

   return (
      <Form className="team-center-wrap" colon>
         <div className="team-center-filter">
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
      </Form>
   );
}
