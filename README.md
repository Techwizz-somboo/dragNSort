# dragNSort

dragNSort is an awesome frontend library to add a draggable grid to your website.

## Downloading

You can include dragNSort with yarn:

```bash
yarn add @techwizz/dragnsort
```

You may also download a release from [GitHub](https://github.com/Techwizz-somboo/dragnsort/releases) or [dragnsort.dev](https://dragnsort.dev).

## Usage

Build a DOM structure like this:

```html
<div class="drag-list">
    <div class="drag-item drag-w25">
        <!-- Your elements here -->
    </div>
    <div class="drag-item drag-w25">
        <!-- Your elements here -->
    </div>
</div>
```

The 2nd class, `drag-w25` is the size of the drag item, the `w` stands for width.

Currently, there are 3 width options:
* `drag-w25`
* `drag-w33`
* `drag-w50`

The number at the end is the percentage of the grid you want the item to take. For example, `drag-w25` would allow for 4 items side by side before making a new row.

If you need to initialize the list **after** the page has already been loaded, for example if you have dynamic content, you may call `initializeDragNSort();` in JS.

In the event you need to listen for when a card is moved, there's the `handle-drag` event, which also returns the source and target nodes.

Example usage:

```js
document.addEventListener('handle-drag', function (event) {
    // Your code, for example maybe you need to redraw a chart
    const sourceNode = event.detail.from;
    const targetNode = event.detail.to;
});
```

You may wish to change the circle drag image, here's an example on overriding it's style:

```css
.drag-icon {
    color: var(--primary-color) !important;
    position: absolute;
    top: 12px !important;
    left: 10px !important;
    background-image: none !important;
    font-family: 'themify';
    font-size: 15px;
    text-align: center;
}

.drag-icon::before {
    content: "\e656"; /* Unicode for ti-move */
}
```

If you have themify added to your project, this will use the `ti-move` icon.

## Notes

dragNSort **IS** mobile and tablet resposive! Grid item sizes automatically change when the screen size gets too small.

This README is up to date as of version 1.0.0.
