# 🚀 Quick Start - Portfolio Deployment

## What's Been Done

✅ Git repository initialized
✅ All files committed
✅ Dockerfile created
✅ Docker Compose configuration added
✅ GitHub Actions CI/CD pipeline configured
✅ Deployment scripts created
✅ Comprehensive documentation added

## Next Steps (You Need To Do)

### 1. Create GitHub Repository & Push Code

```powershell
# Go to https://github.com/new and create a new repository named "portfolio"

# Then run (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Set Up Docker Hub

1. Create account at https://hub.docker.com (if you don't have one)
2. Go to https://hub.docker.com/settings/security
3. Click "New Access Token"
4. Name: "GitHub Actions"
5. Permissions: Read, Write, Delete
6. Copy the token (save it!)

### 3. Configure GitHub Secrets

Go to: `https://github.com/YOUR_USERNAME/portfolio/settings/secrets/actions`

Add these secrets (click "New repository secret" for each):

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `DOCKER_USERNAME` | Your Docker Hub username | https://hub.docker.com |
| `DOCKER_PASSWORD` | Access token from step 2 | Token you just created |
| `VPS_HOST` | Your VPS IP address | Your VPS provider |
| `VPS_USERNAME` | SSH username (root/ubuntu/etc) | Your VPS |
| `VPS_SSH_KEY` | Private SSH key | `type $env:USERPROFILE\.ssh\id_ed25519` |
| `VPS_PORT` | SSH port (usually 22) | Your VPS |

### 4. Prepare Your VPS

SSH into your VPS and run:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Test Docker
docker --version

# Create deployment directory
mkdir -p ~/portfolio
```

### 5. Test Locally First (Optional but Recommended)

```powershell
# Build the Docker image
.\deploy.ps1 build

# Run the container
.\deploy.ps1 run

# Open http://localhost:3000 in your browser

# Check logs if needed
.\deploy.ps1 logs

# Stop when done testing
.\deploy.ps1 stop
```

### 6. Deploy to Production

Once GitHub secrets are configured and VPS is ready:

```powershell
# Any push to main branch will auto-deploy
git add .
git commit -m "Deploy to production"
git push origin main
```

Watch the deployment:
- Go to GitHub → Your Repository → Actions tab
- Watch the workflow run in real-time

### 7. Access Your Live Site

- Direct: `http://YOUR_VPS_IP:3000`
- With domain: Set up Nginx reverse proxy (see SETUP_GUIDE.md)

## Deployment Commands

### PowerShell (Windows)
```powershell
.\deploy.ps1 build      # Build image
.\deploy.ps1 run        # Start container
.\deploy.ps1 stop       # Stop container
.\deploy.ps1 restart    # Restart container
.\deploy.ps1 rebuild    # Rebuild & restart
.\deploy.ps1 logs       # View logs
.\deploy.ps1 status     # Check status
.\deploy.ps1 clean      # Clean up everything
```

### Bash (Linux/Mac/VPS)
```bash
chmod +x deploy.sh      # Make executable (first time only)
./deploy.sh build       # Build image
./deploy.sh run         # Start container
./deploy.sh stop        # Stop container
./deploy.sh restart     # Restart container
./deploy.sh rebuild     # Rebuild & restart
./deploy.sh logs        # View logs
./deploy.sh status      # Check status
./deploy.sh clean       # Clean up everything
```

## Troubleshooting

### Can't push to GitHub?
- Check if remote is added: `git remote -v`
- Use personal access token instead of password
- Generate at: GitHub Settings → Developer settings → Personal access tokens

### Docker build fails?
- Make sure Docker Desktop is running (Windows)
- Check `next.config.mjs` has `output: 'standalone'`
- Try: `docker system prune -a` then rebuild

### Deployment fails?
- Check GitHub Actions logs (Actions tab)
- Verify all secrets are set correctly
- SSH into VPS and check: `docker logs portfolio`

### Site not accessible?
- Check if container is running: `docker ps`
- Check VPS firewall allows port 3000
- For domains: verify DNS is pointing to VPS

## Important Files

- `Dockerfile` - Docker image configuration
- `docker-compose.yml` - Docker Compose setup
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `SETUP_GUIDE.md` - Detailed setup instructions
- `deploy.ps1` / `deploy.sh` - Deployment helper scripts
- `README.md` - Full documentation

## Support

- Detailed instructions: Read `SETUP_GUIDE.md`
- Docker help: https://docs.docker.com
- GitHub Actions: https://docs.github.com/actions
- Next.js deployment: https://nextjs.org/docs/deployment

## Architecture Overview

```
┌─────────────┐
│   GitHub    │  ← You push code here
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  GitHub Actions     │  ← Builds Docker image
│  (CI/CD Pipeline)   │  ← Pushes to Docker Hub
└──────┬──────────────┘  ← Deploys to VPS
       │
       ▼
┌─────────────────────┐
│   Docker Hub        │  ← Stores images
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Your VPS          │  ← Runs container
│   Port 3000         │  ← Your live site!
└─────────────────────┘
```

## Ready to Deploy?

1. ✅ Code is ready
2. ⏳ Create GitHub repo
3. ⏳ Set up Docker Hub
4. ⏳ Configure secrets
5. ⏳ Prepare VPS
6. ⏳ Push and deploy!

Good luck! 🚀
