import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./user";

export const profileRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

profileRouter.use("/*", async (c, next) => {
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
      message: e,
    });
  }
});

profileRouter.post("/add", async (c) => {
  return c.text("success");
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const profile = await prisma.profile.create({
      data: {
        userId: c.get("userId"),
        username: body.username,
        house_no: body.house_no,
        street: body.street,
        city_state: body.city_state,
        area: body.area,
        address: body.address,
        phone_num: body.phone_num,
      },
    });
    return c.json({
      message: "created",
    });
  } catch (e) {
    return c.json({
      message: e,
    });
  }
});

profileRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: c.get("userId") },
    });
    return c.json({ profile: profile });
  } catch (e) {
    return c.json({
      message: e,
    });
  }
});

profileRouter.put("/update", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const profile = await prisma.profile.update({
      where: { id: c.get("userId") },
      data: {
        username: body.username,
        house_no: body.house_no,
        street: body.street,
        city_state: body.city_state,
        area: body.area,
        address: body.address,
        phone_num: body.phone_num,
      },
    });
    return c.json({
      message: "created",
    });
  } catch (e) {
    return c.json({
      message: e,
    });
  }
});
