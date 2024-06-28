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
    customerId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  //zod validation here

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const exists = await prisma.customer.findUnique({
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
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign(
      {
        id: customer.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      status: 200,
      message: jwt,
      name: customer.name,
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
    const customer = await prisma.customer.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!customer) {
      return c.json({
        status: 403,
        message: "Incorrect credentials",
      });
    }

    const jwt = await sign(
      {
        id: customer.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      status: 200,
      message: jwt,
      name: customer.name,
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
    const customer = await prisma.customer.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!customer) {
      return c.json({
        status: 403,
        message: "User does not exists",
      });
    }

    const jwt = await sign(
      {
        id: customer.id,
      },
      c.env.JWT_SECRET
    );

    c.status(200);
    return c.json({
      status: 200,
      message: jwt,
      name: customer.name,
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
      const customer = await verify(authHeader, c.env.JWT_SECRET);
      if (customer) {
        c.set("customerId", customer.id + "");
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
      const customer = await prisma.customer.update({
        where: {
          id: Number(c.get("customerId")),
        },
        data: {
          password: body.password,
        },
      });

      c.status(200);
      return c.json({
        status: 200,
        name: customer.name,
      });
    } catch (e) {
      return c.json({
        status: 411,
        message: "error in setting password",
      });
    }
  }
);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.6bFcCtTAdwYozlEy0_wxYOGwNlgcTaIIWtRBEUCGcFU
