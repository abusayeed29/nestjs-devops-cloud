output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.this.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs (ALB)"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs (ECS tasks)"
  value       = aws_subnet.private[*].id
}

output "db_subnet_ids" {
  description = "DB subnet IDs (RDS)"
  value       = aws_subnet.db[*].id
}

output "db_subnet_group_name" {
  description = "RDS DB subnet group name"
  value       = aws_db_subnet_group.this.name
}

output "sg_alb_id" {
  description = "ALB security group ID"
  value       = aws_security_group.alb.id
}

output "sg_ecs_tasks_id" {
  description = "ECS tasks security group ID"
  value       = aws_security_group.ecs_tasks.id
}

output "sg_rds_id" {
  description = "RDS security group ID"
  value       = aws_security_group.rds.id
}
