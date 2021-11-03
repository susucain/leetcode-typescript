/**
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
 * @name 删除链表的倒数第K个节点
 */
import { createList, ListNode, printListNode } from './util'

/**
 * 返回链表的倒数第K个节点，思路与kthNodeFromEndOfListLcci.ts一致
 */
function findNthFromEnd(head: ListNode, n: number): ListNode | null {
  let p1: ListNode | null = head
  for (let i = 0; i < n; i++) {
    p1 = p1!.next
  }

  let p2: ListNode | null = head
  while (p1) {
    p1 = p1.next
    p2 = p2!.next
  }

  return p2
}

/**
 * 删除链表倒数第K个节点，只要找到链表的倒数第K+1个节点即可，但要注意考虑要删除的节点刚好是链表
 * 的头节点，这时需要虚拟头节点辅助
 * @param head 链表头节点
 * @param k 倒数第K个节点
 * @returns 删除倒数第K个节点后链表的头节点
 */
export function removeNthFromEnd(head: ListNode | null, k: number): ListNode | null {
  const dummyNode = new ListNode(-1)
  dummyNode.next = head

  // 虚拟头节点辅助，防止要删除的节点是链表头节点导致prevNode为空
  const prevNode = findNthFromEnd(dummyNode, k + 1)
  prevNode!.next = prevNode!.next!.next

  return dummyNode.next
}

const head = removeNthFromEnd(createList([1, 2, 3, 4, 5]), 5)
printListNode(head)
