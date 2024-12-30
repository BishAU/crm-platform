# Port Assignments

## Base Port Structure
- Production ports start at 3000 and increment by 100 (X000)
- Development ports are production port + 1 (X001)
- Backend services increment by 10 from their frontend port

### Production Environments (X000)
- VCC Platform: 3000
- CRM Platform: 3100
- WWW Platform: 3200
- Raffle Platform: 3300
- Skyhigh Platform Frontend: 3400
- Skyhigh Platform Backend: 3410
- Spraiybooth Platform: 3500
- Rockregister Platform: 3600
- tradertokenbot: 3700
- Kuma Platform: 3800

### Development Environments (X001)
- VCC Platform Client: 3001
- VCC Platform Server: 3002 (Exception to standard pattern)
- CRM Platform: 3101
- WWW Platform: 3201
- Raffle Platform: 3301
- Skyhigh Platform Frontend: 3401
- Skyhigh Platform Backend: 3411
- Spraiybooth Platform: 3501
- Rockregister Platform: 3601
- tradertokenbot: 3701
- Kuma Platform: 3801

### New Projects
- Production ports must start at next available X00 increment
- Development ports must be production port + 1
- Backend services must use X10 increment from their frontend port
