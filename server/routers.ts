import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactMessage, getPortfolioProjects, getContactMessages } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  portfolio: router({
    getProjects: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(({ input }) => getPortfolioProjects(input.category)),
  }),

  contact: router({
    sendMessage: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
      }))
      .mutation(async ({ input }) => {
        try {
          await createContactMessage({
            name: input.name,
            email: input.email,
            message: input.message,
          });
          return { success: true };
        } catch (error) {
          console.error("Failed to save contact message:", error);
          throw error;
        }
      }),
    getMessages: publicProcedure.query(async () => {
      return await getContactMessages();
    }),
  }),
});

export type AppRouter = typeof appRouter;
