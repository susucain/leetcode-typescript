/**
 * https://leetcode-cn.com/problems/lru-cache-lcci/
 * @name LRU缓存
 * 数据获取的数据结构实现使用HashMap，维护LRU（最近最少使用）的数据结构使用双向链表实现，越靠近表头越是近期使用的
 * 数据。每次获取数据时从hasMap中拿到数据返回，并把该数据节点移到链表头；写入数据时，如该键值已存在，则只更改value值
 * 并将节点移到表头；如该健值不存在，则判断容量是否超出，如超出先删除尾节点；如未超出则创建节点，写入hasMap并将该节点放到表头。
 * 注意使用双向链表，插入删除比较方便，头尾使用空节点占位可以少很多判空的条件
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

export class LRUCache {
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
