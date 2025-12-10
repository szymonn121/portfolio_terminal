# Docker VPS Deployment Setup

## GitHub Secrets Required

Go to: https://github.com/szymonn121/portfolio_terminal/settings/secrets/actions

Add these secrets by clicking **"New repository secret"**:

### 1. Docker Hub Credentials

- **DOCKER_USERNAME**: Your Docker Hub username
- **DOCKER_PASSWORD**: Your Docker Hub password or [access token](https://hub.docker.com/settings/security)

### 2. VPS Access

- **VPS_HOST**: Your VPS IP address (e.g., `123.45.67.89`)
- **VPS_USERNAME**: SSH username (usually `root`)
- **VPS_PORT**: `22` (or your custom SSH port)
- **VPS_SSH_KEY**: Copy the private key from below ⬇️

## Your SSH Keys

### Public Key (Add to VPS)
Copy this to your VPS's `~/.ssh/authorized_keys`:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDK4i8gYxtkRtdqp2oLkqrXZJPhHuTsXa73Jzs7Qf9bRTBFU1i9vdKs/z+7aFq+spXltlB675mHb/ns1v89s+NVDeMi90OCOv9PAqH11cFnkpUVOhOVVIxzanyGb4G2UTsRChqtlW6ZB0hDQmV0762NRaDldOYZ7SpfbArjc0E/FCuUI4RTbecWUwXP7zGu9Qq2XLGyGyRqkGGn+5h0IDlW2ceVZFRkaU/r/SsDGdIJ6iCdaUoFKqRtO3OA5nMnQjk0rgnTs0p3uqIL4kD5O0a5FYh+MsL0Bgh1E9yl4SHIaXrQYLpSyUPMzCL/eAvoM6IiqcW2LFfYzvpp+q2Y950G+6zz1KyMHf8zMUJvi/eEjzEPeDGqxSLvoFXmNDJqDSICe24nmlZuhX2FpSQt/DtwP8mN2wEYslZSy1Vuff2lkvo+c3+j7JT8dqwKDZwvGZUoiY2TJu9n+RL6g8wmmg8+WEKLMB5N0mpin3XtyOQAPHW+cs0q7CrAn/8Qe9A6Xk7JbZBtIOtNyOweH29ZPNPpEne7XJtbi/6DtfqRv7BNwBOZJQYdal7f19sRallx9wEG8SZDZNSvjsKXJtatxgdSa97MDwr+kPopb6IQ0cfA07X5K0PdDbNOxcQN+TnSvXk+ag7u7z5yQ3tJOtIB8RGiLf2L4Z/PXGykBjflplCFAw== szkub@Szymon-PC
```

### Private Key (Add to GitHub as VPS_SSH_KEY)
Copy the entire key including `BEGIN` and `END` lines - saved locally at: `C:\Users\szkub\.ssh\id_rsa`

## Setup Steps

1. **Add public key to VPS:**
   ```bash
   ssh root@YOUR_VPS_IP
   mkdir -p ~/.ssh
   echo "ssh-rsa AAAAB3NzaC..." >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

2. **Add all secrets to GitHub** (see above)

3. **Install Docker on VPS:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

4. **Commit and push the workflows:**
   ```bash
   git add .github/workflows/
   git commit -m "Add Docker deployment workflows"
   git push origin master
   ```

## Test Deployment

After adding all secrets, push any commit to trigger deployment:
```bash
git commit --allow-empty -m "Test deployment"
git push origin master
```

Watch the deployment at: https://github.com/szymonn121/portfolio_terminal/actions
