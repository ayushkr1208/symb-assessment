import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getFloorBadgeColor(floor: number): string {
  const colors = [
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  ];
  return colors[floor % colors.length];
}

export function calculateCapacityMetrics(
  totalStudents: number,
  totalCapacity: number
) {
  return {
    utilization: Math.round((totalStudents / totalCapacity) * 100),
    excess: totalCapacity - totalStudents,
    shortfall: Math.max(0, totalStudents - totalCapacity),
  };
}
