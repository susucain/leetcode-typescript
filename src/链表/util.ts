export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function createList(arr) {
  const head = new ListNode(arr[0])
  let node = head

  for (let i = 1, len = arr.length; i < len; i++) {
    node.next = new ListNode(arr[i])
    node = node.next
  }

  return head
}

export function printListNode(head: ListNode | null) {
  let curr = head
  const arr: number[] = []
  while (curr) {
    arr.push(curr.val)
    curr = curr.next
  }
  console.log(arr)
}
