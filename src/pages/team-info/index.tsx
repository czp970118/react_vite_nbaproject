import React, { useState, useEffect } from "react";

import './index.css';

interface IProps {
	onCountChange: (count: number) => void;
}

function TeamInfo(props: any) {
	const { onCountChange } = props;
	const [count, setCount] = useState<number>(1);

	useEffect(() => {
		onCountChange(count)
	}, [count])

	return (
		<>
			<div>{count}</div>
			<div onClick={() => {
				setCount(count+1);
			}}>点击增加</div>
		</>
	)
}

export default TeamInfo;