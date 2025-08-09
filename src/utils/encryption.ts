// Basic encryption utilities for HIPAA compliance
// For production, consider using Web Crypto API or a library like crypto-js

export class EncryptionService {
  private static readonly STORAGE_KEY = 'nursing_handoff_encrypted';
  
  // Simple encryption for demo - in production use proper encryption
  static encrypt(data: string): string {
    // In production, use Web Crypto API or crypto-js
    // This is a placeholder - DO NOT use for real patient data
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      // Use Web Crypto API in production
      return btoa(encodeURIComponent(data));
    }
    return btoa(data);
  }
  
  static decrypt(encryptedData: string): string {
    try {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
        return decodeURIComponent(atob(encryptedData));
      }
      return atob(encryptedData);
    } catch {
      return '';
    }
  }
  
  // Session timeout for HIPAA compliance (15 minutes of inactivity)
  static initSessionTimeout(callback: () => void, timeout: number = 15 * 60 * 1000) {
    let timer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(callback, timeout);
    };
    
    // Reset timer on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });
    
    resetTimer();
  }
  
  // Audit logging for HIPAA
  static logAccess(action: string, details?: any) {
    const log = {
      timestamp: new Date().toISOString(),
      action,
      details,
      sessionId: this.getSessionId(),
      userAgent: navigator.userAgent
    };
    
    // In production, send to secure audit log server
    console.log('[AUDIT]', log);
    
    // Store locally for now (in production, send to secure server)
    const logs = this.getAuditLogs();
    logs.push(log);
    
    // Keep only last 100 logs locally
    if (logs.length > 100) {
      logs.shift();
    }
    
    localStorage.setItem('audit_logs', this.encrypt(JSON.stringify(logs)));
  }
  
  static getAuditLogs(): any[] {
    try {
      const encrypted = localStorage.getItem('audit_logs');
      if (encrypted) {
        return JSON.parse(this.decrypt(encrypted));
      }
    } catch {
      // Handle error
    }
    return [];
  }
  
  static getSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }
  
  // Clear all sensitive data
  static clearAllData() {
    localStorage.clear();
    sessionStorage.clear();
  }
}