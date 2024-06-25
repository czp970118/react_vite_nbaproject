import { Form } from "antd";
import { useAntdTable } from "ahooks";
import { useNavigate } from "react-router-dom";
import { getAllTeams } from "@/request/api/team";
import { TeamItem } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
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

   const handleClickCreate = () => {
      navigate(`/pages/team/create`);
   };

   return (
      <Form className="team-center-wrap" form={form} colon>
         <div className="team-card-list">
            <div className="team-card-wrap create-btn" onClick={handleClickCreate}>
               <PlusOutlined style={{ fontSize: "30px", marginBottom: 12 }} />
               <span>创建球队</span>
            </div>
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
