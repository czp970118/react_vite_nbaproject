import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils";

interface IProps {
   children: React.ReactElement;
}

const UserRedirect = (props: IProps) => {
   const userStatus = getCookie("userStatus");
   const loginSubject = userStatus ? JSON.parse(userStatus) : {};

   const { status } = loginSubject || {};
   if (!status) {
      return <Navigate to="/" />;
   }

   return props.children;
};

export default UserRedirect;
