function jh__treestack (jh) {

    var jh__treestack = function jh__treestack (root) {

        this.tree = root;
        this.stack = [root];

    };

    (function (ts) {

        ts.currentDepth = function currentDepth () {
            return this.stack.length;
        };

        ts.location = function () {
            return this.tree.$.line + ':' + this.tree.$.col;
        };

        ts.valueOf = function valueOf () {
            this.flushQueue();
            return this.tree;
        };

        ts.get = function (key) {
            return this.tree[key];
        };

        ts.set = function (key, value) {
            this.tree[key] = value;
        };

        ts.up = function () {
            if (this.stack.length <= 1) {
                throw new Error('Cannot move up, already at top level of tree');
            }
            this.flushQueue();
            this.stack.pop();
            this.tree = this.stack[this.stack.length - 1];
        };

        ts.branch = function (x) {
            this.flushQueue();
            this.stack.push(x);
            this.append(x);
            this.tree = x;
        };

        ts.append = function (x) {
            Array.isArray(this.tree._) || (this.tree._ = []);
            this.tree._.push(x);
            this.update_template = true;
        };

        ts.queue = function (x) {
            if (typeof this.tree.q !== 'string') {
                this.tree.q = '';
                this.__template = this._template();
            }
            this.tree.q += x;
        };

        ts.template = function (t) {
            if (!this._template || this.update_template) {
                this._template = t;
                this.__template = this._template();
                this.update_template = false;
            }
        };

        ts.flushQueue = function () {
            if (typeof this.tree.q === 'string' && this.tree.q.length) {
                if (!this.__template) {
                    throw new Error('No template found when flushing queue');
                }
                this.append(this.__template(this.tree.q));
            }
            delete this.tree.q;
        };

    })(jh__treestack.prototype);

    return jh__treestack;
}
