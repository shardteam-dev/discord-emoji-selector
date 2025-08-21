import { useEffect, useState } from "react";

export function useSkin({ pickerId }: { pickerId: string }) {
  const [skin, setSkin] = useState(0);
  useEffect(() => {
    const a = setInterval(() => {
      const newSkin = window["emojipicker-" + pickerId]?.skin;
      const oldSkin = skin;
      if (newSkin !== oldSkin) {
        setSkin(newSkin);
      }
    }, 100);
    return () => {
      clearInterval(a);
    };
  }, [skin]);

  return skin;
}

export function useSearchValue({ pickerId }: { pickerId: string }) {
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const a = setInterval(() => {
      const newSearchValue = window["emojipicker-" + pickerId]?.searchValue;
      const oldSearchValue = searchValue;
      if (newSearchValue !== oldSearchValue) {
        setSearchValue(newSearchValue);
      }
    }, 100);
    return () => {
      clearInterval(a);
    };
  }, [searchValue]);

  return searchValue;
}
