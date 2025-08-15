import { Card, CardContent } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
  spinnerSize?: "sm" | "md" | "lg";
}

const spinnerSizes = {
  sm: "size-4",
  md: "size-8", 
  lg: "size-12",
};

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  className,
  spinnerSize = "md",
}) => {
  return (
    <Card>
      <CardContent className={cn("p-8 text-center", className)}>
        <Loader2 className={cn(spinnerSizes[spinnerSize], "animate-spin mx-auto mb-4")} />
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
};
