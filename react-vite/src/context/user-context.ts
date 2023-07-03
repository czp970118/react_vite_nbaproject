import { createContext } from "react";
import { getUserInfo } from "../request/api/user";

const UserInfo = async () => {
	const userStorage = localStorage.getItem('userInfo');
	const userInfo = userStorage ? JSON.parse(userStorage) : {};
	const { userName } = userInfo;
	const res: any = await getUserInfo(userName);
	if (res?.success) {
		return res?.user;
	}
}


export const UserContext = createContext({
	userInfo: await UserInfo(),
})