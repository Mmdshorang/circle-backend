import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: { memberships: { include: { team: true } } }
  });
  return users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    avatarUrl: u.avatarUrl,
    role: u.role,
    status: u.status,
    joinedDate: u.joinedDate,
    teamIds: u.memberships.map(m => m.teamId)
  }));
};
