import React, { useEffect, useState } from "react";
import { Form, Select, Button, Input } from 'antd';
import { useAntdTable } from "ahooks";
import { parttitionData } from '@/constan';

import { getAllTeams } from '../../../../request/api/team';

import './index.scss';


interface TableParams {
	current: number;
	pageSize: number;
}

export default function MyList() {

	const [form] = Form.useForm();

	const getTeamList = async ({ current, pageSize }: TableParams) => {
		const res: any = await getAllTeams({ pageSize, pageNum: current });
		const { success, data } = res;
		if (success) return data;
	}

	const { tableProps, search } = useAntdTable(getTeamList, {
		form
	})

	const { submit } = search;

	console.log('tableProps', tableProps);


	return (
		<Form className="team-center-wrap" colon>
			MyList
		</Form>
	)
}
