import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AllocationResult } from "@/types";
import { getFloorBadgeColor } from "@/lib/utils";
import {
  CheckCircle2,
  AlertCircle,
  Users,
  Building2,
  Droplet,
} from "lucide-react";

interface AllocationResultProps {
  result: AllocationResult;
}

export function AllocationResult({ result }: AllocationResultProps) {
  if (!result.success) {
    return (
      <Card className="border-destructive">
        <CardHeader className="flex flex-row items-start gap-4 pb-3">
          <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
          <div>
            <CardTitle className="text-destructive">{result.message}</CardTitle>
            <CardDescription className="mt-1">
              Insufficient seating capacity
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Students Requested</p>
              <p className="text-2xl font-semibold">
                {result.totalStudentsRequested}
              </p>
            </div>
            <div className="p-3 bg-destructive/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Shortfall</p>
              <p className="text-2xl font-semibold text-destructive">
                {result.shortfall}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
        <CardHeader className="flex flex-row items-start gap-4 pb-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div>
            <CardTitle className="text-green-900 dark:text-green-100">
              Allocation Successful
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300 mt-1">
              {result.message}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {result.totalStudentsRequested}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Rooms Allocated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {result.totalRoomsAllocated}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {result.totalCapacityAllocated}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              Excess Capacity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {result.excessCapacity}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Allocated Rooms */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Allocated Rooms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.allocatedRooms?.map((room, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{room.roomId}</CardTitle>
                  <Badge className={getFloorBadgeColor(room.floorNo)}>
                    Floor {room.floorNo}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Capacity</span>
                  <span className="font-semibold">{room.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Droplet className="h-4 w-4" />
                    Washroom
                  </span>
                  <span>
                    {room.nearWashroom ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ✓
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
