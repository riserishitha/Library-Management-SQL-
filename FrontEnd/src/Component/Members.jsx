import axios from "axios";
import { useState, useEffect } from "react";

function MembersList() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    mem_name: "",
    mem_phone: "",
    mem_email: ""
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/listMembers");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddClick = () => {
    setIsUpdating(false);
    setFormData({ mem_name: "", mem_phone: "", mem_email: "" });
    setShowForm(true);
  };

  const handleUpdateClick = (member) => {
    setIsUpdating(true);
    setSelectedMember(member);
    setFormData({
      mem_name: member.mem_name,
      mem_phone: member.mem_phone,
      mem_email: member.mem_email
    });
    setShowForm(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/member", formData);
      alert("Member added successfully!");
      window.location.reload(); 
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/member/${selectedMember.mem_id}`, formData);
      alert("Member updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Members List</h1>
      <div className="table-wrapper">
        <table className="member-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.mem_id}>
                  <td>{member.mem_id}</td>
                  <td>{member.mem_name}</td>
                  <td>{member.mem_phone}</td>
                  <td>{member.mem_email}</td>
                  <td>
                    <button className="update-btn" onClick={() => handleUpdateClick(member)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No members found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="add-btn" onClick={handleAddClick}>Add Member</button>

      {showForm && (
        <div className="form-container">
          <h2>{isUpdating ? "Update Member" : "Add Member"}</h2>
          <form onSubmit={isUpdating ? handleUpdateSubmit : handleAddSubmit}>
            <label>Name:</label>
            <input type="text" name="mem_name" value={formData.mem_name} onChange={handleChange} required />

            <label>Phone:</label>
            <input type="text" name="mem_phone" value={formData.mem_phone} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="mem_email" value={formData.mem_email} onChange={handleChange} required />

            <button type="submit">{isUpdating ? "Update Member" : "Add Member"}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MembersList;
