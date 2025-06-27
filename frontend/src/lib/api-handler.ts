import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from 'next-auth';

// Augment the NextApiRequest type to include the session property
declare module 'next' {
  interface NextApiRequest {
    session?: Session & { user?: { id?: string; role?: string } };
  }
}

import { z, ZodSchema } from 'zod';
import { ApiError } from './api-utils';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type HandlerOptions<T extends ZodSchema> = {
  schema?: T;
  methods?: HttpMethod[];
  authRequired?: boolean;
  adminOnly?: boolean;
};

type HandlerFunction<T extends ZodSchema> = (
  req: NextApiRequest,
  res: NextApiResponse,
  data: T extends ZodSchema ? z.infer<T> : undefined
) => Promise<void> | void;

export function createApiHandler<T extends ZodSchema>(
  handler: HandlerFunction<T>,
  options: HandlerOptions<T> = {}
) {
  const {
    schema,
    methods = ['GET'],
    authRequired = false,
    adminOnly = false,
  } = options;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Check HTTP method
      const method = req.method as HttpMethod;
      if (!methods.includes(method)) {
        throw new ApiError(405, `Method ${method} Not Allowed`);
      }

      // Authentication check
      if (authRequired && !req.session?.user) {
        throw new ApiError(401, 'Authentication required');
      }

      // Admin check
      if (adminOnly && req.session?.user?.role !== 'ADMIN') {
        throw new ApiError(403, 'Forbidden: Admin access required');
      }

      // Parse and validate request body/query
      let data: any;
      if (schema) {
        const result = schema.safeParse(
          method === 'GET' ? req.query : req.body
        );

        if (!result.success) {
          throw new ApiError(400, 'Validation error', result.error.errors);
        }

        data = result.data;
      }

      // Call the handler
      await handler(req, res, data);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.status).json({
          success: false,
          message: error.message,
          details: error.details,
        });
      }

      console.error('API Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
}

// Common schema validations
export const schemas = {
  idParam: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  pagination: z.object({
    page: z.string().optional().default('1').transform(Number),
    limit: z.string().optional().default('10').transform(Number),
  }),
  search: z.object({
    query: z.string().min(1, 'Search query is required'),
  }),
};

// Common response helpers
export const apiResponse = {
  success: <T = any>(data: T, meta: Record<string, any> = {}) => ({
    success: true,
    data,
    ...(Object.keys(meta).length > 0 && { meta }),
  }),
  error: (message: string, details?: any) => ({
    success: false,
    message,
    ...(details && { details }),
  }),
  paginated: <T = any>(
    data: T[],
    total: number,
    page: number,
    limit: number
  ) => ({
    success: true,
    data,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  }),
};
