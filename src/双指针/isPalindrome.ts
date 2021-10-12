/**
 * https://leetcode-cn.com/problems/valid-palindrome/
 * @name 验证回问字符串
 * 双指针法，左右指针依次移动判断字符是否相同，如相同则继续；不相同则直接返回false。遍历完后表明是回文字符串，返回true。
 * 注意忽略非字母数字的字符
 */

function isPalindrome(s: string): boolean {
  const reg = /\w/
  let left = 0,
    right = s.length - 1

  while (right > left) {
    // 非字母数组的字符left指针向后移动
    while (!reg.test(s[left])) {
      left++
    }
    // 非字母数组的字符right指针向前移动
    while (!reg.test(s[right])) {
      right--
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false
    }

    left++
    right--
  }

  return true
}

isPalindrome('A man, a plan, a canal: Panama')
