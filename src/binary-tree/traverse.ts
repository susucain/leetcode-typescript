import { levelOrderSeqToBST, TreeNode } from './util'

// 遍历顺序 根节点 => 左子节点 => 右子节点
export function preOrder(root: TreeNode) {
  if (root === null) return

  console.log(root.val)
  preOrder(root.left!)
  preOrder(root.right!)
}

// 遍历顺序 左子节点 => 根节点 => 右子节点
export function inOrder(root: TreeNode) {
  if (root === null) return

  inOrder(root.left!)
  console.log(root.val)
  inOrder(root.right!)
}

// 遍历顺序 左子节点 => 右子节点 => 根节点
export function postOrder(root: TreeNode) {
  if (root === null) return

  postOrder(root.left!)
  postOrder(root.right!)
  console.log(root.val)
}

console.log(preOrder(levelOrderSeqToBST([1, 2, 3, 4, 5, null, null, null, 6])))
