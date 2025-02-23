import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: "",
    cat_id: "",
    collection_id: "",
    launch_date: "",
    publisher: "",
  });

  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:5000/getcategory"
        );
        const collectionResponse = await axios.get(
          "http://localhost:5000/getcollection"
        );

        setCategories(categoryResponse.data);
        setCollections(collectionResponse.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleBookSubmit = async (e) => {
    e.preventDefault();

    if (
      !book.name ||
      !book.cat_id ||
      !book.collection_id ||
      !book.launch_date ||
      !book.publisher
    ) {
      console.log("All fields are required");
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/book", {
        book_name: book.name,
        book_cat_id: book.cat_id,
        book_collection_id: book.collection_id,
        book_launch_date: book.launch_date,
        book_publisher: book.publisher,
      });

      console.log("Book created successfully:", response.data);
      alert("Book added successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add book. Check console for details.");
    }
  };

  return (
    <div className="container">
      <h1>Add New Book</h1>
      <form onSubmit={handleBookSubmit}>
        <input
          type="text"
          placeholder="Book Name"
          value={book.name}
          onChange={(e) => setBook({ ...book, name: e.target.value })}
          required
        />

        <select
          value={book.cat_id}
          onChange={(e) =>
            setBook({ ...book, cat_id: parseInt(e.target.value) })
          }
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.cat_id} value={cat.cat_id}>
              {cat.cat_id} - {cat.category_name}
            </option>
          ))}
        </select>

        <select
          value={book.collection_id}
          onChange={(e) =>
            setBook({ ...book, collection_id: parseInt(e.target.value) })
          }
          required
        >
          <option value="">Select Collection</option>
          {collections.map((col) => (
            <option key={col.collection_id} value={col.collection_id}>
              {col.collection_id} - {col.collection_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          placeholder="Launch Date"
          value={book.launch_date}
          onChange={(e) => setBook({ ...book, launch_date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Publisher"
          value={book.publisher}
          onChange={(e) => setBook({ ...book, publisher: e.target.value })}
          required
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
