import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import React, { useCallback, useState } from "react";

type Props = {
  editor: Editor;
};

const Bubble = ({ editor }: Props) => {
  const [addingLink, setAddingLink] = useState(false);
  const [link, setLink] = useState("");

  const onClickLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    if (previousUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      setAddingLink(true);
    }
  }, [editor]);

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bubble-menu-container">
        {!addingLink && (
          <div
            style={{
              display: "flex",
            }}
          >
            <button
              className="editor-bubble-menu-button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              style={{
                fontWeight: "bold",
                backgroundColor: editor.isActive("bold")
                  ? "var(--react-beautiful-editor-menu-item-hover)"
                  : "transparent",
              }}
            >
              B
            </button>
            <button
              className="editor-bubble-menu-button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              style={{
                fontStyle: "italic",
                backgroundColor: editor.isActive("italic")
                  ? "var(--react-beautiful-editor-menu-item-hover)"
                  : "transparent",
              }}
            >
              i
            </button>
            <button
              className="editor-bubble-menu-button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              style={{
                textDecoration: "line-through",
                backgroundColor: editor.isActive("strike")
                  ? "var(--react-beautiful-editor-menu-item-hover)"
                  : "transparent",
              }}
            >
              S
            </button>
            <button
              className="editor-bubble-menu-button"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              style={{
                backgroundColor: editor.isActive("highlight")
                  ? "var(--react-beautiful-editor-menu-item-hover)"
                  : "transparent",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                width="13"
                height="13"
                style={{
                  marginTop: 2,
                }}
              >
                <path d="M398.789,22.31a31.762,31.762,0,0,0-22.771-9.52H376a31.769,31.769,0,0,0-22.783,9.552L87.534,292.234a32.086,32.086,0,0,0,.177,45.076l14.7,14.7L16,439.427V478H122.8l52.8-52.8,12.479,12.48a32,32,0,0,0,46-.77L492.313,160.77a31.913,31.913,0,0,0-.6-44.339ZM109.548,446H54.5l46.552-47.1,27.8,27.8Zm101.16-30.946L175.6,379.947l-24.127,24.127-27.932-27.932,23.986-24.269-37.191-37.189,48.338-49.105L257.8,364.7Zm68.958-73.74-98.541-98.54L376.017,44.791l92.923,94.121Z" />
              </svg>
            </button>
            <button
              className="editor-bubble-menu-button"
              onClick={onClickLink}
              style={{
                backgroundColor: editor.isActive("link")
                  ? "var(--react-beautiful-editor-menu-item-hover)"
                  : "transparent",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />{" "}
                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />{" "}
              </svg>
            </button>
          </div>
        )}
        {addingLink && (
          <div style={{ display: "flex", width: "15rem" }}>
            <input
              autoFocus
              className="bubble-menu-input"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button
              className="editor-bubble-menu-button"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: link })
                  .run();
                setAddingLink(false);
                setLink("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />{" "}
              </svg>
            </button>
            <button
              className="editor-bubble-menu-button"
              onClick={() => {
                setAddingLink(false);
                setLink("");
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                />{" "}
              </svg>
            </button>
          </div>
        )}
      </div>
    </BubbleMenu>
  );
};

export default Bubble;
