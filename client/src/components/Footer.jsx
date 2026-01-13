import { Link } from "react-router-dom";
import { Briefcase, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">GigFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connect with top freelancers and clients. Post jobs, submit bids, and grow your career.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Freelancers */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">For Freelancers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/gigs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Find Work
                </Link>
              </li>
              <li>
                <Link to="/my-bids" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  My Bids
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* For Clients */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">For Clients</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/post-gig" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/my-gigs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Manage Jobs
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How it Works
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GigFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
