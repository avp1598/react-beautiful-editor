import type { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { Rnd } from "react-rnd";
import TwitterEmbed from "./TwitterEmbed";

const ResizableEmbedNodeView = ({
  node,
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

  return (
    <NodeViewWrapper as="article">
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
          borderColor: embedType === "twitter" ? "#888" : "transparent",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: embedType === "twitter" ? "auto" : "hidden",
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
        dragAxis="x"
        dragGrid={[20, 30]}
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
        {embedType === "twitter" && <TwitterEmbed attrs={{ href: src }} />}
      </Rnd>
    </NodeViewWrapper>
  );
};

export default ResizableEmbedNodeView;
