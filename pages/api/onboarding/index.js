import { NextRequest, NextResponse } from "next/server";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
  const prisma = new PrismaClient();
  const { universityName } = await request.json();
  const client = await clerkClient();

  const user = await currentUser();

  // Create university record
  const university = await prisma.university.create({
    data: {
      name: universityName,
    },
  });

  // Get all default roles
  const defaultRoles = await prisma.defaultUniAdministrationRoles.findMany({
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  // Create university-specific roles with their permissions
  for (const defaultRole of defaultRoles) {
    await prisma.uniAdministrationRoles.create({
      data: {
        university_id: university.id,
        role: defaultRole.role_name,
        permissions: {
          create: defaultRole.permissions.map((p) => ({
            permission: {
              connect: {
                id: p.permission_id,
              },
            },
          })),
        },
      },
    });
  }

  // Get the Super Admin role ID for this university
  const superAdminRole = await prisma.uniAdministrationRoles.findFirst({
    where: {
      university_id: university.id,
      role: "Super Admin",
    },
  });

  // Create user record
  await prisma.user.create({
    data: {
      id: user?.id || "",
      first_name: user?.firstName || "",
      last_name: user?.lastName || "",
      email_address: user?.emailAddresses[0]?.emailAddress || "",
      role: "admin",
      university_id: university.id,
    },
  });

  // Create UniAdministration record
  const uniSuperAdmin = await prisma.uniAdministration.create({
    data: {
      user_id: user?.id || "",
      role_id: superAdminRole?.id,
    },
  });

  // Update Clerk user metadata
  await client.users.updateUserMetadata(user?.id || "", {
    publicMetadata: {
      role: "admin",
      university_id: university.id,
      administration_id: uniSuperAdmin.id,
    },
  });

  await prisma.$disconnect();
  return NextResponse.json({ success: true });
}
