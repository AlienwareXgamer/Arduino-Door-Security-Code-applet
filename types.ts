
export type LockState = 'locked' | 'unlocked';

export interface EventLogEntry {
  timestamp: Date;
  message: string;
}
