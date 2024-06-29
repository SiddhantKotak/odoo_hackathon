import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./user";

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

bookRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id + "");
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

bookRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const books = await prisma.booked.findMany({
      where: {
        userId: c.get("userId"),
      },
    });
    return c.json({ books: books });
  } catch (e) {
    return c.json({
      message: "Fail to fetch from db",
    });
  }
});

bookRouter.post("/add", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const book = await prisma.booked.create({
      data: {
        userId: c.get("userId"),
        title: body.title,
        type: body.type,
        description: body.description,
        quantity: Number(body.quantity),
        rentedId: body.id,
        availableTill: body.availableTill,
        price: Number(body.price),
      },
    });
    return c.json({
      id: book.id,
    });
  } catch (e) {
    return c.json({
      message: e,
    });
  }
});

bookRouter.post("/delete", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const rent = await prisma.rented.delete({
      where: { id: body.id },
    });
    return c.json({
      message: "deleted",
    });
  } catch (e) {
    return c.json({
      message: e,
    });
  }
});
