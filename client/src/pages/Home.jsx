import { Link, useNavigate } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/useAuth";
import { toast } from "@/hooks/useToast";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBrowseGigs = () => {
    if (!user) {
      toast.error("Please login to browse gigs");
      navigate("/login");
      return;
    }
    navigate("/gigs");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 lg:py-32 flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <Briefcase className="h-4 w-4" />
              <span>The Future of Freelancing is Here</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Where Talent Meets{" "}
              <span className="text-primary">Opportunity</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
              GigFlow connects skilled freelancers with clients who need their expertise.
              Post jobs, submit bids, and build your dream team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-8 py-3 text-base font-medium transition-all hover:bg-primary/90 hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : null}

              <button
                onClick={handleBrowseGigs}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-background text-foreground px-8 py-3 text-base font-medium transition-all hover:bg-accent hover:border-primary/50 hover:scale-105"
              >
                Browse Gigs
              </button>
            </div>
          </div>
        </div>

        {/* Background effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default Home;
