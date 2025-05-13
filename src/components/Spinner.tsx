'use client';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-full w-full py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}

