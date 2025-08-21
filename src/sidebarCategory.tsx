import { useEffect, useState } from "react";
import { useSearchValue } from "./hooks";

export default function SidebarCategory({
  categoryName,
  picker,
  icon,
  id,
}: {
  categoryName: string;
  picker: React.RefObject<HTMLDivElement>;
  icon: React.ReactNode;
  id: string;
}) {
  const searchValue = useSearchValue({ pickerId: id });
  const [isActive, setIsActive] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    if ((searchValue || "").length > 0) {
      setIsActive(false);
      return;
    }

    const elem = picker.current;
    const updateActive = () => {
      if (!elem) return;
      const header: any = elem.querySelector(
        ".HOKKIEMOJIPICKER-categoryHeader." + categoryName
      );
      if (!header) return;
      const categoryContainer = header.parentElement;
      const scrollStart = categoryContainer.offsetTop - header.offsetHeight * 6;
      const scrollEnd =
        categoryContainer.offsetTop +
        categoryContainer.offsetHeight -
        header.offsetHeight * 5.5;
      const actualScroll = elem.querySelector(
        ".HOKKIEMOJIPICKER-emojidisplay"
      ).scrollTop;
      if (actualScroll > scrollStart && actualScroll < scrollEnd) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    elem
      .querySelector(".HOKKIEMOJIPICKER-emojidisplay")
      .addEventListener("scroll", updateActive);
    updateActive();
    return () => {
      elem
        .querySelector(".HOKKIEMOJIPICKER-emojidisplay")
        .removeEventListener("scroll", updateActive);
    };
  }, [picker, searchValue]);
  useEffect(() => {
    const elem = picker.current;
    if (!elem) return;
    const header: any = elem.querySelector(
      ".HOKKIEMOJIPICKER-categoryHeader." + categoryName
    );
    const categoryContainer: any = header.parentElement;
    const scrollTop = categoryContainer.offsetTop - header.offsetHeight * 5.5;
    setScrollTop(scrollTop);
  }, []);
  return (
    <button
      onClick={() => {
        const elem = picker.current;
        if (searchValue.length > 0) {
          window["emojipicker-" + id].setSearchValue("");
          setTimeout(() => {
            elem.querySelector(".HOKKIEMOJIPICKER-emojidisplay").scrollTop =
              scrollTop;
          }, 600);
        }
        elem.querySelector(".HOKKIEMOJIPICKER-emojidisplay").scrollTop =
          scrollTop;
      }}
      data-active={isActive ? "true" : "false"}
      className="!outline-0 HOKKIEMOJIPICKER-sidebarButton cursor-pointer size-8 data-[active=true]:bg-white/5 hover:bg-white/10 overflow-hidden *:!size-6.5 transition-all hover:*:!opacity-85 data-[active=true]:*:!opacity-100 flex items-center justify-center rounded-sm *:opacity-50"
    >
      {icon}
    </button>
  );
}
