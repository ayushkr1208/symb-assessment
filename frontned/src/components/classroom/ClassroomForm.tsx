"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ClassroomFormData } from "@/types";

const classroomSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  floorNo: z.number().min(0, "Floor number must be 0 or higher"),
  nearWashroom: z.boolean().default(false),
});

interface ClassroomFormProps {
  onSubmit: (data: ClassroomFormData) => void;
  isLoading?: boolean;
}

export function ClassroomForm({ onSubmit, isLoading }: ClassroomFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ClassroomFormData>({
    resolver: zodResolver(classroomSchema),
    defaultValues: {
      nearWashroom: false,
    },
  });

  const nearWashroom = watch("nearWashroom");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="roomId">Room ID</Label>
        <Input
          id="roomId"
          placeholder="e.g., A-101"
          {...register("roomId")}
          disabled={isLoading}
        />
        {errors.roomId && (
          <p className="text-sm text-destructive">{errors.roomId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          type="number"
          placeholder="e.g., 50"
          {...register("capacity", { valueAsNumber: true })}
          disabled={isLoading}
        />
        {errors.capacity && (
          <p className="text-sm text-destructive">{errors.capacity.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="floorNo">Floor Number</Label>
        <Input
          id="floorNo"
          type="number"
          placeholder="e.g., 1"
          {...register("floorNo", { valueAsNumber: true })}
          disabled={isLoading}
        />
        {errors.floorNo && (
          <p className="text-sm text-destructive">{errors.floorNo.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between space-x-2 p-3 bg-muted rounded-md">
        <Label htmlFor="nearWashroom" className="m-0">
          Near Washroom
        </Label>
        <Switch
          id="nearWashroom"
          checked={nearWashroom}
          onCheckedChange={(checked) => setValue("nearWashroom", checked)}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Classroom"}
      </Button>
    </form>
  );
}
