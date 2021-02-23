import { app } from "./app";
import { connectClient } from "./db";

(async () => {
  await connectClient();
  app.listen(8090, () => {
    console.log("Started on http://localhost:8090");
  });
})();
