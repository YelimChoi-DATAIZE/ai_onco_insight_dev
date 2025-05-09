// import mongoose from "mongoose";
// import dotenv from 'dotenv';

// dotenv.config();

// export const dbConnect = () => {
//   mongoose.connection.once("open", () => console.log("DB connection"));
//   return mongoose.connect(
//     // `mongodb+srv://${process.env.DB_LINK}?retryWrites=true&w=majority&appName=prodbeta`,
//     `mongodb+srv://${process.env.DB_LINK}/?retryWrites=true&w=majority&appName=prodbeta`,
//     // { keepAlive: true }
//   );
// };

import mongoose from "mongoose";
import { GridFSBucket } from 'mongodb';

let gfsBucket;

const uri =
  "mongodb+srv://katechoi:93smedidataize@dataizeaicluster.uxec8.mongodb.net/?retryWrites=true&w=majority&appName=DataizeAICluster";

const clientOptions = {
  dbName: "dataizeai",
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export const run = () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    return mongoose.connect(uri, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    // GridFSBucket 생성
    const db = mongoose.connection.db;
    gfsBucket = new GridFSBucket(db, {
      bucketName: "projectDataFiles",
    });

  } finally {
    // Ensures that the client will close when you finish/error
    return mongoose.disconnect();
  }
};
// run().catch(console.dir);