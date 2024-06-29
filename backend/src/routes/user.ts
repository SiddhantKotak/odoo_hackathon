import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  //zod validation here

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const exists = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (exists) {
      const jwt = await sign(
        {
          id: exists.id,
        },
        c.env.JWT_SECRET
      );

      return c.json({
        status: 403,
        message: jwt,
        name: exists.name,
      });
    }
  } catch (e) {
    return c.json({
      status: 411,
      message: "sign up failed",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      status: 200,
      message: jwt,
      name: user.name,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      status: 411,
      message: "signup failed",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  //zod validation here

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.json({
        status: 403,
        message: "Incorrect credentials",
      });
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      status: 200,
      message: jwt,
      name: user.name,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      status: 411,
      message: "signin error",
    });
  }
});

userRouter.post("/signingoogle", async (c) => {
  const body = await c.req.json();

  //zod validation here

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return c.json({
        status: 403,
        message: "User does not exists",
      });
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    c.status(200);
    return c.json({
      status: 200,
      message: jwt,
      name: user.name,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      status: 411,
      message: "signin error",
    });
  }
});

userRouter.put(
  "/update",
  async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
      const user = await verify(authHeader, c.env.JWT_SECRET);
      if (user) {
        c.set("userId", user.id + "");
        await next();
      } else {
        c.status(403);
        return c.json({
          status: 403,
          message: "Not signed in from google",
        });
      }
    } catch (e) {
      c.status(403);
      return c.json({
        status: 403,
        message: "Not signed in from google",
      });
    }
  },
  async (c) => {
    const body = await c.req.json();

    //zod validation here

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const user = await prisma.user.update({
        where: {
          id: c.get("userId"),
        },
        data: {
          password: body.password,
        },
      });

      c.status(200);
      return c.json({
        status: 200,
        name: user.name,
      });
    } catch (e) {
      return c.json({
        status: 411,
        message: "error in setting password",
      });
    }
  }
);
