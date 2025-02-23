import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState({
    book_name: "",
    cat_id: "",
    collection_id: "",
    launch_date: "",
    publisher: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/listBooks/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setErrorMessage("Failed to fetch book details.");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    console.log("Book data before submission:", book); 
    if (!book.book_name.trim() || !book.cat_id.trim() || !book.collection_id.trim() || !book.launch_date.trim() || !book.publisher.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/book/${id}`, book);
      console.log("Response:", response.data);
      alert("Book updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error.response ? error.response.data : error);
      setErrorMessage(error.response?.data?.error || "Failed to update book.");
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleUpdateSubmit}>
        <label>
          Book Name:
          <input type="text" name="book_name" value={book.book_name} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Category ID:
          <input type="text" name="cat_id" value={book.cat_id} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Collection ID:
          <input type="text" name="collection_id" value={book.collection_id} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Launch Date:
          <input type="date" name="launch_date" value={book.launch_date} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Publisher:
          <input type="text" name="publisher" value={book.publisher} onChange={handleChange} required />
        </label>
        <br />

        <button type="submit">Update Book</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateBook;
