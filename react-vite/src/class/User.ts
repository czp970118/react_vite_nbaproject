export default class User {
	userName?: string;
	age?: string;
	constructor(userName: string, age: string) {
		this.userName = userName;
		this.age = age;
	}
	setUserName(newUserName: string) {
		this.userName = newUserName
	}
}