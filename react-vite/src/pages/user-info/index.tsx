import React, { useContext, useState, useEffect } from "react";
import BaseStoreContext from "@/context/base-store-context";
import UploadImage from "@/components/upload";
import { Form, Input, Select } from "antd";
import { getTeamsWithoutUserId } from "@/request/api/team";

import "./index.scss";

const formLayout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 16 },
};

function UserInfo() {
   const baseStore = useContext(BaseStoreContext);
   const { userInfo } = baseStore || {};
   const [disabled, setDisabled] = useState<boolean>(true);
   const [pageSize, setPageSize] = useState<number>(1);
   const [pageNum, setPageNum] = useState<number>(10);
   const [form] = Form.useForm();
   console.log("userInfo--->", userInfo);

   const getSelectData = async () => {
      const res = await getTeamsWithoutUserId({
         userId: userInfo?.id,
         pageSize,
         pageNum,
      });
      console.log("res---->", res);
   };

   useEffect(() => {
      form.setFieldsValue(userInfo);
   }, [userInfo]);

   useEffect(() => {
      getSelectData();
   }, []);

   return (
      <Form form={form} initialValues={{ ...userInfo }} {...formLayout}>
         <Form.Item name="avatar" className="avatr-item">
            <UploadImage disabled={disabled} />
         </Form.Item>
         <Form.Item label="账号" name="userName">
            <Input disabled={disabled} />
         </Form.Item>
         <Form.Item label="当前角色" name="role">
            <Input disabled={disabled} />
         </Form.Item>
         <Form.Item label="已收藏球队"></Form.Item>
         <Form.Item label="收藏球队">
            <Select />
         </Form.Item>
      </Form>
   );
}

export default UserInfo;
