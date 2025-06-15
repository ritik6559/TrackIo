# TrackIo

A collaborative project management platform built with cutting-edge web technologies. TrackIo empowers teams to organize workspaces, manage projects, and track tasks with an intuitive and responsive interface.

## ✨ Features

- **Workspace Management** - Create and customize workspaces for different teams or organizations
- **Team Collaboration** - Invite users to workspaces with role-based permissions
- **Project Organization** - Create and manage multiple projects within workspaces
- **Task Management** - Assign, track, and monitor tasks across projects
- **Real-time Updates** - Stay synchronized with your team's progress
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## 🚀 Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[Appwrite](https://appwrite.io/)** - Backend-as-a-Service for authentication and database
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Hono](https://hono.dev/)** - Fast web framework for API routes
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible UI components
- **TypeScript** - Type-safe development experience

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- An Appwrite instance (cloud or self-hosted)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   https://github.com/ritik6559/TrackIo.git
   cd TrackIo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
    NEXT_PUBLIC_APP_URL=http://localhost:3000

    NEXT_PUBLIC_APPWRITE_ENDPOINT=
    NEXT_PUBLIC_APPWRITE_PROJECT=

    NEXT_PUBLIC_APPWRITE_DATABASE_ID=
    NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=
    NEXT_PUBLIC_APPWRITE_MEMBERS_ID=
    NEXT_PUBLIC_APPWRITE_PROJECTS_ID=
    NEXT_PUBLIC_APPWRITE_TASKS_ID=

    NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=

    NEXT_APPWRITE_KEY=
   ```

4. **Set up Appwrite**

   Create collections in your Appwrite database:
    - `workspaces` - Store workspace information
    - `projects` - Store project data
    - `tasks` - Store task details
    - `members` - Store workspace member relationships

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
