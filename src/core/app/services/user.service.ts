import { User } from "@prisma/client";

export const UserService = {
  update: async ({
    email,
    image,
    name,
    password,
    id,
  }: Omit<User, "createdAt" | "updatedAt" | "provider">) => {},

  delete: async (id: string) => {},
};
