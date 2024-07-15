import { getUserInfo } from '@/request/api/user';

interface UserInfo {
	avatar: string;
	userId: number;
	userName: string;
	id: number
}

class CommonBaseStore {
	userInfo: UserInfo | undefined;
	constructor(userId: string) {
		if (userId) {
			getUserInfo(userId).then((res: any) => {
				const { success, user } = res;
				if (success) {
					this.userInfo = user;
				}
			})
		}
	}
}

export default CommonBaseStore;