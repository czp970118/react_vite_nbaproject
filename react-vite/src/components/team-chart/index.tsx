import React from "react";
import { LineChart } from "bizcharts";

import "./index.scss";

export default () => {
   // 数据源
   const data = [
      { year: "2016", win: 73, lose: 10 },
      { year: "2017", win: 65, lose: 18 },
      { year: "2018", win: 56, lose: 27 },
      { year: "2019", win: 55, lose: 28 },
      { year: "2020", win: 42, lose: 40 },
      { year: "2021", win: 54, lose: 29 },
      { year: "2022", win: 50, lose: 33 },
      { year: "2023", win: 49, lose: 34 },
      { year: "2024", win: 47, lose: 36 },
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
            yField="win"
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
