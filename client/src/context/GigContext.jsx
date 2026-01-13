import { createContext, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "@/hooks/useToast";

const GigContext = createContext(null);

export const GigProvider = ({ children }) => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGigs = async (search = "") => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("/api/gigs", {
        params: search ? { search } : {},
      });

      setGigs(res.data.data.gigs);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch gigs";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const createGig = async ({ title, description, budget }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        "/api/gigs",
        { title, description, budget },
        { withCredentials: true }
      );

      setGigs((prev) => [res.data.data.gig, ...prev]);
      toast.success("Gig created successfully");
      return true;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create gig";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchMyGigs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("/api/gigs/getGigs", {
        withCredentials: true,
      });

      setGigs(res.data.data.gigs);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch your gigs";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGigById = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`/api/gigs/${id}`);
      setSelectedGig(res.data.data.gig);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch gig details";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GigContext.Provider
      value={{
        gigs,
        loading,
        error,
        fetchGigs,
        createGig,
        fetchMyGigs,
        fetchGigById,
        selectedGig,
      }}
    >
      {children}
    </GigContext.Provider>
  );
};

export { GigContext };
