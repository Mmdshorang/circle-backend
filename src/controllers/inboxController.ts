import { prisma } from "../lib/prisma";

export async function listInbox(params: { projectId?: string; userId?: string }) {
  const { projectId, userId } = params;
  const items = await prisma.inboxItem.findMany({
    where: {
      projectId: projectId ?? undefined,
      OR: userId ? [{ assigneeId: userId }, { userId }] : undefined,
    },
    include: { status: true, labels: true, assignee: true, user: true },
    orderBy: { timestamp: "desc" },
  });
  return { ok: true, data: items };
}


