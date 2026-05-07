import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  onEnter?: () => void;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  onEnter,
}: TextInputProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "var(--color-text-secondary)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-text)",
    fontSize: "13px",
    padding: "9px 12px",
    outline: "none",
    transition: "border-color var(--transition), box-shadow var(--transition)",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) onEnter();
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent)";
          e.currentTarget.style.boxShadow = "0 0 0 2px var(--color-accent-subtle)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
