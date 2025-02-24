import { Routes, Route, Link } from "react-router-dom";
import BookDetails from "./Component/getBookdetails";
import AddBook from "./Component/addBookIssuance";
import BookList from "./Component/getBookIssuance";
import AddBookIssuance from "./Component/addIssuance";
import MembersList from "./Component/Members"
import UpdateBook from "./Component/updateBook";
import UpdateIssuance from"./Component/updateissuance";
import "./App.css";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Book</Link>
        <Link to="/issuanceadd" >Add Issuance</Link>
        <Link to="/mem">About Members</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<AddBook />} />
        <Route path="/update/book/:id" element={<UpdateBook />} />
        <Route path="/update/issuance/:id" element={<UpdateIssuance/>}/>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/BookList" element={<BookList/>}></Route>
        <Route path="/issuanceadd" element={<AddBookIssuance/>}/>
        <Route path="/listBooks/:id" element={<BookDetails />} />
        <Route path="/mem" element={<MembersList/>}/>

      </Routes>
    </div>
  );
}

export default App;
