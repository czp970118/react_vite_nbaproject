import React, { useEffect } from "react";

import { getUserInfo } from "../../request/api/user";

import './index.scss';

function UserInfo() {


	useEffect(() => {
		getUserInfo('czp').then((res) => {
			console.log('res==>', res);
		})
	}, [])

	return (
		<div>UserInfo</div>
	)
}

export default UserInfo;