import { useState, useEffect } from "react";
import axios from "axios";

export default function JobApplicationForm({ onApplicationAdded }) {
  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    status: "Applied",
    dateApplied: "",
    userId: "",
    notes: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/applications", {
        ...form,
        user: { id: form.userId }, // attaching user object as expected by backend
      });
      setForm({
        company: "",
        jobTitle: "",
        status: "Applied",
        dateApplied: "",
        userId: "",
        notes: "",
      });
      onApplicationAdded();
    } catch (err) {
      console.error("Error submitting job application:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* 🔍 Debug block to see users fetched from backend */}
      <pre className="text-xs bg-gray-100 p-2 rounded mb-2">
        {JSON.stringify(users, null, 2)}
      </pre>

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow rounded space-y-4"
      >
        <h2 className="text-xl font-semibold">Add Job Application</h2>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          name="dateApplied"
          value={form.dateApplied}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* ✅ User dropdown */}
        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
