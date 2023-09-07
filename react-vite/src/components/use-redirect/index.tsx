import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils";

interface IProps {
   children: React.ReactElement;
}

const UserRedirect = (props: IProps) => {
   const loginStatus = getCookie("loginStatus");
   const loginSubject = loginStatus ? JSON.parse(loginStatus) : {};

   const { status } = loginSubject || {};
   console.log("status", status);
   if (!status) {
      return <Navigate to="/" />;
   }

   return props.children;
};

export default UserRedirect;
