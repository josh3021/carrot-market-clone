import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  placeholder,
  register,
  required = false,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        className="mt-1 shadow-sm w-full focus:ring-fuchsia-700 rounded-md border-gray-300 focus:border-fuchsia-700"
        rows={4}
        placeholder={placeholder}
        {...register}
        required={required}
        {...rest}
      />
    </div>
  );
}
