import React from "react";
import { LevelContext } from "./level-context";
import "./index.scss";

const Section = ({ children, value }) => {
   return (
      <div className="section-wrap">
         <LevelContext.Provider value={value}>{children}</LevelContext.Provider>
      </div>
   );
};

export default Section;
