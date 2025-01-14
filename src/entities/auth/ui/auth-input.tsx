import React, { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | FieldError;
  type?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ error, type = "text", ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div>
        <div className="relative">
          <input
            ref={ref}
            {...props}
            type={
              type === "password" && !isPasswordVisible ? "password" : "text"
            }
            className={`border p-2 w-full pr-10 rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute text-gray-500 transform -translate-y-1/2 right-2 top-1/2"
              style={{ zIndex: 1 }} // 버튼이 다른 요소 뒤에 가려지지 않도록 z-index 추가
            >
              {isPasswordVisible ? "숨기기" : "보기"}
            </button>
          )}
        </div>
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
