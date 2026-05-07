provider "aws" {
  region = "us-east-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket to host the frontend"
  type        = string
  default     = "cybersecurity-saas-frontend-bucket"
}

# Create S3 Bucket for Static Website Hosting
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = var.bucket_name
}

# Ownership controls
resource "aws_s3_bucket_ownership_controls" "frontend_bucket_ownership" {
  bucket = aws_s3_bucket.frontend_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Public Access Block
resource "aws_s3_bucket_public_access_block" "frontend_bucket_public_access" {
  bucket = aws_s3_bucket.frontend_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Bucket ACL
resource "aws_s3_bucket_acl" "frontend_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.frontend_bucket_ownership,
    aws_s3_bucket_public_access_block.frontend_bucket_public_access,
  ]

  bucket = aws_s3_bucket.frontend_bucket.id
  acl    = "public-read"
}

# Bucket Website Configuration
resource "aws_s3_bucket_website_configuration" "frontend_website" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html" # For React Router fallback
  }
}

# Bucket Policy for Public Read
resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  depends_on = [aws_s3_bucket_public_access_block.frontend_bucket_public_access]
  bucket = aws_s3_bucket.frontend_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend_bucket.arn}/*"
      },
    ]
  })
}

output "website_url" {
  description = "URL of the S3 static website"
  value       = aws_s3_bucket_website_configuration.frontend_website.website_endpoint
}
