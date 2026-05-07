# deploy-frontend.ps1
param (
    [string]$BucketName = "cybersecurity-saas-frontend-bucket"
)

Write-Host "Building the React frontend..." -ForegroundColor Cyan

# Navigate to frontend app
Set-Location -Path "apps/frontend"

# Install dependencies if not present
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

# Build the project
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Deployment aborted." -ForegroundColor Red
    exit 1
}

Write-Host "Build successful! Syncing to AWS S3..." -ForegroundColor Cyan

# Sync the dist folder to the specified S3 bucket
aws s3 sync dist/ s3://$BucketName --delete

if ($LASTEXITCODE -ne 0) {
    Write-Host "S3 Sync failed! Ensure you are authenticated with AWS CLI." -ForegroundColor Red
    exit 1
}

Write-Host "Deployment Complete! Your site is live on S3." -ForegroundColor Green
