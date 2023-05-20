import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";
import CommandList from "./CommandList";
import type { Editor, Range } from "@tiptap/core";

type CommandProps = {
  editor: Editor;
  range: Range;
};

export default {
  items: ({ query }: { query: string }) => {
    return [
      {
        name: "Text",
        id: "text",
        description: "Just start writing with plain text",
        image: "https://ik.imagekit.io/spectcdn/editor_text.png",
        command: ({ editor, range }: CommandProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("paragraph", { level: 1 })
            .run();
        },
      },
      {
        name: "Heading 1",
        id: "h1",
        description: "Big section heading",
        image: "https://ik.imagekit.io/spectcdn/editor_h1.png",
        command: ({ editor, range }: CommandProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        name: "Heading 2",
        id: "h2",
        description: "Medium section heading",
        image: "https://ik.imagekit.io/spectcdn/editor_h2.png",
        command: ({ editor, range }: CommandProps) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      {
        name: "To-do list",
        id: "todo",
        description: "Tracks tasks with a to-do list",
        image: "https://ik.imagekit.io/spectcdn/editor_todo.png",
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
      },
      {
        name: "Bulleted list",
        id: "bulletedList",
        description: "Create a simple bulleted list",
        image: "https://ik.imagekit.io/spectcdn/editor_bulleted_list.png",
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        name: "Numbered list",
        id: "numberedList",
        description: "Create a list with numbering",
        image: "https://ik.imagekit.io/spectcdn/editor_numbered_list.png",
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        name: "Divider",
        id: "divider",
        description: "Visually divide blocks with a horizontal line",
        image: "https://ik.imagekit.io/spectcdn/editor_divider.png",
        command: ({ editor, range }: CommandProps) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
      },
    ]
      .filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
  },

  render: () => {
    let component: any;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(CommandList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },
      onUpdate(props: any) {
        component.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },
      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown({
          ...props,
          component: component.element,
        });
      },
      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
