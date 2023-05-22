import type { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { Rnd } from "react-rnd";
import TwitterEmbed from "./TwitterEmbed";

const ResizableEmbedNodeView = ({
  node,
  deleteNode,
  updateAttributes,
  extension,
  editor,
}: NodeViewProps) => {
  const src = node.attrs.src;
  const embedType = node.attrs.embedType;
  const nodeWidth = node.attrs.width;
  const nodeHeight = node.attrs.height;
  const id = src.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
  )?.[2];
  const [height, setHeight] = useState(nodeHeight || "400");
  const [width, setWidth] = useState(nodeWidth || "600");
  const [source, setSource] = useState("");

  if (!src) {
    return (
      <NodeViewWrapper as="article">
        <div style={{ display: "flex", width: "15rem" }}>
          <input
            autoFocus
            className="bubble-menu-input"
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder={`Enter ${embedType} URL`}
          />
          <button
            className="editor-bubble-menu-button"
            onClick={() => {
              updateAttributes({
                src: source,
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />{" "}
            </svg>
          </button>
          <button className="editor-bubble-menu-button" onClick={deleteNode}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
              />{" "}
            </svg>
          </button>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper as="article">
      {embedType !== "twitter" ? (
        <Rnd
          disableDragging
          bounds={extension.options.boundsSelector || "window"}
          default={{
            x: 0,
            y: 0,
            width: 600,
            height: 400,
          }}
          size={{
            width,
            height,
          }}
          style={{
            border: "solid 1px",
            borderColor: "transparent",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          onResize={(e, direction, ref) => {
            if (editor.isEditable) {
              setWidth(ref.style.width);
              setHeight(ref.style.height);
              updateAttributes({
                width: ref.style.width,
                height: ref.style.height,
              });
            }
          }}
          lockAspectRatio
        >
          {embedType === "youtube" && (
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          )}
          {embedType === "figma" && (
            <iframe
              src={`https://www.figma.com/embed?embed_host=astra&url=${encodeURIComponent(
                src
              )}`}
              title="Figma Embed"
              style={{
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          )}
        </Rnd>
      ) : (
        <div
          style={{
            border: "solid 1px",
            borderColor: "transparent",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <TwitterEmbed attrs={{ href: src }} />
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default ResizableEmbedNodeView;
