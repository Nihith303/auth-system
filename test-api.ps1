# Test Authentication API Endpoints

Write-Host "🔐 Testing Authentication System API" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Test Health Endpoint
Write-Host "`n1. Testing Health Endpoint..." -ForegroundColor Yellow
$healthResponse = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET
Write-Host "Health Status: $($healthResponse.status)" -ForegroundColor Green
Write-Host "Environment: $($healthResponse.environment)" -ForegroundColor Green

# Test User Registration
Write-Host "`n2. Testing User Registration..." -ForegroundColor Yellow
$signupData = @{
    name = "John Doe"
    email = "john@example.com"
    password = "SecurePass123"
} | ConvertTo-Json

try {
    $signupResponse = Invoke-RestMethod -Uri "http://localhost:3001/auth/signup" -Method POST -Body $signupData -ContentType "application/json"
    Write-Host "✅ Registration Successful!" -ForegroundColor Green
    Write-Host "User ID: $($signupResponse.user.id)" -ForegroundColor Cyan
    Write-Host "Token: $($signupResponse.token.Substring(0, 20))..." -ForegroundColor Cyan
    
    $token = $signupResponse.token
} catch {
    Write-Host "❌ Registration Failed: $($_.Exception.Message)" -ForegroundColor Red
    $token = $null
}

# Test User Login
Write-Host "`n3. Testing User Login..." -ForegroundColor Yellow
$loginData = @{
    email = "john@example.com"
    password = "SecurePass123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3001/auth/login" -Method POST -Body $loginData -ContentType "application/json"
    Write-Host "✅ Login Successful!" -ForegroundColor Green
    Write-Host "Token: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Cyan
    
    if (-not $token) {
        $token = $loginResponse.token
    }
} catch {
    Write-Host "❌ Login Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Get Current User (Protected Route)
if ($token) {
    Write-Host "`n4. Testing Protected Route (Get Current User)..." -ForegroundColor Yellow
    
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    try {
        $userResponse = Invoke-RestMethod -Uri "http://localhost:3001/auth/me" -Method GET -Headers $headers
        Write-Host "✅ Protected Route Access Successful!" -ForegroundColor Green
        Write-Host "User Name: $($userResponse.user.name)" -ForegroundColor Cyan
        Write-Host "User Email: $($userResponse.user.email)" -ForegroundColor Cyan
    } catch {
        Write-Host "❌ Protected Route Access Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Green
Write-Host "Backend Server is running at: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend Server is running at: http://localhost:3000" -ForegroundColor Cyan 