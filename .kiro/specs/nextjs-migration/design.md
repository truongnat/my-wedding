# Design Document: Next.js Migration

## Overview

This design document outlines the architecture and implementation strategy for migrating a React/Vite wedding website to Next.js 16 (latest) with the App Router. The migration will transform the single-page application into a modern, performant Next.js application with improved SEO, caching, and code organization while preserving all existing functionality and visual design.

The migration strategy focuses on:
- Leveraging React Server Components for non-interactive content
- Implementing proper client/server component boundaries
- Optimizing images, fonts, and assets
- Establishing comprehensive SEO metadata
- Creating clean, maintainable code architecture
- Implementing effective caching strategies

## Architecture

### Application Structure

```
wedding-website/
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Home page (server component)
│   ├── error.tsx                  # Error boundary
│   ├── loading.tsx                # Loading state
│   ├── not-found.tsx              # 404 page
│   ├── api/                       # API routes
│   │   └── rsvp/
│   │       └── route.ts           # RSVP submission handler
│   ├── sitemap.ts                 # Sitemap generation
│   └── robots.ts                  # Robots.txt generation
├── components/
│   ├── server/                    # Server components (kebab-case)
│   │   ├── about-section.tsx
│   │   ├── wedding-details.tsx
│   │   ├── timeline.tsx
│   │   ├── footer.tsx
│   │   └── venue-map.tsx
│   ├── client/                    # Client components (kebab-case)
│   │   ├── navigation.client.tsx
│   │   ├── hero-section.client.tsx
│   │   ├── countdown-timer.client.tsx
│   │   ├── gallery.client.tsx
│   │   ├── video-section.client.tsx
│   │   ├── guest-messages.client.tsx
│   │   ├── rsvp-section.client.tsx
│   │   └── music-player.client.tsx
│   └── ui/                        # Shared UI components (kebab-case)
│       └── [existing shadcn components]
├── lib/
│   ├── utils.ts                   # Utility functions
│   ├── constants.ts               # App constants
│   ├── metadata.ts                # SEO metadata helpers
│   ├── supabase/                  # Supabase configuration
│   │   ├── client.ts              # Supabase client
│   │   └── server.ts              # Supabase server client
│   └── tanstack/                  # TanStack Query setup
│       └── query-client.ts        # Query client configuration
├── public/
│   ├── images/                    # Optimized images
│   └── fonts/                     # Font files
├── styles/
│   └── globals.css                # Global styles
├── types/
│   ├── index.ts                   # TypeScript types
│   ├── database.ts                # Supabase database types
│   └── supabase.ts                # Supabase types
├── biome.json                     # Biome configuration
├── bun.lockb                      # Bun lock file
├── next.config.ts                 # Next.js configuration (TypeScript)
├── package.json                   # Package configuration
└── tsconfig.json                  # TypeScript configuration
```

### Technology Stack

**Core Technologies:**
- **Next.js 16**: Latest version with App Router
- **React 19**: Latest React with Server Components
- **TypeScript**: Strict mode enabled
- **Bun**: Package manager and runtime
- **Biome**: Fast linting and formatting

**Data & Backend:**
- **Supabase**: PostgreSQL database, authentication, real-time subscriptions
- **TanStack Query**: Client-side data fetching, caching, and synchronization

**Styling:**
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible components

**Animation:**
- **Framer Motion**: Animation library for React

### Component Architecture

**Server Components (Default):**
- Static content sections (About, Details, Timeline, Footer)
- SEO-critical content that doesn't require interactivity
- Venue map (static display)

**Client Components (Explicit "use client"):**
- Navigation with scroll behavior
- Hero section with animations
- Countdown timer with real-time updates
- Gallery with interactive carousel
- Video section with player controls
- Guest messages with form interactions
- RSVP form with validation
- Music player with audio controls

### Routing Strategy

The application will use a single-page layout with anchor-based navigation:
- All sections render on the home page (`app/page.tsx`)
- Navigation uses smooth scrolling to section IDs
- No additional routes needed for the MVP
- API routes handle form submissions

## Components and Interfaces

### Core Page Component

```typescript
// app/page.tsx (Server Component)
import { Metadata } from 'next';
import { Navigation } from '@/components/client/Navigation.client';
import { HeroSection } from '@/components/client/HeroSection.client';
import { CountdownTimer } from '@/components/client/CountdownTimer.client';
import { AboutSection } from '@/components/server/AboutSection';
// ... other imports

export const metadata: Metadata = {
  // SEO metadata
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CountdownTimer />
      <AboutSection />
      {/* ... other sections */}
    </div>
  );
}
```

### Client Component Pattern

```typescript
// components/client/CountdownTimer.client.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <motion.section>
      {/* Component JSX */}
    </motion.section>
  );
}
```

### Server Component Pattern

```typescript
// components/server/AboutSection.tsx
import { ImageWithOptimization } from '@/components/ui/ImageWithOptimization';

export function AboutSection() {
  return (
    <section id="story" className="py-20">
      {/* Static content */}
    </section>
  );
}
```

### Form Handling with Server Actions

```typescript
// app/actions/rsvp.ts
'use server';

import { z } from 'zod';

const rsvpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  attending: z.boolean(),
  guests: z.number().min(0).max(10),
});

export async function submitRSVP(formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    attending: formData.get('attending') === 'true',
    guests: Number(formData.get('guests')),
  };
  
  const validated = rsvpSchema.parse(data);
  
  // Process RSVP (save to database, send email, etc.)
  
  return { success: true };
}
```

## Data Models

### RSVP Data Model

```typescript
interface RSVPSubmission {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  dietaryRestrictions?: string;
  message?: string;
  submittedAt: Date;
}
```

### Guest Message Model

```typescript
interface GuestMessage {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
  approved: boolean;
}
```

### Wedding Event Model

```typescript
interface WeddingEvent {
  title: string;
  date: Date;
  location: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
}
```

### Countdown Timer Model

```typescript
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```



## Telegram Integration

### Overview

Guest messages will be integrated with Telegram to provide real-time notifications to the wedding couple. When a guest submits a message through the website, it will be:
1. Saved to the Supabase database
2. Sent to a configured Telegram group via the Telegram Bot API
3. Messages can be approved/managed through Telegram
4. Approved messages sync back to display on the website

### Telegram Bot Setup

**Prerequisites:**
1. Create a Telegram bot using [@BotFather](https://t.me/botfather)
2. Get the bot token
3. Add the bot to a Telegram group
4. Get the group chat ID

**Environment Variables:**
```env
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

### Telegram API Integration

```typescript
// lib/telegram/client.ts
interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
}

export async function sendTelegramMessage(
  guestName: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram configuration missing');
    return { success: false, error: 'Telegram not configured' };
  }

  const telegramMessage: TelegramMessage = {
    chat_id: chatId,
    text: `💌 New Guest Message\n\n👤 From: ${guestName}\n\n📝 Message:\n${message}`,
    parse_mode: 'HTML',
  };

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramMessage),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      return { success: false, error: error.description };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return { success: false, error: 'Network error' };
  }
}
```

### Guest Message Submission with Telegram

```typescript
// app/api/guest-messages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { sendTelegramMessage } from '@/lib/telegram/client';
import { z } from 'zod';

const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(1, 'Message is required').max(500, 'Message too long'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = messageSchema.parse(body);

    // Save to database first
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('guest_messages')
      .insert({
        name: validated.name,
        message: validated.message,
        approved: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }

    // Send to Telegram (non-blocking)
    sendTelegramMessage(validated.name, validated.message)
      .then((result) => {
        if (!result.success) {
          console.error('Telegram notification failed:', result.error);
        }
      })
      .catch((err) => {
        console.error('Telegram notification error:', err);
      });

    return NextResponse.json(
      { success: true, message: 'Message submitted successfully', data },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Telegram Webhook (Optional)

For receiving updates from Telegram (e.g., approving messages):

```typescript
// app/api/telegram/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

interface TelegramUpdate {
  message?: {
    message_id: number;
    text?: string;
    chat: {
      id: number;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const update: TelegramUpdate = await request.json();

    // Handle commands like /approve <message_id>
    if (update.message?.text?.startsWith('/approve')) {
      const messageId = update.message.text.split(' ')[1];
      
      if (messageId) {
        const supabase = await createServerSupabaseClient();
        await supabase
          .from('guest_messages')
          .update({ approved: true })
          .eq('id', messageId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
```

## Supabase Integration

### Database Schema

```sql
-- RSVP submissions table
CREATE TABLE rsvp_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INTEGER NOT NULL DEFAULT 0,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest messages table
CREATE TABLE guest_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_messages ENABLE ROW LEVEL SECURITY;

-- Policies for guest messages (read approved only)
CREATE POLICY "Anyone can read approved messages"
  ON guest_messages FOR SELECT
  USING (approved = true);

-- Policies for RSVP (insert only)
CREATE POLICY "Anyone can insert RSVP"
  ON rsvp_submissions FOR INSERT
  WITH CHECK (true);
```

### Supabase Client Configuration

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
```

## TanStack Query Integration

### Query Client Setup

```typescript
// lib/tanstack/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
```

### Query Provider Setup

```typescript
// app/providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/lib/tanstack/query-client';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Example Query Hook

```typescript
// hooks/use-guest-messages.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { GuestMessage } from '@/types';

export function useGuestMessages() {
  const supabase = createClient();

  return useQuery({
    queryKey: ['guest-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guest_messages')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as GuestMessage[];
    },
  });
}
```

### Example Mutation Hook

```typescript
// hooks/use-submit-rsvp.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { RSVPSubmission } from '@/types';

export function useSubmitRSVP() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<RSVPSubmission, 'id' | 'created_at' | 'updated_at'>) => {
      const { data: result, error } = await supabase
        .from('rsvp_submissions')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rsvp-submissions'] });
    },
  });
}
```

## Biome Configuration

### biome.json

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": [
      "node_modules",
      ".next",
      "out",
      "build",
      "dist",
      ".contentlayer",
      "*.config.js"
    ]
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noExtraBooleanCast": "error",
        "noMultipleSpacesInRegularExpressionLiterals": "error",
        "noUselessCatch": "error",
        "noUselessConstructor": "error",
        "noUselessLabel": "error",
        "noUselessRename": "error",
        "noUselessSwitchCase": "error",
        "noWith": "error"
      },
      "correctness": {
        "noConstAssign": "error",
        "noConstantCondition": "error",
        "noEmptyPattern": "error",
        "noGlobalObjectCalls": "error",
        "noInvalidConstructorSuper": "error",
        "noNewSymbol": "error",
        "noNonoctalDecimalEscape": "error",
        "noPrecisionLoss": "error",
        "noSelfAssign": "error",
        "noSetterReturn": "error",
        "noSwitchDeclarations": "error",
        "noUndeclaredVariables": "error",
        "noUnreachable": "error",
        "noUnreachableSuper": "error",
        "noUnsafeFinally": "error",
        "noUnsafeOptionalChaining": "error",
        "noUnusedLabels": "error",
        "noUnusedVariables": "error",
        "useIsNan": "error",
        "useValidForDirection": "error",
        "useYield": "error"
      },
      "style": {
        "noNamespace": "error",
        "useAsConstAssertion": "error",
        "useBlockStatements": "off",
        "useConsistentArrayType": "error",
        "useForOf": "error",
        "useShorthandFunctionType": "error"
      },
      "suspicious": {
        "noAsyncPromiseExecutor": "error",
        "noCatchAssign": "error",
        "noClassAssign": "error",
        "noCompareNegZero": "error",
        "noControlCharactersInRegex": "error",
        "noDebugger": "error",
        "noDoubleEquals": "error",
        "noDuplicateCase": "error",
        "noDuplicateClassMembers": "error",
        "noDuplicateObjectKeys": "error",
        "noDuplicateParameters": "error",
        "noEmptyBlockStatements": "error",
        "noExplicitAny": "warn",
        "noExtraNonNullAssertion": "error",
        "noFallthroughSwitchClause": "error",
        "noFunctionAssign": "error",
        "noGlobalAssign": "error",
        "noImportAssign": "error",
        "noMisleadingCharacterClass": "error",
        "noPrototypeBuiltins": "error",
        "noRedeclare": "error",
        "noShadowRestrictedNames": "error",
        "noUnsafeNegation": "error",
        "useGetterReturn": "error",
        "useValidTypeof": "error"
      }
    }
  },
  "javascript": {
    "formatter": {
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "trailingCommas": "es5",
      "semicolons": "always",
      "arrowParentheses": "always",
      "bracketSpacing": true,
      "bracketSameLine": false,
      "quoteStyle": "single",
      "attributePosition": "auto"
    }
  }
}
```

## File Naming Conventions

All files MUST follow kebab-case naming:

**Components:**
- ✅ `hero-section.client.tsx`
- ✅ `about-section.tsx`
- ✅ `countdown-timer.client.tsx`
- ❌ `HeroSection.tsx`
- ❌ `AboutSection.tsx`

**Utilities:**
- ✅ `format-date.ts`
- ✅ `calculate-time-remaining.ts`
- ❌ `formatDate.ts`
- ❌ `calculateTimeRemaining.ts`

**Types:**
- ✅ `database.ts`
- ✅ `supabase.ts`
- ✅ `rsvp-types.ts`

**Hooks:**
- ✅ `use-guest-messages.ts`
- ✅ `use-submit-rsvp.ts`
- ❌ `useGuestMessages.ts`

## Package Management with Bun

### Installation Commands

```bash
# Install dependencies
bun install

# Add new package
bun add <package-name>

# Add dev dependency
bun add -d <package-name>

# Remove package
bun remove <package-name>

# Run scripts
bun run dev
bun run build
bun run start
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "type-check": "tsc --noEmit",
    "db:types": "supabase gen types typescript --project-id <project-id> > types/database.ts"
  }
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, most of the acceptance criteria are configuration and structural requirements that are best validated through examples rather than universal properties. However, we can identify a few key properties:

### Property 1: Image Alt Text Completeness
*For any* Image component in the application, the component should have a non-empty alt attribute defined.
**Validates: Requirements 7.2**

### Property 2: Countdown Timer Accuracy
*For any* future date, the countdown timer calculation should return non-negative values for days, hours, minutes, and seconds that correctly represent the time remaining.
**Validates: Requirements 5.2**

### Property 3: Hydration Consistency
*For any* component that renders on both server and client, the initial client render should produce the same output as the server render to prevent hydration mismatches.
**Validates: Requirements 10.5**

## Error Handling

### Client-Side Error Handling

**Error Boundaries:**
- Root error boundary in `app/error.tsx` catches all unhandled errors
- Displays user-friendly error message with option to retry
- Logs errors to console in development, sends to monitoring in production

**Form Validation:**
- Client-side validation using Zod schemas
- Real-time validation feedback
- Server-side validation as backup

**Image Loading Errors:**
- Fallback images for failed loads
- Graceful degradation for missing images

### Server-Side Error Handling

**API Route Errors:**
- Try-catch blocks around all async operations
- Structured error responses with appropriate HTTP status codes
- Error logging for debugging

**Database Errors:**
- Supabase error handling with user-friendly messages
- Retry logic for transient failures
- Fallback to cached data when possible

**Server Action Errors:**
- Validation errors returned to client
- Database errors handled gracefully
- Transaction rollback on failures

## Testing Strategy

### Unit Testing

**Framework:** Vitest with React Testing Library

**Coverage Areas:**
- Utility functions (time calculations, formatting)
- Form validation logic
- Data transformation functions
- Component rendering (smoke tests)

**Example Tests:**
```typescript
// lib/utils.test.ts
describe('calculateTimeRemaining', () => {
  it('should calculate correct time for future date', () => {
    const future = new Date('2025-12-31');
    const result = calculateTimeRemaining(future);
    expect(result.days).toBeGreaterThan(0);
  });
});
```

### Property-Based Testing

**Framework:** fast-check

**Property Tests:**

1. **Image Alt Text Property** (Property 1)
   - Generate random component trees
   - Verify all Image components have alt text
   - **Feature: nextjs-migration, Property 1: Image Alt Text Completeness**

2. **Countdown Timer Property** (Property 2)
   - Generate random future dates
   - Verify countdown calculations are accurate
   - Verify no negative values
   - **Feature: nextjs-migration, Property 2: Countdown Timer Accuracy**

3. **Hydration Consistency Property** (Property 3)
   - Render components on server and client
   - Verify outputs match
   - **Feature: nextjs-migration, Property 3: Hydration Consistency**

### Integration Testing

**Framework:** Playwright

**Test Scenarios:**
- RSVP form submission end-to-end
- Navigation between sections
- Image gallery interactions
- Music player controls

### Configuration Testing

**Structural Tests:**
- Verify Next.js 16 is installed
- Verify Bun is configured
- Verify Biome config exists
- Verify TypeScript strict mode
- Verify kebab-case file naming

## Development Tooling

### Package Manager: Bun

**Installation:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Key Commands:**
```bash
bun install          # Install dependencies
bun run dev          # Start dev server
bun run build        # Build for production
bun run test         # Run tests
```

**Benefits:**
- 10-100x faster than npm/yarn
- Built-in TypeScript support
- Native test runner
- Compatible with Node.js packages

### Linting and Formatting: Biome

**Configuration:** `biome.json`

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error"
      },
      "style": {
        "useConst": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5"
    }
  }
}
```

**Commands:**
```bash
bun biome check .           # Check all files
bun biome check --write .   # Fix issues
bun biome format --write .  # Format code
```

### File Naming Convention: kebab-case

**Rules:**
- All files use kebab-case: `hero-section.tsx`, `countdown-timer.tsx`
- Client components: `navigation.client.tsx`
- Server components: `about-section.tsx` (no suffix needed)
- Test files: `utils.test.ts`
- Type files: `rsvp-types.ts`

**Examples:**
```
✅ hero-section.tsx
✅ countdown-timer.client.tsx
✅ wedding-details.tsx
✅ image-with-fallback.tsx

❌ HeroSection.tsx
❌ CountdownTimer.tsx
❌ WeddingDetails.tsx
```

### TypeScript Configuration

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Data Fetching with TanStack Query

### Setup

**QueryClient Configuration:**
```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

**Provider Setup:**
```typescript
// app/providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Query Patterns

**Fetching Guest Messages:**
```typescript
// hooks/use-guest-messages.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useGuestMessages() {
  return useQuery({
    queryKey: ['guest-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guest_messages')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}
```

**Submitting RSVP:**
```typescript
// hooks/use-rsvp-mutation.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useRSVPMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: RSVPSubmission) => {
      const { data: result, error } = await supabase
        .from('rsvp_submissions')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rsvp-count'] });
    },
  });
}
```

## Supabase Integration

### Setup

**Environment Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Client Configuration:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Database Schema

**RSVP Submissions Table:**
```sql
create table rsvp_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  attending boolean not null,
  guests integer not null default 0,
  dietary_restrictions text,
  message text,
  submitted_at timestamp with time zone default now()
);
```

**Guest Messages Table:**
```sql
create table guest_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  approved boolean default false,
  created_at timestamp with time zone default now()
);
```

### Row Level Security (RLS)

**Enable RLS:**
```sql
alter table rsvp_submissions enable row level security;
alter table guest_messages enable row level security;
```

**Policies:**
```sql
-- Allow anyone to insert RSVP
create policy "Anyone can insert RSVP"
  on rsvp_submissions for insert
  with check (true);

-- Allow anyone to read approved messages
create policy "Anyone can read approved messages"
  on guest_messages for select
  using (approved = true);

-- Allow anyone to insert messages
create policy "Anyone can insert messages"
  on guest_messages for insert
  with check (true);
```

## Performance Optimization

### Image Optimization

**Next.js Image Component:**
```typescript
import Image from 'next/image';

<Image
  src="/images/couple.jpg"
  alt="Sarah and Alex"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority // For above-the-fold images
/>
```

**Image Formats:**
- Automatic WebP/AVIF conversion
- Responsive image generation
- Lazy loading by default

### Font Optimization

**next/font Setup:**
```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Code Splitting

**Dynamic Imports:**
```typescript
import dynamic from 'next/dynamic';

const MusicPlayer = dynamic(() => import('@/components/client/music-player.client'), {
  ssr: false,
  loading: () => <div>Loading player...</div>,
});

const Gallery = dynamic(() => import('@/components/client/gallery.client'), {
  loading: () => <GallerySkeleton />,
});
```

### Caching Strategy

**Static Pages:**
- Home page: Static generation at build time
- Revalidate every 24 hours with ISR

**API Routes:**
```typescript
// app/api/guest-messages/route.ts
export const revalidate = 300; // 5 minutes

export async function GET() {
  const messages = await fetchMessages();
  return Response.json(messages);
}
```

**Client-Side Caching:**
- TanStack Query handles automatic caching
- Stale-while-revalidate pattern
- Optimistic updates for mutations

## SEO Implementation

### Metadata Configuration

**Root Layout:**
```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Sarah & Alex Wedding',
    template: '%s | Sarah & Alex Wedding',
  },
  description: 'Join us as we celebrate our love story on September 15, 2024 at Oakwood Manor',
  keywords: ['wedding', 'Sarah', 'Alex', 'Oakwood Manor', 'September 2024'],
  authors: [{ name: 'Sarah & Alex' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sarahandalex.wedding',
    siteName: 'Sarah & Alex Wedding',
    title: 'Sarah & Alex Wedding',
    description: 'Join us as we celebrate our love story',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sarah and Alex',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarah & Alex Wedding',
    description: 'Join us as we celebrate our love story',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Structured Data

**Event Schema:**
```typescript
// app/page.tsx
export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Sarah & Alex Wedding',
    startDate: '2024-09-15T16:00:00-05:00',
    endDate: '2024-09-15T23:00:00-05:00',
    location: {
      '@type': 'Place',
      name: 'Oakwood Manor',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Oak Street',
        addressLocality: 'Springfield',
        addressRegion: 'IL',
        postalCode: '62701',
        addressCountry: 'US',
      },
    },
    description: 'Join us as we celebrate our love story',
    image: 'https://sarahandalex.wedding/images/og-image.jpg',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sarahandalex.wedding',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
```

### Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://sarahandalex.wedding/sitemap.xml',
  };
}
```

## Deployment Considerations

### Build Configuration

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
```

### Environment Variables

**Required Variables:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
```

### Performance Targets

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Bundle Size:**
- First Load JS: < 100KB
- Total Page Size: < 500KB

## Migration Strategy

### Phase 1: Project Setup
1. Initialize Next.js 16 project with Bun
2. Configure TypeScript, Biome, TanStack Query
3. Set up Supabase connection
4. Configure file structure with kebab-case

### Phase 2: Component Migration
1. Migrate UI components to kebab-case naming
2. Separate server and client components
3. Update imports and paths
4. Implement Image optimization

### Phase 3: Feature Implementation
1. Implement data fetching with TanStack Query
2. Create Supabase database schema
3. Implement RSVP and guest message features
4. Add error handling and loading states

### Phase 4: Optimization
1. Implement SEO metadata
2. Add structured data
3. Optimize images and fonts
4. Configure caching strategies

### Phase 5: Testing & Deployment
1. Write unit and property tests
2. Perform accessibility audit
3. Test performance metrics
4. Deploy to production


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Countdown Timer Accuracy

*For any* future date, the countdown timer calculation should return non-negative values for days, hours, minutes, and seconds that accurately represent the time remaining.

**Validates: Requirements 5.2**

### Property 2: Image Alt Text Completeness

*For any* Next.js Image component in the application, the component should include a non-empty alt attribute for accessibility.

**Validates: Requirements 7.2**

### Property 3: Hydration Consistency

*For any* component that renders on both server and client, the initial client render should produce the same output as the server render to prevent hydration mismatches.

**Validates: Requirements 10.5**

## Error Handling

### Error Boundaries

```typescript
// app/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold">Something went wrong!</h2>
        <p className="mb-6 text-gray-600">
          We apologize for the inconvenience. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
```

### Loading States

```typescript
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-rose-500" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

### 404 Page

```typescript
// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
```

### API Error Handling

```typescript
// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { z } from 'zod';

const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  attending: z.boolean(),
  guests: z.number().min(0).max(10),
  dietary_restrictions: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = rsvpSchema.parse(body);

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('rsvp_submissions')
      .insert(validated)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit RSVP' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Testing Strategy

### Unit Testing

**Framework:** Vitest with React Testing Library

**Test Files:** Co-located with components using `.test.tsx` suffix (e.g., `countdown-timer.test.tsx`)

**Coverage Areas:**
- Utility functions (date formatting, time calculations)
- Component rendering without errors
- Form validation logic
- Data transformation functions

**Example Unit Test:**

```typescript
// lib/utils/calculate-time-remaining.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTimeRemaining } from './calculate-time-remaining';

describe('calculateTimeRemaining', () => {
  it('should calculate correct time remaining for future date', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day from now
    const result = calculateTimeRemaining(futureDate);
    
    expect(result.days).toBeGreaterThanOrEqual(0);
    expect(result.hours).toBeGreaterThanOrEqual(0);
    expect(result.minutes).toBeGreaterThanOrEqual(0);
    expect(result.seconds).toBeGreaterThanOrEqual(0);
  });

  it('should return zeros for past dates', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
    const result = calculateTimeRemaining(pastDate);
    
    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });
});
```

### Property-Based Testing

**Framework:** fast-check

**Test Configuration:** Minimum 100 iterations per property test

**Coverage Areas:**
- Countdown timer calculations across various dates
- Image component alt text validation
- Hydration consistency checks

**Example Property Test:**

```typescript
// components/client/countdown-timer.test.tsx
import { describe, it } from 'vitest';
import { fc } from '@fast-check/vitest';
import { calculateTimeRemaining } from '@/lib/utils/calculate-time-remaining';

describe('CountdownTimer Properties', () => {
  it.prop([fc.date({ min: new Date() })])(
    '**Feature: nextjs-migration, Property 1: Countdown Timer Accuracy**',
    (futureDate) => {
      const result = calculateTimeRemaining(futureDate);
      
      // All values should be non-negative
      expect(result.days).toBeGreaterThanOrEqual(0);
      expect(result.hours).toBeGreaterThanOrEqual(0);
      expect(result.minutes).toBeGreaterThanOrEqual(0);
      expect(result.seconds).toBeGreaterThanOrEqual(0);
      
      // Hours should be less than 24
      expect(result.hours).toBeLessThan(24);
      
      // Minutes and seconds should be less than 60
      expect(result.minutes).toBeLessThan(60);
      expect(result.seconds).toBeLessThan(60);
    },
    { numRuns: 100 }
  );
});
```

### Integration Testing

**Framework:** Playwright

**Coverage Areas:**
- RSVP form submission flow
- Navigation and smooth scrolling
- Gallery interactions
- Music player controls

**Example Integration Test:**

```typescript
// e2e/rsvp-submission.spec.ts
import { test, expect } from '@playwright/test';

test('RSVP submission flow', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to RSVP section
  await page.click('a[href="#rsvp"]');
  
  // Fill out form
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.check('input[name="attending"][value="true"]');
  await page.fill('input[name="guests"]', '2');
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Verify success message
  await expect(page.locator('text=Thank you for your RSVP')).toBeVisible();
});
```

### Type Checking

TypeScript strict mode enabled with the following configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Linting

Biome configuration enforces:
- No unused variables
- No explicit any types (warning)
- Consistent code formatting
- Import organization
- No debugger statements

## Performance Optimization

### Image Optimization

```typescript
// components/ui/optimized-image.tsx
import Image from 'next/image';
import type { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}
```

### Font Optimization

```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const MusicPlayer = dynamic(
  () => import('@/components/client/music-player.client').then((mod) => mod.MusicPlayer),
  { ssr: false, loading: () => <div>Loading player...</div> }
);

const Gallery = dynamic(
  () => import('@/components/client/gallery.client').then((mod) => mod.Gallery),
  { loading: () => <div>Loading gallery...</div> }
);
```

### Caching Strategy

```typescript
// Static page generation
export const revalidate = 3600; // Revalidate every hour

// API route caching
export async function GET() {
  const data = await fetchData();
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

## SEO Implementation

### Metadata Configuration

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sarahandalex.wedding'),
  title: {
    default: 'Sarah & Alex Wedding | September 15, 2024',
    template: '%s | Sarah & Alex Wedding',
  },
  description:
    'Join us as we celebrate our love story and begin our journey as one. A modern celebration of timeless love at Oakwood Manor.',
  keywords: [
    'wedding',
    'Sarah and Alex',
    'wedding invitation',
    'Oakwood Manor',
    'September 2024 wedding',
  ],
  authors: [{ name: 'Sarah & Alex' }],
  creator: 'Sarah & Alex',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sarahandalex.wedding',
    title: 'Sarah & Alex Wedding | September 15, 2024',
    description:
      'Join us as we celebrate our love story and begin our journey as one.',
    siteName: 'Sarah & Alex Wedding',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sarah & Alex Wedding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarah & Alex Wedding | September 15, 2024',
    description:
      'Join us as we celebrate our love story and begin our journey as one.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### Structured Data

```typescript
// app/page.tsx
export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Sarah & Alex Wedding',
    description: 'Wedding celebration of Sarah and Alex',
    startDate: '2024-09-15T16:00:00-05:00',
    endDate: '2024-09-15T23:00:00-05:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Oakwood Manor',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Oak Street',
        addressLocality: 'City',
        addressRegion: 'State',
        postalCode: '12345',
        addressCountry: 'US',
      },
    },
    organizer: {
      '@type': 'Person',
      name: 'Sarah & Alex',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sarahandalex.wedding',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
```

### Robots.txt

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://sarahandalex.wedding/sitemap.xml',
  };
}
```

## Accessibility Implementation

### ARIA Labels and Roles

```typescript
// components/client/navigation.client.tsx
'use client';

export function Navigation() {
  return (
    <nav aria-label="Main navigation" role="navigation">
      <ul role="list">
        <li>
          <a href="#home" aria-label="Navigate to home section">
            Home
          </a>
        </li>
        {/* Other nav items */}
      </ul>
    </nav>
  );
}
```

### Form Accessibility

```typescript
// components/client/rsvp-section.client.tsx
'use client';

export function RSVPSection() {
  return (
    <form aria-labelledby="rsvp-heading">
      <h2 id="rsvp-heading">RSVP</h2>
      
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          aria-describedby="name-error"
        />
        <span id="name-error" role="alert" aria-live="polite" />
      </div>
      
      {/* Other form fields */}
    </form>
  );
}
```

## Migration Strategy

### Phase 1: Project Setup
1. Initialize Next.js 16 project with Bun
2. Configure TypeScript with strict mode
3. Set up Biome for linting and formatting
4. Configure Tailwind CSS
5. Set up Supabase project and database schema
6. Configure TanStack Query

### Phase 2: Component Migration
1. Migrate static components to server components
2. Migrate interactive components to client components
3. Rename all files to kebab-case
4. Update imports and exports
5. Implement proper error boundaries

### Phase 3: Data Integration
1. Set up Supabase client and server utilities
2. Create database types from Supabase schema
3. Implement TanStack Query hooks
4. Migrate form handling to server actions
5. Test data fetching and mutations

### Phase 4: Optimization
1. Implement image optimization with Next.js Image
2. Set up font optimization with next/font
3. Add code splitting for heavy components
4. Configure caching strategies
5. Implement loading and error states

### Phase 5: SEO & Accessibility
1. Add comprehensive metadata
2. Implement structured data
3. Generate sitemap and robots.txt
4. Add ARIA labels and roles
5. Test accessibility with automated tools

### Phase 6: Testing & Deployment
1. Write unit tests for utilities
2. Write property-based tests
3. Set up integration tests
4. Configure CI/CD pipeline
5. Deploy to production

## Conclusion

This design provides a comprehensive blueprint for migrating the wedding website to Next.js 16 with modern best practices, including Bun for package management, Biome for linting, TanStack Query for data fetching, and Supabase for backend services. The architecture emphasizes performance, SEO, accessibility, and maintainability while preserving all existing functionality.
