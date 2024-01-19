import React from "react";
import { HeadFilter } from "./components/head-filter";

export default () => {
   class Persion {}
   class Student extends Persion {}
   const student = new Student();

   console.log(student instanceof Student);
   console.log(student instanceof Persion);

   const toString = Object.prototype.toString;

   return (
      <div>
         <HeadFilter />
      </div>
   );
};
