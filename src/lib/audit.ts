import prisma from "./prisma";

interface AuditLogParams {
  userId?: string;
  action: string;
  target?: string;
  detail?: string;
  ipAddress?: string;
}

export async function createAuditLog(params: AuditLogParams) {
  return prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      target: params.target,
      detail: params.detail,
      ipAddress: params.ipAddress,
    },
  });
}
