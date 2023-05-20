# React Beautiful Editor

A React component that allows you to create a beautiful editor with embeds, images, links, and more.

![twitter](https://img.shields.io/twitter/follow/0xavp?style=social)
![size](https://img.shields.io/bundlephobia/min/@avp1598/react-beautiful-editor)
![npm](https://img.shields.io/npm/v/@avp1598/react-beautiful-editor)
![downloads](https://img.shields.io/npm/dt/@avp1598/react-beautiful-editor)

![Demo](demo.gif)

## How to use

**Install the package:**

`yarn add @avp1598/react-beautiful-editor`

`pnpm install @avp1598/react-beautiful-editor`

`npm install @avp1598/react-beautiful-editor`

**Import the editor**

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

---

Props marked with **?** are **optional**.
