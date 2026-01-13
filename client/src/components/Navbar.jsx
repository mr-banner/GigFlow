import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menu,
  X,
  Briefcase,
  User,
  LogOut,
  Plus,
  FileText,
  Send,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GigFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link
                  to="/gigs"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse Gigs
                </Link>
                <Link
                  to="/post-gig"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Post a Gig
                </Link>
                <Link
                  to="/my-gigs"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  My Gigs
                </Link>
                <Link
                  to="/my-bids"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  My Bids
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/post-gig")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Gig
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-gigs")}>
                    <FileText className="mr-2 h-4 w-4" />
                    My Gigs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-bids")}>
                    <Send className="mr-2 h-4 w-4" />
                    My Bids
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-4">
              <Link
                to="/gigs"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Gigs
              </Link>
              {user ? (
                <>
                  <Link
                    to="/post-gig"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Post a Gig
                  </Link>
                  <Link
                    to="/my-gigs"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Gigs
                  </Link>
                  <Link
                    to="/my-bids"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Bids
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-destructive text-left"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" asChild>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
