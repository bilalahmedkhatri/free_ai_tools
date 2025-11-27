# Loading Skeleton System

This app includes a comprehensive loading skeleton system that provides smooth loading states matching the app's coral/pink theme.

## Components

### LoadingSkeleton Component

Located at: `app/components/LoadingSkeleton.tsx`

**Variants Available:**

1. **`textInput`** - Loading state for the text input area
   - Shows label skeletons
   - Textarea placeholder
   - Button skeletons

2. **`voiceDropdown`** - Loading state for voice selection dropdown
   - Label skeleton
   - Dropdown field skeleton

3. **`voiceControls`** - Loading state for voice control sliders
   - Title with icon skeleton
   - Voice dropdown skeleton
   - Three slider controls (Speed, Pitch, Volume)
   - Labels and value displays

4. **`audioPlayer`** - Loading state for audio player
   - Waveform canvas skeleton
   - Play/pause button skeleton
   - Progress bar skeleton
   - Time display skeletons
   - Control button skeletons

5. **`savedPrompts`** - Loading state for saved prompts section
   - Header and badge skeleton
   - Search bar skeleton
   - Grid of 6 prompt card skeletons

6. **`full`** (default) - Complete page loading skeleton
   - Combines all variants above
   - Shows entire generator section in loading state

### PageLoading Component

Located at: `app/components/PageLoading.tsx`

Full-page loading skeleton including:
- Hero section with title and feature pills
- Main content area with full generator skeleton
- Matches the complete page layout

## Usage Examples

### In a Component

```tsx
import LoadingSkeleton from './components/LoadingSkeleton';

function MyComponent({ isLoading }) {
  if (isLoading) {
    return <LoadingSkeleton variant="voiceControls" />;
  }
  
  return <ActualContent />;
}
```

### With Suspense (React 18+)

```tsx
import { Suspense } from 'react';
import LoadingSkeleton from './components/LoadingSkeleton';

<Suspense fallback={<LoadingSkeleton variant="savedPrompts" />}>
  <LazyComponent />
</Suspense>
```

### Full Page Loading

```tsx
import PageLoading from './components/PageLoading';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  
  if (isInitializing) {
    return <PageLoading />;
  }
  
  return <MainApp />;
}
```

## Current Implementation

The loading skeletons are currently used in:

1. **VoiceDropdown** - Shows `voiceDropdown` skeleton when `loading` prop is true
2. **SavedPrompts** - Shows `savedPrompts` skeleton in Suspense fallback (lazy-loaded component)

## Styling

All skeletons feature:
- **Shimmer animation** - Smooth left-to-right shimmer effect (1.5s duration)
- **Theme colors** - Uses design system gray colors (#e5e7eb, #f3f4f6)
- **Responsive sizing** - Matches actual component dimensions
- **Smooth animations** - CSS-based with cubic-bezier easing

## Animation

The shimmer effect is achieved with:
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

Applied to a gradient overlay:
```tsx
background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)'
```

## Customization

To add new skeleton variants:

1. Create a new skeleton component function (e.g., `MyComponentSkeleton`)
2. Add the variant to the `LoadingSkeletonProps` type
3. Add the render case in the `renderSkeleton()` switch statement
4. Use the `ShimmerBox` helper for consistent styling

Example:
```tsx
const MyComponentSkeleton = () => (
  <div>
    <ShimmerBox width="200px" height="40px" />
    <ShimmerBox width="100%" height="120px" marginBottom={ds.spacing.md} />
  </div>
);

// In renderSkeleton():
case 'myComponent':
  return <MyComponentSkeleton />;
```

## Performance Considerations

- Skeletons are lightweight (only CSS and divs)
- No images or external resources
- CSS animations are GPU-accelerated
- Minimal re-renders with proper memoization

## Accessibility

- Skeletons provide visual feedback during loading
- Screen readers should announce loading states separately
- Consider adding `aria-busy="true"` and `aria-live="polite"` to parent containers

## Best Practices

1. **Match dimensions** - Skeleton should closely match the actual content size
2. **Use appropriate variants** - Choose the variant that best matches what's loading
3. **Show immediately** - Don't delay showing the skeleton
4. **Transition smoothly** - Content should replace skeleton without jarring layout shifts
5. **Timeout handling** - Show error state if loading takes too long

## Future Enhancements

Potential improvements:
- [ ] Add pulse animation variant (alternative to shimmer)
- [ ] Make shimmer speed configurable
- [ ] Add dark mode support
- [ ] Create micro-animations for content fade-in after loading
- [ ] Add skeleton for API toggle component
- [ ] Add skeleton for generation status messages
