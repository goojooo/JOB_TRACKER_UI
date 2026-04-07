import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    companyName: "",
    role: "",
    status: "Applied"
  });

  const fetchJobs = async () => {
    if (!userId) return;
    const res = await API.get(`/jobs/${userId}`);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async () => {
    await API.post(`/jobs/${userId}`, newJob);
    setNewJob({ companyName: "", role: "", status: "Applied" });
    fetchJobs();
  };

  const updateStatus = async (jobId, status) => {
    await API.put(`/jobs/${jobId}?status=${status}`);
    fetchJobs();
  };

  const deleteJob = async (jobId) => {
    await API.delete(`/jobs/${jobId}`);
    fetchJobs();
  };

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Please login first</h2>;
  }

  return (
    <div className="dashboard-container">
      <h2>Job Dashboard</h2>

      {/* Add Job */}
      <div className="job-form">
        <input
          placeholder="Company Name"
          value={newJob.companyName}
          onChange={(e) =>
            setNewJob({ ...newJob, companyName: e.target.value })
          }
        />

        <input
          placeholder="Role"
          value={newJob.role}
          onChange={(e) =>
            setNewJob({ ...newJob, role: e.target.value })
          }
        />

        <button onClick={handleAddJob}>Add Job</button>
      </div>

      {/* Job List */}
      <div className="job-list">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.companyName}</h3>
            <p>{job.role}</p>

            <p className={`status ${job.status.toLowerCase()}`}>
              {job.status}
            </p>

            <div className="actions">
              <button onClick={() => updateStatus(job.id, "Interview")}>
                Interview
              </button>

              <button onClick={() => updateStatus(job.id, "Offer")}>
                Offer
              </button>

              <button className="delete" onClick={() => deleteJob(job.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}