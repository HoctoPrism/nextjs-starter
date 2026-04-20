import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  passwordHash: text("password_hash"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ],
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  ],
);

export const examples = sqliteTable("example", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  active: integer("active", { mode: "boolean" }).notNull().default(false),
  rating: real("rating"),
  count: integer("count").notNull().default(0),
  datetime: integer("datetime", { mode: "timestamp_ms" }),
  slider: integer("slider").notNull().default(50),
  rangeMin: integer("range_min").notNull().default(20),
  rangeMax: integer("range_max").notNull().default(80),
  radio: text("radio"),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  autocomplete: text("autocomplete"),
  selectValue: text("select_value"),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const examplesRelations = relations(examples, ({ one }) => ({
  user: one(users, {
    fields: [examples.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  examples: many(examples),
  accounts: many(accounts),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Example = typeof examples.$inferSelect;
export type NewExample = typeof examples.$inferInsert;
