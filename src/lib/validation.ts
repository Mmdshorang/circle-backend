import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(1),
  statusId: z.string().min(1),
  healthId: z.string().min(1),
  leadId: z.string().min(1),
  teamIds: z.array(z.string()).optional(),
  icon: z.string().nullable().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  startDate: z.union([z.string().datetime().optional(), z.date().optional()]).optional(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const CreateTeamSchema = z.object({
  name: z.string().min(1),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export const UpdateTeamSchema = CreateTeamSchema.partial();

export const CreateIssueSchema = z.object({
  title: z.string().min(1),
  statusId: z.string().min(1),
  projectId: z.string().optional(),
  cycleId: z.string().optional(),
  assigneeId: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
});

export const UpdateIssueSchema = CreateIssueSchema.partial();

export const ListIssuesQuerySchema = z.object({
  projectId: z.string().optional(),
  cycleId: z.string().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type CreateTeamInput = z.infer<typeof CreateTeamSchema>;
export type UpdateTeamInput = z.infer<typeof UpdateTeamSchema>;
export type CreateIssueInput = z.infer<typeof CreateIssueSchema>;
export type UpdateIssueInput = z.infer<typeof UpdateIssueSchema>;
export type ListIssuesQuery = z.infer<typeof ListIssuesQuerySchema>;


