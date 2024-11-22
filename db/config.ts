import { defineDb, defineTable, column } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
    password: column.text(),
  },
});

export type User = {
  id: number;
  email: string;
  password: string;
};

const Sessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.number({ references: () => Users.columns.id }),
    expiresAt: column.date(),
  },
});

export type Session = {
  id: string;
  userId: number;
  expiresAt: Date;
};

export default defineDb({
  tables: { Users, Sessions },
});
