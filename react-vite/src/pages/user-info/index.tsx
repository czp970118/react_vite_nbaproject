import React, { useContext, useState, useEffect } from "react";
import BaseStoreContext from "@/context/base-store-context";
import UploadImage from "@/components/upload";
import { Form, Input } from "antd";

import "./index.scss";

function UserInfo() {
   const baseStore = useContext(BaseStoreContext);
   const { userInfo } = baseStore || {};
   const [disabled, setDisabled] = useState<boolean>(true);
   const [form] = Form.useForm();
   console.log("userInfo----->", userInfo);

   useEffect(() => {
      form.setFieldsValue(userInfo);
   }, [userInfo]);

   return (
      <Form form={form} initialValues={{ ...userInfo }}>
         <Form.Item>
            <UploadImage />
         </Form.Item>
         <Form.Item label="账号" name="userName">
            <Input disabled={disabled} />
         </Form.Item>
      </Form>
   );
}

export default UserInfo;
