---
title: Getting Started with SvelteKit
description: A comprehensive guide to building your first SvelteKit application from scratch
date: '2025-01-08'
tags:
  - sveltekit
  - tutorial
  - javascript
  - typescript
published: true
coverImage: /images/sveltekit-cover.jpg
---

# Getting Started with SvelteKit

SvelteKit is a powerful framework for building web applications of all sizes. In this tutorial, we'll walk through setting up a new project and understanding the core concepts.

## Prerequisites

Before we begin, make sure you have:

- Node.js 18+ installed
- A code editor (VS Code recommended)
- Basic knowledge of JavaScript/TypeScript

## Creating Your Project

Start by running the SvelteKit project creation wizard:

```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

This will scaffold a new SvelteKit project with all the essentials.

## Understanding the File Structure

SvelteKit uses a file-based routing system. Here's what the structure looks like:

```text
src/
├── routes/
│   ├── +page.svelte      # Home page
│   ├── +layout.svelte    # Root layout
│   └── blog/
│       └── [slug]/
│           └── +page.svelte  # Dynamic blog post route
├── lib/
│   └── index.ts          # $lib alias entry point
└── app.html              # HTML template
```

## Routing Basics

### Static Routes

Create a new route by adding a `+page.svelte` file in the routes directory:

```svelte
<!-- src/routes/about/+page.svelte -->
<h1>About Us</h1>
<p>Welcome to our company!</p>
```

### Dynamic Routes

Use square brackets for dynamic segments:

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  let { data } = $props();
</script>

<article>
  <h1>{data.post.title}</h1>
  <div>{@html data.post.content}</div>
</article>
```

## Loading Data

SvelteKit provides powerful data loading capabilities:

```typescript
// src/routes/blog/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const post = await getPost(params.slug);
  
  return { post };
};
```

## Layouts

Layouts wrap your pages and provide consistent UI elements:

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  let { children } = $props();
</script>

<Nav />
<main>
  {@render children()}
</main>
<Footer />
```

## Next Steps

Now that you understand the basics, here are some things to explore:

- **Hooks** - Intercept requests and responses
- **API Routes** - Build backend endpoints
- **SSR vs SSG** - Choose your rendering strategy
- **Adapters** - Deploy anywhere

Happy building! 🎉
