export interface TaskProps {
  id?: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  label: string;
}
