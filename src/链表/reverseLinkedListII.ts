/**
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/
 * @name 反转链表2
 */
import { reverseList } from './reverseLinkedList'
import { createList, ListNode, printListNode } from './util'

/**
 * 基本思路：记下leftNode的前一个节点和rightNode的后一个节点，然后断开连接，单独反转leftNode-rightNode部分
 * 再将反转后的链表与原链表连接上
 */
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  // 定义虚拟头节点，避免出现要反转的leftNode是头节点的情况
  const dummyNode = new ListNode(-1, head)
  let prevLeftNode = dummyNode

  // 从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
  for (let i = 0; i < left - 1; i++) {
    prevLeftNode = prevLeftNode.next!
  }

  // 从left节点的前一个节点走right-left+1步，来到right节点
  let rightNode: ListNode = prevLeftNode
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next!
  }

  // 记下right的下一个节点和left节点，方便切断链表能重新连接
  const nextRightNode = rightNode?.next
  const leftNode = prevLeftNode.next!

  // 切断链表
  prevLeftNode.next = null
  rightNode.next = null

  // 反转链表
  reverseList(leftNode)

  // 将链表重新连接
  prevLeftNode.next = rightNode
  leftNode.next = nextRightNode

  // 返回头节点
  return dummyNode.next
}

const reverseHead1 = reverseBetween(createList([1, 2, 3, 4, 5]), 2, 4)
printListNode(reverseHead1)

/**
 * 头插法
 * 基本思路：在需要反转的区间里，每遍历到一个节点，让这个新节点来到反转部分的起始位置
 * ...=>1=>2=>3=>...
 * ...=>2=>1=>3=>...
 * ...=>3=>2=>1=>...
 */
function reverseBetween2(head: ListNode | null, left: number, right: number): ListNode | null {
  const dummyHeadNode = new ListNode(-1, head)

  // 得到left节点的前一个节点
  let preLeftNode = dummyHeadNode
  for (let i = 0; i < left - 1; i++) {
    preLeftNode = preLeftNode.next!
  }

  // 从left节点开始遍历，遍历到当前节点是right节点为止
  const curr = preLeftNode.next!
  for (let i = 0; i < right - left; i++) {
    // curr节点移到其下一个节点的位置
    const nextNode = curr.next!
    curr.next = nextNode!.next

    // 当前节点的下一个节点移到left节点的位置
    nextNode.next = preLeftNode.next
    preLeftNode.next = nextNode
  }

  return dummyHeadNode.next
}

const reverseHead2 = reverseBetween2(createList([1, 2, 3, 4, 5]), 2, 4)
printListNode(reverseHead2)
