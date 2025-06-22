export interface SnackbarProps {
  text: string;
  open: boolean;
  onClose: (close: boolean) => void;
}