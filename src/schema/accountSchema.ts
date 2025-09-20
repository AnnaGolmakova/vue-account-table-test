import * as z from "zod";

export const accountSchema = z
  .object({
    tags: z.array(z.object({ text: z.string().trim().max(50) })),
    type: z.enum(["LDAP", "LOCAL"], "Выберите тип учетной записи"),
    login: z
      .string()
      .trim()
      .min(1, "Заполните логин учетной записи")
      .max(100, "Не больше 100 символов"),
    password: z
      .string()
      .trim()
      .min(4, "Пароль должен быть больше 4 символов")
      .max(100, "Не больше 100 символов")
      .nullable(),
  })
  .refine((val) => (val.type === "LDAP" ? val.password === null : true), {
    message: "Пароль обязателен для локальных учетных записей",
    path: ["password"], // path of error
  });
