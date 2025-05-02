import mongoose from "mongoose";
import { run } from "./index.js";

import { userModel } from "../schemas/user.schema.js";
import { roleModel } from "../schemas/role.schema.js";
import { permissionModel } from "../schemas/permission.schema.js";

async function clear() {
  run();
  await roleModel.deleteMany({});
  await permissionModel.deleteMany({});
  await userModel.deleteMany({});
  console.log("DB cleared");
}

clear().then(() => {
  mongoose.connection.close();
});
