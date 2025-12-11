import { z } from "zod"
export const authSchema = z.object({ username: z.string().min(3), password: z.string().min(6) })
export const taskSchema = z.object({ title: z.string().min(1), description: z.string().optional(), status: z.enum(["pending","completed"]).default("pending") })
