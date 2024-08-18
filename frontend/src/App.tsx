import { useState } from "react";
import axios from "axios";
import "./App.css";

interface Book {
  name: string;
  image: File | null;
}
const API_URL = "http://127.0.0.1:8000/api";

function App() {
  const [books, setBooks] = useState<Book[]>([
    {
      name: "",
      image: null,
    },
  ]);

  const handleAddBook = () => {
    setBooks([...books, { name: "", image: null }]);
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newBooks = books.slice();
    newBooks[index] = { ...newBooks[index], [field]: value };
    setBooks(newBooks);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await bulkCreateBooks(books);
      alert("Books created successfully!");
    } catch (error) {
      alert("Error creating books.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {books.map((book, index) => (
        <div key={index} className="p-5 m-5 bg-gray-500">
          <input
            type="text"
            className="border w-full"
            placeholder="Name"
            value={book.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                handleChange(index, "image", e.target.files[0]);
              }
            }}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddBook} className="bg-green-600 m-5  px-5 py-1">
        Add Book
      </button>
      <button type="submit" className="bg-red-500 m-5 px-5 py-1">Submit</button>
    </form>
  );
}

export default App;

const bulkCreateBooks = async (books: Book[]) => {
  const formData = new FormData();

  books.forEach((book, index) => {
    formData.append(`books[${index}][name]`, book.name);
    if (book.image) {
      formData.append(`books[${index}][image]`, book.image);
    } else {
      formData.append(`books[${index}][image]`, "");
    }
  });

  try {
    const response = await axios.post(
      `${API_URL}/persons/bulk-create/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating books:", error);
    throw error;
  }
};
