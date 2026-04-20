import bcrypt from "bcryptjs";

import { db } from "./client";
import { examples, users } from "./schema";

async function seed() {
  console.log("Seeding database…");

  const passwordHash = await bcrypt.hash("password1234", 10);
  const [demoUser] = await db
    .insert(users)
    .values({
      email: "demo@example.com",
      name: "Demo User",
      passwordHash,
    })
    .onConflictDoNothing()
    .returning();

  const existingUser =
    demoUser ??
    (await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, "demo@example.com"),
    }));

  if (!existingUser) throw new Error("Could not create or find demo user");

  await db.insert(examples).values([
    {
      name: "Premier example",
      description: "Une démo complète des champs",
      active: true,
      rating: 4.5,
      count: 3,
      datetime: new Date(),
      slider: 65,
      rangeMin: 25,
      rangeMax: 75,
      radio: "option-a",
      tags: ["alpha", "beta"],
      autocomplete: "react",
      selectValue: "medium",
      userId: existingUser.id,
    },
    {
      name: "Second example",
      description: null,
      active: false,
      rating: 2,
      count: 1,
      slider: 30,
      rangeMin: 10,
      rangeMax: 90,
      radio: "option-b",
      tags: ["gamma"],
      autocomplete: "next",
      selectValue: "small",
      userId: existingUser.id,
    },
  ]);

  console.log(`Seeded user ${existingUser.email} + 2 examples.`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
