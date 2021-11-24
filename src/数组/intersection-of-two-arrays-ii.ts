/**
 * https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/
 * @name 两个数组的交集2
 * 1. 求出两个数组的交集
 * 2. 输出的结果每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
 */

/**
 * 返回两数组的交集，hasMap实现
 * @param nums1 数组1
 * @param nums2 数组2
 * @returns 两数组的交集
 */
function intersect(nums1: number[], nums2: number[]): number[] {
  // 保证nums1的长度是小的，因为要用nums1计算hashMap，长度小，hasMap占用的空间就小
  if (nums1.length > nums2.length) {
    return intersect(nums2, nums1)
  }

  // 使用hasMap来存，键是数组的元素，值是该元素在nums1数组的出现次数
  const hasMap: { [value: number]: number } = {}
  for (let i = 0, len = nums1.length; i < len; i++) {
    if (hasMap[nums1[i]]) {
      hasMap[nums1[i]]++
    } else {
      hasMap[nums1[i]] = 1
    }
  }

  // 结果数组
  const result: number[] = []
  // 遍历nums2，如果该数组的元素能在hasMap中查到则将该元素输出，同时该元素在hasMap中的次数 - 1
  // 如果减到0也不在输出，保证输出元素的出现次数是两个数组的最小值
  for (let i = 0, len = nums2.length; i < len; i++) {
    if (hasMap[nums2[i]]) {
      hasMap[nums2[i]]--
      result.push(nums2[i])
    }
  }

  return result
}

console.log(intersect([1, 2, 2, 2, 1], [2, 2]))

/**
 * 双指针法，排序后处理，可以保证结果数组中是较短的那个元素
 * @param nums1 数组1
 * @param nums2 数组2
 * @returns 两数组的交集
 */
function intersect2(nums1: number[], nums2: number[]): number[] {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  let index1 = 0
  let index2 = 0
  const result: number[] = []

  while (index1 < nums1.length && index2 < nums2.length) {
    if (nums1[index1] > nums2[index2]) {
      index2++
    } else if (nums1[index1] < nums2[index2]) {
      index1++
    } else {
      result.push(nums1[index1])
      index1++
      index2++
    }
  }

  return result
}

console.log(intersect2([1, 2, 2, 2, 1], [2, 2]))
