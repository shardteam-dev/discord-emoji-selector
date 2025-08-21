import { useEffect, useState } from "react";
import type { IEmoji } from "./types";
import render from "./render";
export default function Footer({
  id,
  firstEmoji,
}: {
  id: string;
  firstEmoji: IEmoji;
}) {
  const [footerEmoji, setFooterEmoji] = useState<IEmoji>(firstEmoji);
  useEffect(() => {
    window["emojipicker-" + id].changeFooterEmoji = (emoji: IEmoji) => {
      setFooterEmoji(emoji);
    };
  }, []);
  return (
    <div className="HOKKIEMOJIPICKER-footer mt-auto flex gap-2 items-center border-t-1 px-4 py-3 border-[#363639] bg-[#070709]">
      <div
        className="*:size-9 *:min-w-9 *:max-w-9"
        dangerouslySetInnerHTML={{ __html: render(footerEmoji.char) }}
      />
      <p className="text-lg whitespace-nowrap overflow-hidden text-ellipsis font-gg font-semibold">
        {(footerEmoji.name || "")
          .split(" ")
          .map((e) => `:${e || ""}:`)
          .join(" ")}
      </p>
    </div>
  );
}
