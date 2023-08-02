import React, { useContext } from "react";
import { LevelContext } from "./level-context";

interface IProps {
   children: React.ReactNode;
}

function Heading(props: IProps) {
   const { children } = props;
   const level = useContext(LevelContext);

   switch (level) {
      case 1:
         return <h1 style={{ fontSize: "28px" }}>{children}</h1>;
      case 2:
         return <h2 style={{ fontSize: "24px" }}>{children}</h2>;
      case 3:
         return <h3 style={{ fontSize: "20px" }}>{children}</h3>;
      case 4:
         return <h4 style={{ fontSize: "16px" }}>{children}</h4>;
      case 5:
         return <h5 style={{ fontSize: "12px" }}>{children}</h5>;
      case 6:
         return <h6 style={{ fontSize: "8px" }}>{children}</h6>;
      default:
         return null;
   }
}

export default Heading;
