"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const allocationSchema = z.object({
  totalStudents: z.number().min(1, "Total students must be at least 1"),
});

type AllocationFormData = z.infer<typeof allocationSchema>;

interface AllocationFormProps {
  onSubmit: (data: AllocationFormData) => void;
  isLoading?: boolean;
}

export function AllocationForm({
  onSubmit,
  isLoading,
}: AllocationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AllocationFormData>({
    resolver: zodResolver(allocationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="totalStudents">Total Students</Label>
        <Input
          id="totalStudents"
          type="number"
          placeholder="Enter number of students"
          {...register("totalStudents", { valueAsNumber: true })}
          disabled={isLoading}
          className="text-lg"
        />
        {errors.totalStudents && (
          <p className="text-sm text-destructive">
            {errors.totalStudents.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Allocating..." : "Allocate Rooms"}
      </Button>
    </form>
  );
}
