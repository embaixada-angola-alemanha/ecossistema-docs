// Centralized role definitions for all subsystems
export enum EcossistemaRole {
  // SGC roles
  SGC_ADMIN = 'sgc-admin',
  SGC_CONSUL = 'sgc-consul',
  SGC_OFFICER = 'sgc-officer',
  SGC_VIEWER = 'sgc-viewer',

  // GPJ roles
  GPJ_ADMIN = 'gpj-admin',
  GPJ_PM = 'gpj-pm',
  GPJ_DEV = 'gpj-dev',
  GPJ_VIEWER = 'gpj-viewer',

  // WN roles
  WN_ADMIN = 'wn-admin',
  WN_EDITOR = 'wn-editor',
  WN_JOURNALIST = 'wn-journalist',
  WN_REVIEWER = 'wn-reviewer',

  // SI roles (minimal)
  SI_ADMIN = 'si-admin',
  SI_EDITOR = 'si-editor',

  // System-wide
  SUPER_ADMIN = 'super-admin'
}
