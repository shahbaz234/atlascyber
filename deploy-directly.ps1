# Direct Deployment Script for AtlasCyber
# Usage: .\deploy-directly.ps1 -BucketName YOUR_S3_BUCKET_NAME -Region YOUR_REGION

param (
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1" # Default to us-east-1 if not provided
)

Write-Host ">>> Starting direct deployment to AWS S3..." -ForegroundColor Cyan

# 1. Enter frontend directory
Set-Location "apps/frontend"

# 2. Build the application
Write-Host ">>> Building the React application..." -ForegroundColor Yellow
npm install
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "!!! Build failed. Aborting deployment." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 3. Sync to S3
Write-Host ">>> Syncing files to S3 bucket: $BucketName in region: $Region..." -ForegroundColor Yellow

# We'll run the command directly so the user can see the RAW error message from AWS
aws s3 sync dist/ "s3://$BucketName" --delete --region $Region

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Deployment successful! Your site is live." -ForegroundColor Green
} else {
    Write-Host "!!! S3 Sync failed above. The error message from AWS should explain why (e.g. Access Denied or NoSuchBucket)." -ForegroundColor Red
}
