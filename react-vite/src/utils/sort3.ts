// 冒泡排序，冒泡排序的原理是从左到右依次进行两两比较，如果当前元素比被比较的元素大，则交换位置。所以冒泡排序是比较完就交换顺序
export function bubble(arr) {
	const len = arr.length;
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