import { useContext } from "react";
import { GigContext } from "./GigContext";

export const useGig = () => {
  const context = useContext(GigContext);

  if (!context) {
    throw new Error("useGig must be used within a GigProvider");
  }

  return context;
};
