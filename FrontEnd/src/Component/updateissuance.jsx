import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateIssuance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issuance, setIssuance] = useState({
    book_id: "", 
    issuance_member: "", 
    issuance_date: "",
    issued_by: "", 
    target_return_date: "", 
    issuance_status: "", 
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchIssuance = async () => {
      try {
        console.log("Fetching issuance data for ID:", id);
        if (!id) {
          setErrorMessage("Invalid issuance ID.");
          return;
        }

        const response = await axios.get(`http://localhost:5000/listIssuances/${id}`);
        if (!response.data) throw new Error("No issuance data found");

        const fetchedData = {
          ...response.data,
          issuance_date: response.data.issuance_date.split("T")[0],
          target_return_date: response.data.target_return_date.split("T")[0],
        };

        setIssuance(fetchedData);
        console.log("Fetched Issuance Data:", fetchedData);
      } catch (error) {
        console.error("Error fetching issuance:", error);
        setErrorMessage("Failed to fetch issuance details.");
      }
    };

    fetchIssuance();
  }, [id]);

  const handleChange = (e) => {
    setIssuance({
      ...issuance,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating issuance with ID:", id);
    console.log("Issuance data before submission:", issuance);

    const updatedData = {
      ...issuance,
      book_id: parseInt(issuance.book_id, 10),
      issuance_member: parseInt(issuance.issuance_member, 10),
    };

    if (!updatedData.book_id || !updatedData.issuance_member || !updatedData.issuance_date || !updatedData.target_return_date || !updatedData.issuance_status.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/issuance/${id}`, updatedData);
      console.log("PUT Response:", response.data);
      alert("Issuance record updated successfully!");
      navigate("/");
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
          <input type="number" name="book_id" value={issuance.book_id} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Member ID:
          <input type="number" name="issuance_member" value={issuance.issuance_member} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Issuance Date:
          <input type="date" name="issuance_date" value={issuance.issuance_date} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Issued By:
          <input type="text" name="issued_by" value={issuance.issued_by} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Target Return Date:
          <input type="date" name="target_return_date" value={issuance.target_return_date} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Issuance Status:
          <select name="issuance_status" value={issuance.issuance_status} onChange={handleChange} required>
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
