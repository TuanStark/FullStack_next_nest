import { z } from "zod";

export const PostFormSchema = z.object({
  postId: z
    .string()
    .transform((value) => parseInt(value))
    .optional(),
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  tags: z
    .string()
    .min(1)
    .refine((value) => value.split(",").every((tag) => tag.trim() !== ""))
    .transform((value) => value.split(",")),
  thumbnail: typeof File !== "undefined" ? z.instanceof(File).optional() : z.any().optional(), // Kiểm tra nếu là File (trong môi trường trình duyệt), nếu không thì chấp nhận bất kỳ giá trị nào
  //thumbnail: z.instanceof(File).optional(),
  published: z.string().transform((value) => value === "on"),
});

// db,dataScience,web,,
