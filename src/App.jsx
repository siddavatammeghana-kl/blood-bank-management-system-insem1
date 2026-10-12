import { useState } from "react";
import "./App.css";

function App() {
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      bloodGroup: "A+",
      contact: "9876543210",
    },
    {
      id: 2,
      name: "Priya Reddy",
      bloodGroup: "B+",
      contact: "9123456780",
    },
    {
      id: 3,
      name: "Arjun Sharma",
      bloodGroup: "O+",
      contact: "9988776655",
    },
  ]);

  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [contact, setContact] = useState("");

  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("All");

  const addDonor = (e) => {
    e.preventDefault();

    if (!name || !contact) {
      alert("Please enter donor name and contact number");
      return;
    }

    const newDonor = {
      id: Date.now(),
      name,
      bloodGroup,
      contact,
    };

    setDonors([...donors, newDonor]);

    setName("");
    setBloodGroup("A+");
    setContact("");
  };

  const deleteDonor = (id) => {
    setDonors(donors.filter((donor) => donor.id !== id));
  };

  const filteredDonors = donors.filter((donor) => {
    const searchMatch = donor.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const bloodMatch =
      filterGroup === "All" || donor.bloodGroup === filterGroup;

    return searchMatch && bloodMatch;
  });

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>🩸 Blood Bank Management System</h1>
        <p>Donor Management Portal</p>
      </header>

      <main>

        {/* Add Donor */}
        <section className="card">
          <h2>Register New Donor</h2>

          <form onSubmit={addDonor} className="donor-form">

            <div>
              <label>Donor Name</label>
              <input
                type="text"
                placeholder="Enter donor name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div>
              <label>Contact Number</label>
              <input
                type="text"
                placeholder="Enter contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <button type="submit">
              Add Donor
            </button>

          </form>
        </section>

        {/* Donor Details */}
        <section className="card">

          <div className="top-section">
            <h2>Donor Details</h2>

            <div className="filters">

              <input
                type="text"
                placeholder="Search donor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
              >
                <option value="All">All Blood Groups</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>

            </div>
          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Donor Name</th>
                  <th>Blood Group</th>
                  <th>Contact Details</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor, index) => (

                    <tr key={donor.id}>

                      <td>{index + 1}</td>

                      <td>{donor.name}</td>

                      <td>
                        <span className="blood">
                          {donor.bloodGroup}
                        </span>
                      </td>

                      <td>{donor.contact}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteDonor(donor.id)}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>
                    <td colSpan="5" className="no-data">
                      No donors found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <h3>Total Donors</h3>
            <p>{donors.length}</p>
          </div>

          <div className="stat-card">
            <h3>A+ Donors</h3>
            <p>
              {donors.filter(
                (d) => d.bloodGroup === "A+"
              ).length}
            </p>
          </div>

          <div className="stat-card">
            <h3>B+ Donors</h3>
            <p>
              {donors.filter(
                (d) => d.bloodGroup === "B+"
              ).length}
            </p>
          </div>

          <div className="stat-card">
            <h3>O+ Donors</h3>
            <p>
              {donors.filter(
                (d) => d.bloodGroup === "O+"
              ).length}
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default App;