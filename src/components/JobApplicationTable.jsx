import { useEffect, useState } from "react";
import axios from "axios";

export default function JobApplicationTable({ refreshTrigger }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/applications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, [refreshTrigger]);

  return (
    <div className="mt-8 p-4 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Your Job Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-600">No applications yet.</p>
      ) : (
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Applied On</th>
              <th className="p-2 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="p-2 border">{app.company}</td>
                <td className="p-2 border">{app.jobTitle}</td>
                <td className="p-2 border">{app.status}</td>
                <td className="p-2 border">{app.dateApplied}</td>
                <td className="p-2 border">{app.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
