// 1.冒泡排序
export const bubbleSort = (arr) => {
	let len = arr.length;
	if (!len) return [];
	for (let i = 0; i < len - 1; i++) {
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr
}

// 2.插入排序， 生成一个有序子列，然后从这个有序子列的最后一项开始比较，如果大于最后一项就互换位置
export const insertSort = (arr) => {
	let len = arr.length;
	if (!len) return [];
	for (let i = 1; i < len; i++) {
		let j = i;
		var cur = arr[j];
		while (j > 0 && cur < arr[j - 1]) {
			arr[j] = arr[j - 1]
			j--;
		}
		arr[j] = cur;
	}
	return arr;
}



//3.选择排序，假装找到最小值或者最大值，将其放在最左边会最右边
export const selectSort = (arr) => {
	let len = arr.length;
	if (!len) return []; // 缓存一个数组长度
	let minIndex;
	for (let i = 0; i < len - 1; i++) {
		minIndex = i;
		for (let j = i; j < len; j++) { // 定义一个上下界
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		if (minIndex !== i) {
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
		}
	}
	return arr;
}

// 4.快速排序，找到中间值，将比中间值大的放右边，比中间值小的放左边利用递归
export const quickSort = (arr) => {
	let len = arr.length;
	if (!len) return [];

	let midIndex = Math.floor(len / 2);
	let midValue = arr.slice(midIndex, midIndex + 1)[0];

	const left = [];
	const right = []

	for (let i = 0; i < len; i++) {
		if (i !== midIndex) {
			if (arr[i] >= midValue) {
				right.push(arr[i])
			} else {
				left.push(arr[i])
			}
		}
	}
	return quickSort(left).concat([midValue], quickSort(right))
}

// 防抖函数
export const debounce = (fun, layer) => {
	let timer;
	return function (...arg) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fun.apply(this, arg)
		}, layer)
	}
}

// 节流函数
export const throller = (fun, layer) => {
	let lastTime = 0;
	return function (...arg) {
		var nowData = new Date().getTime();
		if (nowData - lastTime > layer) {
			fun.apply(this, arg)
			lastTime = nowData;
		}
	}
}

// once函数
export const once = (fun, cb?) => {
	let called = false;
	let result;
	let err
	return function (...args) {
		if (!called) {
			try {
				result = fun.apply(this, args)
			} catch (error) {
				err = error;
			}
			called = true
		}
		cb && cb(result, err);
	}
}