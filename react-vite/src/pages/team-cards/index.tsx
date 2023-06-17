import { useStore } from '../../hooks';
import User from '../../class/User';

import './index.css';

function TeamCards() {
	const onClickUser = () => {
		const user = new User('陈展鹏', '26');
	}
	return (
		<div onClick={onClickUser}>TeamCards</div>
	)
}

export default TeamCards;