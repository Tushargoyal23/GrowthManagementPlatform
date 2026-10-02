# ClassLedger frontend

Frontend for ClassLedger, a coaching-class tool for attendance, marks, fees, and student progress. This phase is the UI only. Data is mock data. There is no backend and no real login yet.

## What is included

- Next.js, TypeScript, and Tailwind
- Teacher screens: login, signup, overview, students, student profile, add student, tests, create test, fees, mark attendance
- Student screen at `/me`, separate from the teacher screens
- Fee status, red flags, and topic levels are calculated from the mock data

## Run on another laptop

1. Install [Node.js LTS](https://nodejs.org).
2. Copy this project to that laptop, or clone the repository.
3. Open a terminal in the `frontend` folder.
4. Install dependencies:

```bash
npm install
```

5. Start the app:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000).

## Login

Any non-empty email, roll number, and password are accepted. These values are for testing:

**Institute (teacher dashboard)**

- Email: `headteacher@institute.com`
- Password: `password`

**Student (one student's page)**

- Roll number: `24-018`
- Password: `password`

The student view shows Aarav Shah only.
