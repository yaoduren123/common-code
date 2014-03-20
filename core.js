Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

//插入排序：从无序区的第一个元素开始和它前面有序区的元素进行比较，如果比前面的元素小，那么前面的元素向后移动，否则就将此元素插入到相应的位置。
Array.method('insertSort', function() {
    var len = this.length,
        i, j, tmp;
    for (i = 1; i < len; i++) {
        tmp = this[i];
        j = i - 1;
        while (j >= 0 && tmp < this[j]) {
            this[j + 1] = this[j];
            j--;
        }
        this[j + 1] = tmp;
    }
    return this;
});

Array.method('bInsertSort', function() {
    var len = this.length,
        i, j, tmp, low, high, mid;
    for (i = 1; i < len; i++) {
        tmp = this[i];
        low = 0;
        high = i - 1;
        while (low <= high) {
            mid = (low + high) / 2;
            if (tmp < this[mid]) high = mid - 1;
            else low = mid + 1;
        }
        for (j = i - 1; j >= high + 1; j--) {
            this[j + 1] = this[j];
        }
        this[j + 1] = tmp;
    }
    return this;
});
