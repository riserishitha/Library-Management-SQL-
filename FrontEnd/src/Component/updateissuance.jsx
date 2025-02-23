import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateIssuance = () => {
  const { id } = useParams(); // Get issuance ID from URL
  const navigate = useNavigate();

  const [issuance, setIssuance] = useState({
    book_id: "",
    member_id: "",
    issue_date: "",
    return_date: "",
    status: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Fetch existing issuance details
  useEffect(() => {
    const fetchIssuance = async () => {
      try {
        console.log("Fetching issuance data for ID:", id); // Debugging

        const response = await axios.get(`http://localhost:5000/issuance/${id}`);
        if (!response.data) throw new Error("No issuance data found");
        
        setIssuance(response.data);
        console.log("Fetched Issuance Data:", response.data); // Debugging
      } catch (error) {
        console.error("Error fetching issuance:", error);
        setErrorMessage("Failed to fetch issuance details.");
      }
    };

    fetchIssuance();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setIssuance({
      ...issuance,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (PUT request)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    console.log("Issuance data before submission:", issuance); // Debugging

    // Check if any field is empty
    if (!issuance.book_id.trim() || !issuance.member_id.trim() || !issuance.issue_date.trim() || !issuance.return_date.trim() || !issuance.status.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/issuance/${id}`, issuance);
      console.log("PUT Response:", response.data); // Debugging

      alert("Issuance record updated successfully!");
      navigate("/"); // Redirect to homepage or issuance list
    } catch (error) {
      console.error("Error updating issuance:", error.response ? error.response.data : error);
      setErrorMessage(error.response?.data?.error || "Failed to update issuance.");
    }
  };

  return (
    <div>
      <h2>Update Issuance</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleUpdateSubmit}>
        <label>
          Book ID:
          <input type="text" name="book_id" value={issuance.book_id} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Member ID:
          <input type="text" name="member_id" value={issuance.member_id} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Issue Date:
          <input type="date" name="issue_date" value={issuance.issue_date} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Return Date:
          <input type="date" name="return_date" value={issuance.return_date} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Status:
          <select name="status" value={issuance.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="issued">Issued</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
          </select>
        </label>
        <br />

        <button type="submit">Update Issuance</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateIssuance;
