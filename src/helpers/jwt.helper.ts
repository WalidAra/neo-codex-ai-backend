import jwt from "jsonwebtoken";
import { envConfig } from "@/config";

export class JwtHelper {
  private static jwtSecret = envConfig.jwtSecret;

  static generateToken(payload: object, recall: boolean, include?: boolean) {
    if (this.jwtSecret) {
      const accessToken = jwt.sign(payload, this.jwtSecret, {
        expiresIn: recall ? "24h" : "1h", // accessToken
      });

      if (include === true) {
        const refreshToken = jwt.sign(payload, this.jwtSecret, {
          expiresIn: recall ? "30d" : "1d", // refreshToken
        });
        return { accessToken, refreshToken };
      }

      return { accessToken };
    }
    throw new Error("JWT secret is not defined");
  }

  static verifyToken(token: string): any {
    if (!this.jwtSecret) {
      throw new Error("JWT secret is not defined");
    }
    return jwt.verify(token, this.jwtSecret);
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
