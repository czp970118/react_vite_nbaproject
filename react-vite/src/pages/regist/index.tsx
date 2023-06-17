import React, { useState } from "react";
import { Button, Input, Checkbox, Form, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { register } from '../../request/api/user';


import LoginLogo from '../../assets/login-logo.jpg'

import './index.scss';

const FormItem = Form.Item;

function Regist() {
	const navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [passwordStatus, setPasswordStatus] = useState({})

	const onFinish = async (values: any) => {
		const { userName, userPassword, confirmPassword } = values;
		if (userPassword !== confirmPassword) {
			return setPasswordStatus({ status: 'error', msg: '两次输入的密码不一致' })
		}
		const res = await register({ userName, userPassword })
		const { success, msg } = res;
		if (success) {
			message.success('用户注册成功');
			localStorage.setItem('userInfo', JSON.stringify({ userName, userPassword }));
			navigate('/')
		} else {
			message.error(msg)
		}
	}



	return (

		<div className="login-wrap">
			<div className="login-logo">
				<img src={LoginLogo} alt="" className="logo" />
			</div>
			<Form
				className="login-form"
				onFinish={onFinish}
			>
				<FormItem label="账号" className="form-item" name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
					<Input style={{ width: 300 }} />
				</FormItem>
				<FormItem
					label="密码"
					className="form-item"
					name="userPassword"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						status={passwordStatus.status}
						visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
						style={{ width: 300 }} />
				</FormItem>
				<FormItem label="确认密码" className="form-item form-confirm" name="confirmPassword" rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} style={{ width: 300 }} />
				</FormItem>
				<FormItem className="form-btn">
					<Button type="primary" style={{ marginRight: 12 }} htmlType="submit">
						注册
					</Button>
					<Button onClick={() => {
						navigate('/')
					}}>返回登陆</Button>
				</FormItem>
			</Form>
		</div>

	)
}

export default Regist;