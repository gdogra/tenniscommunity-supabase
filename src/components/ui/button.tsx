// src/components/ui/button.tsx
export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}

