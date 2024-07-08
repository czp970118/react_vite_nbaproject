import React from "react";
import { Image } from "antd";
import "./index.scss";

const PlayerCard = (props) => {
   const { player } = props;
   const { avatar, name, introduction } = player || {};
   return (
      <div className="player-card">
         <Image src={avatar} preview={false} className="player-avatar" />
         <p>{name}</p>
         <p>{introduction}</p>
         <p>了解更多</p>
      </div>
   );
};

export default PlayerCard;
