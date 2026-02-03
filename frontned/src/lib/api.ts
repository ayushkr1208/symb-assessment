import type {
  Classroom,
  AllocationRequest,
  AllocationResult,
  ClassroomFormData,
  ApiResponse,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock data for development
const mockClassrooms: Classroom[] = [
  {
    _id: "1",
    roomId: "A-101",
    capacity: 50,
    floorNo: 1,
    nearWashroom: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    roomId: "A-102",
    capacity: 45,
    floorNo: 1,
    nearWashroom: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    roomId: "B-201",
    capacity: 60,
    floorNo: 2,
    nearWashroom: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    roomId: "B-202",
    capacity: 55,
    floorNo: 2,
    nearWashroom: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    roomId: "C-301",
    capacity: 40,
    floorNo: 3,
    nearWashroom: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let classroomsData = [...mockClassrooms];

const api = {
  // Classroom endpoints
  async getClassrooms(): Promise<Classroom[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/classrooms`);
      if (response.ok) {
        const result: ApiResponse<Classroom[]> = await response.json();
        if (result.success && result.data) {
          return result.data;
        }
      }
    } catch (error) {
      console.error("Error fetching classrooms:", error);
      console.log("Using mock data for classrooms");
    }
    return classroomsData;
  },

  async createClassroom(data: ClassroomFormData): Promise<Classroom> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/classrooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result: ApiResponse<Classroom> = await response.json();
      
      if (response.ok && result.success && result.data) {
        return result.data;
      }
      
      // Handle error response from backend
      if (!result.success) {
        throw new Error(result.message || "Failed to create classroom");
      }
    } catch (error) {
      console.error("Error creating classroom:", error);
      throw error;
    }

    // Mock creation fallback
    const newClassroom: Classroom = {
      _id: String(classroomsData.length + 1),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    classroomsData.push(newClassroom);
    return newClassroom;
  },

  async allocateRooms(
    request: AllocationRequest
  ): Promise<AllocationResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/classrooms/allocate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      
      const result: AllocationResult = await response.json();
      
      if (response.ok && result.success) {
        return result;
      }
      
      // Return error response from backend (400 or 404)
      if (!result.success) {
        return result;
      }
    } catch (error) {
      console.error("Error allocating rooms:", error);
      console.log("Using mock data allocation");
    }

    // Mock allocation
    const totalCapacity = classroomsData.reduce(
      (sum, room) => sum + room.capacity,
      0
    );
    const totalStudents = request.totalStudents;

    if (totalCapacity < totalStudents) {
      return {
        success: false,
        message: "Not enough seats available",
        totalStudentsRequested: totalStudents,
        shortfall: totalStudents - totalCapacity,
      };
    }

    // Simple allocation algorithm: sort by capacity and allocate greedily
    const sortedRooms = [...classroomsData].sort(
      (a, b) => b.capacity - a.capacity
    );
    const allocated: Classroom[] = [];
    let remainingStudents = totalStudents;

    for (const room of sortedRooms) {
      if (remainingStudents <= 0) break;
      allocated.push(room);
      remainingStudents -= room.capacity;
    }

    return {
      success: true,
      message: "Rooms allocated successfully",
      allocatedRooms: allocated.map((room) => ({
        roomId: room.roomId,
        capacity: room.capacity,
        floorNo: room.floorNo,
        nearWashroom: room.nearWashroom,
      })),
      totalRoomsAllocated: allocated.length,
      totalCapacityAllocated: allocated.reduce(
        (sum, room) => sum + room.capacity,
        0
      ),
      totalStudentsRequested: totalStudents,
      excessCapacity:
        allocated.reduce((sum, room) => sum + room.capacity, 0) - totalStudents,
    };
  },
};

export default api;
