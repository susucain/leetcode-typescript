/**
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 * @name 二叉树的最大深度
 */
import { levelOrderSeqToBST, TreeNode } from './util'

/**
 * 计算二叉树的最大深度
 * 思路：一次遍历二叉树，记录遍历到每个节点时的深度，求出最大深度
 * @param root 二叉树根节点
 * @returns 该二叉树的最大深度
 */
export function maxDepth(root: TreeNode | null): number {
  // 最大深度
  let res = 0
  // 当前遍历深度
  let depth = 0
  const traverse = (node: TreeNode | null) => {
    if (node === null) {
      // 最大深度肯定是某个叶子节点的深度，每次遍历到叶子节点时计算一次最大深度
      res = Math.max(res, depth)
      return
    }

    // 进入一个节点时深度增加
    depth++
    traverse(node.left)
    traverse(node.right)
    // 当前节点遍历结束，回到该节点的父节点时深度减少
    depth--
  }

  traverse(root)

  return res
}

/**
 * 计算二叉树的最大深度
 * 思路：问题分解，二叉树的最大深度就是其左右子树的最大深度
 * 这里必须在后序遍历的位置计算，在后序遍历的位置可以获取到当前遍历节点的子树信息
 * 整体是自底向上逐级计算出以每个遍历到的节点为根节点的最大深度，一直到计算到根节点完成
 * @param root 二叉树根节点
 * @returns 该二叉树的最大深度
 */
export function maxDepth2(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }

  const leftMaxDepth = maxDepth2(root.left)
  const rightMaxDepth = maxDepth2(root.right)

  return Math.max(leftMaxDepth, rightMaxDepth) + 1
}

console.log(maxDepth2(levelOrderSeqToBST([1, 2, 3, 4, 5, null, null, null, 6])))
