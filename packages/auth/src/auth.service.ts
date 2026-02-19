import { Injectable, inject, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserProfile } from './user-profile';
import { EcossistemaRole } from './roles';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly keycloak = inject(KeycloakService);

  readonly isAuthenticated = signal(false);
  readonly userProfile = signal<UserProfile | null>(null);

  async init(): Promise<void> {
    const loggedIn = await this.keycloak.isLoggedIn();
    this.isAuthenticated.set(loggedIn);
    if (loggedIn) {
      await this.loadProfile();
    }
  }

  async login(): Promise<void> {
    await this.keycloak.login();
  }

  async logout(redirectUri?: string): Promise<void> {
    await this.keycloak.logout(redirectUri);
    this.isAuthenticated.set(false);
    this.userProfile.set(null);
  }

  async getToken(): Promise<string> {
    return await this.keycloak.getToken();
  }

  hasRole(role: EcossistemaRole | string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  hasAnyRole(...roles: (EcossistemaRole | string)[]): boolean {
    return roles.some(role => this.keycloak.isUserInRole(role));
  }

  isAdmin(): boolean {
    return this.hasRole(EcossistemaRole.SUPER_ADMIN);
  }

  private async loadProfile(): Promise<void> {
    try {
      const kp = await this.keycloak.loadUserProfile();
      const roles = this.keycloak.getUserRoles(true);
      const token = await this.keycloak.getToken();

      this.userProfile.set({
        id: kp.id || '',
        username: kp.username || '',
        email: kp.email || '',
        firstName: kp.firstName || '',
        lastName: kp.lastName || '',
        fullName: `${kp.firstName || ''} ${kp.lastName || ''}`.trim(),
        roles,
        token,
        keycloakId: kp.id || ''
      });
    } catch (e) {
      console.error('Failed to load user profile:', e);
    }
  }
}
