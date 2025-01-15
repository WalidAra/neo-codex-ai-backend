import { JwtHelper } from "@/helpers";
import { ConstraintError } from "../base";
import { userRepo } from "@/core/infrastructure/repositories";

export const AuthService = {
  login: async () => {},
  logout: async () => {},
  register: async () => {},
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
  googleAuth: async () => {},
};
