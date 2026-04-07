# ─── Staging Environment ──────────────────────────────────────────────────────
# Production-like but scaled down: single NAT, no RDS Multi-AZ, 2 tasks max.
# Use staging to validate infra changes before promoting to prod.

module "network" {
  source = "../../modules/network-common"

  project_name         = "nestjs-devops"
  environment          = "staging"
  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  db_subnet_cidrs      = var.db_subnet_cidrs
  single_nat_gateway   = true  # single NAT — acceptable for staging
  container_port       = 3001
}

module "app" {
  source = "../../modules/app-asg"

  project_name = "nestjs-devops"
  environment  = "staging"
  aws_region   = var.aws_region

  vpc_id               = module.network.vpc_id
  public_subnet_ids    = module.network.public_subnet_ids
  private_subnet_ids   = module.network.private_subnet_ids
  db_subnet_group_name = module.network.db_subnet_group_name
  sg_alb_id            = module.network.sg_alb_id
  sg_ecs_tasks_id      = module.network.sg_ecs_tasks_id
  sg_rds_id            = module.network.sg_rds_id

  acm_certificate_arn = var.acm_certificate_arn
  domain_name         = var.domain_name

  # Container — matches prod CPU/memory to catch OOM issues early
  container_port   = 3001
  container_cpu    = 512
  container_memory = 1024

  # Scaling — mirrors prod shape at lower ceiling
  ecs_min_tasks           = 1
  ecs_max_tasks           = 4
  ecs_desired_tasks       = 2
  scale_out_cpu_threshold = 70
  scale_in_cpu_threshold  = 30
  alb_requests_per_target = 1000

  # Database — no HA, lighter instance
  db_instance_class        = "db.t3.small"
  db_name                  = "ecommerce_staging"
  db_username              = var.db_username
  db_password              = var.db_password
  db_multi_az              = false
  db_backup_retention_days = 3
  db_deletion_protection   = false

  github_org  = var.github_org
  github_repo = var.github_repo

  alert_email        = var.alert_email
  log_retention_days = 14
}

# ─── Outputs ─────────────────────────────────────────────────────────────────

output "alb_dns_name"               { value = module.app.alb_dns_name }
output "ecr_repository_url"         { value = module.app.ecr_repository_url }
output "ecs_cluster_name"           { value = module.app.ecs_cluster_name }
output "ecs_service_name"           { value = module.app.ecs_service_name }
output "ecs_task_definition_family" { value = module.app.ecs_task_definition_family }
output "ecs_container_name"         { value = module.app.ecs_container_name }
output "github_actions_role_arn"    { value = module.app.github_actions_role_arn }
output "ecs_private_subnet_ids"     { value = module.app.ecs_private_subnet_ids }
output "ecs_security_group_id"      { value = module.app.ecs_security_group_id }
output "dashboard_url"              { value = module.app.dashboard_url }
