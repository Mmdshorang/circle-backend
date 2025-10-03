import { prisma } from "../lib/prisma";
import { HttpError } from "../lib/errors";

export async function listProjects() {
  const projects = await prisma.project.findMany({
    include: {
      lead: true,
      teams: true,
      status: true,
      health: true,
    },
    orderBy: { startDate: "desc" },
  });
  return { ok: true, data: projects };
}

export async function createProject(data: {
  name: string;
  statusId: string;
  healthId: string;
  leadId: string;
  teamIds?: string[];
  icon?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  startDate?: Date | string;
}) {
  const { name, statusId, healthId, leadId, teamIds, icon, priority, startDate } = data;
  if (!name || !statusId || !healthId || !leadId)
    throw new HttpError(400, "Missing required fields");

  const project = await prisma.project.create({
    data: {
      name,
      statusId,
      healthId,
      leadId,
      icon: icon ?? undefined,
      priority: (priority as any) ?? "MEDIUM",
      percentComplete: 0,
      startDate: startDate ? new Date(startDate) : new Date(),
      teams: teamIds?.length
        ? { connect: teamIds.map((id) => ({ id })) }
        : undefined,
    },
    include: { lead: true, teams: true, status: true, health: true },
  });
  return { ok: true, data: project };
}

export async function getProject(params: { id: string }) {
  const { id } = params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { lead: true, teams: true, status: true, health: true },
  });
  if (!project) throw new HttpError(404, "Project not found");
  return { ok: true, data: project };
}

export async function updateProject(params: { id: string }, data: Partial<{
  name: string;
  statusId: string;
  healthId: string;
  leadId: string;
  teamIds: string[];
  icon: string | null;
  percentComplete: number;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}>) {
  const { id } = params;
  const { teamIds, ...rest } = data;
  const project = await prisma.project.update({
    where: { id },
    data: {
      ...rest,
      teams: teamIds ? { set: teamIds.map((tid) => ({ id: tid })) } : undefined,
    },
    include: { lead: true, teams: true, status: true, health: true },
  });
  return { ok: true, data: project };
}

export async function deleteProject(params: { id: string }) {
  const { id } = params;
  await prisma.project.delete({ where: { id } });
  return { ok: true };
}


