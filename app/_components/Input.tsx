interface InputProps {
  id: string;
  autoComplete: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  autoComplete,
  placeholder,
  type,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      autoComplete={autoComplete}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="mx-8  mb-6 h-16 w-96 rounded-md border-2 border-gray-300 text-3xl"
    />
  );
}
