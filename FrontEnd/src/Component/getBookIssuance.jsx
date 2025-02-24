import axios from "axios";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [dates, setDates] = useState([]);
  const [issuances, setIssuances] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const Nextpage=useNavigate();

  const token =localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
        if (!token) {
          console.log('No token found, redirecting to login...');
          Nextpage("/")
          return;
        }
      try {
        const response = await axios.get("http://localhost:5000/listBooks");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchIssuances = async () => {
      try {
        const response = await axios.get("http://localhost:5000/listIssuances");
        setIssuances(response.data);

        const uniqueDates = [...new Set(response.data.map((issue) => issue.target_return_date))];
        setDates(uniqueDates);
      } catch (error) {
        console.error("Error fetching issuances:", error);
      }
    };

    fetchBooks();
    fetchIssuances();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="heading">Available Books</h1>

      <div className="table-wrapper">
        <table className="book-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.book_id}>
                  <td>{book.book_id}</td>
                  <td>
                    <Link to={`/listBooks/${book.book_id}`} className="book-link">
                      {book.book_name}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/update/book/${book.book_id}`} className="update-button">
                      Update
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="date-picker">
        <label htmlFor="date" className="date-label">Pick a Date:</label>
        <select id="date" name="date" className="date-dropdown" onChange={handleDateChange}>
          <option value="">Select a date</option>
          {dates.length > 0 ? (
            dates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))
          ) : (
            <option>No dates available</option>
          )}
        </select>
      </div>

      {selectedDate && (
        <div className="issuance-details">
          <h2>Issuance Details for {new Date(selectedDate).toLocaleDateString()}</h2>
          <table className="issuance-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Issued To (Member ID)</th>
                <th>Issued By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {issuances
                .filter((issue) => issue.target_return_date === selectedDate)
                .map((issue) => (
                  <tr key={issue.issuance_id}>
                    <td>{books.find((b) => b.book_id === issue.book_id)?.book_name || "Unknown"}</td>
                    <td>{issue.issuance_member}</td>
                    <td>{issue.issued_by}</td>
                    <td>{issue.issuance_status}</td>
                    <td>
                      <Link to={`/update/issuance/${issue.issuance_id}`} className="update-button">
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookList;
