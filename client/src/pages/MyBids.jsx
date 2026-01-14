import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBid } from "@/context/useBid";
import axios from "@/lib/axios";
import {
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/useAuth";

const MyBids = () => {
  const { user } = useAuth();
  const { bids, loading, fetchMyBids } = useBid();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [gigMap, setGigMap] = useState({});

  useEffect(() => {
    if (user) fetchMyBids();
  }, [user]);

  useEffect(() => {
    const loadGigs = async () => {
      const uniqueGigIds = [...new Set(bids.map(b => b.gigId))];
      const entries = await Promise.all(
        uniqueGigIds.map(async (id) => {
          const res = await axios.get(`/gigs/${id}`);
          return [id, res.data.data.gig];
        })
      );
      setGigMap(Object.fromEntries(entries));
    };

    if (bids.length) loadGigs();
  }, [bids]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <Send className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">Login Required</h2>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to view your bids.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const filtered = {
    all: bids,
    pending: bids.filter(b => b.status === "pending"),
    hired: bids.filter(b => b.status === "hired"),
    rejected: bids.filter(b => b.status === "rejected"),
  }[activeTab];

  const formatBudget = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(n);

  const statusStyle = {
    pending: "bg-muted text-muted-foreground",
    hired: "bg-primary/10 text-primary",
    rejected: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">My Bids</h1>
          <p className="text-muted-foreground">
            Track your submitted proposals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["all", "pending", "hired", "rejected"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {!loading && filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((bid) => {
              const gig = gigMap[bid.gigId];
              if (!gig) return null;

              return (
                <div
                  key={bid._id}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${statusStyle[bid.status]}`}
                      >
                        {bid.status === "pending" && <Clock className="h-3 w-3" />}
                        {bid.status === "hired" && <CheckCircle2 className="h-3 w-3" />}
                        {bid.status === "rejected" && <XCircle className="h-3 w-3" />}
                        {bid.status}
                      </span>

                      <Link
                        to={`/gigs/${gig._id}`}
                        className="block text-lg font-semibold mt-2 hover:text-primary"
                      >
                        {gig.title}
                      </Link>

                      <p className="text-sm text-muted-foreground mt-2">
                        {bid.message}
                      </p>

                      <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Submitted{" "}
                        {formatDistanceToNow(new Date(bid.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Your Bid
                      </div>
                      <div className="text-xl font-bold">
                        {formatBudget(bid.price)}
                      </div>

                      <div className="mt-2 text-sm text-muted-foreground">
                        Budget: {formatBudget(gig.budget)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex justify-end">
                    <Link
                      to={`/gigs/${gig._id}`}
                      className="inline-flex items-center gap-1 text-sm hover:text-primary"
                    >
                      View Gig <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !loading ? (
          <div className="text-center py-16">
            <Send className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold">No bids found</h3>
            <p className="text-muted-foreground mb-6">
              Browse gigs and submit your proposals
            </p>
            <Link
              to="/gigs"
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              <Briefcase className="h-4 w-4" />
              Browse Gigs
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyBids;
