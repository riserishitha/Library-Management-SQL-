import axios from "axios";
import { useState, useEffect } from "react";
import {Link,useParams} from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/listBooks/${id}`);
        setBook(response.data);
      } catch (error) {
        setError("Failed to fetch book details.",error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p className="loading-message">Loading book details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="book-details-container">
      <h2 className="book-title">{book.book_name}</h2>
      <p><strong>Book ID:</strong> {book.book_id}</p>
      <p><strong>Category ID:</strong> {book.book_cat_id}</p>
      <p><strong>Collection ID:</strong> {book.book_collection_id}</p>
      <p><strong>Launch Date:</strong> {new Date(book.book_launch_date).toLocaleDateString()}</p>
      <p><strong>Publisher:</strong> {book.book_publisher}</p>
      <Link to="/" className="back-button">Back to Book List</Link>
    </div>
  );
}
export default BookDetails;