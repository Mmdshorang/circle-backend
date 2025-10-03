import { prisma } from '../lib/prisma';

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: { memberships: { include: { team: true } } }
  });
  return { 
    ok: true, 
    data: users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      avatarUrl: u.avatarUrl,
      role: u.role,
      status: u.status,
      joinedDate: u.joinedDate,
      teamIds: u.memberships.map(m => m.teamId)
    }))
  };
};

// دریافت یک کاربر خاص
export const getUser = async (params: { id: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { memberships: { include: { team: true } } }
  });
  if (!user) return { ok: false, error: 'User not found' };
  return {
    ok: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
      status: user.status,
      joinedDate: user.joinedDate,
      teamIds: user.memberships.map(m => m.teamId)
    }
  };
};

// ساخت کاربر جدید
export const createUser = async (data: {
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  status?: string;
}) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
      role: (data.role as any) ?? 'MEMBER',
      status: (data.status as any) ?? 'ONLINE',
    }
  });
  return { ok: true, data: user };
};

// ویرایش کاربر
export const updateUser = async (params: { id: string }, data: Partial<{
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  status: string;
}>) => {
  const user = await prisma.user.update({
    where: { id: params.id },
    data,
  });
  return { ok: true, data: user };
};

// حذف کاربر
export const deleteUser = async (params: { id: string }) => {
  await prisma.user.delete({ where: { id: params.id } });
  return { ok: true };
};
