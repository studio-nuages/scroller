# JavaScript Page Scroller

## Features

Pure JS Page scroll animation.

## Usage
```html
<script>
    document.addEventListener('DOMContentLoaded', function(){
        var scroller = new Scroller(".scroller", {
            speed: 2000,
            easing: 'easeOutCubic'
        });
    });
</script>
```

```html
<a class="scroller" href="#foo">Scroll</a>
```

## Options

### speed
- "slow"
- "normal"
- "fast"

or number(pixels per second)

### easing

- linear
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic (Default)
- easeInOutCubic
- easeInCirc
- easeOutCirc
- easeInOutCirc

### min

minimum duration.(ms)

### max

maximum duration.(ms)

## LICENSE

This software is released under the MIT License, see LICENSE.