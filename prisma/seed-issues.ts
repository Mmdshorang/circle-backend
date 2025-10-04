import { prisma } from "../src/lib/prisma";

async function seedIssues() {
  const userId = "1";

  let user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        name: "Test User",
        email: "test@example.com",
      },
    });
  }

  let status = await prisma.status.findFirst();
  if (!status) {
    status = await prisma.status.create({
      data: { name: "Open", color: "#00B8D9", icon: "circle" },
    });
  }

  const issues = await prisma.issue.createMany({
    data: [
      {
        identifier: "ISS-0001",
        title: "Fix login page crash",
        description: "App crashes when submitting wrong password",
        statusId: status.id,
        assigneeId: user.id,
        priority: "HIGH",
        rank: `${Date.now()}`,
      },
      {
        identifier: "ISS-0002",
        title: "Add dark mode toggle",
        description: "Users requested dark theme support",
        statusId: status.id,
        assigneeId: user.id,
        priority: "MEDIUM",
        rank: `${Date.now() + 1}`,
      },
      {
        identifier: "ISS-0003",
        title: "Optimize image uploads",
        description: "Reduce image upload time and improve compression",
        statusId: status.id,
        assigneeId: user.id,
        priority: "CRITICAL",
        rank: `${Date.now() + 2}`,
      },
    ],
    skipDuplicates: true, 
  });

  console.log(`✅ Created ${issues.count} issues for user ${user.name}`);
}

seedIssues()
  .catch((e) => {
    console.error(e);
   
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
