import { createContext, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "@/hooks/useToast";

const BidContext = createContext(null);

export const BidProvider = ({ children }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const submitBid = async ({ gigId, message, price }) => {
    try {
      setLoading(true);
      setError(null);

      await axios.post(
        "/api/bids",
        { gigId, message, price },
        { withCredentials: true }
      );

      toast.success("Bid submitted successfully");
      return true;
    } catch (err) {
      const messageText = err.response?.data?.message || "Failed to submit bid";
      setError(messageText);
      toast.error(messageText);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchBidsForGig = async (gigId) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`/api/bids/${gigId}`, {
        withCredentials: true,
      });

      setBids(res.data.data.bids);
    } catch (err) {
      const messageText = err.response?.data?.message || "Failed to fetch bids";
      setError(messageText);
      toast.error(messageText);
    } finally {
      setLoading(false);
    }
  };

  const hireBid = async (bidId) => {
    try {
      setLoading(true);
      setError(null);

      await axios.patch(
        `/api/bids/${bidId}/hire`,
        {},
        { withCredentials: true }
      );
      setBids((prev) =>
        prev.map((bid) =>
          bid._id === bidId
            ? { ...bid, status: "hired" }
            : { ...bid, status: "rejected" }
        )
      );

      toast.success("Freelancer hired successfully");
      return true;
    } catch (err) {
      const messageText =
        err.response?.data?.message || "Failed to hire freelancer";
      setError(messageText);
      toast.error(messageText);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectBid = async (bidId) => {
    try {
      setLoading(true);
      setError(null);

      await axios.patch(
        `/api/bids/${bidId}/reject`,
        {},
        { withCredentials: true }
      );

      setBids((prev) =>
        prev.map((bid) =>
          bid._id === bidId ? { ...bid, status: "rejected" } : bid
        )
      );

      toast.success("Bid rejected");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to reject bid";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyBids = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/bids/my", { withCredentials: true });
      setBids(res.data.data.bids);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to reject bid";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BidContext.Provider
      value={{
        bids,
        loading,
        error,
        submitBid,
        fetchBidsForGig,
        hireBid,
        rejectBid,
        fetchMyBids,
      }}
    >
      {children}
    </BidContext.Provider>
  );
};

export { BidContext };
