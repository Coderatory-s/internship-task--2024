import React, { useState, useEffect } from 'react';


interface AttendanceRecord {
  _id: string;
  employeeId: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'leave';
}

const AttendanceLog: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const employeeId = '12345'; // Replace with actual employee ID

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/v1/attendance/employee/${employeeId}`);
        if (!response.ok) throw new Error('Failed to fetch attendance records');
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Attendance Log</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Check In</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Check Out</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record) => (
                <tr key={record._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : 'Not Clocked In'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : 'Not Clocked Out'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{record.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-600">No attendance records</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceLog;

