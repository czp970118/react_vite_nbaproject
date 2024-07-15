import { useState } from "react";
import { Button, Input, Checkbox, Form, message } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate } from "react-router-dom";
import { login } from "../../request/api/user";
import { setCookie } from "../../utils";

import LoginLogo from "../../assets/login-logo.jpg";

import "./index.css";

const FormItem = Form.Item;

function Login() {
   const navigate = useNavigate();
   const initUserString = localStorage.getItem("userInfo");
   const initUser = initUserString ? JSON.parse(initUserString) : {};
   const [loading, setLoading] = useState<boolean>(false);
   const [check, setCheck] = useState<boolean>(true);
   const [passwordVisible, setPasswordVisible] = useState(false);

   const onFinish = async (values: any) => {
      if (check) {
         localStorage.setItem("userInfo", JSON.stringify(values));
      } else {
         localStorage.removeItem("userInfo");
      }
      setLoading(true);
      const res: any = await login(values);
      const { success, msg } = res;
      console.log("loginRes---->", res);
      if (success) {
         message.success("登陆成功!");
         setCookie("loginStatus", JSON.stringify({ userName: values.userName, status: success }));
         setTimeout(() => {
            navigate("/pages/team/center");
         }, 300);
      } else {
         message.error(msg);
      }
      setLoading(false);
   };

   const checkOnChange = (e: CheckboxChangeEvent) => {
      setCheck(e.target.checked);
   };

   return (
      <div className="login-wrap">
         <div className="login-logo">
            <img src={LoginLogo} alt="" className="logo" />
         </div>
         <Form className="login-form" onFinish={onFinish} initialValues={initUser}>
            <FormItem
               label="账号"
               className="form-item"
               name="userName"
               rules={[{ required: true, message: "Please input your username!" }]}
            >
               <Input style={{ width: 300 }} />
            </FormItem>
            <FormItem
               label="密码"
               className="form-item"
               name="userPassword"
               rules={[{ required: true, message: "Please input your password!" }]}
            >
               <Input.Password
                  visibilityToggle={{
                     visible: passwordVisible,
                     onVisibleChange: setPasswordVisible,
                  }}
                  style={{ width: 300 }}
               />
            </FormItem>
            <Checkbox checked={check} onChange={checkOnChange} className="rember-pass">
               记住密码
            </Checkbox>
            <FormItem className="form-btn">
               <Button
                  type="primary"
                  style={{ marginRight: 12, width: 120 }}
                  htmlType="submit"
                  loading={loading}
               >
                  登陆
               </Button>
               <Button
                  style={{ width: 120 }}
                  onClick={() => {
                     navigate("/regist");
                  }}
               >
                  注册
               </Button>
            </FormItem>
         </Form>
      </div>
   );
}

export default Login;
