export interface LocalStorageService {
  get: <T = any>(key: string) => T;
  isExist: (key: string) => boolean;
  remove: (key: string) => void;
  reset: () => void;
  set: (key: string, value: any) => void;
}
