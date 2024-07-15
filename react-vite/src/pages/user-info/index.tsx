import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../request/api/user";

import "./index.scss";

function UserInfo() {
   const [userInfo, setUserInfo] = useState();

   // const get

   useEffect(() => {
      getUserInfo("czp").then((res) => {
         console.log("res==>", res);
      });
   }, []);

   return <div>UserInfo</div>;
}

export default UserInfo;
