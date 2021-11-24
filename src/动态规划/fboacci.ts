/**
 * https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
 * @name 计算斐波那契数列
 */

/**
 * 最原始，也是最符合数学公式的解法 f(n) = f(n-1) + f(n-2)，时间复杂度2^n
 * @param n 斐波那契数列的项
 * @returns f(n)
 */

function fibona(n: number) {
  if (n === 0) return 0
  if (n === 1 || n === 2) return 1

  return fibona(n - 1) + fibona(n - 2)
}

/**
 * 带备忘录的递归解法，自顶向下的
 * @param n 斐波那契数列的项
 * @returns f(n)
 */
function fibona1(n: number) {
  const memo = new Array(n).fill(0)

  function helper(i: number) {
    // 走到这两个条件分支就是归操作了，一开始必须不断地递下去，直到i为1或2
    if (i === 1 || i === 2) return 1
    // 已经计算出的不需要进行递归，直接获取到值（递归树的剪枝）
    if (memo[i] !== 0) return memo[i]

    memo[i] = helper(i - 1) + helper(i - 2)

    // 计算出的斐波那契数列的值
    return memo[i]
  }

  return helper(n - 1) + helper(n - 2)
}

/**
 * 迭代解法，自底向上，标准动态规划解法
 */
function fibona2(n: number) {
  const memo = Array(n + 1).fill(0)

  memo[1] = memo[2] = 1

  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2]
  }

  return memo[n]
}

/**
 * 最优解，优化空间复杂度，只存当前值和之前的值
 */

function fibona3(n: number) {
  if (n === 0) return 0

  let prev = 1
  let curr = 1

  for (let i = 3; i <= n; i++) {
    const sum = curr + prev
    prev = curr
    curr = sum
  }

  return curr
}

console.log(fibona1(10))
console.log(fibona(10))
console.log(fibona2(10))
console.log(fibona3(10))
