import { useContext, useState, useEffect } from "react";
import BaseStoreContext from "@/context/base-store-context";
import UploadImage from "@/components/upload";
import { Form, Input, Space, Button, message, Spin } from "antd";
import { editUser } from "@/request/api/user";

import "./index.scss";

const formLayout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 16 },
};

function UserInfo() {
   const baseStore = useContext(BaseStoreContext);
   const { userInfo } = baseStore || {};
   const [disabled, setDisabled] = useState<boolean>(true);
   const [loading, setLoading] = useState<boolean>(false);
   const [form] = Form.useForm();

   useEffect(() => {
      form.setFieldsValue(userInfo);
   }, [userInfo]);

   const onClickEdit = () => setDisabled(!disabled);

   const onSave = async () => {
      const params = {
         ...userInfo,
         ...form.getFieldsValue(),
      };
      setLoading(true);
      const res: any = await editUser(params);
      if (res?.success) {
         message.success("保存成功");
         setDisabled(true);
      } else {
         message.error(`保存失败: ${res?.message}`);
      }
      setLoading(false);
   };

   return (
      <Spin spinning={loading}>
         <Form form={form} initialValues={{ ...userInfo }} {...formLayout}>
            <Form.Item name="avatar" className="avatr-item">
               <UploadImage disabled={disabled} />
            </Form.Item>
            <Form.Item
               label="账号"
               name="userName"
               rules={[{ required: true, message: "账号不能为空" }]}
            >
               <Input disabled={disabled} />
            </Form.Item>
            <Form.Item label="当前角色" name="role">
               <Input disabled={disabled} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 7, offset: 17 }}>
               <Space>
                  <Button type={disabled ? "primary" : "default"} onClick={onClickEdit}>
                     {disabled ? "编辑" : "取消"}
                  </Button>
                  <Button type="primary" disabled={disabled} htmlType="submit" onClick={onSave}>
                     保存
                  </Button>
               </Space>
            </Form.Item>
         </Form>
      </Spin>
   );
}

export default UserInfo;
