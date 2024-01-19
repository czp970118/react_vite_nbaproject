import React, { useState, useRef } from "react";
import { timeDifference } from ".";

export default () => {
   let timerRef = useRef(0);
   const targetTime = new Date("2023-12-01 12:00:00").getTime();
   const [differenceTime, setDifferenceTime] = useState(timeDifference(targetTime));

   const { days, hours, minutes, seconds } = differenceTime;

   timerRef = setTimeout(() => {
      clearTimeout(timerRef);
      setDifferenceTime(timeDifference(targetTime));
   }, 1000);

   return (
      <div>
         <span>{`${days}天`}</span>
         <span>{`${hours}小时`}</span>
         <span>{`${minutes}分`}</span>
         <span>{`${seconds}秒`}</span>
      </div>
   );
};
