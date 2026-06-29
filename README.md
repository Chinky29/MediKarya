# 🏥 Medical Case Authoring Portal

A professional web application for medical students and content writers to create, manage, and export structured medical case reports.

## Features
- Multi-step case creation wizard (6 steps)
- Live case preview throughout creation
- Case management with status workflow
- Pre-built specialty templates
- localStorage-based persistence
- Export to PDF
- Dark mode
## Key Features Implemented
### 1. Dashboard
- Statistics overview (total cases, published, drafts, in review)
- Quick actions
- Recent cases table
- Welcome banner
### 2. Case Management
- All cases list with grid view
- Search and filter functionality
- Status badges (Draft, In Progress, Review, Published)
- Case detail page with complete preview
- Edit, delete, duplicate cases
### 3. Multi-Step Form Wizard (6 Steps)
1. Case metadata + Patient details
2. Chief complaint + HPI
3. Medical history
4. Examination findings + Auto BMI calculation
5. Investigations
6. Diagnosis + management plan
### 4. Templates Library
8 pre-built templates for common cases (MI, Diabetes, CAP, etc.)

### 5. Persistence
- localStorage storage
- Custom useLocalStorage hook
- Auto-saves between steps
### 6. UI/UX
- Clean, professional clinical design
- Responsive layout
- Sidebar navigation
- Step indicators
- Status badges
## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod
- React Context API

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Project Structure
```
medical-case-portal/
├── app/
│   ├── layout.tsx              # Root layout with sidebar/header
│   ├── page.tsx                # Dashboard/home
│   ├── globals.css
│   ├── cases/
│   │   ├── page.tsx            # All cases list
│   │   ├── new/
│   │   │   └── page.tsx        # 6-step form wizard
│   │   └── [id]/
│   │       ├── page.tsx        # Case detail/preview
│   │       └── edit/
│   │           └── page.tsx    # Edit existing case
│   ├── templates/
│   │   └── page.tsx            # Templates library
│   └── profile/
│       └── page.tsx            # Author profile
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── case-form/              # 6 form step components
│   ├── case-preview/
│   ├── ui/                     # Shadcn-style UI components
│   └── shared/
├── context/
│   ├── CaseContext.tsx
│   └── AuthorContext.tsx
├── hooks/
├── lib/
│   ├── constants.ts
│   ├── mockData.ts             # 8 pre-built cases + 8 templates
│   ├── utils.ts
│   └── validators.ts
└── types/
    └── index.ts

## Form Steps
1. Case Metadata & Patient Details
2. Chief Complaint & HPI
3. Medical & Personal History
4. Examination Findings
5. Investigations
6. Diagnosis & Management Plan

## Author
Built as an internship project by Chinky 
