import React from "react";
import { Button as ShadcnButton } from "./ui/button";

function Button({ text, className, link, variant = "default", size = "lg", ...props }) {
  const baseClasses = "font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus-ring";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium hover:shadow-glow",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "text-primary hover:bg-primary/10",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-6 text-base",
    lg: "h-12 px-8 text-lg",
    xl: "h-14 px-10 text-xl",
  };

  const buttonContent = (
    <ShadcnButton
      variant={variant}
      size={size}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`}
      {...props}
    >
      {text}
    </ShadcnButton>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}

export default Button;
