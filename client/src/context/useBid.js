import { useContext } from "react";
import { BidContext } from "./BidContext";

export const useBid = () => {
  const context = useContext(BidContext);

  if (!context) {
    throw new Error("useBid must be used within a BidProvider");
  }

  return context;
};
