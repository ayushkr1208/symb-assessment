"use client";

import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AllocationForm } from "@/components/allocation/AllocationForm";
import { AllocationResult } from "@/components/allocation/AllocationResult";
import { AllocationResult as AllocationResultType } from "@/types";
import { useAllocateRooms } from "@/hooks/useAllocation";

export default function AllocatePage() {
  const [result, setResult] = useState<AllocationResultType | null>(null);
  const allocateRooms = useAllocateRooms();

  const handleSubmit = async (data: { totalStudents: number }) => {
    const response = await allocateRooms.mutateAsync(data);
    setResult(response);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Allocate Exam Rooms</h1>
          <p className="text-muted-foreground mt-2">
            Enter the number of students and we'll allocate the most suitable rooms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Allocation Request</CardTitle>
            </CardHeader>
            <CardContent>
              <AllocationForm
                onSubmit={handleSubmit}
                isLoading={allocateRooms.isPending}
              />
            </CardContent>
          </Card>

          {/* Result Section */}
          {result ? (
            <div className="space-y-4">
              <AllocationResult result={result} />
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
              >
                New Allocation
              </button>
            </div>
          ) : (
            <Card className="flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Enter the total number of students to get started with room allocation
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
