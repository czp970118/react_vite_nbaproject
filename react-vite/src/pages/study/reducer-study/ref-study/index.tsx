import VideoPlay from "./video-play";
import { Divider } from "antd";

import "./index.scss";

function RefStudy() {
   return (
      <div>
         <span>
            当一条信息用于渲染时，将它保存在 state
            中。当一条信息仅被事件处理器需要，并且更改它不需要重新渲染时，使用 ref 可能会更高效。
         </span>
         <VideoPlay />
         <Divider />
      </div>
   );
}

export default RefStudy;
