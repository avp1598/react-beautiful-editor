# React Beautiful Editor

[Live Demo](https://editor.avp1598.dev/)

A React component that allows you to create a beautiful rich text editor with resizable embeds, images, links, and more.

It is built on top of [tiptap](https://tiptap.dev/) and it is an all batteries included editor.

<a href="https://twitter.com/0xavp" target="_blank">
  <img src="https://img.shields.io/twitter/follow/0xavp?style=social" alt="Twitter: 0xavp" />
</a>
<a href="https://www.npmjs.com/package/@avp1598/react-beautiful-editor" target="_blank">
  <img src="https://img.shields.io/bundlephobia/min/@avp1598/react-beautiful-editor" alt="npm" />
</a>
<a href="https://www.npmjs.com/package/@avp1598/react-beautiful-editor" target="_blank">
  <img src="https://img.shields.io/npm/v/@avp1598/react-beautiful-editor" alt="npm" />
</a>
<a href="https://www.npmjs.com/package/@avp1598/react-beautiful-editor" target="_blank">
  <img src="https://img.shields.io/npm/dt/@avp1598/react-beautiful-editor" alt="downloads" />
</a>

![Demo](demo2.gif)

## How to use

**Install the package:**

`yarn add @avp1598/react-beautiful-editor`

`pnpm install @avp1598/react-beautiful-editor`

`npm install @avp1598/react-beautiful-editor`

**Import the editor and it's css**

```tsx
import { Editor } from "@avp1598/react-beautiful-editor";

const Home = () => {
  const [description, setDescription] = useState("");

  const onSave = () => {
    console.log("description", description);
  };

  const theme = "dark";

  return (
    <div
      // set text color based on the theme
      style={{
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <Editor
        value={description}
        onChange={(value) => {
          setDescription(value);
        }}
        theme={theme}
        uploadImage={async (file) => {
          console.log("file", file);
          // upload the file to your server and return the url
          return "https://picsum.photos/400/600";
        }}
        placeholder="Enter description"
        embedBoundsSelector=".bounds"
        onBlur={onSave}
        readonly={false}
      />
    </div>
  );
};
```

```tsx
// import the css
import "@avp1598/react-beautiful-editor/dist/Editor.css";
```

## Features

### Slash commands (Type `/` to see the list of commands)

#### `Text`

#### `Heading 1`

#### `Heading 2`

#### `To-do list`

#### `Bulleted list`

#### `Numbered list`

#### `Divider`

#### `Image`

#### `Youtube`

#### `Twitter`

#### `Figma`

### Resizable embeds and Images

### Node marks (Bold, Italic, Underline, Strikethrough, Link)

## API (Available props)

You can pass the following props to the `Editor` component.

### `value` (string)

The string value of the editor.

<hr />

### `onChange` (function)

A function that will be called whenever the value of the editor changes, with the new value as the first argument.

<hr />

### `uploadImage` (function)

A function that will be called whenever the user uploads an image, with the image file as the first argument. This function should return a promise that resolves to the URL of the uploaded image.

<hr />

### `placeholder?` (string)

The placeholder text for the editor.

default: `Start typing and enter / for commands`

<hr />

### `theme?` (string)

The theme of the editor.

default: `light`

<hr />

### `embedBoundsSelector?` (string)

The selector for the element that will be used to calculate the bounds of the embeds.

default: `window`

<hr />

### `readonly?` (boolean)

Whether the editor is readonly or not.

default: `false`

<hr />

### `onBlur?` (function)

A function that will be called whenever the editor loses focus.

<hr />

### `onFocus?` (function)

A function that will be called whenever the editor gains focus.

<hr />

### `onReady?` (function)

A function that will be called whenever the editor is ready to be used.

<hr />

Props marked with **?** are **optional**.

## Working with server side rendering (SSR)

The editor component will not work if the page is server side rendered using next.js. To get around this, dynamic import the editor component.

```tsx
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@avp1598/react-beautiful-editor"), {
  ssr: false,
});
```

## Working with tailwindCSS

Tailwind css overrides the default heading and list styles of the editor. To fix this, you can add the following to your global css file where your tailwind directives are defined.

```css
@tailwind base;

@layer base {
  ul,
  ol {
    list-style: revert;
  }

  h1,
  h2 {
    font-size: revert;
    font-weight: revert;
  }
}
```
