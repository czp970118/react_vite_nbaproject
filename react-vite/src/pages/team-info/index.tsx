import React, { useState } from "react";

import './index.css';


function TeamInfo(props: any) {
	const [count, setCount] = useState<number>(1);

	return (
		<>
			<div>{count}</div>
			<div onClick={() => {
				setCount(count + 1);
			}}>点击增加</div>
		</>
	)
}

export default TeamInfo;