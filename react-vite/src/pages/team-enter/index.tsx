import React from "react";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MyList from './container/my-list';
import AllList from './container/my-list';

import './index.scss';

const ALL = 'all';
const MY = 'my';


function TeamCenter() {

	const items: TabsProps['items'] = [
		{
			key: ALL,
			label: '所有球队',
			children: <AllList />,
		},
		{
			key: MY,
			label: '我的球队',
			children: <MyList />,
		},
	];


	return (
		<Tabs style={{ background: '#FFF', padding: 16 }} defaultActiveKey={ALL} items={items} />
	)
}

export default TeamCenter;