import React from "react";
import { useStore } from '../../hooks/index';

import './index.scss';

function PlayerInfo() {
	const user = useStore();
	console.log('user====>', user)
	return (
		<div>PlayerCards</div>
	)
}

export default PlayerInfo;