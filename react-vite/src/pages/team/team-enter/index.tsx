import { useState, useEffect, useContext } from "react";
import { Tabs, Form, Select, Input, Button, Pagination, Spin } from "antd";
import { TeamItem, TeamCenterKeyEnum, TabKey } from "@/types";
import BaseStoreContext from "@/context/base-store-context";
import { getAllTeams, getTeamsWithUserId } from "@/request/api/team";
import TeamList from "./team-list";
import { PARTTITION_DATA } from "@/constan";
import "./index.scss";
const FormItem = Form.Item;
function TeamCenter() {
   const baseStore = useContext(BaseStoreContext);
   const { userInfo } = baseStore || {};
   const { id: userId } = userInfo || {};
   const [form] = Form.useForm();
   const [activeKey, setActiveKey] = useState<TabKey>(TeamCenterKeyEnum.ALL);
   const [dataSource, setDataSource] = useState<TeamItem[]>();
   const [current, setCurrent] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(10);
   const [total, setTotal] = useState<number>();
   const [spinning, setSpinning] = useState<boolean>(false);

   const onTabChange = (key: string) => {
      setActiveKey(key as TabKey);
   };

   const getTeamList = async (formValues?: any) => {
      let params = {
         pageSize,
         pageNum: current,
         ...formValues,
      };
      if (activeKey === TeamCenterKeyEnum.MY) {
         params.userId = userId;
      }
      setSpinning(true);
      const res: any =
         activeKey === TeamCenterKeyEnum.MY
            ? await getTeamsWithUserId(params)
            : await getAllTeams(params);
      const { success, data } = res;
      if (success) {
         setDataSource(data.list);
         setTotal(data.total);
      } else {
         setDataSource([]);
      }
      setSpinning(false);
   };

   const onSearch = () => {
      const currentFormValues = form.getFieldsValue();
      setCurrent(1);
      getTeamList(currentFormValues);
   };

   useEffect(() => {
      getTeamList();
   }, [activeKey]);

   return (
      <div className="team-center">
         <Tabs
            className="team-tabs"
            activeKey={activeKey}
            onChange={onTabChange}
            tabBarExtraContent={
               <Form className="team-center-filter" form={form}>
                  <FormItem label="分区" name="partition" style={{ marginRight: 12 }}>
                     <Select
                        style={{ width: 200 }}
                        options={PARTTITION_DATA}
                        placeholder="All"
                        allowClear
                     />
                  </FormItem>
                  <FormItem label="球队名称" name="teamName">
                     <Input placeholder="请输入球队名称" style={{ width: 200 }} />
                  </FormItem>
                  <FormItem>
                     <Button type="primary" className="search-btn" onClick={onSearch}>
                        Search
                     </Button>
                     <Button
                        onClick={() => {
                           form.resetFields();
                        }}
                     >
                        Reset
                     </Button>
                  </FormItem>
               </Form>
            }
         >
            <Tabs.TabPane key={TeamCenterKeyEnum.ALL} tab="所有球队" />
            <Tabs.TabPane key={TeamCenterKeyEnum.MY} tab="我的球队" />
         </Tabs>
         <Spin spinning={spinning}>
            <TeamList dataSource={dataSource} />
         </Spin>
         <Pagination
            className="team-center-pagination"
            total={total}
            current={current}
            showSizeChanger
            showQuickJumper
         />
      </div>
   );
}

export default TeamCenter;
