export const defaultConfig = {
  showCloseButton: false,
  timeout: 5000
};

export interface ToasterParams {
  type: string;
  title: string;
  body: string;
  clear?: boolean;
  timeout?: number | null;
}
