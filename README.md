# 🛡️ CyberSec SaaS — Multi-Tenant Security Platform

A full-stack, production-grade cybersecurity SaaS platform covering **SOC**, **Vulnerability Management**, **Compliance**, **Incident Management**, and **Billing**.

---

## 📁 Project Structure

```
cybersecurity-saas/
├── apps/
│   ├── frontend/          # React + Vite + TailwindCSS
│   ├── api-gateway/       # Express proxy gateway (port 4000)
│   ├── auth-service/      # JWT + RBAC + Sessions (port 4001)
│   ├── asset-service/     # Asset inventory CRUD (port 4002)
│   ├── vuln-service/      # OpenVAS scanner + findings (port 4003)
│   ├── soc-service/       # Wazuh + WebSocket alerts (port 4004)
│   ├── incident-service/  # Incident lifecycle (port 4005)
│   ├── compliance-service/# ISO27001, SOC2, PCI-DSS (port 4006)
│   └── billing-service/   # Stripe subscriptions (port 4007)
│
├── packages/
│   ├── types/             # Shared TypeScript types
│   ├── ui/                # Shared UI components
│   └── configs/           # Shared ESLint/TS configs
│
└── infra/
    ├── docker/            # Docker Compose + Dockerfiles
    ├── terraform/         # AWS infrastructure (EC2, RDS, S3)
    └── kubernetes/        # K8s manifests for production
```

---

## 🚀 Quick Start (Local Dev)

### Prerequisites
- Node.js >= 20
- Docker + Docker Compose
- PostgreSQL (or use Docker)

### 1. Clone and install

```bash
git clone <your-repo>
cd cybersecurity-saas
cp .env.example .env
# Fill in your secrets in .env
npm install
```

### 2. Start infrastructure

```bash
npm run docker:up
# Starts: PostgreSQL, Redis
```

### 3. Run database migrations

```bash
cd apps/auth-service
npx prisma migrate dev --name init
npx prisma generate
cd ../..
```

### 4. Start all services

```bash
npm run dev
# Starts all services via Turborepo
```

### 5. Access the app

| Service       | URL                        |
|---------------|----------------------------|
| Frontend      | http://localhost:5173       |
| API Gateway   | http://localhost:4000       |
| Auth Service  | http://localhost:4001       |
| Asset Service | http://localhost:4002       |
| SOC Service   | http://localhost:4004       |

---

## 🔐 Multi-Tenancy

Every database table has `tenant_id`. Every API query filters by `req.user.tenantId`.

**Tenant isolation is enforced at:**
- Database level: all queries scoped to `tenant_id`
- Middleware level: `tenantGuard` middleware blocks cross-tenant requests
- WebSocket level: each tenant connects to their own namespace `tenant:{id}`

---

## 👥 RBAC Roles

| Role               | Level | Permissions                                       |
|--------------------|-------|---------------------------------------------------|
| SUPER_ADMIN        | 100   | Full platform access, all tenants                 |
| TENANT_ADMIN       | 80    | Full access within tenant                         |
| SECURITY_ENGINEER  | 60    | Scans, assets, findings, incidents                |
| SOC_ANALYST        | 40    | Alerts, incidents (view + update)                 |
| BILLING_ADMIN      | 30    | Billing and subscription management               |
| READ_ONLY          | 10    | View-only dashboard                               |

---

## 📦 Services Overview

### Auth Service
- JWT access tokens (15m) + refresh tokens (7d)
- Token rotation on refresh
- Rate limiting on login endpoints
- MFA scaffold (TOTP-ready)
- Full audit logging

### Asset Service
- CRUD with pagination and filtering
- Agent status tracking (Wazuh agent integration)
- Asset criticality and tagging

### Vulnerability Service
- OpenVAS scan orchestration
- CVSS scoring + CVE mapping
- PDF report generation (AWS S3)
- WebSocket progress updates

### SOC Service
- Wazuh API ingestion (polling or webhook)
- Alert normalization + MITRE ATT&CK mapping
- WebSocket live feed per tenant
- Alert triage workflow

### Incident Service
- Full lifecycle: Open → In Progress → Resolved → Closed
- SLA tracking with deadline alerts
- Evidence upload (S3)
- Comment threads

### Compliance Service
- ISO 27001, SOC2, PCI-DSS, HIPAA controls
- Gap analysis and scoring
- PDF compliance report export

### Billing Service
- Stripe Checkout + Customer Portal
- Subscription webhook handling
- Invoice history
- Plan enforcement middleware

---

## 🏗️ Stack

| Layer     | Technology                                   |
|-----------|----------------------------------------------|
| Frontend  | React, Vite, TailwindCSS, Recharts, Redux    |
| Backend   | Node.js, Express, TypeScript                 |
| Database  | PostgreSQL + Prisma ORM                      |
| Auth      | JWT + bcrypt + refresh token rotation        |
| Realtime  | Socket.IO (WebSocket)                        |
| Security  | Wazuh, OpenVAS, Suricata                     |
| Billing   | Stripe                                       |
| Cloud     | AWS (EC2, RDS, S3, CloudFront)               |
| DevOps    | Docker, Turbopack, Kubernetes (Phase 3)      |

---

## 🗺️ Build Phases

### ✅ Phase 1 — MVP (2–3 weeks)
- [x] Auth + RBAC
- [x] Multi-tenant dashboard
- [x] Asset management
- [x] Vulnerability scans
- [x] PDF reports

### 🔧 Phase 2
- [ ] SOC live alerts
- [ ] Incident management
- [ ] Compliance reporting
- [ ] Stripe billing

### 🚀 Phase 3
- [ ] AI alert correlation
- [ ] Threat intelligence feeds
- [ ] SOAR automation
- [ ] EDR integration

---

## ⚠️ Security Checklist Before Production

- [ ] Change all secrets in `.env`
- [ ] Enable SSL/TLS on all services
- [ ] Set `ALLOWED_ORIGINS` to your domain only
- [ ] Enable PostgreSQL SSL
- [ ] Set up AWS IAM roles (no root keys)
- [ ] Enable Stripe webhook signature verification
- [ ] Add WAF in front of API Gateway
- [ ] Enable CloudTrail for audit logging
- [ ] Penetration test the tenant isolation
- [ ] Add MFA for all TENANT_ADMIN+ accounts
