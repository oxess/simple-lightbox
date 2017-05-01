# simple-lightbox

## Example use:

- basic use:
```javascipt

$('img').lightbox();

```
- change witing text:
```javascript

$('img').lightbox({
  wait_html: 'please wait ...'
});

```

- change animation speed:
```javascript

$('img').lightbox({
  speed: 1000
});

```

## Existing options:

```javascript
opts = {
  css: {
    'position': 'fixed',
    'z-index': '9999',
    'top' : '0',
    'left': '0',
    'right': '0',
    'bottom': '0',
    'margin': 'auto',
    'width': '0',
    'height': '0',
    'cursor': 'zoom-out'
  },

  overland_css: {
    'position': 'fixed',
    'width': '100%',
    'height': '100vh',
    'background': 'rgba(0,0,0,.6)',
    'z-index': 9998,
    'top': 0,
    'left': 0,
    'color': '#eee',
    'text-align': 'center',
    'display': 'table'
  },

  speed: 500,
  wait_html: 'Proszę czekać ...'
}
```
