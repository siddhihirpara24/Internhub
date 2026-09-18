# InternHub — Merge Report & Run Guide

This document explains how your project (`PROJECT_COPY_1.zip`) and your
friend's project (`Internhub.zip`) were combined into one working
codebase called **InternHub**, and exactly how to run it on your machine.

No new features were invented. Every line in the merged project already
existed in one of your two original folders — the work here was
organizing, de-duplicating, and wiring the two halves together.

---

## 1. Why the two folders needed a real merge, not just a copy-paste

Both zips are the **same base project**, forked into two by you and your
friend, then developed independently:

| Area | Your friend built | You built |
|---|---|---|
| Backend | Company, Faculty, Interview Schedule, Opt-Out modules (multi-role: student + faculty) | Student "Apply to Internship" + Admin status-update module |
| Frontend | The full multi-page app shell — routing, faculty dashboard, public pages, student pages (many wired to real company data) | The real working **Apply** flow and an API-connected **Profile / Dashboard home** |

So several files existed in **both** projects under the same name but with
different content — this is a genuine merge (combining two developers'
edits to shared files), not just picking one folder over the other.

---

## 2. Final folder structure

```
InternHub/
├── backend/
│   └── Login_auth/              ← Spring Boot backend (merged)
│       ├── src/main/java/com/example/
│       │   ├── controller/      ← 8 controllers (Auth, Student, Admin, Company,
│       │   │                       FacultyAuth, FacultyStudent, InterviewSchedule, OptOutRequest)
│       │   ├── dto/
│       │   ├── entity/          ← includes Application.java (your module) +
│       │   │                       Company/Faculty/InterviewSchedule/OptOutRequest (friend's)
│       │   ├── repository/
│       │   ├── service/
│       │   └── security/
│       ├── src/main/resources/application.properties
│       ├── uploads/photos, uploads/resumes   ← merged (union of both)
│       └── pom.xml
├── frontend/
│   └── student-portal/          ← React (Vite) app (merged)
│       └── src/
│           ├── pages/student/   ← Internships.jsx & TrackApplicant.jsx merged;
│           │                       Profile.jsx & Home.jsx replaced with your
│           │                       working, API-connected versions
│           ├── pages/faculty/, pages/public/, pages/auth/  (from friend's build)
│           ├── modules/Company, Interview, Placement, Student  (from friend's build)
│           └── components/...
└── docs/
    └── MERGE_AND_RUN_REPORT.md  ← this file
```

---

## 3. How each conflict was resolved

### Backend (Spring Boot)

| File | Resolution |
|---|---|
| `StudentController.java` | Yours = friend's file **plus** your `/apply` and `/applications` endpoints → used yours (verified as a strict superset). |
| `AcademicDetailsRequest/Response.java`, `ProfileResponse.java`, `AcademicDetails.java` (entity), `AcademicService.java`, `UserService.java` | Yours added `skill1`, `skill2`, `enrollmentNumber`, `email`, `mobileNumber` and null-safe updates on top of friend's version → used yours. |
| `SecurityConfig.java` | Friend's version already includes the extra `permitAll()` rules for `/api/company/**`, `/api/interview-schedule/**`, `/api/faculty/login`, etc. that yours didn't have → used friend's (already the superset — no change needed). |
| `AdminController.java`, `ApplyRequest.java`, `Application.java`, `ApplicationRepository.java`, `ApplicationService.java` | Only existed in your project → added as-is. |
| `CompanyController/Service/Repository`, `FacultyAuthController`, `FacultyStudentController/Service`, `InterviewScheduleController/Service/Repository`, `OptOutRequestController/Service/Repository`, `Company.java`, `Faculty.java`, `InterviewSchedule.java`, `OptOutRequest.java` | Only existed in friend's project → kept as-is. |
| `pom.xml` | Identical in both → kept friend's copy. |
| `application.properties` | Kept friend's copy. **You must update the values below before running** (see Section 4). |

Result: **51 Java files**, no duplicate/conflicting class names, no orphaned imports.

### Frontend (React)

Your friend's `smart-internship-portal` was used as the base app shell
(it already has routing for student/faculty/public pages, and is the more
complete build). Two real conflicts were found and merged line-by-line:

- **`Internships.jsx`** — friend's version fetches the real, live company
  list from the backend but only had a placeholder `alert()` for applying
  (comment: *"real apply API call goes here later"*). Yours had a working
  `/student/apply` submission + modal form, but a hard-coded dummy list of
  6 internships instead of the real company data. **Merged:** real company
  data fetch (friend's) **+** the real apply modal/submit flow (yours),
  with the Apply button now also checking `/student/applications` so it
  correctly shows "Applied" for internships you've already applied to.
- **`TrackApplicant.jsx`** — friend's version called a placeholder URL
  (`/api/applications`) that doesn't exist in the backend. Yours correctly
  calls the real `/student/applications` endpoint → **used yours**, with
  the import path adjusted to match the merged folder location.
- **`Profile.jsx`** — friend's version was static design-only mock data.
  Yours is wired to the real backend profile/academic endpoints →
  **used yours**.
- **`Home.jsx`** (dashboard) — friend's "recent applications" widget used
  dummy data; yours pulls the real applications list and status →
  **used yours**.

Everything else (routing, faculty pages, public pages, layouts, company
module, interview module) came from friend's build unchanged, since it
was already the more complete and working version there.

**⚠️ Not merged — needs your manual review:** `Notification.jsx` and
`OptOutForm.jsx` exist in meaningfully different, larger versions in both
projects (neither is a clean superset of the other, and unlike the files
above they don't call a shared backend endpoint that would tell us which
is "correct"). The friend's versions were kept as the working base. If you
had built additional logic into your copies of these two files, compare
them side by side and port over anything missing — I did not guess at
combining these to avoid introducing an untested behavior change.

### Verification performed

- ✅ `npm install` + `npm run build` on the merged frontend completed
  with **no errors** (2,507 modules built successfully).
- ✅ All 51 backend Java files checked for duplicate class names / broken
  imports — none found.
- ⚠️ The backend **could not be compiled in this environment** (no
  internet access to Maven Central here), so please do a `mvnw clean
  compile` on your machine as your first step — see Section 4.

---

## 4. How to run the merged project on your system

### Step 1 — Database

Both of your original projects pointed at a local PostgreSQL database
named `internhub`. Make sure PostgreSQL is running and the database
exists:

```sql
CREATE DATABASE internhub;
```

### Step 2 — Backend credentials

Open `backend/Login_auth/src/main/resources/application.properties` and
update these to match **your own machine**:

```properties
spring.datasource.username=postgres
spring.datasource.password=Siddhi24        # ← set to your local Postgres password
spring.mail.username=siddhisvgu30@gmail.com # ← set to your own Gmail (for OTP/email features)
spring.mail.password=depcinhatimslzrb       # ← set to a Gmail App Password
```

(These were carried over from your friend's copy — if your Postgres
password or mail account differs, update them here. If not, you can leave
them as-is.)

### Step 3 — Run the backend

```bash
cd InternHub/backend/Login_auth
./mvnw spring-boot:run       # macOS/Linux
# or on Windows:
mvnw.cmd spring-boot:run
```

`spring.jpa.hibernate.ddl-auto=update` will auto-create/update all
tables (including the new `application` table) on first run.

The backend starts on **http://localhost:8081**.

### Step 4 — Run the frontend

```bash
cd InternHub/frontend/student-portal
npm install
npm run dev
```

The frontend starts on **http://localhost:5173** (Vite default), which
matches the CORS origin already configured in `SecurityConfig.java`.

### Step 5 — Verify

1. Open `http://localhost:5173` — you should see the public landing page.
2. Register/login as a student, complete your Academic Details.
3. Go to **Campus Internship** — you should now see live companies
   (added via the Company module) and be able to submit a real
   application.
4. Go to **Track Applicant** — your submitted application should appear
   with live status.

---

## 5. Uploaded files merged

`uploads/photos` and `uploads/resumes` from both projects were combined
(union of files, no duplicates):

- Photos: 3 files (2 students)
- Resumes: 2 files (2 students)

---

## 6. Security note

`application.properties` in this merged project still contains your
friend's real Gmail address and app password (carried over unmodified
from the original zip, per your "don't change existing code" instruction).
Since this file will now live in a project shared between you two,
consider rotating that Gmail app password once you're done, or moving
these values to environment variables / a `.gitignore`d local file before
pushing to any shared Git repository.
