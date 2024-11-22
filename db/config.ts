import { defineDb, defineTable, column } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellido: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    tel: column.text(),
  },
});

const Sessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.number({ references: () => Users.columns.id }),
    expiresAt: column.date(),
  },
});

const Pasteles = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    descripcion: column.text(),
    imagen: column.text({ default: "" }),
    anytime: column.boolean({ default: false }),
    nuevo: column.boolean({ default: false }),
    archivado: column.boolean({ default: false }),
  },
});

const Sucursales = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    direccion: column.text(),
    telefono: column.text(),
  },
});

const Ordenes = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    nombre: column.text(),
    total: column.number(),
    status: column.text({ default: "pending" }),
    createdAt: column.date({ default: new Date() }),
    updatedAt: column.date({ default: new Date() }),
    pickupDate: column.date(),
    sucursalId: column.number({ references: () => Sucursales.columns.id }),
  },
});

export default defineDb({
  tables: { Users, Sessions, Pasteles, Sucursales, Ordenes },
});

// export interface Session {
//   id: string;
//   userId: number;
//   expiresAt: Date;
// }
//
// export interface User {
//   id: number;
//   nombre: string;
//   apellido: string;
//   email: string;
//   password: string;
//   tel: string;
// }
