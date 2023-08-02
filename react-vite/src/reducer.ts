import { getUserInfo } from "./request/api/user";

const getUser = async () => {
	const userStorage = localStorage.getItem('userInfo');
	const userInfo = userStorage ? JSON.parse(userStorage) : {};
	const { userName } = userInfo;
	const res: any = await getUserInfo(userName);
	if (res?.success) {
		return res?.user;
	}
}


export const propsReducer = (props: any, action: any) => {

	switch (action.type) {
		case 'setUser': {
			return { ...props, ...getUser() }
		}
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}

}