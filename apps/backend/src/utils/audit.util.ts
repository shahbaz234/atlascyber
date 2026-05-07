import { PrismaClient } from '@prisma/client';

export const auditLog = async (
  prisma: PrismaClient,
  tenantId: string,
  userId: string | null,
  action: string,
  resource: string,
  resourceId?: string,
  metadata?: any
) => {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action,
        resource,
        resourceId,
        metadata: metadata || {},
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
};
