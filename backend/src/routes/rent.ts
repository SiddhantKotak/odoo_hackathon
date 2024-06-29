import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./user";

export const rentRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

rentRouter.use("/*", async (c, next) => {
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

rentRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const rents = await prisma.rented.findMany({
      where: {
        userId: c.get("userId"),
      },
    });
    return c.json({ rents: rents });
  } catch (e) {
    return c.json({
      message: "Fail to fetch from db",
    });
  }
});

rentRouter.post("/add", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const rent = await prisma.rented.create({
      data: {
        userId: c.get("userId"),
        title: body.title,
        type: body.type,
        description: body.description,
        quantity: Number(body.quantity),
        availibility: true,
        price: Number(body.price),
      },
    });
    return c.json({
      id: rent.id,
    });
  } catch (e) {
    return c.json({
      message: e,
    });
  }
});

rentRouter.put("/update", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const rent = await prisma.rented.update({
      where: { id: body.id },
      data: {
        title: body.title,
        type: body.type,
        description: body.description,
        quantity: Number(body.quantity),
        availibility: body.availibility,
        price: Number(body.price),
      },
    });
    return c.json({
      id: rent.id,
    });
  } catch (e) {
    return c.json({
      message: e,
    });
  }
});

rentRouter.post("/delete", async (c) => {
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
