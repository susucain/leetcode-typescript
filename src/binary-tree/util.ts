//  二叉树节点
export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/**
 * 由层序遍历结果构造二叉树，模拟leetcode实现
 * 核心思路就是维护一个根节点的队列
 * 1. 每轮循环都往队列中加入当前遍历的节点
 * 2. 每次取队列中的第一个节点，当这个节点的左右节点添加后，该节点出队
 * @param data 层序遍历的结果序列
 * @returns 由层序遍历结果序列构造的二叉树
 */
export function levelOrderSeqToBST(data: Array<number | null>) {
  const root = new TreeNode(data[0]!)
  // 存放当前根节点序列
  const queue = [root]
  let count = 0

  for (let i = 1; i < data.length; i++) {
    const cur = queue[0]
    const node = data[i] === null ? null : new TreeNode(data[i]!)

    if (count === 0) {
      cur.left = node
      count++
    } else {
      cur.right = node
      count++
    }

    // 当前节点左右子节点都添加后，出队并重置count
    if (count === 2) {
      queue.shift()
      count = 0
    }

    // 不将空节点加入根节点队列
    if (node !== null) {
      queue.push(node)
    }
  }

  return root
}
