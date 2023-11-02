import { User } from "@prisma/client";

export default interface Employee {
  id: number;
  uID?: string | null;
  firstName?: string | null;
  middleInitial?: string | null;
  lastName?: string | null;  
  notes?: string | null;
  User?: User;
}