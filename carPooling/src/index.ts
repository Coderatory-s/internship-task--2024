// src/index.ts

import app from "./app";
import { PORT } from "./config"; // You can create a config file for your port

const port = PORT;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
