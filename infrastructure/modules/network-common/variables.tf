variable "project_name" {
  description = "Project name prefix applied to all resources"
  type        = string
}

variable "environment" {
  description = "Deployment environment (dev | staging | prod)"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "availability_zones" {
  description = "List of AZs — provide at least 2 for HA"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "One CIDR per AZ for public subnets (ALB, NAT gateways)"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "One CIDR per AZ for private subnets (ECS tasks)"
  type        = list(string)
}

variable "db_subnet_cidrs" {
  description = "One CIDR per AZ for isolated DB subnets (RDS)"
  type        = list(string)
}

variable "single_nat_gateway" {
  description = "true = one shared NAT (cheap, for dev/staging); false = one NAT per AZ (HA, for prod)"
  type        = bool
  default     = false
}

variable "container_port" {
  description = "Application container port — used to set ECS security group ingress"
  type        = number
  default     = 3001
}
