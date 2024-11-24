import { defineDb, defineTable, column } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
    password: column.text(),
    name: column.text(),
    phone: column.text(),
    role: column.text({ default: "user" }),
    createdAt: column.date({ default: new Date() }),
  },
});

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: "admin" | "user";
  createdAt: Date;
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

const Pasteles = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    description: column.text(),
    anytime: column.boolean({ default: false }),
    image: column.text(),
  },
});

export type Pastel = {
  id: number;
  name: string;
  description: string;
  anytime: boolean;
  image: string;
};

const PastelPrices = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    sizeType: column.text(),
    price: column.number(),
  },
});

type CakeTypes = "Tradicional" | "Anytime";

export type PastelPrice = {
  id: number;
  sizeType: CakeTypes;
  price: number;
};

const Orders = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number({ references: () => Users.columns.id }),
    totalAmount: column.number(),
    status: column.text(), // 'pending', 'completed', 'cancelled'
    createdAt: column.date(),
  },
});

export type Order = {
  id: number;
  userId: number;
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
};

const OrderItems = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    orderId: column.number({ references: () => Orders.columns.id }),
    cakeId: column.number({ references: () => Pasteles.columns.id }),
    sizeType: column.text(), // 'Traditional' or 'Anytime'
    quantity: column.number(),
    priceAtPurchase: column.number(), // Price at the time of order
  },
});

export type OrderItem = {
  id: number;
  orderId: number;
  cakeId: number;
  sizeType: CakeTypes;
  quantity: number;
  priceAtPurchase: number;
};

export default defineDb({
  tables: { Users, Sessions, Pasteles, PastelPrices, Orders, OrderItems },
});
