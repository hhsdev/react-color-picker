# React-Color-Picker

A color picking tool for your react projects.

This is a project I dumped out in a coffee-fueled weekend. If you want more
feature-complete color pickers, I'd recommend [@casesandberg](https://github.com/casesandberg)'s [React Color](http://casesandberg.github.io/react-color/).

## Demo

![Demo](https://media.giphy.com/media/l4LvSyplqjd7h1lBkX/giphy.gif)

## Getting started

### Prerequisites

React.

### Installing

```
$ npm install @hhsdev/react-color-picker --save
```

## Usage

```js
import React from "react";
import ColorPicker from "@hhsdev/react-color-picker";

class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        ref={div => (this.div = div)}
        style={{
          padding: 24
        }}
      >
        <ColorPicker
          callback={color =>
            (this.div.style.background = `rgb(${color.r}, ${color.g}, ${color.b})`)
          }
        />
      </div>
    );
  }
}
```
### Documentation

Coming soon!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details