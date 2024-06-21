import auth from "@/store/mobx/auth";
import { observe } from "mobx";
import { useEffect, useState } from "react";

export default function useLoadStores() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!auth.isPersisting && !auth.isHydrated) {
      auth.hydrateStore();
      let disposable = observe(auth, () => {
        setLoaded(true);
      });

      return () => {
        disposable();
      };
    }
  }, [loaded]);

  return loaded;
}
