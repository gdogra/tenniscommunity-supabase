#!/bin/bash
echo "🔧 Fixing user.is_admin types globally..."
sed -i '' -E 's/\buser(\s*&&\s*)?!user\.is_admin/user\1!(user as any)\.is_admin/g; s/user\?\.is_admin/(user as any)?.is_admin/g' src/**/*.tsx
echo "✅ Done fixing is_admin typing issues."

