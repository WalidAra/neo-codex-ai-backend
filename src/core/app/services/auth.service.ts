import { JwtHelper } from "@/helpers";
import { ConstraintError } from "../base";
import { userRepo } from "@/core/infrastructure/repositories";
import bcrypt from "bcrypt";

type AuthInput = {
  email: string;
  password: string;
  recall?: boolean;
};

export const AuthService = {
  login: async ({ password, email, recall = false }: AuthInput) => {
    if (!email || !password) {
      throw new ConstraintError("All credentials are required", 400);
    }

    const isUser = await userRepo.findUserByEmail(email);

    if (!isUser) {
      throw new ConstraintError("User not found", 404);
    }

    const match = await isUser.verifyPassword(password);

    if (!match) {
      throw new ConstraintError("Invalid password", 400);
    }

    const user = isUser.getData();

    const { accessToken, refreshToken } = JwtHelper.generateToken(
      { id: user.id, recall },
      recall,
      true
    );

    return { user, accessToken, refreshToken };
  },
  register: async ({
    email,
    password,
    name,
    recall = false,
  }: AuthInput & { name: string }) => {
    if (!email || !password || !name) {
      throw new ConstraintError("All credentials are required", 400);
    }

    const isUser = await userRepo.findUserByEmail(email);

    if (isUser) {
      throw new ConstraintError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepo.createUser({
      name,
      email,
      password: hashedPassword,
      image: null,
      provider: "EMAIL",
    });

    const user = newUser.getData();

    const { accessToken, refreshToken } = JwtHelper.generateToken(
      { id: user.id, recall },
      recall,
      true
    );

    return { user, accessToken, refreshToken };
  },
  refreshToken: async (refreshToken: string | undefined) => {
    if (!refreshToken) {
      throw new ConstraintError("Unauthorized - no token provided", 404);
    }

    const decoded = JwtHelper.verifyToken(refreshToken);
    const { id, recall } = decoded;

    const userData = await userRepo.findUserById(id);

    if (!userData) {
      throw new ConstraintError("Unauthorized - no user found", 404);
    }

    const { user } = userData;

    const { accessToken } = JwtHelper.generateToken(
      { id: user.id, recall },
      recall,
      false
    );

    return accessToken;
  },
  googleAuth: async (profile: any) => {
    const { displayName, emails, photos } = profile;
    const email = emails[0].value;
    const image = photos[0].value;

    const isUser = await userRepo.findUserByEmail(email, "GOOGLE");

    if (!isUser) {
      const newUser = await userRepo.createUser({
        name: displayName,
        email,
        image,
        provider: "GOOGLE",
        password: "",
      });

      const user = newUser.getData();

      const { accessToken, refreshToken } = JwtHelper.generateToken(
        { id: user.id, recall: true },
        true,
        true
      );

      return {
        user,
        accessToken,
        refreshToken,
      };
    }

    const user = isUser.getData();

    const { accessToken, refreshToken } = JwtHelper.generateToken(
      { id: user.id, recall: true },
      true,
      true
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  },
};
