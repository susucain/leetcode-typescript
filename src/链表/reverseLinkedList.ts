/**
 * https://leetcode-cn.com/problems/reverse-linked-list/
 * @name 反转链表
 */

import { createList, ListNode, printListNode } from './util'

/**
 * 反转链表迭代版本
 * 思路：反转链表也就是将当前链表上的每一个节点指向其上一个节点，一开始上一个节点是null。
 */
export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null
  // 当前要遍历的节点
  let curr = head
  while (curr) {
    // 记下下一个要遍历的节点
    const next = curr.next
    // 将当前节点的next指针指向前一个节点
    curr.next = prev

    prev = curr
    curr = next
  }

  // 返回反转链表后的头节点
  return prev
}

const reverseHead1 = reverseList(createList([1, 2, 3]))
printListNode(reverseHead1)

/**
 * 反转链表递归解法
 * 翻转链表拆解为翻转头节点和其余节点，递归止于只剩一个节点
 *
 * 能否使用递归
 * 1. 大问题可以拆成两个子问题
 * 2. 子问题求解方式和大问题一样
 * 3. 存在最小子问题终结递归
 * https://leetcode-cn.com/problems/reverse-linked-list/solution/shi-pin-jiang-jie-die-dai-he-di-gui-hen-hswxy/
 */
const reverseListByRecursion = function (head) {
  if (head == null || head.next == null) {
    return head
  }
  // 递阶段执行到最后一个节点，newHead为尾节点
  const newHead = reverseListByRecursion(head.next)

  // 归阶段执行代码
  head.next.next = head
  head.next = null
  return newHead
}

const reverseHead2 = reverseListByRecursion(createList([1, 2, 3, 4]))
printListNode(reverseHead2)
