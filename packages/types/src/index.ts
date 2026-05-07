// packages/types/src/index.ts
// Shared types used across all services and frontend

export type Role = 'SUPER_ADMIN' | 'TENANT_ADMIN' | 'SOC_ANALYST' | 'SECURITY_ENGINEER' | 'READ_ONLY' | 'BILLING_ADMIN';
export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
export type AssetType = 'SERVER' | 'ENDPOINT' | 'CLOUD' | 'NETWORK_DEVICE' | 'DATABASE' | 'APPLICATION';
export type AssetCriticality = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type AgentStatus = 'ONLINE' | 'OFFLINE' | 'PENDING' | 'ERROR';
export type ScanStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
export type AlertStatus = 'OPEN' | 'ACKNOWLEDGED' | 'RESOLVED' | 'FALSE_POSITIVE';
export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type ComplianceStandard = 'ISO27001' | 'SOC2' | 'PCI_DSS' | 'HIPAA' | 'GDPR';
export type BillingPlan = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  mfaEnabled: boolean;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface Asset {
  id: string;
  tenantId: string;
  hostname: string;
  ipAddress?: string;
  os?: string;
  type: AssetType;
  criticality: AssetCriticality;
  agentStatus: AgentStatus;
  tags: string[];
  owner?: string;
  lastSeenAt?: string;
  createdAt: string;
}

export interface Finding {
  id: string;
  tenantId: string;
  scanId: string;
  assetId?: string;
  title: string;
  description?: string;
  severity: Severity;
  cvssScore?: number;
  cveIds: string[];
  solution?: string;
  isResolved: boolean;
  createdAt: string;
}

export interface Alert {
  id: string;
  tenantId: string;
  assetId?: string;
  sourceSystem: string;
  title: string;
  severity: Severity;
  status: AlertStatus;
  mitreAttackId?: string;
  triggeredAt: string;
}

export interface Incident {
  id: string;
  tenantId: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  assignedToId?: string;
  slaDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// MITRE ATT&CK technique mapping
export const MITRE_TACTICS: Record<string, string> = {
  TA0001: 'Initial Access',
  TA0002: 'Execution',
  TA0003: 'Persistence',
  TA0004: 'Privilege Escalation',
  TA0005: 'Defense Evasion',
  TA0006: 'Credential Access',
  TA0007: 'Discovery',
  TA0008: 'Lateral Movement',
  TA0009: 'Collection',
  TA0010: 'Exfiltration',
  TA0011: 'Command and Control',
  TA0040: 'Impact',
};

// Severity colors for UI
export const SEVERITY_COLORS: Record<Severity, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#3b82f6',
  INFO: '#6b7280',
};
