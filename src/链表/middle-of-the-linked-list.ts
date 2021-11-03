/**
 * https://leetcode-cn.com/problems/middle-of-the-linked-list/
 * @name 链表的中间节点
 */
import { createList, ListNode } from './util'

/**
 * 返回链表的中间节点
 * 思路：利用快慢指针，快指针一次走两步，慢指针一次走一步，当快指针走到末尾时，慢指针刚好走到1/2处
 * 还有种思路是两次循环，一次得到链表节点数，第二次返回链表中间节点
 * @param head 链表头节点
 * @returns 链表中间节点，奇数个节点返回中间节点，偶数个节点返回中间两个节点的后一个节点
 */
function middleNode(head: ListNode): ListNode | null {
  let slow: ListNode | null = head
  let fast: ListNode | null = head

  while (fast !== null && fast.next !== null) {
    slow = slow!.next
    fast = fast.next.next
  }

  return slow
}

const middleNode1 = middleNode(createList([11, 22, 33]))
console.log(middleNode1?.val)

const middleNode2 = middleNode(createList([11, 22, 33, 44]))
console.log(middleNode2?.val)
