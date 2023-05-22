import { useEffect, useRef, useState } from "react";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { resizableImageActions } from "./resizableImageMenu";

let lastClientX: number;

export const ResizableImageNodeView = ({
  node,
  updateAttributes,
  deleteNode,
  extension,
  editor,
}: NodeViewProps) => {
  const src = node.attrs.src;
  const [isHover, setIsHover] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(0);

  const [proseMirrorContainerWidth, setProseMirrorContainerWidth] = useState(0);

  const [mediaActionActiveState, setMediaActionActiveState] = useState<
    Record<string, boolean>
  >({});

  const resizableImgRef = useRef<HTMLImageElement | HTMLVideoElement | null>(
    null
  );

  const calculateMediaActionActiveStates = () => {
    const activeStates: Record<string, boolean> = {};

    resizableImageActions.forEach(({ tooltip, isActive }) => {
      activeStates[tooltip] = !!isActive?.(node.attrs);
    });

    setMediaActionActiveState(activeStates);
  };

  useEffect(() => {
    calculateMediaActionActiveStates();
  }, [node.attrs]);

  const mediaSetupOnLoad = () => {
    // ! TODO: move this to extension storage
    const proseMirrorContainerDiv = document.querySelector(".ProseMirror");

    if (proseMirrorContainerDiv)
      setProseMirrorContainerWidth(proseMirrorContainerDiv?.clientWidth);

    // When the media has loaded
    if (!resizableImgRef.current) return;

    resizableImgRef.current.onload = () => {
      // Aspect Ratio from its original size
      setAspectRatio(
        (resizableImgRef.current as HTMLImageElement).naturalWidth /
          (resizableImgRef.current as HTMLImageElement).naturalHeight
      );
    };

    setTimeout(() => calculateMediaActionActiveStates(), 200);
  };

  const setLastClientX = (x: number) => {
    lastClientX = x;
  };

  useEffect(() => {
    mediaSetupOnLoad();
  });

  interface WidthAndHeight {
    width: number;
    height: number;
  }

  const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
    width < 100 || height < 100;

  const documentHorizontalMouseMove = (e: MouseEvent) => {
    setTimeout(() => onHorizontalMouseMove(e));
  };

  const startHorizontalResize = (e: { clientX: number }) => {
    lastClientX = e.clientX;

    setTimeout(() => {
      document.addEventListener("mousemove", documentHorizontalMouseMove);
      document.addEventListener("mouseup", stopHorizontalResize);
    });
  };

  const stopHorizontalResize = () => {
    lastClientX = -1;

    document.removeEventListener("mousemove", documentHorizontalMouseMove);
    document.removeEventListener("mouseup", stopHorizontalResize);
  };

  const onHorizontalResize = (
    directionOfMouseMove: "right" | "left",
    diff: number
  ) => {
    if (!resizableImgRef.current) {
      console.error("Media ref is undefined|null", {
        resizableImg: resizableImgRef.current,
      });
      return;
    }

    const currentMediaDimensions = {
      width: resizableImgRef.current?.width,
      height: resizableImgRef.current?.height,
    };

    const newMediaDimensions = {
      width: -1,
      height: -1,
    };

    if (directionOfMouseMove === "left") {
      newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff);
    } else {
      newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff);
    }

    if (newMediaDimensions.width > proseMirrorContainerWidth)
      newMediaDimensions.width = proseMirrorContainerWidth;

    newMediaDimensions.height = newMediaDimensions.width / aspectRatio;

    if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

    updateAttributes(newMediaDimensions);
  };

  const onHorizontalMouseMove = (e: MouseEvent) => {
    if (lastClientX === -1) return;

    const { clientX } = e;

    const diff = lastClientX - clientX;

    if (diff === 0) return;

    const directionOfMouseMove: "left" | "right" = diff > 0 ? "left" : "right";

    setTimeout(() => {
      onHorizontalResize(directionOfMouseMove, Math.abs(diff));
      lastClientX = clientX;
    });
  };

  if (!src) {
    return (
      <NodeViewWrapper as="article">
        <input
          autoFocus
          className="bubble-menu-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            extension.options.uploadFn(file).then((src: string) => {
              updateAttributes({
                src,
              });
            });
          }}
        />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      as="article"
      className="resizable-image-node-view"
      style={{
        justifyContent:
          node.attrs.dataAlign !== "center"
            ? `flex-${node.attrs.dataAlign}`
            : "center",
      }}
    >
      <div
        className="container"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={node.attrs.src}
          ref={resizableImgRef as any}
          alt={node.attrs.src}
          width={node.attrs.width}
          height={node.attrs.height}
        />
        {editor.isEditable && (
          <div
            className={`horizontal-resize-handle`}
            title="Resize"
            onClick={({ clientX }) => setLastClientX(clientX)}
            onMouseDown={startHorizontalResize}
            onMouseUp={stopHorizontalResize}
            style={{
              opacity: isHover ? 0.5 : 0,
            }}
          />
        )}

        {editor.isEditable && (
          <section
            className={`resizable-image-buttons`}
            style={{
              opacity: isHover ? 1 : 0,
            }}
          >
            {resizableImageActions.map((btn) => {
              return (
                // TODO: figure out why tooltips are not working
                <button
                  key={btn.tooltip}
                  type="button"
                  className={`btn rounded-none h-8 px-2 ${
                    mediaActionActiveState[btn.tooltip] ? "active" : ""
                  }`}
                  onClick={() =>
                    btn.tooltip === "Delete"
                      ? deleteNode()
                      : btn.action?.(updateAttributes)
                  }
                >
                  <i className={`${btn.icon} scale-150`} />
                </button>
              );
            })}
          </section>
        )}
      </div>
    </NodeViewWrapper>
  );
};
