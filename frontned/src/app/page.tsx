"use client";

import Link from "next/link";
import { PageContainer } from "@/components/common/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClassroomCard } from "@/components/classroom/ClassroomCard";
import { PageLoadingSpinner } from "@/components/common/LoadingSpinner";
import { useClassrooms } from "@/hooks/useClassrooms";
import { LayoutDashboard, BookOpen, Zap, Users, Building2 } from "lucide-react";

export default function Dashboard() {
  const { data: classrooms, isLoading } = useClassrooms();

  const stats = classrooms ? [
    {
      title: "Total Classrooms",
      value: classrooms.length,
      icon: Building2,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Capacity",
      value: classrooms.reduce((sum, room) => sum + room.capacity, 0),
      icon: Users,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Near Washroom",
      value: classrooms.filter((room) => room.nearWashroom).length,
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
    },
  ] : [];

  const recentClassrooms = classrooms?.slice(0, 3) || [];

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage classrooms and allocate exam rooms efficiently
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/classrooms">
            <Button
              size="lg"
              className="w-full h-auto py-6 flex items-center justify-start gap-4"
              variant="outline"
            >
              <BookOpen className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Manage Classrooms</p>
                <p className="text-sm text-muted-foreground">
                  Add or view all classrooms
                </p>
              </div>
            </Button>
          </Link>

          <Link href="/allocate">
            <Button
              size="lg"
              className="w-full h-auto py-6 flex items-center justify-start gap-4"
              variant="outline"
            >
              <Zap className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Allocate Exam Rooms</p>
                <p className="text-sm text-muted-foreground">
                  Allocate rooms for an exam
                </p>
              </div>
            </Button>
          </Link>
        </div>

        {/* Recent Classrooms */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Classrooms</h2>
            <Link href="/classrooms">
              <Button variant="link">View all</Button>
            </Link>
          </div>

          {isLoading ? (
            <PageLoadingSpinner />
          ) : classrooms && classrooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentClassrooms.map((classroom) => (
                <ClassroomCard
                  key={classroom._id}
                  classroom={classroom}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                No classrooms added yet
              </p>
              <Link href="/classrooms">
                <Button>Add your first classroom</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
