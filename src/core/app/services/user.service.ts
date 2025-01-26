import { User } from "@prisma/client";
import { userRepo } from "@/core/infrastructure/repositories/";

export const UserService = {
  update: async ({
    email,
    image,
    name,
    password,
    id,
  }: Omit<User, "createdAt" | "updatedAt" | "provider">) => {
    const updateData = { email, image, name, password };
    return await userRepo.updateUserProfile(id, updateData);
  },

  delete: async (id: string) => {
    return await userRepo.deleteUser(id);
  },
};
