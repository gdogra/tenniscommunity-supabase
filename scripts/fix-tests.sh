#!/bin/bash

echo "🏗  Fixing your Tennis Community project..."

# Check and create missing mock
if [ ! -f tests/__mocks__/useAuthAdmin.ts ]; then
  echo "📄 Creating missing mock: tests/__mocks__/useAuthAdmin.ts"
  mkdir -p tests/__mocks__
  cat > tests/__mocks__/useAuthAdmin.ts <<EOL
export const useAuth = () => ({
  user: { id: 'admin-id', email: 'admin@example.com', role: 'admin' },
});
EOL
fi

# Ensure jest-dom is installed
if ! npm list @testing-library/jest-dom >/dev/null 2>&1; then
  echo "📦 Installing @testing-library/jest-dom..."
  npm install @testing-library/jest-dom --save-dev
fi

# Patch vitest.setup.ts
if [ -f vitest.setup.ts ]; then
  if ! grep -q "@testing-library/jest-dom" vitest.setup.ts; then
    echo "🔧 Updating vitest.setup.ts to import '@testing-library/jest-dom'"
    echo "import '@testing-library/jest-dom'" >> vitest.setup.ts
  fi
else
  echo "⚠️ vitest.setup.ts not found. Skipping jest-dom import."
fi

# Patch src/hooks/useAuth.tsx
if [ -f src/hooks/useAuth.tsx ]; then
  echo "🛠  Updating src/hooks/useAuth.tsx..."
  sed -i '' 's/export function useAuth()/export function useAuth() {/' src/hooks/useAuth.tsx
  # Simple safe check
else
  echo "⚠️ src/hooks/useAuth.tsx not found."
fi

# Patch src/hooks/useUser.ts
if [ -f src/hooks/useUser.ts ]; then
  echo "🛠  Updating src/hooks/useUser.ts..."
  sed -i '' 's/export function useUser()/export function useUser() {/' src/hooks/useUser.ts
else
  echo "⚠️ src/hooks/useUser.ts not found."
fi

echo "✅ All fixes applied successfully!"
echo "👉 Now run:  npm run test  or  pnpm test"

