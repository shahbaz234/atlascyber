import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { auditLog } from '../utils/audit.util';

const prisma = new PrismaClient();

// ─── Register ─────────────────────────────────────────────────────────────────
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, tenantName, tenantSlug } = req.body;

    // Create tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: tenantName,
        slug: tenantSlug,
      },
    });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        tenantId: tenant.id,
        email,
        passwordHash,
        firstName,
        lastName,
        role: 'TENANT_ADMIN',
      },
    });

    // Create Stripe customer (billing-service call)
    // await billingService.createCustomer(tenant.id, email, tenantName);

    const tokens = generateTokens(user.id, user.tenantId, user.role);
    await saveRefreshToken(user.id, tokens.refreshToken);

    await auditLog(prisma, tenant.id, user.id, 'REGISTER', 'user', user.id);

    res.status(201).json({
      message: 'Account created successfully',
      user: sanitizeUser(user),
      ...tokens,
    });
  } catch (err) {
    next(err);
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, tenantSlug } = req.body;

    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (!tenant) return res.status(401).json({ message: 'Invalid credentials' });

    const user = await prisma.user.findUnique({
      where: { tenantId_email: { tenantId: tenant.id, email } },
    });

    if (!user || !user.isActive) return res.status(401).json({ message: 'Invalid credentials' });

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = generateTokens(user.id, user.tenantId, user.role);
    await saveRefreshToken(user.id, tokens.refreshToken);

    await auditLog(prisma, tenant.id, user.id, 'LOGIN', 'session', user.id, {
      ip: req.ip,
    });

    res.json({
      user: sanitizeUser(user),
      tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug },
      ...tokens,
    });
  } catch (err) {
    next(err);
  }
};

// ─── Refresh Token ────────────────────────────────────────────────────────────
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.status(401).json({ message: 'Refresh token required' });

    const session = await prisma.session.findUnique({
      where: { refreshToken: token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    // Rotate refresh token
    await prisma.session.delete({ where: { id: session.id } });
    const tokens = generateTokens(session.user.id, session.user.tenantId, session.user.role);
    await saveRefreshToken(session.user.id, tokens.refreshToken);

    res.json(tokens);
  } catch (err) {
    next(err);
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken: token } = req.body;
    if (token) {
      await prisma.session.deleteMany({ where: { refreshToken: token } });
    }
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

// ─── Me ───────────────────────────────────────────────────────────────────────
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { tenant: { select: { id: true, name: true, slug: true, logoUrl: true } } },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: sanitizeUser(user), tenant: user.tenant });
  } catch (err) {
    next(err);
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateTokens(userId: string, tenantId: string, role: string) {
  const accessToken = jwt.sign(
    { sub: userId, tenantId, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    { sub: userId, jti: uuidv4() },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
}

async function saveRefreshToken(userId: string, token: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: { userId, refreshToken: token, expiresAt },
  });
}

function sanitizeUser(user: any) {
  const { passwordHash, mfaSecret, ...safe } = user;
  return safe;
}
