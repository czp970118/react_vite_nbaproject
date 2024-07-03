import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllList from "./container/all-list";
import MyList from "./container/my-list";

import "./index.scss";

const ALL = "all";
const MY = "my";

function TeamCenter() {
   const items: TabsProps["items"] = [
      {
         key: ALL,
         label: "所有球队",
         children: <AllList />,
      },
      {
         key: MY,
         label: "我的球队",
         children: <MyList />,
      },
   ];

   return (
      <div>
         <Tabs
            style={{ background: "#FFF", padding: 16, height: "100%", overflowY: "scroll" }}
            defaultActiveKey={ALL}
            items={items}
         />
      </div>
   );
}

export default TeamCenter;
