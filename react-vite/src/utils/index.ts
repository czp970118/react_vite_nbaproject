export const getCookie = (name: string) => {
	const result = document.cookie.match(
		'(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)'
	)
	return result ? result.pop() : ''
}


export const setCookie = (name: string, value: string, expire_days = 1) => {
	const exDate = new Date();
	exDate.setDate(exDate.getDate() + expire_days);

	document.cookie =
		name +
		'=' +
		value +
		';expires=' +
		exDate.toUTCString()
};

export const clearCookie = (name: string) => {
	setCookie(name, '', -1);
}

export const getPageType = (obj: any) => {
	let type = typeof obj;
	if (type !== 'object') return type;
	return Object.prototype.toString.call(obj).replace(/^$/, '$1')
}