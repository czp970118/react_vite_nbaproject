import { useState, useRef } from "react";

const timeDifference = (targetTime: number) => {
   if (!targetTime) return;
   const nowDate = Date.now();
   const differenceTime = targetTime - nowDate;
   if (differenceTime > 0) {
      const days = Math.floor(differenceTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor((differenceTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((differenceTime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((differenceTime % (60 * 1000)) / 1000);
      return { days, hours, minutes, seconds };
   } else {
      return { day: 0, hour: 0, minutes: 0, seconds: 0 };
   }
};

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

{
   /* <div className="container">
   <p>tet</p>
   <img src={imgSrc} />
</div>;

React.createElement(
   "div",
   {
      className: "container",
   },
   React.createElement("p", null, "test"),
   React.createElement("img", { src: "imgSrc" })
);

const styleData = { fontSize: "20px", color: "#f00" };
const styleElem = <p style={styleData}>设置style</p>;

React.createElement("p", { style: styleData }, "设置style"); */
}
