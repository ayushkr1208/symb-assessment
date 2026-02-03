import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Classroom } from "@/types";
import { getFloorBadgeColor } from "@/lib/utils";
import { Users, Droplet } from "lucide-react";

interface ClassroomCardProps {
  classroom: Classroom;
}

export function ClassroomCard({ classroom }: ClassroomCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{classroom.roomId}</CardTitle>
          <Badge className={getFloorBadgeColor(classroom.floorNo)}>
            Floor {classroom.floorNo}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Capacity: {classroom.capacity} students</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplet className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {classroom.nearWashroom ? (
              <span className="text-green-600 dark:text-green-400">
                ✓ Near washroom
              </span>
            ) : (
              <span className="text-gray-500">No washroom nearby</span>
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
