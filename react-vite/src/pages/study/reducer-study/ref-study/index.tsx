import { useEffect, useState } from "react";
import VideoPlay from "./video-play";
import { Divider } from "antd";
import Test from "./test";

import "./index.scss";

function RefStudy() {
   const [count, setCount] = useState<number>(0);

   const handleClick = () => {
      setCount(count + 1);
      console.log("第一次count", count);
      setCount(count + 1);
      console.log("第二次count", count);
      setTimeout(() => {
         setCount(count + 1);
         console.log("第三次count", count);
         setCount(count + 1);
         console.log("第四次count", count);
      });
   };

   // const a = Number(null);
   // const b = Number(undefined);

   // console.log("a--->", a);
   // console.log("b--->", b);

   function test(persion) {
      persion.age = 18;
      persion = {
         name: "czp",
         age: 26,
      };
      return persion;
   }
   const p1 = {
      name: "st",
      age: 25,
   };

   const p2 = test(p1);
   // console.log("p1--->", p1);
   // console.log("p2--->", p2);

   return (
      <div>
         <span onClick={handleClick}>
            当一条信息用于渲染时，将它保存在 state
            中。当一条信息仅被事件处理器需要，并且更改它不需要重新渲染时，使用 ref 可能会更高效。
         </span>
         <span>{count}</span>
         {/* <Test /> */}
         <VideoPlay />
         <Divider />
      </div>
   );
}

export default RefStudy;
