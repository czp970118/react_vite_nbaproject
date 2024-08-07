import { Empty, Typography, Button } from "antd";
import TeamCard from "@/components/team-card";
import { TeamItem } from "@/types";
import { useNavigate } from "react-router-dom";
import "./index.scss";

interface IProps {
   dataSource?: TeamItem[];
   onCreate?: () => void;
   onFavor: (id: number, favor: boolean) => void;
}

export default (props: IProps) => {
   const { dataSource, onCreate, onFavor } = props;
   const navigate = useNavigate();

   const onEditClick = (teamId: number) => {
      navigate(`/pages/team/detail/${teamId}`);
   };

   return (
      <div className="team-wrap">
         {dataSource?.length ? (
            <div className="team-card-list">
               {/* <div className="team-card-wrap create-btn" onClick={onCreate}>
                     <PlusOutlined style={{ fontSize: "30px", marginBottom: 12 }} />
                     <span>创建球队</span>
                  </div> */}
               {dataSource.map((item) => {
                  return (
                     <div className="card-wrap" key={item.teamId}>
                        <TeamCard item={item} onEdit={onEditClick} onFavor={onFavor} />
                     </div>
                  );
               })}
            </div>
         ) : (
            <Empty
               image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
               imageStyle={{ height: 60 }}
               description={
                  <Typography.Text>
                     Customize <a href="#API">Description</a>
                  </Typography.Text>
               }
            >
               <Button type="primary">Create Now</Button>
            </Empty>
         )}
      </div>
   );
};
