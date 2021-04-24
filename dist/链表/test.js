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
            this.moveToHead(node);
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
    moveToHead(node) {
        // 从链表中删除node
        this.removeNode(node);
        // 将节点插入到链表头部
        node.next = this.head.next;
        this.head.next = node;
        node.next.prev = node;
        node.prev = this.head;
    }
    removeNode(node) {
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
let cache = new LRUCache(2);
//# sourceMappingURL=test.js.map