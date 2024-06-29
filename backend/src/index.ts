import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { cors } from "hono/cors";
import { rentRouter } from "./routes/rent";
import { bookRouter } from "./routes/book";
import { rentAllRouter } from "./routes/rentAllRouter";
import { profileRouter } from "./routes/profile";

const app = new Hono();

app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/rent", rentRouter);
app.route("/api/v1/book", bookRouter);
app.route("/api/v1/rentAll", rentAllRouter);
app.route("/api/v1/profile", profileRouter);

export default app;
