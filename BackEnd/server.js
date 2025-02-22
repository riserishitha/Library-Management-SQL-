const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const Collection_route = require("./CollectionRoute");
const Category_route = require("./CategoryRoute");
const Member_route = require("./MemberRoute");
const Book_route = require("./BookRoute");
const Membership_route = require("./Membership");
const Issuance_route = require("./Issuance")
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", Collection_route);
app.use("/",Category_route);
app.use("/",Member_route);
app.use("/", Book_route);
app.use("/",Membership_route);
app.use("/", Issuance_route)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
