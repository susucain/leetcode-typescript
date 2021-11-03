/**
 * https://leetcode-cn.com/problems/linked-list-cycle/
 * @name 检测链表中是否有环
 */

import { createList, ListNode, setCycle } from './util'

/**
 * 检测链表中是否有环
 * 思路：使用快慢指针，快指针一次走两步，慢指针一次走一步，如果链表中有环，那快慢指针终会相遇
 * 思路2: 使用hash表存下遍历过的节点，如果有节点被遍历两次说明链表中有环
 *
 * 为什么快慢指针终会相遇？
 * 假设快慢指针相差1步，这样快指针走两步，慢指针走一步，二者相遇
 * 假设快慢指针相差N步，这样快指针走两步相差N-2步，慢指针走一步，相差N-2+1，即N-1步，他们的距离每次会缩短1，总会缩短
 * 到只相差一步的情况，所有快慢指针终会相遇
 * @param head 链表头节点
 * @returns 链表是否有环，有返回true，否则返回false
 */
function hasCycle(head: ListNode | null): boolean {
  let slow = head
  let fast = head

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow!.next

    if (fast === slow) {
      return true
    }
  }

  return false
}

const head1 = createList([1, 2, 3, 4])
// 设置链表尾节点指向第一个节点（从0开始数）
setCycle(head1, 1)
console.log(hasCycle(head1))

const head2 = createList([1, 2, 3, 4])
console.log(hasCycle(head2))
