import React from "react";

import "./index.scss";

import img1 from "../../../../../public/img1.png";

export default () => {
   return (
      <div className="container">
         <div className="box-wrap">
            <div className="box">
               <img src={img1} />
            </div>
            <div className="box"></div>
         </div>
      </div>
   );
};
