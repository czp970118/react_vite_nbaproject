import { getUserInfo } from '@/request/api/user';

interface UserInfo {
	avatar: string;
	userId: number;
	userName: string;
	id: number
}

class CommonBaseStore {

	private _userInfo?: UserInfo;
	public _loading: boolean = false;
	private _userId: string | number;

	constructor(userId: string) {
		this._userId = userId;
		this._loading = false;
	}

	public get userInfo(): UserInfo | undefined {
		return this._userInfo;
	}

	public get loading(): boolean {
		return this._loading;
	}

	public loadUserInfo = async () => {
		if (this._loading) return
		try {
			this._loading = true;
			const res = await getUserInfo(this._userId)
			const { success, user } = res;
			if (success) {
				this._userInfo = user;
			}
		} catch (error) {
			console.error('Failed to load user info:', error);
		}
		this._loading = false;
	}
}

export default CommonBaseStore;