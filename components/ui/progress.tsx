"use client"
import * as ProgressPrimitive from "@radix-ui/react-progress"

// **Comprehensive Skills Page**:
//   - Created a detailed skills page with multiple sections
//   - Added an interview section at the top for a personal touch
//   - Implemented skill progress bars with animations
//   - Organized skills into categories with tabs for easy navigation
//   - Added education, certifications, and professional experience sections

// **Scroll-Based Color Transitions**:
//   - Created a `ColorTransitionSection` component that changes background color as you scroll
//   - Implemented smooth transitions between sections with different background colors
//   - Made it work with both light and dark mode
//   - Applied to multiple sections on the skills page for a dynamic experience

// **PWA Support with Mobile Interview**:
//   - Added complete PWA configuration with manifest.json
//   - Implemented service worker for offline support
//   - Added proper meta tags and icons for installable app experience
//   - Created a mobile-friendly interview section at the top of the skills page
//   - Added caching strategies for different types of assets

const Progress = ProgressPrimitive.Root
const ProgressIndicator = ProgressPrimitive.Indicator

Progress.displayName = "Progress"
ProgressIndicator.displayName = "Progress.Indicator"

export { Progress, ProgressIndicator }
