"use strict";
/**
 * https://leetcode-cn.com/problems/lru-cache-lcci/
 * @name LRU缓存
 */
class LinkedNode {
    constructor(val) {
        this.prev = null;
        this.next = null;
        this.val = val;
    }
}
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.head = new LinkedNode(null);
        this.tail = new LinkedNode(null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.hashMap = {};
    }
    get(key) {
        const node = this.hashMap[key];
        if (node) {
            this.moveToHead(node);
            return node.val.value;
        }
        else {
            return -1;
        }
    }
    put(key, value) {
        if (!this.hashMap[key]) {
            const node = new LinkedNode({ key, value });
            this.addToHead(node);
            this.hashMap[key] = node;
            if (Object.keys(this.hashMap).length > 2) {
                const deletedNode = this.tail.prev;
                delete this.hashMap[deletedNode.val.key];
                this.removeNode(deletedNode);
            }
        }
        else {
            const node = this.hashMap[key];
            node.val = { key, value };
            this.moveToHead(node);
        }
    }
    addToHead(node) {
        // 将节点插入到链表头部
        node.next = this.head.next;
        this.head.next = node;
        node.next.prev = node;
        node.prev = this.head;
    }
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    removeNode(node) {
        // 从链表中删除node
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
const cache = new LRUCache(2);
cache.put(1, 1);
cache.get(1); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
cache.get(2); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
cache.get(1); // 返回 -1 (未找到)
cache.get(3); // 返回  3
cache.get(4); // 返回  4
//# sourceMappingURL=test.js.map