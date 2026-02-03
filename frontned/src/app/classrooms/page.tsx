"use client";

import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClassroomForm } from "@/components/classroom/ClassroomForm";
import { ClassroomTable } from "@/components/classroom/ClassroomTable";
import { PageLoadingSpinner } from "@/components/common/LoadingSpinner";
import { useClassrooms, useCreateClassroom } from "@/hooks/useClassrooms";
import { ClassroomFormData } from "@/types";
import { Plus } from "lucide-react";

export default function ClassroomsPage() {
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"floor" | "capacity">("floor");

  const { data: classrooms, isLoading } = useClassrooms();
  const createClassroom = useCreateClassroom();

  const handleSubmit = async (data: ClassroomFormData) => {
    await createClassroom.mutateAsync(data);
    setOpen(false);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Classrooms</h1>
            <p className="text-muted-foreground mt-2">
              Manage and view all available classrooms
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add Classroom
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Classroom</DialogTitle>
              </DialogHeader>
              <ClassroomForm
                onSubmit={handleSubmit}
                isLoading={createClassroom.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === "floor" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("floor")}
          >
            Floor
          </Button>
          <Button
            variant={sortBy === "capacity" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("capacity")}
          >
            Capacity
          </Button>
        </div>

        {/* Classrooms Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Classrooms</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <PageLoadingSpinner />
            ) : classrooms && classrooms.length > 0 ? (
              <ClassroomTable classrooms={classrooms} sortBy={sortBy} />
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  No classrooms added yet
                </p>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>Add your first classroom</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Classroom</DialogTitle>
                    </DialogHeader>
                    <ClassroomForm
                      onSubmit={handleSubmit}
                      isLoading={createClassroom.isPending}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
