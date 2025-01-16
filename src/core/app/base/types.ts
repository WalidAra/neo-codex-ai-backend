import { Request } from "express";
import { User as UserDTO } from "@/core/app/dto/api.dto";

export type AuthorizationDTO = {
  user: UserDTO;
  decoded: {
    id: string;
    recall: boolean;
  };
};

export type RequestWithAuth = Request & {
  auth: AuthorizationDTO;
};
