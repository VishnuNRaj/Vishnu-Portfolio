variable "vercel_api_token" {
  description = "Vercel API token"
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Vercel team id"
  type        = string
  default     = "team_KftzQEQhMqcYllhdSzrgrLEb"
}

variable "project_name" {
  description = "Vercel project name"
  type        = string
  default     = "vishnu-n-raj-portfolio"
}

variable "project_directory" {
  description = "Path to the Next.js project relative to terraform/"
  type        = string
  default     = ".."
}

variable "milvus_enabled" {
  description = "Whether Milvus should be enabled in deployed environments"
  type        = bool
  default     = false
}
