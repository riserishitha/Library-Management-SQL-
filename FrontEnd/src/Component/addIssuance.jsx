import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBookIssuance() {
  const navigate = useNavigate();

  const [issuance, setIssuance] = useState({
    book_id: "",
    issuance_member: "",
    issuance_date: "",
    issued_by: "",
    target_return_date: "",
    issuance_status: "",
  });

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await axios.get("http://localhost:5000/listBooks");
        const membersResponse = await axios.get("http://localhost:5000/listMembers");
        setBooks(booksResponse.data);
        setMembers(membersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddIssuance = async (e) => {
    e.preventDefault();

    if (
      !issuance.book_id ||
      !issuance.issuance_member ||
      !issuance.issuance_date ||
      !issuance.issued_by ||
      !issuance.target_return_date ||
      !issuance.issuance_status
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/issuance", issuance);

      alert("Book issuance added successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error adding issuance:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add issuance. Check console for details.");
    }
  };

  return (
    <div className="container">
      <h1>Add Book Issuance</h1>
      <form onSubmit={handleAddIssuance}>
        <select
          value={issuance.book_id}
          onChange={(e) => setIssuance({ ...issuance, book_id: parseInt(e.target.value) })}
          required
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book.book_id} value={book.book_id}>
              {book.book_id} - {book.book_name}
            </option>
          ))}
        </select>

        <select
          value={issuance.issuance_member}
          onChange={(e) => setIssuance({ ...issuance, issuance_member: parseInt(e.target.value) })}
          required
        >
          <option value="">Select Member</option>
          {members.map((member) => (
            <option key={member.mem_id} value={member.mem_id}>
              {member.mem_id} - {member.member_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          placeholder="Issuance Date"
          value={issuance.issuance_date}
          onChange={(e) => setIssuance({ ...issuance, issuance_date: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Issued By"
          value={issuance.issued_by}
          onChange={(e) => setIssuance({ ...issuance, issued_by: e.target.value })}
          required
        />

        <input
          type="date"
          placeholder="Target Return Date"
          value={issuance.target_return_date}
          onChange={(e) => setIssuance({ ...issuance, target_return_date: e.target.value })}
          required
        />

        <select
          value={issuance.issuance_status}
          onChange={(e) => setIssuance({ ...issuance, issuance_status: e.target.value })}
          required
        >
          <option value="">Select Status</option>
          <option value="Issued">Issued</option>
          <option value="Returned">Returned</option>
          <option value="Overdue">Overdue</option>
        </select>

        <button type="submit">Add Issuance</button>
      </form>
    </div>
  );
}
