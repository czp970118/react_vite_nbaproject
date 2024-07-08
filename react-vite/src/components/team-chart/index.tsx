import React from "react";
import { LineChart } from "bizcharts";

import "./index.scss";

export default () => {
   // 数据源
   const data = [
      { year: "2016", value: 73 },
      { year: "2017", value: 65 },
      { year: "2018", value: 56 },
      { year: "2019", value: 55 },
      { year: "2020", value: 42 },
      { year: "2021", value: 54 },
      { year: "2022", value: 50 },
      { year: "2023", value: 49 },
      { year: "2024", value: 47 },
   ];

   return (
      <div className="team-chart">
         <LineChart
            height={250}
            width={450}
            data={data}
            title={{
               visible: true,
               text: "战绩统计",
            }}
            xField="year"
            yField="value"
            interactions={[
               {
                  type: "slider",
                  cfg: {
                     start: 0,
                     end: 1,
                  },
               },
            ]}
         />
      </div>
   );
};
