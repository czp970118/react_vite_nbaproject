import { useState, useEffect, useContext } from "react";
import { Tabs, Form, Select, Input, Button, Pagination, Spin } from "antd";
import { TeamItem, TeamCenterKeyEnum, TabKey } from "@/types";
import BaseStoreContext from "@/context/base-store-context";
import { getAllTeams } from "@/request/api/team";
import TeamList from "./team-list";
import { PARTTITION_DATA } from "@/constan";
import "./index.scss";
const FormItem = Form.Item;
function TeamCenter() {
   const baseStore = useContext(BaseStoreContext);
   const { userInfo } = baseStore || {};
   const { id: userId } = userInfo || {};
   const [activeKey, setActiveKey] = useState<TabKey>(TeamCenterKeyEnum.ALL);
   const [dataSource, setDataSource] = useState<TeamItem[]>();
   const [current, setCurrent] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(10);
   const [total, setTotal] = useState<number>();
   const [spinning, setSpinning] = useState<boolean>(false);

   const onTabChange = (key: string) => {
      setActiveKey(key as TabKey);
   };

   const getTeamList = async () => {
      const params = {
         pageSize,
         pageNum: current,
         teamScope: activeKey,
         userId,
      };
      setSpinning(true);
      const res: any = await getAllTeams(params);
      const { success, data } = res;
      if (success) {
         setDataSource(data.list);
         setTotal(data.total);
      } else {
         setDataSource([]);
      }
      setSpinning(false);
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
               <div className="team-center-filter">
                  <div className="filter-items">
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
                  </div>
                  <FormItem>
                     <Button
                        type="primary"
                        style={{ marginRight: 12 }}
                        onClick={() => {
                           // onFilter();
                        }}
                     >
                        Search
                     </Button>
                     <Button>Reset</Button>
                  </FormItem>
               </div>
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
