import { Request, Response, NextFunction } from 'express';
import { PrismaClient, AssetType, AssetCriticality } from '@prisma/client';

const prisma = new PrismaClient();

// ─── List Assets ──────────────────────────────────────────────────────────────
export const listAssets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenantId = req.user.tenantId;
    const { page = 1, limit = 20, type, criticality, search, agentStatus } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      tenantId,
      isActive: true,
      ...(type && { type: type as AssetType }),
      ...(criticality && { criticality: criticality as AssetCriticality }),
      ...(agentStatus && { agentStatus: agentStatus as any }),
      ...(search && {
        OR: [
          { hostname: { contains: String(search), mode: 'insensitive' as const } },
          { ipAddress: { contains: String(search), mode: 'insensitive' as const } },
        ],
      }),
    };

    const [assets, total] = await Promise.all([
      prisma.asset.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.asset.count({ where }),
    ]);

    res.json({
      data: assets,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (err) {
    next(err);
  }
};

// ─── Get Asset ────────────────────────────────────────────────────────────────
export const getAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const asset = await prisma.asset.findFirst({
      where: { id: req.params.id, tenantId: req.user.tenantId },
      include: {
        scans: { orderBy: { createdAt: 'desc' }, take: 5 },
        findings: {
          where: { isResolved: false },
          orderBy: { cvssScore: 'desc' },
          take: 10,
        },
        alerts: {
          where: { status: { not: 'RESOLVED' } },
          orderBy: { triggeredAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    next(err);
  }
};

// ─── Create Asset ─────────────────────────────────────────────────────────────
export const createAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hostname, ipAddress, macAddress, os, osVersion, type, criticality, tags, owner, location } = req.body;

    const asset = await prisma.asset.create({
      data: {
        tenantId: req.user.tenantId,
        hostname,
        ipAddress,
        macAddress,
        os,
        osVersion,
        type: type || 'SERVER',
        criticality: criticality || 'MEDIUM',
        tags: tags || [],
        owner,
        location,
      },
    });

    res.status(201).json(asset);
  } catch (err) {
    next(err);
  }
};

// ─── Update Asset ─────────────────────────────────────────────────────────────
export const updateAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await prisma.asset.findFirst({
      where: { id: req.params.id, tenantId: req.user.tenantId },
    });

    if (!existing) return res.status(404).json({ message: 'Asset not found' });

    const asset = await prisma.asset.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(asset);
  } catch (err) {
    next(err);
  }
};

// ─── Delete Asset ─────────────────────────────────────────────────────────────
export const deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.asset.updateMany({
      where: { id: req.params.id, tenantId: req.user.tenantId },
      data: { isActive: false },
    });

    res.json({ message: 'Asset deactivated' });
  } catch (err) {
    next(err);
  }
};

// ─── Asset Stats ──────────────────────────────────────────────────────────────
export const getAssetStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenantId = req.user.tenantId;

    const [total, byType, byCriticality, byAgentStatus] = await Promise.all([
      prisma.asset.count({ where: { tenantId, isActive: true } }),
      prisma.asset.groupBy({ by: ['type'], where: { tenantId, isActive: true }, _count: true }),
      prisma.asset.groupBy({ by: ['criticality'], where: { tenantId, isActive: true }, _count: true }),
      prisma.asset.groupBy({ by: ['agentStatus'], where: { tenantId, isActive: true }, _count: true }),
    ]);

    res.json({ total, byType, byCriticality, byAgentStatus });
  } catch (err) {
    next(err);
  }
};
