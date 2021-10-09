/**
 * https://leetcode-cn.com/problems/lru-cache-lcci/
 * @name LRU缓存
 */

interface IVal {
  key: number
  value: number
}

class LinkedNode {
  prev: null | LinkedNode = null
  next: null | LinkedNode = null
  val: IVal | null

  constructor(val: IVal | null) {
    this.val = val
  }
}

class LRUCache {
  capacity: number
  hashMap: Record<number, LinkedNode>
  head: LinkedNode
  tail: LinkedNode

  constructor(capacity: number) {
    this.capacity = capacity
    this.head = new LinkedNode(null)
    this.tail = new LinkedNode(null)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.hashMap = {}
  }

  get(key: number): number {
    const node = this.hashMap[key]
    if (node) {
      this.moveToHead(node)
      return node.val!.value
    } else {
      return -1
    }
  }

  put(key: number, value: number): void {
    if (!this.hashMap[key]) {
      const node = new LinkedNode({ key, value })
      this.addToHead(node)
      this.hashMap[key] = node

      if (Object.keys(this.hashMap).length > this.capacity) {
        const deletedNode = this.tail.prev
        delete this.hashMap[deletedNode!.val!.key]
        this.removeNode(deletedNode!)
      }
    } else {
      const node = this.hashMap[key]
      node.val = { key, value }
      this.moveToHead(node)
    }
  }

  addToHead(node: LinkedNode) {
    // 将节点插入到链表头部
    node.next = this.head.next
    this.head.next = node

    node.next!.prev = node
    node.prev = this.head
  }

  moveToHead(node: LinkedNode) {
    this.removeNode(node)
    this.addToHead(node)
  }

  removeNode(node: LinkedNode) {
    // 从链表中删除node
    node.prev!.next = node.next
    node.next!.prev = node.prev
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const cache = new LRUCache(1)
cache.put(2, 1)
console.log(cache.get(2)) // 1
cache.put(3, 2)
console.log(cache.get(2)) // -1
console.log(cache.get(3)) // 2
