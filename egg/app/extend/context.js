module.exports = {
	get isIos() {
		const iosReg = /iphone|ipad|ipod|ios|mac/;
		return iosReg.test(this.get('user-agent'));
	}
}