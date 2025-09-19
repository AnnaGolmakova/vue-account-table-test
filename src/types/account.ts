import type { Tag } from "./tag";

export type Account =
  | {
      tags: Tag[];
      type: "LDAP";
      login: string;
      password: null;
    }
  | {
      tags: Tag[];
      type: "LOCAL";
      login: string;
      password: string;
    };
