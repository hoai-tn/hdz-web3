"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Loader from "@/app/components/Loader";

// Create a Context for the loading state
const LoadingContext = createContext<{
  loading: Boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  loading: true,
  setLoading: () => false,
});

// Create a Provider component
const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (loading) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };

export const useLoadingContext = () => useContext(LoadingContext);
