import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ResizableImageNodeView } from "./ResizableImageNodeView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      /**
       * Set media
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string;
        height?: string;
      }) => ReturnType;
    };
  }
}

export interface ImageOptions {
  HTMLAttributes: Record<string, any>;
  uploadFn: (file: File) => Promise<string>;
}

export const IMAGE_REGEX =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const ResizableImage = Node.create<ImageOptions>({
  name: "resizableImage",

  addOptions() {
    return {
      HTMLAttributes: {},
      uploadFn: async () => {
        return "";
      },
    };
  },

  inline: false,

  group: "block",

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "auto",
      },
      dataAlign: {
        default: "left", // 'left' | 'center' | 'right'
      },
      dataFloat: {
        default: null, // 'left' | 'right'
      },
    };
  },

  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'img[src]:not([src^="data:"])',
        getAttrs: (el) => ({
          src: (el as HTMLImageElement).getAttribute("src"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageNodeView);
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: IMAGE_REGEX,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;

          return {
            src,
            alt,
            title,
          };
        },
      }),
    ];
  },
});
