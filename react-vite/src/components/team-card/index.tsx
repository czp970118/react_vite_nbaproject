import React from "react";
import { Card } from "antd";
import { EditOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { TeamItem } from "../../types";
interface IProps {
   item: TeamItem;
   onEdit: (id: number) => void;
   onFavor: (id: number, favor: boolean) => void;
}
const { Meta } = Card;

const TeamCard = (props: IProps) => {
   const { item, onEdit, onFavor } = props;
   const FavorIcon = item.favor ? HeartFilled : HeartOutlined;
   return (
      <Card
         hoverable
         style={{ width: 276 }}
         cover={
            <img alt="example" style={{ maxHeight: 120, objectFit: "cover" }} src={item.logo} />
         }
         actions={[
            <EditOutlined
               key="edit"
               onClick={() => {
                  onEdit(item.teamId);
               }}
            />,
            <FavorIcon
               onClick={() => {
                  onFavor(item.teamId, !item.favor);
               }}
            />,
         ]}
      >
         <Meta
            title={item?.teamName}
            description={
               <>
                  <div>
                     <span>所在城市:</span>
                     {item?.city}
                  </div>
                  <div>
                     <span>主教练:</span>
                     {item?.manager}
                  </div>
                  <div>
                     <span>主场球馆:</span>
                     {item?.homeArena}
                  </div>
               </>
            }
         />
      </Card>
   );
};

export default TeamCard;
