# Library Utilities

This directory contains reusable utility functions and helpers for the application.

## 📁 Structure

Following Next.js App Router conventions, the `lib/` directory contains:
- Business logic utilities
- Data persistence helpers
- Shared functions used across components

## 📄 Files

### `promptStorage.ts`

A type-safe localStorage utility for managing saved voiceover prompts.

#### Features
- ✅ Type-safe operations
- ✅ Error handling with fallbacks
- ✅ SSR-safe (checks for window object)
- ✅ Simple, clean API

#### API Reference

```typescript
import { promptStorage } from '@/app/lib/promptStorage';

// Load all saved prompts
const prompts = promptStorage.load();
// Returns: string[]

// Save prompts array
const success = promptStorage.save(['prompt1', 'prompt2']);
// Returns: boolean

// Add a single prompt
const added = promptStorage.add('New prompt text');
// Returns: boolean (false if already exists or empty)

// Remove prompt by index
const removed = promptStorage.remove(0);
// Returns: boolean

// Clear all prompts
const cleared = promptStorage.clear();
// Returns: boolean

// Check if prompt exists
const exists = promptStorage.exists('Some prompt');
// Returns: boolean

// Get count of saved prompts
const count = promptStorage.count();
// Returns: number
```

#### Usage Example

```typescript
'use client';

import { useEffect, useState } from 'react';
import { promptStorage } from '@/app/lib/promptStorage';

export function MyComponent() {
  const [prompts, setPrompts] = useState<string[]>([]);

  // Load on mount
  useEffect(() => {
    const saved = promptStorage.load();
    setPrompts(saved);
  }, []);

  const handleSave = (text: string) => {
    const success = promptStorage.add(text);
    if (success) {
      setPrompts(promptStorage.load());
    }
  };

  const handleDelete = (index: number) => {
    promptStorage.remove(index);
    setPrompts(promptStorage.load());
  };

  return (
    // Your component JSX
  );
}
```

#### Error Handling

All methods include try-catch blocks and return sensible defaults:
- `load()` returns `[]` on error
- Other methods return `false` on error
- Errors are logged to console for debugging

#### SSR Compatibility

The utility checks for `window` object before accessing localStorage:
```typescript
if (typeof window === 'undefined') return [];
```

This prevents errors during server-side rendering.

## 🔒 Storage Key

Prompts are stored under the key: `'voiceover-saved-prompts'`

## 📦 Why Separate Directory?

Following Next.js best practices:
1. **Separation of Concerns** - Business logic separated from UI
2. **Reusability** - Can be used by any component
3. **Testability** - Easy to unit test in isolation
4. **Maintainability** - Changes to storage logic are centralized
5. **Type Safety** - Single source of truth for storage operations

## 🧪 Testing

```typescript
// Example test cases
describe('promptStorage', () => {
  it('should save and load prompts', () => {
    promptStorage.save(['test1', 'test2']);
    const loaded = promptStorage.load();
    expect(loaded).toEqual(['test1', 'test2']);
  });

  it('should not add duplicate prompts', () => {
    promptStorage.clear();
    promptStorage.add('test');
    const added = promptStorage.add('test');
    expect(added).toBe(false);
  });
});
```

## 🚀 Future Enhancements

Potential additions to this directory:
- `voiceStorage.ts` - Save voice preferences
- `settingsStorage.ts` - App settings persistence
- `exportUtils.ts` - Export/import functionality
- `validation.ts` - Input validation helpers
