import { prisma } from "../lib/prisma";
import { HttpError } from "../lib/errors";

export async function listIssues(params: { projectId?: string; cycleId?: string }) {
  const { projectId, cycleId } = params;
  const issues = await prisma.issue.findMany({
    where: {
      projectId: projectId ?? undefined,
      cycleId: cycleId ?? undefined,
    },
    include: { status: true, assignee: true, labels: true },
    orderBy: { createdAt: "desc" },
  });
  return { ok: true, data: issues };
}

export async function getIssue(params: { id: string }) {
  const { id } = params;
  const issue = await prisma.issue.findUnique({
    where: { id },
    include: { status: true, assignee: true, labels: true },
  });
  if (!issue) throw new HttpError(404, "Issue not found");
  return { ok: true, data: issue };
}

export async function createIssue(data: {
  title: string;
  statusId: string;
  projectId?: string;
  cycleId?: string;
  assigneeId?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}) {
  const { title, statusId, projectId, cycleId, assigneeId, description, priority } = data;
  if (!title || !statusId) throw new HttpError(400, "Missing required fields");

  // generate identifier like PRJ-0001 if project provided, else ISS-0001
  const prefix = projectId ? "PRJ" : "ISS";
  const count = await prisma.issue.count({ where: { projectId: projectId ?? undefined } });
  const identifier = `${prefix}-${String(count + 1).padStart(4, "0")}`;

  const issue = await prisma.issue.create({
    data: {
      identifier,
      title,
      statusId,
      projectId,
      cycleId,
      assigneeId,
      description,
      priority: (priority as any) ?? "MEDIUM",
      rank: `${Date.now()}`,
    },
    include: { status: true, assignee: true, labels: true },
  });
  return { ok: true, data: issue };
}

export async function updateIssue(params: { id: string }, data: Partial<{
  title: string;
  statusId: string;
  projectId: string | null;
  cycleId: string | null;
  assigneeId: string | null;
  description: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  dueDate: Date | null;
}>) {
  const { id } = params;
  const issue = await prisma.issue.update({ where: { id }, data, include: { status: true, assignee: true, labels: true } });
  return { ok: true, data: issue };
}

export async function deleteIssue(params: { id: string }) {
  const { id } = params;
  await prisma.issue.delete({ where: { id } });
  return { ok: true };
}


