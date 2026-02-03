"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { AllocationRequest, AllocationResult } from "@/types";
import { toast } from "sonner";

export function useAllocateRooms() {
  return useMutation({
    mutationFn: (request: AllocationRequest): Promise<AllocationResult> =>
      api.allocateRooms(request),
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to allocate rooms"
      );
    },
  });
}
