
export interface VoiceProfile {
  name: string;
  id: string;
  description: string;
  gender: 'male' | 'female';
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR'
}
