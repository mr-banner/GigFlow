import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { useGig } from "@/context/useGig";
import { useBid } from "@/context/useBid";
import {
  DollarSign,
  Clock,
  Users,
  ArrowLeft,
  Send,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedGig, fetchGigById, loading: gigLoading } = useGig();
  const {
    bids,
    fetchBidsForGig,
    submitBid,
    hireBid,
    loading: bidLoading,
    rejectBid
  } = useBid();

  const [bidMessage, setBidMessage] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [bidDialogOpen, setBidDialogOpen] = useState(false);

  useEffect(() => {
    fetchGigById(id);
  }, [id]);

  useEffect(() => {
    if (selectedGig && user?._id === selectedGig.ownerId) {
      fetchBidsForGig(selectedGig._id);
    }
  }, [selectedGig]);

  if (gigLoading || !selectedGig) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading gig details...
      </div>
    );
  }

  const isOwner = user?._id === selectedGig.ownerId;

  const formatBudget = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleSubmitBid = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const success = await submitBid({
      gigId: selectedGig._id,
      message: bidMessage,
      price: Number(bidPrice),
    });

    if (success) {
      setBidMessage("");
      setBidPrice("");
      setBidDialogOpen(false);
    }
  };

  const handleHire = async (bidId) => {
    await hireBid(bidId);
    fetchGigById(id); // refresh gig status
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/gigs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gigs
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex justify-between mb-4">
                <span
                  className={`px-2.5 py-1 text-xs rounded-full ${
                    selectedGig.status === "open"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {selectedGig.status}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Posted{" "}
                  {formatDistanceToNow(new Date(selectedGig.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-4">{selectedGig.title}</h1>

              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{selectedGig.description}</p>
            </div>

            {/* Bids (Owner) */}
            {isOwner && (
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Bids Received ({bids.length})
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {bids.length > 0 ? (
                    bids.map((bid) => (
                      <div
                        key={bid._id}
                        className="p-4 rounded-lg border bg-muted/20"
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            <h4 className="font-medium">
                              {bid.freelancerId.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(bid.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {formatBudget(bid.price)}
                            </div>
                            <span className="text-xs">{bid.status}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {bid.message}
                        </p>

                        {bid.status === "pending" &&
                          selectedGig.status === "open" && (
                            <div className="mt-3 flex justify-end gap-2">
                              <button
                                onClick={() => rejectBid(bid._id)}
                                className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted"
                              >
                                Reject
                              </button>

                              <button
                                onClick={() => handleHire(bid._id)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Hire
                              </button>
                            </div>
                          )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center">
                      No bids yet
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground">Budget</div>
                <div className="text-3xl font-bold">
                  {formatBudget(selectedGig.budget)}
                </div>
              </div>

              <div className="border-t border-border my-4" />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Posted</span>
                <span className="font-medium">
                  {format(new Date(selectedGig.createdAt), "MMM d, yyyy")}
                </span>
              </div>

              <div className="border-t border-border my-4" />

              {!isOwner && selectedGig.status === "open" && (
                <button
                  onClick={() => setBidDialogOpen(true)}
                  className="w-full h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Submit a Bid
                </button>
              )}

              {selectedGig.status === "assigned" && (
                <div className="text-center text-muted-foreground text-sm">
                  This gig has been assigned
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {bidDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-background/80"
            onClick={() => setBidDialogOpen(false)}
          />
          <div className="relative bg-card border rounded-xl p-6 w-full max-w-md">
            <button
              onClick={() => setBidDialogOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Submit Your Bid</h2>

            <form onSubmit={handleSubmitBid} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Your Price</label>
                <input
                  type="number"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  className="w-full h-10 px-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Proposal</label>
                <textarea
                  rows={4}
                  value={bidMessage}
                  onChange={(e) => setBidMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={bidLoading}
                className="w-full h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2"
              >
                {bidLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Bid
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GigDetails;
