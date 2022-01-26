/**
 * @name 求字符串的叠词数目及计算不重复叠词数目
 */

function getNum(str) {
  const len = str.length
  const dp = Array(len)

  dp[0] = 0

  for (let i = 1; i <= len; i++) {
    if (str[i] === str[i - 1]) {
      if (str[i] === str[i + 1] && i + 1 !== len) {
        dp[i] = dp[i - 1]
      } else {
        dp[i] = 1 + dp[i - 1]
      }
    } else {
      dp[i] = dp[i - 1]
    }
  }

  let arr: string[] = []

  for (let i = 1; i < len; i++) {
    if (dp[i] !== dp[i - 1]) {
      let dpStr = ''
      for (let j = i; j >= 0; j--) {
        if (str[i] === str[j]) {
          dpStr += str[i]
        } else {
          break
        }
      }
      arr.push(dpStr)
    }
  }

  arr = [...new Set(arr)]

  return arr.length
}

console.log(getNum('abcdaaabbccccddddefgaaa'))
