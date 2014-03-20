Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

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
