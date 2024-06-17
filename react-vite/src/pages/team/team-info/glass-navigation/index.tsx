import React, { useState } from "react";
import {
   HomeOutlined,
   UserOutlined,
   CarryOutOutlined,
   SettingOutlined,
   MessageOutlined,
} from "@ant-design/icons";

import "./index.scss";

const tabData = [
   <HomeOutlined />,
   <UserOutlined />,
   <CarryOutOutlined />,
   <SettingOutlined />,
   <MessageOutlined />,
];

function GlassNavigation(props: any) {
   const [left, setLeft] = useState("50%");
   const [width, setWidth] = useState("50px");

   const onMouseMove = (e) => {
      console.log("e", e);
      setLeft(e.clientX - 578 + "px");
      setWidth(e.targer.offsetWidth + "px");
   };

   return (
      <div className="container">
         <div className="team-wrap">
            <ul className="tab-wrap">
               {tabData.map((icon) => {
                  return <li onMouseMove={onMouseMove}>{icon}</li>;
               })}
               <div id="mark" style={{ left, width }} />
            </ul>
         </div>
      </div>
   );
}

export default GlassNavigation;
