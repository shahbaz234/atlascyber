import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  sub: string;
  tenantId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { sub: payload.sub, tenantId: payload.tenantId, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ─── RBAC ─────────────────────────────────────────────────────────────────────
const roleHierarchy: Record<string, number> = {
  SUPER_ADMIN: 100,
  TENANT_ADMIN: 80,
  SECURITY_ENGINEER: 60,
  SOC_ANALYST: 40,
  BILLING_ADMIN: 30,
  READ_ONLY: 10,
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const userLevel = roleHierarchy[req.user.role] ?? 0;
    const requiredLevel = Math.min(...roles.map(r => roleHierarchy[r] ?? 999));

    if (userLevel < requiredLevel) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// ─── Tenant Isolation Guard ───────────────────────────────────────────────────
export const tenantGuard = (req: Request, res: Response, next: NextFunction) => {
  const requestedTenantId = req.params.tenantId || req.body.tenantId || req.query.tenantId;

  if (
    requestedTenantId &&
    requestedTenantId !== req.user.tenantId &&
    req.user.role !== 'SUPER_ADMIN'
  ) {
    return res.status(403).json({ message: 'Cross-tenant access denied' });
  }

  next();
};
