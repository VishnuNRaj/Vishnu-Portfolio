terraform {
  required_version = ">= 1.5.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id
}

resource "vercel_project" "portfolio" {
  name      = var.project_name
  framework = "nextjs"
}

data "vercel_project_directory" "portfolio" {
  path = var.project_directory
}

resource "vercel_deployment" "portfolio" {
  project_id = vercel_project.portfolio.id
  files      = data.vercel_project_directory.portfolio.files
  path_prefix = var.project_directory
  production = true
}

resource "vercel_project_domain" "production" {
  project_id = vercel_project.portfolio.id
  domain     = "${var.project_name}.vercel.app"
}
