import { Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon,
  className,
}) => {
  return (
    <Card>
      <CardContent className={cn("p-8 text-center", className)}>
        {icon && <div className="mb-4">{icon}</div>}
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
};
