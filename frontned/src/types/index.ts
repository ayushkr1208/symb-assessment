export interface Classroom {
  _id: string;
  roomId: string;
  capacity: number;
  floorNo: number;
  nearWashroom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AllocationRequest {
  totalStudents: number;
}

export interface AllocatedRoom {
  roomId: string;
  capacity: number;
  floorNo: number;
  nearWashroom: boolean;
}

export interface AllocationResult {
  success: boolean;
  message: string;
  allocatedRooms?: AllocatedRoom[];
  totalRoomsAllocated?: number;
  totalCapacityAllocated?: number;
  totalStudentsRequested?: number;
  excessCapacity?: number;
  shortfall?: number;
  totalCapacityAvailable?: number;
}

export interface ClassroomFormData {
  roomId: string;
  capacity: number;
  floorNo: number;
  nearWashroom: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  totalCapacityAvailable?: number;
  shortfall?: number;
}
