/**
 * @name 二叉树的一些有趣的问题
 */

import { levelOrderSeqToBST, TreeNode } from './util'

/**
 * @name 打印每个节点的层级
 */
export function printNodeLevel(root: TreeNode | null, level = 1) {
  if (root == null) return
  console.log(`节点${root.val}在第${level}层`)
  printNodeLevel(root.left, level + 1)
  printNodeLevel(root.right, level + 1)
}

/**
 * @name 打印每个节点的左右子树节点个数
 * 后序遍历自底向上计算出左右节点个数
 */
export function printNodeChildNodeCount(root: TreeNode | null) {
  if (root === null) return 0

  const leftNodeCount = printNodeChildNodeCount(root.left)
  const rightNodeCount = printNodeChildNodeCount(root.right)

  console.log(`节点${root.val}的左右节点个数分别为${leftNodeCount},${rightNodeCount}`)

  return leftNodeCount + rightNodeCount + 1
}

printNodeChildNodeCount(levelOrderSeqToBST([1, 2, 3, 4, 5, null, null, null, 6]))
