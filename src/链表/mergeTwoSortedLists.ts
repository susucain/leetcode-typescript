/**
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * @name 合并两个有序链表
 */

import { createList, ListNode, printListNode } from './reverseLinkedList'

/**
 * 基本思路：双指针p1，p2，分别指向两个链表的头节点
 * 每次循环比较p1和p2的值，小的那个指针指向下个节点，当前节点加入合并后新链表中，直到有一个链表遍历完成
 * 这时让那个还没遍历完的链表剩余节点加入合并后的链表中
 *
 * 注意要定义一个虚拟头节点，否则单链表就很难找到合并后链表的头节点了
 */
export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let p1 = l1
  let p2 = l2
  const dummy = new ListNode(-1)
  let p = dummy

  while (p1 !== null && p2 !== null) {
    if (p1.val > p2.val) {
      // 小的加入合并后的链表中
      p.next = p2
      // 值小的指针后移一位
      p2 = p2.next
    } else {
      p.next = p1
      p1 = p1.next
    }

    p = p.next
  }

  if (p2 !== null) {
    p.next = p2
  }

  if (p1 !== null) {
    p.next = p1
  }

  return dummy.next
}

const mergedList = mergeTwoLists(createList([1, 3, 4]), createList([1, 3, 4, 5]))
printListNode(mergedList)
