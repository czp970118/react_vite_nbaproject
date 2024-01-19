/**
 * 实现一个bind方法
 * 思路： 不传入第一个参数， 默认指向文window。 
 * 改变了this指向，让新的对象可以执行该函数，给新的对象添加一个函数，执行完后再删除
 */
Function.prototype.myBind = function (context) {
	if (typeof this !== 'function') throw new TypeError('error');
	var _this = this;
	var args = [...arguments].slice(1);

	// 返回一个函数
	return function F() {
		if (this instanceof F) {
			return new _this(...args, ...arguments)
		}
		return _this.apply(context, args.concat(...arguments))
	}
}