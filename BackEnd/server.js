const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./Logger.js")
const Collection_route = require("./CollectionRoute");
const Category_route = require("./CategoryRoute");
const Member_route = require("./MemberRoute");
const Book_route = require("./BookRoute");
const Membership_route = require("./Membership");
const Issuance_route = require("./Issuance");

const app = express();

app.use(cors());
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.get('/test', (req, res)=>{
    res.send("Server is running")
})

app.use("/", Collection_route);
app.use("/", Category_route);
app.use("/", Member_route);
app.use("/", Book_route);
app.use("/", Membership_route);
app.use("/", Issuance_route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
