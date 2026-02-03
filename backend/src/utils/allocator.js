/**
 * Greedy Allocation Algorithm
 * 
 * Strategy:
 * 1. Sort classrooms by floor number (ascending) - prefer lower floors
 * 2. Then by capacity (descending) - fill larger rooms first to minimize room count
 * 3. Allocate rooms until total capacity meets or exceeds required students
 */

const allocateRooms = (classrooms, totalStudents) => {
    // Sort by floor (asc), then by capacity (desc)
    const sortedClassrooms = [...classrooms].sort((a, b) => {
        if (a.floorNo !== b.floorNo) {
            return a.floorNo - b.floorNo; // Lower floor first
        }
        return b.capacity - a.capacity; // Higher capacity first within same floor
    });

    const allocatedRooms = [];
    let remainingStudents = totalStudents;
    let totalAllocatedCapacity = 0;

    for (const room of sortedClassrooms) {
        if (remainingStudents <= 0) break;

        allocatedRooms.push({
            roomId: room.roomId,
            capacity: room.capacity,
            floorNo: room.floorNo,
            nearWashroom: room.nearWashroom,
        });

        totalAllocatedCapacity += room.capacity;
        remainingStudents -= room.capacity;
    }

    // Check if we have enough capacity
    if (remainingStudents > 0) {
        return {
            success: false,
            message: 'Not enough seats available',
            totalCapacityAvailable: classrooms.reduce((sum, r) => sum + r.capacity, 0),
            totalStudentsRequested: totalStudents,
            shortfall: remainingStudents,
        };
    }

    return {
        success: true,
        message: 'Rooms allocated successfully',
        allocatedRooms,
        totalRoomsAllocated: allocatedRooms.length,
        totalCapacityAllocated: totalAllocatedCapacity,
        totalStudentsRequested: totalStudents,
        excessCapacity: totalAllocatedCapacity - totalStudents,
    };
};

module.exports = { allocateRooms };
