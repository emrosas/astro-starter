import { defineDb, defineTable, column } from "astro:db";

const users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellido: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    tel: column.text(),
  },
});

const sessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.number({ references: () => users.columns.id }),
    expiresAt: column.date(),
  },
});

export default defineDb({
  tables: { users, sessions },
});
