import { useEffect, useMemo, useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import GigCard from "../components/GigCard";
import { useGig } from "@/context/useGig";

const Gigs = () => {
  const { gigs, fetchGigs, loading } = useGig();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    fetchGigs(searchQuery);
  }, [searchQuery]);

  const filteredGigs = useMemo(() => {
    let result = [...gigs];

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "budget-high":
        result.sort((a, b) => b.budget - a.budget);
        break;
      case "budget-low":
        result.sort((a, b) => a.budget - b.budget);
        break;
      default:
        break;
    }

    return result;
  }, [gigs, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSortBy("newest");
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "budget-high", label: "Budget: High to Low" },
    { value: "budget-low", label: "Budget: Low to High" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Gigs</h1>
          <p className="text-muted-foreground">
            Find your next project from our curated list of opportunities
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search gigs by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-input bg-background text-foreground hover:bg-accent transition-colors"
            >
              <Filter className="h-4 w-4" />
              Sort
            </button>
          </div>

          {showFilters && (
            <div className="p-4 rounded-lg bg-muted/30 border border-border max-w-sm">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Sort By
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="w-full h-10 px-3 flex items-center justify-between rounded-lg border border-input bg-background"
                >
                  <span>{sortOptions.find(o => o.value === sortBy)?.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showSortDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow z-10">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-accent"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={clearFilters}
                className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing <span className="font-medium text-foreground">{filteredGigs.length}</span> gigs
        </p>

        {loading ? (
          <p className="text-center py-20 text-muted-foreground">Loading gigs...</p>
        ) : filteredGigs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map(gig => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No gigs found</h3>
            <p className="text-muted-foreground">Try a different search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gigs;
