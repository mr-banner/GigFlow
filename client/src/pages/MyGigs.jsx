import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Briefcase } from "lucide-react";
import GigCard from "../components/GigCard";
import { useAuth } from "@/context/useAuth";
import { useGig } from "@/context/useGig";

const MyGigs = () => {
  const { user } = useAuth();
  const { gigs, fetchMyGigs, loading } = useGig();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (user) fetchMyGigs();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md text-center">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">Login Required</h2>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to view your gigs.
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

  const openGigs = gigs.filter(g => g.status === "open");
  const assignedGigs = gigs.filter(g => g.status === "assigned");

  const tabs = [
    { id: "all", label: `All (${gigs.length})`, gigs },
    { id: "open", label: `Open (${openGigs.length})`, gigs: openGigs },
    { id: "assigned", label: `Assigned (${assignedGigs.length})`, gigs: assignedGigs },
  ];

  const currentGigs = tabs.find(t => t.id === activeTab)?.gigs || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Gigs</h1>
            <p className="text-muted-foreground">
              Manage your posted jobs
            </p>
          </div>
          <Link
            to="/post-gig"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <Plus className="h-4 w-4" /> Post New Gig
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center py-20 text-muted-foreground">
            Loading your gigs...
          </p>
        ) : currentGigs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGigs.map(gig => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No gigs found</h3>
            <p className="text-muted-foreground mb-6">
              Post a gig to get started
            </p>
            <Link
              to="/post-gig"
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              <Plus className="h-4 w-4" /> Post Your First Gig
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
