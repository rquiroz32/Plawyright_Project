import { faker } from "@faker-js/faker";
import {
  Prisma,
  PrismaClient,
} from "@prisma/client";
import random from "lodash/random";
import sample from "lodash/sample";
import times from "lodash/times";

import { ReportSeverity, ReportStatus, ReportType } from './types';

const prisma = new PrismaClient();

const projects: string[] = [
  "Wallet Wonders",
  "Encrypted Exchange",
  "Hash Hacienda",
  "Public Key Party",
  "Satoshi Boulevard",
  "Key Keepers",
  "Big-Endians",
  "Small-Endians",
];

const MAX_REPORTS_PER_USER = 16 as const;
const MAX_USERS_COUNT = 1024 as const;
const MIN_USERS_COUNT = 512 as const;

async function main() {
  await createProjects();
  await createUsers();
  await createReports();
}

async function createProjects() {
  const projectData = projects.map((name) => ({ name }));

  for (const data of projectData) {
    await prisma.project.create({
      data,
    });
  }
}

function createUsers() {
  const userCount = random(MIN_USERS_COUNT, MAX_USERS_COUNT);
  const userData = times(userCount, () => ({
    email: faker.internet.exampleEmail(),
  }));

  const createUserPromises = userData.map(async (data) => {
    await prisma.user.create({
      data,
    });
  });

  return Promise.all(createUserPromises);
}

async function createReports() {
  const [projects, users] = await prisma.$transaction([
    prisma.project.findMany({
      select: {
        id: true,
      },
    }),
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),
  ]);

  const reports: any[] = [];

  for (const { id: userId } of users) {
    times(random(MAX_REPORTS_PER_USER), () => {
      const projectId = sample(projects.map(({ id }) => id));

      if (!projectId) {
        return;
      }

      reports.push({
        title: faker.lorem.sentence(),
        severity: randomReportSeverity(),
        type: randomReportType(),
        status: randomReportStatus(),
        createdAt: faker.date.past(3),
        userId,
        projectId,
      });
    });
  }

  const result: any[] = [];
  for (const reportData of reports) {
    result.push(await prisma.report.create({
      data: reportData,
    }));
  }

  return result;
}

function randomReportSeverity(): ReportSeverity {
  const allSeverities: ReportSeverity[] = Object.values(ReportSeverity);
  const severity = sample(allSeverities);

  if (severity) {
    return severity;
  }

  throw new Error("Invalid ReportSeverity enum");
}

function randomReportType(): ReportType {
  const allReportTypes: ReportType[] = Object.values(ReportType);

  const reportType = sample(allReportTypes);

  if (reportType) {
    return reportType;
  }

  throw new Error("Invalid ReportType enum");
}

function randomReportStatus(): ReportStatus {
  const allStatuses: ReportStatus[] = Object.values(ReportStatus);
  const status = sample(allStatuses);

  if (status) {
    return status;
  }

  throw new Error("Invalid ReportStatus enum");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
