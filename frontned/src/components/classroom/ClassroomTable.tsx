"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Classroom } from "@/types";
import { getFloorBadgeColor } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface ClassroomTableProps {
  classrooms: Classroom[];
  sortBy?: "floor" | "capacity";
}

export function ClassroomTable({
  classrooms,
  sortBy = "floor",
}: ClassroomTableProps) {
  const sortedClassrooms = [...classrooms].sort((a, b) => {
    if (sortBy === "floor") {
      return a.floorNo - b.floorNo;
    }
    return b.capacity - a.capacity;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room ID</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Floor</TableHead>
          <TableHead>Near Washroom</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedClassrooms.map((classroom) => (
          <TableRow key={classroom._id}>
            <TableCell className="font-medium">{classroom.roomId}</TableCell>
            <TableCell>{classroom.capacity} students</TableCell>
            <TableCell>
              <Badge className={getFloorBadgeColor(classroom.floorNo)}>
                Floor {classroom.floorNo}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {classroom.nearWashroom ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400">
                      Yes
                    </span>
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">No</span>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
