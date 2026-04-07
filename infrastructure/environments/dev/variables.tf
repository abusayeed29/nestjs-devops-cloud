variable "aws_region" {
  type    = string
  default = "us-east-1"
}

# ─── Network ─────────────────────────────────────────────────────────────────

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

variable "vpc_cidr" {
  type    = string
  default = "10.10.0.0/16"
}

variable "public_subnet_cidrs" {
  type    = list(string)
  default = ["10.10.1.0/24", "10.10.2.0/24"]
}

variable "private_subnet_cidrs" {
  type    = list(string)
  default = ["10.10.11.0/24", "10.10.12.0/24"]
}

variable "db_subnet_cidrs" {
  type    = list(string)
  default = ["10.10.21.0/24", "10.10.22.0/24"]
}

# ─── Domain / TLS ─────────────────────────────────────────────────────────────

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for dev.api.yourdomain.com"
  type        = string
}

variable "domain_name" {
  type    = string
  default = "dev.api.yourdomain.com"
}

# ─── Database ────────────────────────────────────────────────────────────────

variable "db_username" {
  type      = string
  sensitive = true
}

variable "db_password" {
  type      = string
  sensitive = true
}

# ─── GitHub OIDC ──────────────────────────────────────────────────────────────

variable "github_org" {
  type = string
}

variable "github_repo" {
  type    = string
  default = "nestjs-devops"
}

# ─── Alerting ────────────────────────────────────────────────────────────────

variable "alert_email" {
  type = string
}
