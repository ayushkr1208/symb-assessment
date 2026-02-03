# Exam Room Allocation System - Frontend

A modern, responsive web application for managing classrooms and allocating exam rooms efficiently. Built with Next.js 14, React Query, and TypeScript.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with dark mode support
- **UI Components**: shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Language**: TypeScript (strict mode)

## Features

### 📊 Dashboard
- Overview of total classrooms and seating capacity
- Quick action cards for managing classrooms and allocating rooms
- Recently added classrooms display
- Real-time statistics

### 🏫 Classroom Management
- View all classrooms in a sortable data table
- Add new classrooms with validated forms
- Sort by floor number or capacity
- Visual indicators for washroom proximity
- Color-coded floor badges
- Empty state handling

### 🎯 Exam Allocation
- Intelligent room allocation based on student count
- Detailed allocation results with room cards
- Summary statistics (capacity, utilization, excess capacity)
- Success/failure states with clear messaging
- Shortfall information when insufficient seats

### 🌓 User Experience
- Dark mode toggle (persisted via localStorage)
- Fully responsive design (mobile, tablet, desktop)
- Mobile navigation menu
- Loading states and spinners
- Toast notifications for user feedback
- Smooth animations and transitions

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── globals.css          # Global styles and CSS variables
│   ├── page.tsx             # Dashboard page
│   ├── classrooms/
│   │   └── page.tsx         # Classrooms management page
│   └── allocate/
│       └── page.tsx         # Exam allocation page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── switch.tsx
│   │   └── table.tsx
│   ├── common/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PageContainer.tsx
│   │   └── LoadingSpinner.tsx
│   ├── classroom/           # Classroom feature components
│   │   ├── ClassroomForm.tsx
│   │   ├── ClassroomCard.tsx
│   │   └── ClassroomTable.tsx
│   ├── allocation/          # Allocation feature components
│   │   ├── AllocationForm.tsx
│   │   └── AllocationResult.tsx
│   └── providers/
│       └── QueryProvider.tsx # React Query provider
├── hooks/
│   ├── useClassrooms.ts     # Classroom CRUD hooks
│   └── useAllocation.ts     # Allocation hook
├── lib/
│   ├── api.ts              # API client and endpoints
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Set up environment variables**:
```bash
# Copy the example file
cp .env.example .env.local
```

3. **Configure API URL** (optional):
Edit `.env.local` to point to your backend API:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Create an optimized production build:
```bash
npm run build
npm start
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## API Integration

The application communicates with a backend API with the following endpoints:

### Classrooms
- **GET `/api/classrooms`** - Fetch all classrooms
- **POST `/api/classrooms`** - Add a new classroom

### Allocation
- **POST `/api/classrooms/allocate`** - Allocate rooms for an exam

### Expected Data Structures

**Classroom**:
```typescript
{
  _id: string;
  roomId: string;
  capacity: number;
  floorNo: number;
  nearWashroom: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**Allocation Result**:
```typescript
{
  success: boolean;
  message: string;
  allocatedRooms?: Array<{
    roomId: string;
    capacity: number;
    floorNo: number;
    nearWashroom: boolean;
  }>;
  totalRoomsAllocated?: number;
  totalCapacityAllocated?: number;
  totalStudentsRequested?: number;
  excessCapacity?: number;
  shortfall?: number;
}
```

## Features Highlights

### 🎨 Design
- Clean, modern UI with consistent spacing
- Color-coded components for better UX
- Responsive grid layouts
- Smooth transitions and animations
- Accessible components with ARIA labels

### 🔒 Type Safety
- Full TypeScript strict mode
- Zod schema validation for forms
- Type-safe API responses
- Interface definitions for all data structures

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Mobile navigation menu
- Touch-friendly button sizes
- Adaptive grid layouts

### ♿ Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper color contrast ratios
- Focus indicators on interactive elements

### 🚀 Performance
- React Query caching and auto-refetching
- Optimized bundle size
- Image optimization with Next.js
- Code splitting by route
- Lazy loading of components

## Customization

### Colors
Modify the CSS variables in `src/app/globals.css` to customize the color scheme:
```css
:root {
  --primary: 0 0% 9.0%;
  --accent: 0 0% 9.0%;
  /* ... more variables */
}
```

### Theme
Toggle dark mode by clicking the sun/moon icon in the header. The preference is stored in localStorage.

### Adding New Pages
1. Create a new directory in `src/app/`
2. Add a `page.tsx` file
3. Use the `PageContainer` component for consistent layout
4. The route will be automatically available

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note**: Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Best Practices Implemented

✅ TypeScript strict mode enabled  
✅ Reusable, modular components  
✅ Error boundaries and error handling  
✅ React Query for server state management  
✅ Form validation with Zod schemas  
✅ Accessible components (ARIA labels)  
✅ Consistent naming conventions  
✅ Dark mode support  
✅ Responsive design patterns  
✅ Loading and error states  

## Troubleshooting

### API Connection Issues
If the application can't connect to the backend:
1. Check the `NEXT_PUBLIC_API_URL` in `.env.local`
2. Ensure the backend API is running
3. Check browser console for CORS errors
4. The app has fallback mock data for development

### Dark Mode Not Working
1. Clear browser localStorage
2. Check that JavaScript is enabled
3. Verify the dark mode toggle in the header

### Form Validation Issues
1. Check the browser console for error messages
2. Verify input values match the schema requirements
3. Ensure all required fields are filled

## License

This project is part of the Exam Room Allocation System.

## Support

For issues or questions, please contact the development team or open an issue in the project repository.
