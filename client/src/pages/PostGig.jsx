import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGig } from "@/context/useGig";
import { DollarSign, Loader2, Briefcase } from "lucide-react";
import { useAuth } from "@/context/useAuth";

const PostGig = () => {
  const { user } = useAuth();
  const { createGig, loading } = useGig();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const success = await createGig({
      title,
      description,
      budget: Number(budget),
    });

    if (success) {
      navigate("/gigs");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md text-center">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Login Required
          </h2>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to post a gig.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Post a New Gig
          </h1>
          <p className="text-muted-foreground">
            Describe your project and find the perfect freelancer
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                Gig Details
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details below to create your job posting
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Job Title *
                  </label>
                  <input
                    placeholder="e.g., Build a Modern Web App"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Description *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your project in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring resize-none"
                    required
                  />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Budget (USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter your budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 h-10 rounded-lg border border-input bg-background hover:bg-accent"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Gig"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGig;
