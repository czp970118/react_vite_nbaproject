import { getUserInfo } from '@/request/api/user';

interface UserInfo {
	avatar: string;
	userId: number;
	userName: string;
	id: number
}

class CommonBaseStore {
	userInfo: UserInfo | undefined;
	constructor(userName: string) {
		if (userName) {
			getUserInfo(userName).then((res: any) => {
				const { success, user } = res;
				if (success) {
					this.userInfo = user;
				}
			})
		}
	}
}

export default CommonBaseStore;