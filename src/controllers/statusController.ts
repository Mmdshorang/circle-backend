import { prisma } from "../lib/prisma";

export async function listStatuses() {
  const statuses = await prisma.status.findMany({ orderBy: { name: "asc" } });
  return { ok: true, data: statuses };
}

export async function listHealths() {
  const healths = await prisma.health.findMany({ orderBy: { name: "asc" } });
  return { ok: true, data: healths };
}

export async function listLabels() {
  const labels = await prisma.label.findMany({ orderBy: { name: "asc" } });
  return { ok: true, data: labels };
}


