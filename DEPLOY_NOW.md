# 🚀 DEPLOYMENT CHECKLIST - Complete This Now!

## ✅ What's Already Done

- ✅ Code pushed to GitHub: https://github.com/szymonn121/portfolio_terminal
- ✅ Docker configuration ready
- ✅ CI/CD pipeline configured (triggers on push to master)
- ✅ Deployment scripts created

## 📋 YOUR TO-DO LIST (Do in Order!)

### 1️⃣ Set Up Docker Hub (5 minutes)

**Go to:** https://hub.docker.com

1. Sign in or create account
2. Click your profile → **Account Settings**
3. Go to **Security** → **New Access Token**
4. Token description: `GitHub Actions Portfolio`
5. Access permissions: **Read, Write, Delete**
6. Click **Generate**
7. **COPY THE TOKEN** (you won't see it again!)
8. Save it temporarily in a text file

### 2️⃣ Prepare Your VPS (10-15 minutes)

**SSH into your VPS:**
```bash
ssh root@YOUR_VPS_IP
# OR
ssh YOUR_USERNAME@YOUR_VPS_IP
```

**Run these commands:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker (quick method)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Test Docker
docker --version
docker ps

# Create deployment directory
mkdir -p ~/portfolio
cd ~/portfolio

# Configure firewall (if needed)
sudo ufw allow 22
sudo ufw allow 3000
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable
```

**Get your VPS info ready:**
- VPS IP: `_________________`
- SSH Username: `_________________`
- SSH Port: `22` (usually)

### 3️⃣ Generate & Configure SSH Key (5 minutes)

**On your local Windows machine:**

```powershell
# Check if you have a key
type $env:USERPROFILE\.ssh\id_ed25519.pub

# If not, generate one:
ssh-keygen -t ed25519 -C "github-actions-deploy"
# Press Enter for all prompts

# Copy PUBLIC key to VPS
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

**On VPS:**
```bash
# Add your public key
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste the public key you copied
# Save: Ctrl+O, Enter, Ctrl+X

chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

**Get PRIVATE key for GitHub (on local machine):**
```powershell
# Copy entire output including BEGIN/END lines
type $env:USERPROFILE\.ssh\id_ed25519
```

### 4️⃣ Configure GitHub Secrets (5 minutes)

**Go to:** https://github.com/szymonn121/portfolio_terminal/settings/secrets/actions

**Click "New repository secret" for each:**

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `DOCKER_USERNAME` | Your Docker Hub username | Step 1 |
| `DOCKER_PASSWORD` | Access token from Step 1 | The token you copied |
| `VPS_HOST` | Your VPS IP address | e.g., 192.168.1.100 |
| `VPS_USERNAME` | SSH username | root, ubuntu, or deploy |
| `VPS_SSH_KEY` | Full private key | Output from `type $env:USERPROFILE\.ssh\id_ed25519` |
| `VPS_PORT` | SSH port | 22 (or your custom port) |

**Important for VPS_SSH_KEY:**
- Copy the ENTIRE private key including:
  ```
  -----BEGIN OPENSSH PRIVATE KEY-----
  ... all the key content ...
  -----END OPENSSH PRIVATE KEY-----
  ```

### 5️⃣ Test & Deploy! (2 minutes)

**Trigger deployment:**
```powershell
cd "C:\Users\szkub\OneDrive\Pulpit\portfolio"

# Make a small change to trigger deployment
echo "# Deployment test" >> README.md

git add .
git commit -m "Test deployment pipeline"
git push origin master
```

**Watch deployment:**
1. Go to: https://github.com/szymonn121/portfolio_terminal/actions
2. Click on the latest workflow run
3. Watch the progress (takes 3-5 minutes)

**Expected flow:**
- ✅ Build Docker Image
- ✅ Push to Docker Hub
- ✅ Deploy to VPS
- ✅ Start Container
- ✅ Deployment Status

### 6️⃣ Verify Deployment

**Check if it's live:**

Open in browser:
```
http://YOUR_VPS_IP:3000
```

**SSH into VPS and check:**
```bash
ssh YOUR_USERNAME@YOUR_VPS_IP

# Check container is running
docker ps

# Should show:
# CONTAINER ID   IMAGE                    STATUS         PORTS
# xxxxx          username/portfolio:latest   Up X seconds   0.0.0.0:3000->3000/tcp

# Check logs
docker logs portfolio

# Test locally on VPS
curl http://localhost:3000
```

## 🎯 Verification Checklist

After deployment, verify:

- [ ] GitHub Actions workflow completed successfully (green checkmark)
- [ ] Container is running on VPS: `docker ps | grep portfolio`
- [ ] Site accessible at: `http://YOUR_VPS_IP:3000`
- [ ] No errors in logs: `docker logs portfolio`
- [ ] Auto-restart enabled: Container shows "Up" status

## 🔄 Future Deployments

**Every time you push to master, it auto-deploys!**

```powershell
# Make changes to your code
# Then:
git add .
git commit -m "Your update message"
git push origin master

# Automatic deployment happens!
# Watch at: github.com/szymonn121/portfolio_terminal/actions
```

## 🆘 Troubleshooting

### Deployment Failed?

**Check GitHub Actions logs:**
1. Go to: https://github.com/szymonn121/portfolio_terminal/actions
2. Click failed workflow
3. Click failed step to see error

**Common issues:**

❌ **"Permission denied" SSH error**
- Check VPS_SSH_KEY is the PRIVATE key (not public)
- Verify public key is in `~/.ssh/authorized_keys` on VPS
- Check SSH port is correct

❌ **"unauthorized" Docker error**
- Verify DOCKER_USERNAME is correct
- Check DOCKER_PASSWORD is an access token (not password)
- Make sure token has Read/Write/Delete permissions

❌ **"Connection refused" to VPS**
- Check VPS_HOST is correct IP
- Verify VPS_PORT is correct (usually 22)
- Check VPS firewall allows SSH (port 22)

❌ **Container not starting**
- SSH to VPS: `ssh user@vps_ip`
- Check logs: `docker logs portfolio`
- Check if port 3000 is available: `sudo netstat -tulpn | grep 3000`

### Can't Access Site?

```bash
# On VPS, check container status
docker ps -a | grep portfolio

# Check logs
docker logs portfolio

# Check if port 3000 is listening
sudo netstat -tulpn | grep 3000

# Check firewall
sudo ufw status
```

## 📚 Additional Setup (Optional)

### Set Up Domain & Nginx (Recommended)

See **VPS_SETUP.md** for:
- Nginx reverse proxy setup
- SSL certificate with Let's Encrypt
- Domain configuration

### Enable HTTPS

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate (replace YOUR_DOMAIN)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🎉 Success Indicators

You know it's working when:

✅ GitHub Actions shows green checkmark
✅ Site loads at `http://YOUR_VPS_IP:3000`
✅ `docker ps` shows container running
✅ Logs show "ready - started server on 0.0.0.0:3000"
✅ Automatic deployments work on every push

## 📊 Monitoring

**Check deployment status:**
- GitHub: https://github.com/szymonn121/portfolio_terminal/actions
- Docker Hub: https://hub.docker.com/r/YOUR_USERNAME/portfolio

**On VPS:**
```bash
# Container status
docker ps
docker logs portfolio

# Resource usage
docker stats portfolio

# Disk space
docker system df
```

## 🚀 Quick Commands

```bash
# On VPS:
docker logs portfolio              # View logs
docker restart portfolio           # Restart container
docker stop portfolio              # Stop container
docker start portfolio             # Start container
docker ps                          # List running containers

# On local machine:
git push origin master             # Deploy update
```

---

## ⏱️ Time Estimate

- Docker Hub setup: 5 min
- VPS preparation: 15 min
- SSH key setup: 5 min
- GitHub secrets: 5 min
- First deployment: 3 min
- Testing: 2 min

**Total: ~35 minutes**

## 📞 Need Help?

- **Detailed VPS setup:** Read `VPS_SETUP.md`
- **Quick start:** Read `QUICKSTART.md`
- **Full docs:** Read `README.md`

---

## ✅ START HERE:

1. [ ] Complete Step 1 (Docker Hub)
2. [ ] Complete Step 2 (VPS Setup)
3. [ ] Complete Step 3 (SSH Keys)
4. [ ] Complete Step 4 (GitHub Secrets)
5. [ ] Complete Step 5 (Deploy!)
6. [ ] Complete Step 6 (Verify)

**Good luck! 🚀**

Your site will be live at: `http://YOUR_VPS_IP:3000`
