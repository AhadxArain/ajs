# AJS Construction Corp. Website

This repository contains the official frontend web application for AJS Construction Corp. It is built as a standalone React + TypeScript application powered by Vite and styled with Tailwind CSS.

## Getting Started

### Prerequisites

To run this application locally, you need to have Node.js and a package manager like `pnpm` or `npm` installed.

- **Node.js**: >= 20.x
- **pnpm**: >= 9.x (Recommended)

### Installation

Install all required dependencies:

```bash
pnpm install
```

*(Alternatively, you can run `npm install`.)*

### Run Locally (Development)

To launch the local development server:

```bash
pnpm run dev
```

*(Alternatively, `npm run dev`.)*

Once running, open your browser and navigate to `http://localhost:3000`.

### Production Build

To build the static files for production deployment:

```bash
pnpm run build
```

This compiles the application assets into a standard standalone folder named `dist` at the root of the project, which is ready to be served by any static host or web server.

### Type Check

To check the code for TypeScript type errors:

```bash
pnpm run typecheck
```
