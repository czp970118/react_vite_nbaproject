function generateInsertSql(tableName, obj) {
	// 获取对象的所有键
	const keys = Object.keys(obj);
	// 使用模板字符串动态生成SQL
	let columns = keys.map(key => `\`${key}\``).join(', ');
	let values = keys.map(key => `'${obj[key]}'`).join(', ');

	return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
}

module.exports = {
	generateInsertSql
}