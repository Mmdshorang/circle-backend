import { prisma } from "../lib/prisma";
import { HttpError } from "../lib/errors";

export async function listTeams() {
  const teams = await prisma.team.findMany({
    include: {
      members: { include: { user: true } },
    },
    orderBy: { name: "asc" },
  });
  return { ok: true, data: teams };
}

export async function createTeam(data: { name: string; color?: string; icon?: string }) {
  const { name, color, icon } = data;
  if (!name) throw new HttpError(400, "Missing required fields");
  const team = await prisma.team.create({ data: { name, color, icon } });
  return { ok: true, data: team };
}

export async function updateTeam(params: { id: string }, data: Partial<{ name: string; color: string; icon: string }>) {
  const { id } = params;
  const team = await prisma.team.update({ where: { id }, data });
  return { ok: true, data: team };
}

export async function deleteTeam(params: { id: string }) {
  const { id } = params;
  await prisma.team.delete({ where: { id } });
  return { ok: true };
}


