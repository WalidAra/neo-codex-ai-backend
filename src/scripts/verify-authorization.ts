import { envConfig } from "@/config";
import { ConstraintError } from "@/core/app/base";
import { userRepo } from "@/core/infrastructure/repositories";
import { JwtHelper } from "@/helpers";

export const verifyAuthorization = async ({
  authHeader,
}: {
  authHeader: string | undefined;
}) => {
  if (!authHeader) {
    throw new ConstraintError("Authentication failed: No token provided", 403);
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== envConfig.authBearer || !token) {
    throw new ConstraintError(
      "Authentication failed: Invalid token format",
      403
    );
  }

  try {
    const decoded = JwtHelper.verifyToken(token) as {
      id: string;
      recall: boolean;
    };

    const user = await userRepo.findUserById(decoded.id);

    if (!user) {
      throw new ConstraintError(
        "Authentication failed: Account is inactive",
        403
      );
    }

    return { user: user.getData(), decoded };
  } catch (err: any) {
    throw new ConstraintError(err.message || "Invalid token");
  }
};
