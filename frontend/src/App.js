import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [tickets, setTickets] = useState([]);

  // =========================
  // Fetch Tickets
  // =========================
  const fetchTickets = async () => {
    const response = await fetch("http://localhost:8000/api/tickets/");
    const data = await response.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // =========================
  // Classify
  // =========================
  const classifyTicket = async () => {
    if (!description) return alert("Enter description");

    const response = await fetch(
      "http://localhost:8000/api/tickets/classify/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      }
    );

    const data = await response.json();
    setResult(data);
  };

  // =========================
  // Create Ticket
  // =========================
  const createTicket = async () => {
    if (!title || !description)
      return alert("Title and Description required");

    await fetch("http://localhost:8000/api/tickets/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        category: result?.suggested_category || "general",
        priority: result?.suggested_priority || "low",
        status: "open",
      }),
    });

    fetchTickets();
    setTitle("");
    setDescription("");
    setResult(null);
  };

  // =========================
  // Update Status
  // =========================
  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:8000/api/tickets/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    fetchTickets();
  };

  // =========================
  // Delete Ticket
  // =========================
  const deleteTicket = async (id) => {
    await fetch(`http://localhost:8000/api/tickets/${id}/`, {
      method: "DELETE",
    });

    fetchTickets();
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Support Ticket System</h2>

        <input
          className="form-control mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={classifyTicket}>
            Classify
          </button>

          <button className="btn btn-success" onClick={createTicket}>
            Create Ticket
          </button>
        </div>

        {result && (
          <div className="mt-4 alert alert-info">
            <strong>Category:</strong> {result.suggested_category} <br />
            <strong>Priority:</strong> {result.suggested_priority}
          </div>
        )}

        <hr />

        <h4>All Tickets</h4>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.category}</td>
                <td>
                  <span
                    className={
                      ticket.priority === "high"
                        ? "badge bg-danger"
                        : "badge bg-success"
                    }
                  >
                    {ticket.priority}
                  </span>
                </td>

                <td>
                  <span className="badge bg-primary">
                    {ticket.status}
                  </span>
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        updateStatus(ticket.id, "in_progress")
                      }
                    >
                      In Progress
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        updateStatus(ticket.id, "resolved")
                      }
                    >
                      Resolve
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;