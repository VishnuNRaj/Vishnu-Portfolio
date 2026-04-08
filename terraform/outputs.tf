output "project_id" {
  value = vercel_project.portfolio.id
}

output "project_name" {
  value = vercel_project.portfolio.name
}

output "production_url" {
  value = "https://${vercel_project_domain.production.domain}"
}

output "deployment_url" {
  value = "https://${vercel_deployment.portfolio.url}"
}
