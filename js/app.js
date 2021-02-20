(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	new Vue({
		el: "#app",
		data: {
			list: [
			],
			newItem: '',
			updateIndex: '',
			updateText: '',
			keyWord: 'all',
			getLeft: '',
		},
		methods: {
			addItem() {
				event.preventDefault();
				if (this.newItem.trim() != '') {
					this.list.push({
						text: this.newItem.trim(),
						status: false,
					});
					this.newItem = '';
				}
			},
			deleteItem(index) {
				this.list.splice(index, 1);
			},
			editItem(index) {
				this.updateIndex = index;
				this.updateText = this.list[index].text;
			},
			updateList(index) {
				event.preventDefault();
				if (this.updateText.trim()) {
					this.list[index].text = this.updateText.trim();
				}
				else {
					this.deleteItem(index);
				}
				this.updateIndex = '';
				this.updateText = '';
			},
			deleteCompleted() {
				this.list = this.list.filter(item => !item.status);
			},
			showList(item) {
				switch (this.keyWord) {
					case 'active':
						this.getLeft = this.list.filter(item => !item.status).length;
						return !item.status ? true : false;
						break;
					case 'completed':
						this.getLeft = this.list.filter(item => item.status).length;
						return item.status ? true : false;
						break;
					default:
						this.getLeft = this.list.filter(item => !item.status).length;
						return true;
						break;
				}
			}

		},
		computed: {
			toggleAll: {
				get() {
					if (!this.list.length) return false;
					return this.list.filter(item => !item.status).length ? false : true;
				},
				set(val) {
					this.list.forEach(function (item) {
						item.status = val;
					}, this);
				}
			}
		},
		created() {
			var todoList = JSON.parse(localStorage.getItem('todoList'));
			this.list = todoList ? todoList : this.list;
		},
		updated() {
			localStorage.setItem('todoList', JSON.stringify(this.list));
		}

	})

})(window);
