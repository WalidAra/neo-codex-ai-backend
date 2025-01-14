import { PrismaClient } from "@prisma/client";

const PrismaInstance = Object.freeze({
  prisma: new PrismaClient(),
});

export const prisma = PrismaInstance.prisma;
