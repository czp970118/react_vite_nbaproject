import React from "react";
import { Card } from "antd";
import { TeamItem } from "../../types";

interface IProps {
   item: TeamItem;
}
const { Meta } = Card;

const TeamCard = (props: IProps) => {
   const { item } = props;

   return (
      <Card
         hoverable
         style={{ width: 276 }}
         cover={
            <img alt="example" style={{ maxHeight: 120, objectFit: "cover" }} src={item.logo} />
         }
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
