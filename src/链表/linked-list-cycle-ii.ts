/**
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/
 * @name 返回链表开始入环的第一个节点
 */

import { createList, ListNode, setCycle } from './util'

/**
 * 返回链表开始入环的第一个节点，如非环形链表返回null
 * 思路1：使用hasMap，遍历整个链表，每次遍历过的节点存入hasMap中，
 * 如遍历到的节点已经存在于hasMap，则该节点为入环的第一个节点。此方法空间时间复杂度均为O(N)
 *
 * 思路2: 利用快慢指针相遇位置到入环点的距离 * n-1圈长 = 头节点到入环点的距离
 * @param head 链表头节点
 * @returns 返回链表开始入环的第一个节点，如非环形链表返回null
 */
function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head

  // 快慢指针检测链表是否有环，让两者走到相遇位置
  while (fast !== null && fast.next !== null) {
    slow = slow!.next
    fast = fast.next.next

    if (slow === fast) {
      break
    }
  }

  // 如果循环结束不是因为快慢指针相遇，则表示链表无环
  if (fast === null || fast.next === null) {
    return null
  }

  // 根据计算公式，快慢指针相遇位置到入环点的距离 * n-1圈长 = 头节点到入环点的距离
  // 故两指针每次前进一步最终会在入环点相遇
  slow = head
  while (slow !== fast) {
    slow = slow!.next
    fast = fast!.next
  }

  return slow
}

const head1 = createList([1, 2, 3, 4])
// 设置链表尾节点指向第一个节点（从0开始数）
setCycle(head1, 1)
console.log(detectCycle(head1))

const head2 = createList([1, 2, 3, 4])
console.log(detectCycle(head2))

const head3 = createList([1, 2, 3, 4])
setCycle(head3, 2)
console.log(detectCycle(head3))
