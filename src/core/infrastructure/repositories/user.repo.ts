import { prisma } from "@/config";
import { User } from "@/core/domain/entities";
import { Provider, User as UserType } from "@prisma/client";

export const userRepo = {
  findUserByEmail: async (email: string, provider: Provider = "EMAIL") => {
    const data = await prisma.user.findUnique({
      where: {
        email,
        provider,
      },
    });
    return data ? new User(data) : data;
  },

  findUserById: async (id: string) => {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return data ? new User(data) : data;
  },

  createUser: async (
    inputData: Omit<UserType, "id" | "createdAt" | "updatedAt">
  ) => {
    const data = await prisma.user.create({
      data: inputData,
    });
    return new User(data);
  },
};
