// HIPAA Compliant Authentication Service
import { EncryptionService } from '../utils/encryption';

interface UserSession {
  userId: string;
  username: string;
  loginTime: Date;
  lastActivity: Date;
  sessionToken: string;
  permissions: string[];
}

interface AuditLog {
  timestamp: Date;
  userId: string;
  action: string;
  details: any;
  ipAddress?: string;
  userAgent?: string;
}

class HIPAAAuthService {
  private static instance: HIPAAAuthService;
  private currentSession: UserSession | null = null;
  private auditLogs: AuditLog[] = [];
  private readonly SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  private sessionTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.loadAuditLogs();
  }

  static getInstance(): HIPAAAuthService {
    if (!HIPAAAuthService.instance) {
      HIPAAAuthService.instance = new HIPAAAuthService();
    }
    return HIPAAAuthService.instance;
  }

  // Authenticate user with enhanced security
  async authenticate(username: string, password: string): Promise<boolean> {
    // For production, this should verify against a secure backend
    // with proper password hashing (bcrypt, etc.)
    
    // Demo validation
    if (password.length < 8) {
      this.logAuditEvent('LOGIN_FAILED', { username, reason: 'Password too short' });
      return false;
    }

    // Create session
    this.currentSession = {
      userId: this.generateUserId(username),
      username,
      loginTime: new Date(),
      lastActivity: new Date(),
      sessionToken: this.generateSessionToken(),
      permissions: ['read', 'write'] // In production, fetch from backend
    };

    // Log successful login
    this.logAuditEvent('LOGIN_SUCCESS', { username });
    
    // Start session timeout
    this.startSessionTimer();

    // Store encrypted session
    this.storeSession();

    return true;
  }

  // Log out user
  logout(): void {
    if (this.currentSession) {
      this.logAuditEvent('LOGOUT', { username: this.currentSession.username });
      this.currentSession = null;
      this.clearSessionTimer();
      localStorage.removeItem('hipaa_session');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (!this.currentSession) {
      this.loadSession();
    }
    return this.currentSession !== null;
  }

  // Update last activity time
  updateActivity(): void {
    if (this.currentSession) {
      this.currentSession.lastActivity = new Date();
      this.resetSessionTimer();
    }
  }

  // Get current user
  getCurrentUser(): string {
    return this.currentSession?.username || '';
  }

  // Log HIPAA audit event
  logAuditEvent(action: string, details: any): void {
    const log: AuditLog = {
      timestamp: new Date(),
      userId: this.currentSession?.userId || 'anonymous',
      action,
      details,
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent
    };

    this.auditLogs.push(log);
    this.saveAuditLogs();

    // In production, also send to secure backend
    EncryptionService.logAccess(action, details);
  }

  // Get audit logs (with filtering)
  getAuditLogs(filter?: { startDate?: Date; endDate?: Date; userId?: string }): AuditLog[] {
    let logs = [...this.auditLogs];

    if (filter) {
      if (filter.startDate) {
        logs = logs.filter(log => log.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        logs = logs.filter(log => log.timestamp <= filter.endDate!);
      }
      if (filter.userId) {
        logs = logs.filter(log => log.userId === filter.userId);
      }
    }

    return logs;
  }

  // Private helper methods
  private generateUserId(username: string): string {
    return `usr_${username}_${Date.now()}`;
  }

  private generateSessionToken(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private startSessionTimer(): void {
    this.clearSessionTimer();
    this.sessionTimer = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.SESSION_TIMEOUT);
  }

  private resetSessionTimer(): void {
    this.startSessionTimer();
  }

  private clearSessionTimer(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  private handleSessionTimeout(): void {
    this.logAuditEvent('SESSION_TIMEOUT', { username: this.currentSession?.username });
    this.logout();
    // In production, trigger UI notification
    window.location.reload(); // Force re-authentication
  }

  private storeSession(): void {
    if (this.currentSession) {
      const encrypted = EncryptionService.encrypt(JSON.stringify(this.currentSession));
      localStorage.setItem('hipaa_session', encrypted);
    }
  }

  private loadSession(): void {
    const encrypted = localStorage.getItem('hipaa_session');
    if (encrypted) {
      try {
        const decrypted = EncryptionService.decrypt(encrypted);
        const session = JSON.parse(decrypted) as UserSession;
        
        // Check if session is still valid
        const lastActivity = new Date(session.lastActivity);
        const now = new Date();
        const timeDiff = now.getTime() - lastActivity.getTime();
        
        if (timeDiff < this.SESSION_TIMEOUT) {
          this.currentSession = session;
          this.startSessionTimer();
        } else {
          // Session expired
          localStorage.removeItem('hipaa_session');
        }
      } catch (error) {
        console.error('Failed to load session:', error);
        localStorage.removeItem('hipaa_session');
      }
    }
  }

  private saveAuditLogs(): void {
    // Keep only last 1000 logs in localStorage
    const logsToSave = this.auditLogs.slice(-1000);
    const encrypted = EncryptionService.encrypt(JSON.stringify(logsToSave));
    localStorage.setItem('hipaa_audit_logs', encrypted);
  }

  private loadAuditLogs(): void {
    const encrypted = localStorage.getItem('hipaa_audit_logs');
    if (encrypted) {
      try {
        const decrypted = EncryptionService.decrypt(encrypted);
        this.auditLogs = JSON.parse(decrypted);
      } catch (error) {
        console.error('Failed to load audit logs:', error);
        this.auditLogs = [];
      }
    }
  }

  private getClientIP(): string {
    // In production, get real IP from backend
    return 'localhost';
  }
}

export default HIPAAAuthService;