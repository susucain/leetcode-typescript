/**
 * https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/
 * @name 返回链表的倒数第K个节点
 */
import { createList, ListNode } from './util'

/**
 * 思路：假设链表节点数为n，要遍历到倒数第K个节点只需走n-k步
 * 双指针，p1，p2开始都指向头节点，p1先走k步。
 * 这时p1再走n-k步就会遍历到链表末尾的空指针，此时p1，p2同时往前走，直到p1指向链表末尾空指针
 * 此时p2正好走了n-k步，p2所在的节点即为链表第k个节点
 */
function kthToLast(head: ListNode | null, k: number): number {
  let p1: ListNode | null = head
  // p1先走k步
  for (let i = 0; i < k; i++) {
    p1 = p1!.next
  }

  let p2 = head
  while (p1) {
    p1 = p1.next
    p2 = p2!.next
  }

  return p2!.val
}

const lastVal = kthToLast(createList([1, 3, 4]), 2)
console.log(lastVal)
