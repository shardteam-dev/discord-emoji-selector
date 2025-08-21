import { useEffect, useState } from "react";
import render from "./render";

export default function SkinSelector({ id }: { id: string }) {
  const skins = ["👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"];
  const [selectedTone, setSelectedTone] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setSelectedTone(
      parseInt(localStorage.getItem("hokkiemojipicker-skin") || "0")
    );
  }, []);
  useEffect(() => {
    window["emojipicker-" + id].skin = selectedTone;
  }, [selectedTone]);
  return (
    <div className="relative">
      <div
        className="HOKKIEMOJIPICKER-skinselector-trigger opacity-75 hover:opacity-100 cursor-pointer *:size-7 *:min-w-7"
        onClick={() => {
          setOpen(!open);
        }}
        dangerouslySetInnerHTML={{ __html: render(skins[selectedTone]) }}
      />
      <div
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
        }}
        className="absolute flex transition-all flex-col cursor-pointer top-full translate-y-2 overflow-hidden -left-2 rounded-sm border-1 bg-neutral-900"
      >
        {skins
          .filter((a) => a !== skins[selectedTone])
          .map((skin, i) => {
            return (
              <div
                className="HOKKIEMOJIPICKER-skinselector-skinoption *:size-7 *:min-w-7 hover:bg-white/5 p-2 transition-all"
                onClick={() => {
                  setOpen(!open);
                  setSelectedTone(i);
                  localStorage.setItem("hokkiemojipicker-skin", i + "");
                }}
                dangerouslySetInnerHTML={{
                  __html: render(skin),
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
