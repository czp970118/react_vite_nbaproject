// 冒泡排序算法， 两层for循环
export const bubbleSort = (arr: any[]) => {
	if (!arr.length) return arr
	var len = arr.length;

	for (let i = 0; i < len - 1; i++) {
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}

//冒泡排序优化, 加一个标志，可以减少外层循环
export const bubbleSort1 = (arr: any[]) => {
	let len = arr.length;
	if (!len) return [];
	for (let i = 0; i < len; i++) {
		let mark = true; // 如果mark没有改变，则说明数组已经是有序的，可以
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				mark = false;
			}
		}
		if (mark) break
	}
	return arr
}

// 插入排序， 遍历一个数组， 生成一个排好序的子数组，当前元素跟子数组从最后一项开始比较，如果当前元素比最后一项大， 则把当前元素作为子数组的最后一项，否则就将这一项往后移一项， j--，知道当前元素比这一项大后，插入这个位置
export const insetSort = (arr) => {
	const len = arr.length;
	for (let i = 1; i < len; i++) {
		const cur = arr[i];
		let j = i - 1;
		while (j >= 0 && cur < arr[j]) {
			arr[j + 1] = arr[j]
			j--;
		}
		arr[j + 1] = cur;
	}
	return arr
}

// 冒泡排序， 两层循环，第一层循环每一个元素，第二组循环，这个元素跟后一项的对比
export const bubbleSort4 = (arr) => {
	const len = arr.length;
	if (!len) return [];
	for (let i = 0; i < len - 1; i++) {
		let mark = true
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				mark = false
			}
		}
		if (mark) break;
	}
	return arr;
}

// 插入排序,插入排序，是创造一个有序子列， 让数组中的每一项跟这个有序子列的最后一项开始往前进行比较， 如果该元素比这个有序子列的最后一项还大，则把该元素插入到子数组的最后一项，否则就往前进行比较，直到找出比该元素小的一项，把这一项往后移一位，然后把该元素插入到这一项中
export const insertSort4 = (arr) => {
	let len = arr.length;
	if (!len) return [];
	for (let i = 0; i < len; i++) {
		let cur = arr[i];
		let j = i - 1;
		while (j > 0 && cur < arr[j]) {
			arr[j + 1] = arr[j];
			j--
		}
		arr[j + 1] = cur;
	}
	return arr;
}

// 选择排序， 依次找到数组中的最小值或者最大值，将其放在数组最后
export const selectSort = (arr) => {
	let len = arr.length;
	if (!len) return [];
	let minIndex = 0;
	for (let i = 0; i < len - 1; i++) {
		minIndex = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		var temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	return arr;
}

// 选择排序，依次找到数组中的最大值或者最小值，将其放置在数组中的最前面或者最后面
export const selectSort1 = (arr) => {
	let len = arr.length;
	if (!len) return [];
	let minIndex = 0;
	for (let i = 0; i < len - 1; i++) {
		minIndex = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		var temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	return arr;
}

// 冒泡排序
const bubbleSort5 = (arr) => {
	let len = arr.length;
	if (!len) return [];
	for (let i = 0; i < len - 1; i++) {
		for (let j = len - 1 - i; j++;) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr;
}

// 插入排序, 创造出一个有序子列，然后从这个有序子列的最后一项开始比较,然后往后推一位，否则就把最后一设置为该项
const insertSort6 = (arr) => {
	let len = arr.length;
	if (!len) return [];
	for (let i = 1; i < len; i++) {
		let j = i - 1;
		var cur = arr[i];
		while (j > 0 && arr[j] < cur) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = cur
	}
	return arr;
}

// 选择排序， 找到数组中的最大值或者最大值， 将其往前推或者往后推
const selectSort5 = (arr) => {
	let len = arr.length; // 缓存数组长度
	if (!len) return []
	let minIndex; // 缓存一个最小值的index
	for (let i = 0; i < len - 1; i++) {
		minIndex = i; // 假定最小值的index就是为i
		for (let j = i; j < len; j++) { // 定义一个上下边界， 下边界为i，上边界为j
			if (arr[j] < arr[minIndex]) {
				minIndex = j; // 如果找到比minIndex则把最小值的index换成j
			}
		}
		if (minIndex !== i) { // 如果对应的最小值的index发生了改变，则互换两者的只
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
	}
	return arr;
}

// 快速排序，找到中间位置的midvalue，将小于中间值的放在左边，将大于中间值的放在右边
export const quickSort = (arr: any) => {
	let len = arr.length;
	if (!len) return [];

	// 假装找到数组的中间值
	let midIndex = Math.floor(len / 2);
	let midValue = arr[midIndex];

	// 创建左右空数组
	let left = [];
	let right = []
	for (let i = 0; i < len; i++) {
		if (i !== midIndex) {
			if (arr[i] <= midValue) {
				left.push(arr[i]);
			} else {
				right.push(arr[i])
			}
		}
	}
	return quickSort(left).concat([midValue], quickSort(right))
}