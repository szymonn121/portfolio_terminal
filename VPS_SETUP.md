# VPS Setup Guide for Portfolio Deployment

## Prerequisites

- VPS with Ubuntu 20.04+ or Debian 11+
- Root or sudo access
- At least 1GB RAM and 10GB disk space
- Public IP address

## Step 1: Initial VPS Setup

### Connect to VPS

```bash
ssh root@YOUR_VPS_IP
# or
ssh YOUR_USERNAME@YOUR_VPS_IP
```

### Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### Create Deploy User (Optional but Recommended)

```bash
# Create user
sudo adduser deploy

# Add to sudo group
sudo usermod -aG sudo deploy

# Switch to new user
su - deploy
```

## Step 2: Install Docker

### Install Docker Engine

```bash
# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add user to docker group (no sudo needed for docker commands)
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Enable Docker to start on boot
sudo systemctl enable docker
sudo systemctl start docker

# Verify installation
docker --version
docker ps
```

### Alternative: Docker Quick Install Script

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

## Step 3: Configure Firewall

### Using UFW (Ubuntu Firewall)

```bash
# Enable firewall
sudo ufw enable

# Allow SSH (important!)
sudo ufw allow 22/tcp
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow portfolio port
sudo ufw allow 3000/tcp

# Check status
sudo ufw status
```

### Using iptables (Alternative)

```bash
# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow portfolio
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT

# Save rules
sudo netfilter-persistent save
```

## Step 4: Set Up SSH Key Authentication

### On Your Local Machine (Windows)

```powershell
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "portfolio-deployment"

# Copy public key content
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

### On VPS

```bash
# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
# Paste your public key here, save and exit

# Set permissions
chmod 600 ~/.ssh/authorized_keys

# Test SSH connection from local machine
# ssh -i ~/.ssh/id_ed25519 user@VPS_IP
```

## Step 5: Create Deployment Directory

```bash
# Create directory
mkdir -p ~/portfolio
cd ~/portfolio

# Create docker-compose.yml (optional)
cat > docker-compose.yml <<EOF
version: '3.8'

services:
  portfolio:
    image: YOUR_DOCKER_USERNAME/portfolio:latest
    container_name: portfolio
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    networks:
      - portfolio-network

networks:
  portfolio-network:
    driver: bridge
EOF
```

## Step 6: Install Nginx (Optional - Recommended)

### Install Nginx

```bash
sudo apt install -y nginx
```

### Configure Nginx Reverse Proxy

```bash
# Create configuration
sudo nano /etc/nginx/sites-available/portfolio
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;  # Or use IP address

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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/portfolio_access.log;
    error_log /var/log/nginx/portfolio_error.log;
}
```

### Enable Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## Step 7: Install SSL Certificate (Optional - Highly Recommended)

### Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Get SSL Certificate

```bash
# For domain
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (recommended)

# Auto-renewal is set up automatically
# Test renewal
sudo certbot renew --dry-run
```

## Step 8: Test Deployment Manually

```bash
# Pull image (replace with your Docker Hub username)
docker pull YOUR_DOCKER_USERNAME/portfolio:latest

# Run container
docker run -d \
  --name portfolio \
  --restart unless-stopped \
  -p 3000:3000 \
  YOUR_DOCKER_USERNAME/portfolio:latest

# Check if running
docker ps

# View logs
docker logs portfolio

# Test access
curl http://localhost:3000
```

## Step 9: Configure GitHub Secrets

Go to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

### Docker Hub Secrets

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `DOCKER_USERNAME` | Your Docker Hub username | https://hub.docker.com |
| `DOCKER_PASSWORD` | Docker Hub access token | Account Settings → Security → New Access Token |

### VPS Secrets

| Secret Name | Value | Example |
|-------------|-------|---------|
| `VPS_HOST` | VPS IP address | `192.168.1.100` |
| `VPS_USERNAME` | SSH username | `deploy` or `root` |
| `VPS_SSH_KEY` | Private SSH key | Full content of `~/.ssh/id_ed25519` |
| `VPS_PORT` | SSH port | `22` |

### Get Private Key (Local Machine)

```powershell
# Windows
type $env:USERPROFILE\.ssh\id_ed25519

# Copy entire output including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... key content ...
# -----END OPENSSH PRIVATE KEY-----
```

## Step 10: Monitoring and Maintenance

### Check Container Status

```bash
# List running containers
docker ps

# View logs
docker logs portfolio
docker logs -f portfolio  # Follow logs

# Container stats
docker stats portfolio

# Inspect container
docker inspect portfolio
```

### Nginx Status and Logs

```bash
# Check status
sudo systemctl status nginx

# View access logs
sudo tail -f /var/log/nginx/portfolio_access.log

# View error logs
sudo tail -f /var/log/nginx/portfolio_error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Useful Maintenance Commands

```bash
# Stop container
docker stop portfolio

# Remove container
docker rm portfolio

# Remove old images
docker image prune -a

# See disk usage
docker system df

# Clean up everything (careful!)
docker system prune -a --volumes

# Restart deployment
cd ~/portfolio
docker-compose down
docker-compose pull
docker-compose up -d
```

## Step 11: Set Up Automatic Updates (Optional)

### Create Update Script

```bash
nano ~/update-portfolio.sh
```

Add:

```bash
#!/bin/bash
echo "Updating portfolio..."
cd ~/portfolio
docker pull YOUR_DOCKER_USERNAME/portfolio:latest
docker stop portfolio
docker rm portfolio
docker run -d \
  --name portfolio \
  --restart unless-stopped \
  -p 3000:3000 \
  YOUR_DOCKER_USERNAME/portfolio:latest
docker image prune -af
echo "Update complete!"
```

Make executable:

```bash
chmod +x ~/update-portfolio.sh
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs portfolio

# Check if port is already in use
sudo netstat -tulpn | grep 3000

# Kill process using port
sudo kill -9 $(sudo lsof -t -i:3000)
```

### Can't Connect to Site

```bash
# Check if container is running
docker ps

# Check Nginx status
sudo systemctl status nginx

# Check firewall
sudo ufw status

# Test locally
curl http://localhost:3000
```

### GitHub Actions Deployment Fails

```bash
# On VPS, check if Docker is accessible
docker ps

# Check SSH access
# From local machine:
ssh -i ~/.ssh/id_ed25519 user@VPS_IP

# Check if user is in docker group
groups
# Should show 'docker'
```

### SSL Certificate Issues

```bash
# Renew manually
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Test Nginx config
sudo nginx -t
```

## Security Best Practices

1. **Use SSH keys** instead of passwords
2. **Disable root login** over SSH
3. **Configure firewall** to only allow necessary ports
4. **Enable automatic security updates**
5. **Use SSL/TLS** for production
6. **Regular backups** of important data
7. **Monitor logs** for suspicious activity
8. **Keep Docker and system updated**

### Disable Root SSH Login

```bash
sudo nano /etc/ssh/sshd_config

# Change these lines:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes

# Restart SSH
sudo systemctl restart sshd
```

### Enable Automatic Security Updates

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

## Quick Reference

### Docker Commands
```bash
docker ps                           # List running containers
docker logs portfolio               # View logs
docker stop portfolio               # Stop container
docker start portfolio              # Start container
docker restart portfolio            # Restart container
docker rm portfolio                 # Remove container
docker images                       # List images
docker pull user/portfolio:latest   # Pull image
```

### Nginx Commands
```bash
sudo systemctl status nginx    # Check status
sudo systemctl restart nginx   # Restart
sudo nginx -t                  # Test config
sudo tail -f /var/log/nginx/portfolio_error.log  # View logs
```

### Firewall Commands
```bash
sudo ufw status               # Check firewall
sudo ufw allow 3000/tcp       # Allow port
sudo ufw deny 3000/tcp        # Block port
sudo ufw reload               # Reload rules
```

---

## Next Steps

1. ✅ Complete VPS setup
2. ✅ Configure GitHub secrets
3. ✅ Push code to trigger deployment
4. ✅ Monitor deployment in GitHub Actions
5. ✅ Access your live site!

Your portfolio will be accessible at:
- Direct: `http://YOUR_VPS_IP:3000`
- With Nginx: `http://YOUR_DOMAIN.com`
- With SSL: `https://YOUR_DOMAIN.com`
