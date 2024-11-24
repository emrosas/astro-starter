import { db, Pasteles, Users } from "astro:db";
import { Argon2id } from "oslo/password";

const hasher = new Argon2id();

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Users).values([
    {
      email: "user@mail.com",
      password: await hasher.hash("useraccount"),
      name: "Juanito Perez",
      phone: "9998887777",
      role: "user",
      createdAt: new Date(),
    },
    {
      email: "admin@mail.com",
      password: await hasher.hash("adminaccount"),
      name: "Pancho Lopez",
      phone: "9998887777",
      role: "admin",
      createdAt: new Date(),
    },
  ]);

  await db.insert(Pasteles).values([
    {
      name: "Ferrero",
      description:
        "Pan de chocolate relleno de Nutella, betún de chocolate y ganache. Decorado con Ferrero Rocher.",
      anytime: true,
      image: "https://lapasteleriadelapostreria.com/images/menu/ferrero.webp",
    },
    {
      name: "Red Velvet",
      description:
        "Pan de cocoa roja con chispas de chocolate semiamargo, ganache de chocolate y betún de vainilla a base de Philadelphia.",
      anytime: true,
      image:
        "https://lapasteleriadelapostreria.com/images/menu/red-velvet.webp",
    },
    {
      name: "Pecan Pie",
      description:
        "Pan de chocolate con chispas de chocolate semiamargo, ganache de chocolate y betún de vainilla a base de Philadelphia.",
      anytime: true,
      image: "https://lapasteleriadelapostreria.com/images/menu/pecan-pie.webp",
    },
    {
      name: "Pistache",
      description:
        "Pan de chocolate con chispas de chocolate semiamargo, ganache de chocolate y betún de vainilla a base de Philadelphia.",
      anytime: true,
      image: "https://lapasteleriadelapostreria.com/images/menu/pistache.webp",
    },
  ]);
}
