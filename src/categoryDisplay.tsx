import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import render from "./render";
import type { ICategory, ICategoryInfo, IEmoji } from "./types";
import { useSearchValue, useSkin } from "./hooks";

function Emoji({
  pickerId,
  emoji,
  onEmojiSelect,
  key,
}: {
  pickerId: string;
  emoji: IEmoji;
  onEmojiSelect: (emoji: IEmoji) => void;
  key: string;
}) {
  return (
    <div
      onMouseEnter={() => {
        window["emojipicker-" + pickerId].changeFooterEmoji(emoji);
        window["emojipicker-" + pickerId].changeSearchbarPlaceholder(
          emoji.name
        );
      }}
      onClick={() => {
        onEmojiSelect(emoji);
      }}
      className="HOKKIEMOJIPICKER-emoji text-4xl p-1 cursor-pointer hover:bg-white/15  rounded-sm size-12.5 flex items-center justify-center overflow-hidden"
      dangerouslySetInnerHTML={{
        __html: render(emoji.char),
      }}
    />
  );
}
function SkinEmoji({
  pickerId,
  emoji,
  onEmojiSelect,
  key,
}: {
  pickerId: string;
  emoji: IEmoji;
  onEmojiSelect: (emoji: IEmoji) => void;
  key: string;
}) {
  const skin = useSkin({ pickerId });
  const grabEmoji = () =>
    [1, 2, 3, 4, 5].includes(skin)
      ? emoji.tones.find((a) => a.tone.find((b) => b === skin) === skin)?.char
      : emoji.char;
  const fakeEmoji: IEmoji = {
    ...emoji,
    char: grabEmoji(),
    preRendered: true,
    tones: [
      {
        name: emoji.tones[0].name.replaceAll("1", "0"),
        tone: [0],
        char: emoji.char,
      },
      ...emoji.tones,
    ],
  };
  return (
    <div
      onMouseEnter={() => {
        window["emojipicker-" + pickerId].changeFooterEmoji(fakeEmoji);
        window["emojipicker-" + pickerId].changeSearchbarPlaceholder(
          emoji.name
        );
      }}
      onClick={() => {
        onEmojiSelect(fakeEmoji);
      }}
      className="HOKKIEMOJIPICKER-skinemoji text-4xl p-1 cursor-pointer hover:bg-white/15  rounded-sm size-12.5 flex items-center justify-center overflow-hidden"
      dangerouslySetInnerHTML={{
        __html: render(fakeEmoji.char),
      }}
    />
  );
}

export default function CategoryDisplay({
  category,
  categoryInfo,
  isToneSelectorEnabled,
  onEmojiSelect,
  pickerId,
}: {
  category: ICategory;
  categoryInfo: ICategoryInfo;
  isToneSelectorEnabled: boolean;
  onEmojiSelect: (emoji: IEmoji) => void;
  pickerId: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const searchValue = useSearchValue({ pickerId });
  useEffect(() => {
    setIsOpen(
      (localStorage.getItem(
        "hokkiemojipicker-category-" + category.name + "-open"
      ) || "true") === "true"
    );
  }, []);
  if ((searchValue || "").length > 0) {
    if (category.name === "recentlyUsed")
      return <div className="h-1.5 w-full "></div>;
    return (
      <>
        {category.emojis.map((emoji: IEmoji) => {
          if (
            !emoji.name
              .toLowerCase()
              .replace(/_/g, " ")
              .includes(searchValue.toLowerCase().replace(/_/g, " "))
          )
            return <></>;

          if (emoji.hasTone && !emoji.preRendered) {
            return (
              <SkinEmoji
                onEmojiSelect={onEmojiSelect}
                pickerId={pickerId}
                emoji={emoji}
                key={emoji.name}
              />
            );
          }
          return (
            <Emoji
              onEmojiSelect={onEmojiSelect}
              pickerId={pickerId}
              emoji={emoji}
              key={emoji.name}
            />
          );
        })}
      </>
    );
  }
  return (
    <div className="HOKKIEMOJIPICKER-categorydisplay flex flex-col relative w-full pt-2">
      <div
        className={
          "HOKKIEMOJIPICKER-categoryHeader sticky top-0 pt-2 cursor-pointer text-white px-2 flex bg-[#131416] p-1 pb-2 " +
          category.name
        }
        onClick={() => {
          const newOpen = !isOpen;
          setIsOpen(newOpen);
          localStorage.setItem(
            "hokkiemojipicker-category-" + category.name + "-open",
            newOpen ? "true" : "false"
          );
        }}
      >
        <span className="flex gap-1.5 items-center opacity-75 hover:opacity-100">
          <span className="*:size-4.5">{categoryInfo.icon}</span>{" "}
          <span className="text-md font-semibold font-gg">
            {categoryInfo.name}
          </span>
          <ChevronDown
            strokeWidth={2}
            className="transition-all size-5 data-[open=false]:-rotate-90"
            data-open={isOpen ? "true" : "false"}
          />
        </span>
      </div>

      {isOpen && (
        <div className="flex flex-wrap gap-y-0.5">
          {category.emojis.map((emoji: IEmoji) => {
            if (emoji.hasTone && !emoji.preRendered && isToneSelectorEnabled) {
              return (
                <SkinEmoji
                  onEmojiSelect={onEmojiSelect}
                  pickerId={pickerId}
                  emoji={emoji}
                  key={emoji.name}
                />
              );
            }
            return (
              <Emoji
                onEmojiSelect={onEmojiSelect}
                pickerId={pickerId}
                emoji={emoji}
                key={emoji.name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
