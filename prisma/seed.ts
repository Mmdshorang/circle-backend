import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 🟢 User تستی
  const user = await prisma.user.upsert({
    where: { id: "ln" },
    update: {
      name: "mohammad2",
      email: "leonelngoya@gmail.com",
    },
    create: {
      id: "ln",
      name: "mohammad",
      avatarUrl: "https://example.com/avatar/ln.png",
      email: "leonelngoya@gmail.com",
      status: "ONLINE",
      role: "ADMIN",
      joinedDate: new Date("2022-01-01"),
    },
  });

  // 🟢 Team های کاربر
  const teams = await prisma.team.createMany({
    data: [
      { id: "CORE", name: "Core Team", joined: true, color: "#FF0000" },
      { id: "PERF", name: "Performance Team", joined: true, color: "#00FF00" },
      { id: "DESIGN", name: "Design Team", joined: true, color: "#0000FF" },
      { id: "WEB", name: "Web Team", joined: true, color: "#FFFF00" },
    ],
    skipDuplicates: true,
  });

  // 🟢 ارتباط User با Team ها
  const memberships = await prisma.member.createMany({
    data: [
      { userId: "ln", teamId: "CORE" },
      { userId: "ln", teamId: "PERF" },
      { userId: "ln", teamId: "DESIGN" },
      { userId: "ln", teamId: "WEB" },
    ],
    skipDuplicates: true,
  });

  // 🟢 Status ها
  const statuses = await prisma.status.createMany({
    data: [
      { id: "TODO", name: "To Do", color: "blue" },
      { id: "INPROGRESS", name: "In Progress", color: "yellow" },
      { id: "DONE", name: "Done", color: "green" },
    ],
    skipDuplicates: true,
  });
  await prisma.health.upsert({
    where: { id: "HEALTH1" },
    update: {}, 
    create: {
      id: "HEALTH1",
      name: "Healthy",
      color: "green",
      description: "Everything is fine",
    },
  });


  const project = await prisma.project.create({
    data: {
      id: "PRJ1",
      name: "Test Project",
      statusId: "TODO",
      leadId: "ln",
      percentComplete: 0,
      startDate: new Date(),
      priority: "MEDIUM",
      healthId: "HEALTH1", 
      teams: {
        connect: [{ id: "CORE" }, { id: "PERF" }],
      },
    },
  });


  // 🟢 Issues نمونه
  await prisma.issue.createMany({
    data: [
      {
        id: "ISS1",
        identifier: "PRJ-0001",
        title: "Setup CI",
        description: "Configure CI pipeline",
        statusId: "INPROGRESS",
        assigneeId: "ln",
        priority: "HIGH",
        createdAt: new Date(),
        projectId: project.id,
        rank: `${Date.now()}-1`,
      },
      {
        id: "ISS2",
        identifier: "PRJ-0002",
        title: "Implement auth",
        description: "Add login with JWT",
        statusId: "TODO",
        assigneeId: null,
        priority: "MEDIUM",
        createdAt: new Date(),
        projectId: project.id,
        rank: `${Date.now()}-2`,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Test data created!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
