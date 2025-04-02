import { useState } from "react";
import JobApplicationForm from "./components/JobApplicationForm";
import JobApplicationTable from "./components/JobApplicationTable";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleAppAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <h1 className="text-center text-3xl font-bold mb-10">Job Application Tracker</h1>
      <JobApplicationForm onApplicationAdded={handleAppAdded} />
      <JobApplicationTable refreshTrigger={refresh} />
    </div>
  );
}

export default App;
