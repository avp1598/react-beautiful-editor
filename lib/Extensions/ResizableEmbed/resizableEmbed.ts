import type { Editor } from "@tiptap/core";
import { mergeAttributes, Node, nodePasteRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableEmbedNodeView from "./resizableEmbedNodeView";

export interface ResizableEmbedOptions {
  boundsSelector: string;
}

type SetEmbedOptions = {
  src: string;
  embedType:
    | "youtube"
    | "figma"
    | "loom"
    | "twitter"
    | "miro"
    | "googleDoc"
    | "googleSheet"
    | "googleSlide";
  width: string;
  height: string;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableEmbed: {
      /**
       * Insert a youtube video
       */
      setEmbed: (options: SetEmbedOptions) => ReturnType;
    };
  }
}

export const ResizableEmbed = Node.create<ResizableEmbedOptions>({
  name: "resizableEmbed",

  onTransaction: ({ editor, transaction }: any) => {
    if (transaction.meta.paste) {
      const position = editor.state.selection.$anchor.pos;
      (editor as Editor).commands.insertContentAt(position + 1, "<p></p>");
    }
  },

  addOptions() {
    return {
      boundsSelector: "",
    };
  },

  inline: false,

  group: "block",

  draggable: true,

  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      embedType: {
        default: null,
      },
      width: {
        default: "",
      },
      height: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type='resizable-embed']",
      },
    ];
  },

  addCommands() {
    return {
      setEmbed:
        (options: SetEmbedOptions) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/g,
        type: this.type,
        getAttributes: (url) => {
          return {
            src: url.input,
            embedType: "youtube",
          };
        },
      }),
      nodePasteRule({
        find: /^https:\/\/www\.figma\.com\/(file|proto)\/[0-9a-zA-Z]{22,}/g,
        type: this.type,
        getAttributes: (url) => {
          return {
            src: url.input,
            embedType: "figma",
          };
        },
      }),
      nodePasteRule({
        find: /^https?:\/\/(www\.)?(twitter\.com)\/.+/g,
        type: this.type,
        getAttributes: (url) => {
          return {
            src: url.input,
            embedType: "twitter",
          };
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "resizable-embed",
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableEmbedNodeView);
  },
});
