# GitHub Repository Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Set repository name: `portfolio` (or your preferred name)
3. Description: "CRT Terminal-styled portfolio with Docker and CI/CD"
4. Choose: Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have them)
6. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, run these commands in your terminal:

```powershell
cd "C:\Users\szkub\OneDrive\Pulpit\portfolio"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Rename branch to main if needed
git branch -M main

# Push code
git push -u origin main
```

## Step 3: Configure GitHub Secrets

Go to your repository on GitHub:
Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

### Docker Hub Secrets
1. `DOCKER_USERNAME`
   - Your Docker Hub username
   - Get it from: https://hub.docker.com

2. `DOCKER_PASSWORD`
   - Create an access token at: https://hub.docker.com/settings/security
   - Click "New Access Token"
   - Name: "GitHub Actions"
   - Access permissions: Read, Write, Delete
   - Copy the token (you won't see it again!)

### VPS Secrets
3. `VPS_HOST`
   - Your VPS IP address (e.g., 192.168.1.100)

4. `VPS_USERNAME`
   - SSH username (usually: root, ubuntu, or your custom user)

5. `VPS_SSH_KEY`
   - Your private SSH key
   - Generate if you don't have one:
   ```powershell
   ssh-keygen -t ed25519 -C "github-actions@portfolio"
   ```
   - Copy the PRIVATE key (entire content of the .ssh/id_ed25519 file)
   - Add the PUBLIC key to VPS: ~/.ssh/authorized_keys

6. `VPS_PORT`
   - SSH port (default: 22)

## Step 4: Prepare Your VPS

Connect to your VPS via SSH and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (replace 'username')
sudo usermod -aG docker $USER

# Enable Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Create deployment directory
mkdir -p ~/portfolio

# Test Docker
docker --version
```

## Step 5: Configure SSH Access

On your LOCAL machine:

```powershell
# Generate SSH key if you haven't
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to VPS (replace user and host)
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh user@your-vps-ip "cat >> ~/.ssh/authorized_keys"

# Test SSH connection
ssh user@your-vps-ip
```

## Step 6: (Optional) Set Up Nginx Reverse Proxy

On your VPS:

```bash
# Install Nginx
sudo apt install nginx -y

# Create configuration
sudo nano /etc/nginx/sites-available/portfolio
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 7: (Optional) Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

## Step 8: Deploy!

Push any changes to the `main` branch to trigger automatic deployment:

```powershell
git add .
git commit -m "Update: description of changes"
git push origin main
```

Watch the deployment progress:
- Go to your GitHub repository
- Click "Actions" tab
- Watch the workflow run

## Testing Locally with Docker

Before pushing, test Docker build locally:

```powershell
# Build image
docker build -t portfolio-test .

# Run container
docker run -p 3000:3000 portfolio-test

# Open http://localhost:3000 in browser

# Stop container
docker ps  # Get container ID
docker stop <container-id>
```

## Troubleshooting

### GitHub Push Issues
- Check remote URL: `git remote -v`
- Use personal access token if password doesn't work
- Generate token: GitHub Settings → Developer settings → Personal access tokens

### Docker Build Fails
- Check `next.config.mjs` has `output: 'standalone'`
- Verify all dependencies in `package.json`
- Clear Docker cache: `docker builder prune`

### VPS Deployment Issues
- Check GitHub Actions logs
- SSH into VPS and check: `docker logs portfolio`
- Verify secrets are set correctly
- Check VPS firewall allows port 3000

### Nginx Issues
- Check configuration: `sudo nginx -t`
- View logs: `sudo tail -f /var/log/nginx/error.log`
- Check if port 80/443 is open

## Useful Commands

### Docker Commands
```bash
# View running containers
docker ps

# View logs
docker logs portfolio

# Stop container
docker stop portfolio

# Remove container
docker rm portfolio

# View images
docker images

# Remove unused images
docker image prune -a
```

### Git Commands
```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Push to GitHub
git push origin main
```

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code
3. ✅ Configure secrets
4. ✅ Prepare VPS
5. ✅ Set up Nginx (optional)
6. ✅ Deploy!
7. 🎉 Visit your live portfolio!

---

Need help? Check the main README.md or open an issue on GitHub.
