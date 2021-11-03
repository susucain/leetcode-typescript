/**
 * https://leetcode-cn.com/problems/linked-list-cycle/
 * @name 返回两个单链表相交的起始节点
 */
import { createList, getNodeByPos, ListNode } from './util'

/**
 * 单链表A和B相交的起始节点，如不相交返回null
 * 思路1: 用hasMap
 * 思路2: 两个指针分别指向两个链表的头节点，如两链表节点数不同，则每个指针遍历完链表A，指针指向链表B头节点，再遍历链表B，
 * 两指针会在链表相交节点处相遇。
 *
 * 证明参见https://leetcode-cn.com/problems/linked-list-cycle/
 * @param headA 单链表A头节点
 * @param headB 单链表B头节点
 * @returns 单链表A和B相交的起始节点，如不相交返回null
 */
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let p1 = headA
  let p2 = headB

  while (p1 !== p2) {
    if (p1 === null) {
      p1 = headB
    } else {
      p1 = p1.next
    }

    if (p2 === null) {
      p2 = headA
    } else {
      p2 = p2.next
    }
  }

  return p1
}

// 构造相交链表
const list1 = createList([4, 1, 8, 4, 5])
const list2 = createList([5, 0, 1])

const secondNodeOfList1 = getNodeByPos(list1, 2)
const tailNodeOfList2 = getNodeByPos(list2, 2)

tailNodeOfList2.next = secondNodeOfList1

console.log(getIntersectionNode(list1, list2))

// 不相交链表
const list3 = createList([4, 1, 8, 4, 5])
const list4 = createList([5, 0, 1])

console.log(getIntersectionNode(list3, list4))
