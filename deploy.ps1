# Portfolio Deployment Script (PowerShell)
# Quick commands for deploying and managing the portfolio on Windows

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('build', 'run', 'stop', 'restart', 'rebuild', 'logs', 'clean', 'status')]
    [string]$Command
)

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "→ $Message" -ForegroundColor Cyan
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Build-Image {
    Write-Info "Building Docker image..."
    docker build -t portfolio:latest .
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Build complete!"
    } else {
        Write-Error "Build failed!"
        exit 1
    }
}

function Run-Container {
    Write-Info "Starting container..."
    docker run -d `
        --name portfolio `
        --restart unless-stopped `
        -p 3000:3000 `
        portfolio:latest
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Container started on http://localhost:3000"
    } else {
        Write-Error "Failed to start container!"
        exit 1
    }
}

function Stop-Container {
    Write-Info "Stopping container..."
    docker stop portfolio 2>$null
    docker rm portfolio 2>$null
    Write-Success "Container stopped"
}

function Show-Logs {
    Write-Info "Container logs (Ctrl+C to exit):"
    docker logs -f portfolio
}

function Restart-Container {
    Stop-Container
    Run-Container
}

function Rebuild-All {
    Stop-Container
    Build-Image
    Run-Container
}

function Clean-All {
    Write-Info "Cleaning up..."
    docker stop portfolio 2>$null
    docker rm portfolio 2>$null
    docker rmi portfolio:latest 2>$null
    docker system prune -f
    Write-Success "Cleanup complete"
}

function Show-Status {
    Write-Host "`nContainer Status:" -ForegroundColor Yellow
    docker ps -a | Select-String "portfolio"
    
    Write-Host "`nImage Status:" -ForegroundColor Yellow
    docker images | Select-String "portfolio"
    
    Write-Host "`nDisk Usage:" -ForegroundColor Yellow
    docker system df
}

# Main script logic
switch ($Command) {
    'build' { Build-Image }
    'run' { Run-Container }
    'stop' { Stop-Container }
    'restart' { Restart-Container }
    'rebuild' { Rebuild-All }
    'logs' { Show-Logs }
    'clean' { Clean-All }
    'status' { Show-Status }
    default {
        Write-Host "Portfolio Deployment Helper" -ForegroundColor Blue
        Write-Host "===========================" -ForegroundColor Blue
        Write-Host ""
        Write-Host "Usage: .\deploy.ps1 <command>" -ForegroundColor White
        Write-Host ""
        Write-Host "Commands:" -ForegroundColor Yellow
        Write-Host "  build    - Build Docker image"
        Write-Host "  run      - Run container"
        Write-Host "  stop     - Stop and remove container"
        Write-Host "  restart  - Restart container"
        Write-Host "  rebuild  - Rebuild image and restart"
        Write-Host "  logs     - View container logs"
        Write-Host "  clean    - Remove all portfolio containers and images"
        Write-Host "  status   - Show container and image status"
        Write-Host ""
        Write-Host "Examples:" -ForegroundColor Yellow
        Write-Host "  .\deploy.ps1 build"
        Write-Host "  .\deploy.ps1 run"
        Write-Host "  .\deploy.ps1 rebuild"
        exit 1
    }
}
