# ─── Context ─────────────────────────────────────────────────────────────────

variable "project_name" {
  description = "Project name prefix applied to all resources"
  type        = string
}

variable "environment" {
  description = "Deployment environment (dev | staging | prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

# ─── Networking (passed from network-common outputs) ─────────────────────────

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public subnet IDs for the ALB"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for ECS tasks"
  type        = list(string)
}

variable "db_subnet_group_name" {
  description = "RDS DB subnet group name"
  type        = string
}

variable "sg_alb_id" {
  description = "ALB security group ID"
  type        = string
}

variable "sg_ecs_tasks_id" {
  description = "ECS tasks security group ID"
  type        = string
}

variable "sg_rds_id" {
  description = "RDS security group ID"
  type        = string
}

# ─── Domain / TLS ─────────────────────────────────────────────────────────────

variable "acm_certificate_arn" {
  description = "ACM certificate ARN (must be in same region as ALB)"
  type        = string
}

variable "domain_name" {
  description = "Public domain for the API (e.g. api.example.com)"
  type        = string
}

# ─── Container ────────────────────────────────────────────────────────────────

variable "container_port" {
  description = "Port the NestJS container listens on"
  type        = number
  default     = 3001
}

variable "container_cpu" {
  description = "ECS task CPU units (256 | 512 | 1024 | 2048 | 4096)"
  type        = number
  default     = 512
}

variable "container_memory" {
  description = "ECS task memory in MiB"
  type        = number
  default     = 1024
}

# ─── ECS Auto Scaling ─────────────────────────────────────────────────────────

variable "ecs_min_tasks" {
  description = "Minimum running ECS tasks"
  type        = number
  default     = 1
}

variable "ecs_max_tasks" {
  description = "Maximum running ECS tasks"
  type        = number
  default     = 4
}

variable "ecs_desired_tasks" {
  description = "Desired task count at deploy time"
  type        = number
  default     = 1
}

variable "scale_out_cpu_threshold" {
  description = "CPU % that triggers scale-out"
  type        = number
  default     = 70
}

variable "scale_in_cpu_threshold" {
  description = "CPU % that triggers scale-in"
  type        = number
  default     = 30
}

variable "alb_requests_per_target" {
  description = "ALB requests/min per task that triggers target-tracking scaling"
  type        = number
  default     = 1000
}

# ─── Database ─────────────────────────────────────────────────────────────────

variable "db_instance_class" {
  description = "RDS instance type"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "ecommerce"
}

variable "db_username" {
  description = "PostgreSQL master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "PostgreSQL master password — never hard-code; pass via tfvars or env"
  type        = string
  sensitive   = true
}

variable "db_multi_az" {
  description = "Enable RDS Multi-AZ standby (true for prod, false for dev/staging)"
  type        = bool
  default     = false
}

variable "db_backup_retention_days" {
  description = "Number of days to retain automated RDS backups"
  type        = number
  default     = 1
}

variable "db_deletion_protection" {
  description = "Prevent accidental RDS deletion (true in prod)"
  type        = bool
  default     = false
}

# ─── GitHub OIDC ──────────────────────────────────────────────────────────────

variable "github_org" {
  description = "GitHub organisation or username"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

# ─── Alerting ────────────────────────────────────────────────────────────────

variable "alert_email" {
  description = "Email address for CloudWatch alarm notifications"
  type        = string
}

variable "log_retention_days" {
  description = "CloudWatch log group retention in days"
  type        = number
  default     = 7
}
