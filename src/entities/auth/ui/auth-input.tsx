import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | FieldError;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={`border p-2 w-full ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
