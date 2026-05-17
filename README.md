> ⚠️ **Important:** Never commit your `.env.local` file to version control. It is already included in the `.gitignore` to prevent sensitive data leaks.

---

## Known Limitations

*   **Initial Build Setup:** Some components are currently mocked or structured as templates awaiting full backend API integration.
*   **Hydration Warnings:** Minor font/style layout shifts may occur temporarily during dev mode due to browser extensions interfering with server-rendered HTML.
*   **State Management:** Complex global state operations are restricted to localized React hooks until an architecture-wide providerHere is a clean, production-ready `README.md` for **Whazzonline**. It replaces the generic boilerplate with the specific details requested, structured for clear readability.

***

# Whazzonline

## Overview
Whazzonline is a modern web application built to deliver a fast, responsive, and dynamic user experience. Bootstrapped with `create-next-app`, this repository houses the frontend architecture of the platform, leveraging server-side rendering and static site generation for optimal performance.

---

## Tech Stack
*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS *(or update if using different styling tool)*
*   **Font Optimization:** `next/font` (Geist Sans & Geist Mono)

---

## Getting Started & Local Setup

### Prerequisites
Ensure you have **Node.js** (v18.x or higher) installed on your local machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/Alozie-Miracle/Whazzonline.git](https://github.com/Alozie-Miracle/Whazzonline.git)
   cd Whazzonline/frontend


2. Install the dependencies using your preferred package manager:
```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev

Open http://localhost:3000 in your browser to view the application. You can begin editing the codebase by modifying app/page.tsx.
```

## Environment Variables
The application requires configuration variables to communicate with backend services and external APIs.

1. Create a .env.local file in the root of the frontend directory:
```bash
    touch .env.local
```

2. Add the following required environment variables:
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id