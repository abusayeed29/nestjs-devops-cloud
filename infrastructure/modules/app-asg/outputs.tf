output "ecr_repository_url" {
  description = "ECR repository URL — used by GitHub Actions to push images"
  value       = aws_ecr_repository.api.repository_url
}

output "ecr_repository_arn" {
  description = "ECR repository ARN"
  value       = aws_ecr_repository.api.arn
}

output "alb_dns_name" {
  description = "ALB DNS name — point your domain CNAME here"
  value       = aws_lb.this.dns_name
}

output "alb_arn" {
  description = "ALB ARN"
  value       = aws_lb.this.arn
}

output "ecs_cluster_name" {
  description = "ECS cluster name — required in GitHub Actions secrets"
  value       = aws_ecs_cluster.this.name
}

output "ecs_service_name" {
  description = "ECS service name — required in GitHub Actions secrets"
  value       = aws_ecs_service.api.name
}

output "ecs_task_definition_family" {
  description = "ECS task definition family — required in GitHub Actions secrets"
  value       = aws_ecs_task_definition.api.family
}

output "ecs_container_name" {
  description = "Container name in the task definition — required in GitHub Actions secrets"
  value       = "${var.project_name}-${var.environment}-api"
}

output "rds_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.this.address
  sensitive   = true
}

output "app_secret_arn" {
  description = "ARN of the app Secrets Manager secret"
  value       = aws_secretsmanager_secret.app.arn
}

output "rds_secret_arn" {
  description = "ARN of the RDS credentials Secrets Manager secret"
  value       = aws_secretsmanager_secret.rds.arn
}

output "github_actions_role_arn" {
  description = "IAM role ARN to set as AWS_OIDC_ROLE_ARN in GitHub Actions secrets"
  value       = aws_iam_role.github_actions.arn
}

output "ecs_private_subnet_ids" {
  description = "Comma-separated private subnet IDs — used in the migration ECS run-task call"
  value       = join(",", var.private_subnet_ids)
}

output "ecs_security_group_id" {
  description = "ECS tasks security group ID — used in the migration ECS run-task call"
  value       = var.sg_ecs_tasks_id
}

output "dashboard_url" {
  description = "CloudWatch dashboard URL"
  value       = "https://${var.aws_region}.console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${aws_cloudwatch_dashboard.this.dashboard_name}"
}
