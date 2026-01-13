import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const GigCard = ({ gig }) => {
  const formatBudget = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  const getStatusColor = (status) =>
    status === "open"
      ? "bg-primary/10 text-primary border-primary/20"
      : "bg-muted text-muted-foreground border-border";

  return (
    <Card className="group hover:border-primary/50 transition-all flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-end">
          <Badge variant="outline" className={getStatusColor(gig.status)}>
            {gig.status === "open" ? "Open" : "Assigned"}
          </Badge>
        </div>

        <Link to={`/gigs/${gig._id}`}>
          <h3 className="font-semibold text-lg mt-2 group-hover:text-primary line-clamp-2">
            {gig.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {gig.description}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4" />
          <span className="font-medium">{formatBudget(gig.budget)}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {formatDistanceToNow(new Date(gig.createdAt), { addSuffix: true })}
          </span>
        </div>

        <Button size="sm" variant="ghost" asChild className="group-hover:bg-primary group-hover:text-primary-foreground">
          <Link to={`/gigs/${gig._id}`}>
            View Details
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GigCard;
