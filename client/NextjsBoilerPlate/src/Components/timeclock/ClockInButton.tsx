import React, { useState } from 'react';

const Attendance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clockInTime, setClockInTime] = useState<string>('');
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [employeeId] = useState<string>('employee123'); // Sample employeeId, you should get this dynamically.

  const handleClockIn = async () => {
    const currentTime = new Date();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/v1/attendance/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          date: currentTime.toISOString().split('T')[0], // Send date in YYYY-MM-DD format
          checkInTime: currentTime.toISOString(),
          status: 'present',
        }),
      });
      if (!response.ok) throw new Error('Failed to clock in');
      setClockInTime(currentTime.toLocaleTimeString());
      setIsClockedIn(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    const currentTime = new Date();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/v1/attendance/attendance/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkOutTime: currentTime.toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to clock out');
      setClockInTime('');
      setIsClockedIn(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 bg-gray-100 rounded-lg shadow-lg w-96 mx-auto">
      <h2 className="text-xl font-semibold text-gray-700">Employee Attendance</h2>

      <div className="flex flex-col space-y-4 w-full">
        <button
          onClick={handleClockIn}
          disabled={loading || isClockedIn}
          className={`${
            loading || isClockedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 rounded-lg transition duration-300`}
        >
          {loading ? 'Clocking In...' : 'Clock In'}
        </button>

        <button
          onClick={handleClockOut}
          disabled={loading || !isClockedIn}
          className={`${
            loading || !isClockedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
          } text-white py-2 rounded-lg transition duration-300`}
        >
          {loading ? 'Clocking Out...' : 'Clock Out'}
        </button>
      </div>

      {clockInTime && (
        <p className="text-gray-600">Clocked in at: <span className="font-semibold">{clockInTime}</span></p>
      )}
    </div>
  );
};

export default Attendance;
