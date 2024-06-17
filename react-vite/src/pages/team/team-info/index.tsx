import React, { useState } from "react";
import { Tabs } from "antd";
import GlassNavigation from "./glass-navigation";
import PictureHovering from "./picture-hovering";

import "./index.scss";

const tabItems = [
   {
      key: "1",
      label: "玻璃导航",
      children: <GlassNavigation />,
   },
   {
      key: "2",
      label: "图片悬停",
      children: <PictureHovering />,
   },
];

function TeamInfo(props: any) {
   return (
      <div className="page-warp">
         <Tabs items={tabItems} style={{ width: "100%", height: "100%" }} />
      </div>
   );
}

export default TeamInfo;
