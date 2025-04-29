let sourceNode = null;

function DragNSort(config) {
    this.$activeItem = null;
    this.$container = config.container;
    this.$items = this.$container.querySelectorAll('.' + config.itemClass);
    this.dragStartClass = config.dragStartClass;
    this.dragEnterClass = config.dragEnterClass;
    this.parentDragClass = config.parentDragClass;
}

DragNSort.prototype.removeClasses = function () {
    this.$items.forEach(function ($item) {
        $item.classList.remove(this.dragStartClass, this.dragEnterClass);
    }.bind(this));
};

DragNSort.prototype.isSameContainer = function (item1, item2) {
    return item1 === item2;
};

DragNSort.prototype.on = function (elements, eventType, handler) {
    elements.forEach(function (element) {
        element.addEventListener(eventType, handler.bind(element, this), false);
    }.bind(this));
};

DragNSort.prototype.onDragStart = function (_this, event) {
    _this.$activeItem = this;
    sourceNode = this;
    
    this.classList.add(_this.dragStartClass);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
};

DragNSort.prototype.onDragEnd = function (_this) {
    this.classList.remove(_this.dragStartClass);
};

DragNSort.prototype.onDragEnter = function (_this) {
    if (_this.isSameContainer(sourceNode.parentNode, _this.$container)) {
        this.classList.add(_this.dragEnterClass);
    }
};

DragNSort.prototype.onDragLeave = function (_this) {
    if (_this.isSameContainer(sourceNode.parentNode, _this.$container)) {
        this.classList.remove(_this.dragEnterClass);
    }
};

DragNSort.prototype.onDragOver = function (_this, event) {
    if (event.preventDefault) {
        event.preventDefault();
    }

    event.dataTransfer.dropEffect = 'move';

    return false;
};

DragNSort.prototype.onDrop = function (_this, event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    }

    if (_this.$activeItem !== this && _this.isSameContainer(sourceNode.parentNode, _this.$container)) {
        _this.$activeItem.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData('text/html');
    }

    const customEvent = new CustomEvent('handle-drag', {
        detail: {
            from: sourceNode,
            to: this
        }
    });
    document.dispatchEvent(customEvent);

    DragNSort_adjustItemHeights();
    _this.removeClasses();
    sourceNode = null;
    return false;
};

DragNSort.prototype.bind = function () {
    this.on(this.$items, 'dragstart', this.onDragStart);
    this.on(this.$items, 'dragend', this.onDragEnd);
    this.on(this.$items, 'dragover', this.onDragOver);
    this.on(this.$items, 'dragenter', this.onDragEnter);
    this.on(this.$items, 'dragleave', this.onDragLeave);
    this.on(this.$items, 'drop', this.onDrop);
};

DragNSort.prototype.setUniformHeight = function () {
    let maxHeight = 0;

    this.$items.forEach(function ($item) {
        const itemHeight = $item.offsetHeight;
        if (itemHeight > maxHeight) {
            maxHeight = itemHeight;
        }
    });

    this.$items.forEach(function ($item) {
        $item.style.height = `${maxHeight}px`;
    });
};

DragNSort.prototype.init = function () {
    let identifier = Math.random().toString(36).slice(2, 10);
    this.$container.classList.add(`drag-initialized-${identifier}`);
    this.$items.forEach(function ($item) {
        const dragIcon = document.createElement('div');
        dragIcon.classList.add('drag-icon');
        dragIcon.setAttribute('draggable', true);

        $item.appendChild(dragIcon);
    });

    this.setUniformHeight();
    this.bind();
};

function initializeDragNSort() {
    const listGroups = document.querySelectorAll('.drag-list:not([class*="drag-initialized"])');
    listGroups.forEach(group => {
        const draggable = new DragNSort({
            container: group,
            itemClass: 'drag-item',
            dragStartClass: 'drag-start',
            dragEnterClass: 'drag-enter'
        });
        draggable.init();
    });

    return true;
}

function DragNSort_adjustItemHeights() {
    const listGroups = document.querySelectorAll('.drag-list');
    listGroups.forEach(group => {
        const items = group.querySelectorAll('.drag-item');
        let maxHeight = 0;

        items.forEach(item => {
            item.style.height = 'auto';
        });

        items.forEach(item => {
            maxHeight = Math.max(maxHeight, item.offsetHeight);
        });

        items.forEach(item => {
            item.style.height = maxHeight + 'px';
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    DragNSort_adjustItemHeights();

    window.addEventListener('resize', function () {
        DragNSort_adjustItemHeights();
    });

    initializeDragNSort();
});
