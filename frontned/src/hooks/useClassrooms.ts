"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Classroom, ClassroomFormData } from "@/types";
import { toast } from "sonner";

export function useClassrooms() {
  return useQuery({
    queryKey: ["classrooms"],
    queryFn: () => api.getClassrooms(),
  });
}

export function useCreateClassroom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClassroomFormData) => api.createClassroom(data),
    onSuccess: (newClassroom) => {
      queryClient.setQueryData(
        ["classrooms"],
        (old: Classroom[] | undefined) => {
          if (!old) return [newClassroom];
          return [...old, newClassroom];
        }
      );
      toast.success("Classroom added successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to add classroom"
      );
    },
  });
}
