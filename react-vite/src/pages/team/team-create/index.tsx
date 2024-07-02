import { useState } from "react";
import { Breadcrumb, Form, Input, TreeSelect, Select, Space, Button, Spin, message } from "antd";
import UploadImage from "@/components/upload";
import { useNavigate } from "react-router-dom";
import { AMERICA_CITY_DATA, PARTTITION_DATA } from "../../../constan";
import { createTeam } from "../../../request/api/team";

import "./index.scss";

const formLayout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 16 },
};

const TeamCreate = () => {
   const navigate = useNavigate();
   const [form] = Form.useForm();
   const [spinning, setSpinning] = useState<boolean>(false);

   const onCreate = async (values) => {
      console.log("values", values);
      setSpinning(true);
      const res: any = await createTeam(values);
      const { success, errorMeg } = res;
      if (success) {
         message.success("球队创建成功!");
         navigate("/pages/team/center");
      } else {
         message.error(errorMeg);
      }
      setSpinning(false);
   };

   return (
      <div>
         <Breadcrumb
            items={[
               {
                  title: <a href="/#/pages/team/center">球队中心</a>,
               },
               {
                  title: "球队创建",
               },
            ]}
         />
         <Spin spinning={spinning}>
            <Form form={form} {...formLayout} className="form-wrap" onFinish={onCreate}>
               <Form.Item label="球队主图" name="logo">
                  <UploadImage
                     onChange={(url) => {
                        form.setFieldValue("logo", url);
                     }}
                  />
               </Form.Item>
               <Form.Item label="球队名称" name="teamName">
                  <Input placeholder="请输入球队名称" />
               </Form.Item>
               <Form.Item label="所在城市" name="city">
                  <TreeSelect treeData={AMERICA_CITY_DATA} placeholder="请选择城市" />
               </Form.Item>
               <Form.Item label="所在分区" name="partition">
                  <Select placeholder="请选择所在分区" options={PARTTITION_DATA} />
               </Form.Item>
               <Form.Item label="主场球馆" name="homeArena">
                  <Input placeholder="请输入主场球馆" />
               </Form.Item>
               <Form.Item label="主教练" name="manager">
                  <Input placeholder="请输入主教练" />
               </Form.Item>
               <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                  <Space>
                     <Button type="primary" htmlType="submit">
                        Create
                     </Button>
                     <Button
                        htmlType="button"
                        onClick={() => {
                           form.resetFields();
                        }}
                     >
                        Reset
                     </Button>
                  </Space>
               </Form.Item>
            </Form>
         </Spin>
      </div>
   );
};

export default TeamCreate;
