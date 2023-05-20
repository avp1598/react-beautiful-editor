import { useEffect, useRef, useState } from "react";

export function isValidTweetId(tweetId: bigint) {
  const maxBigInt = BigInt("18446744073709551615"); // 2^64 - 1
  return tweetId > 0 && tweetId < maxBigInt;
}

export function extractTweetId(url: string): string | null {
  // Use a regular expression to extract the Tweet ID from the URL
  const tweetIdRegex = /(?:\/status(?:es)?\/)(\d+)/;
  const match = url.match(tweetIdRegex);
  if (match && match[1]) {
    const tweetId = BigInt(match[1]);
    if (isValidTweetId(tweetId)) {
      return tweetId.toString();
    }
  }

  return null;
}

export default function TwitterEmbed({
  attrs,
}: {
  attrs: {
    href: string;
  };
}) {
  if (!attrs?.href) return null;
  const urlObj = new URL(attrs?.href);
  urlObj.search = "";
  const url = urlObj.toString();

  const tweetId = extractTweetId(url);
  const tweetRef = useRef(null);

  const [scriptAdded, setScriptAdded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    setTimeout(() => {
      setScriptAdded(true);
    }, 1000);

    return () => {
      document.body.removeChild(script);
    };
  }, [tweetId]);

  useEffect(() => {
    if (scriptAdded) {
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets
          .createTweet(tweetId, tweetRef.current, {
            conversation: "none",
            dnt: true,
          })
          .catch((error: any) => {
            console.error("Failed to render tweet:", error);
          });
      }

      return () => {
        if (tweetRef.current) {
          (tweetRef.current as any).innerHTML = "";
        }
      };
    }
  }, [tweetId, scriptAdded]);

  return (
    <div
      ref={tweetRef}
      className="twitter-tweet"
      data-conversation="none"
      data-dnt="true"
      id="tweet"
    >
      <a href={url}></a>
    </div>
  );
}
