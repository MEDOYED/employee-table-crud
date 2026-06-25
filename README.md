# Test Task: Employee Table CRUD

## Overview

This project contains a starter implementation of an employee data table built.

Your task is to extend the existing codebase with full **CRUD** functionality, field validation, and a clean, scalable architecture.

Data is loaded asynchronously (mock backend) and stored on the frontend. **No real backend is required.**

---

## What's Already Implemented

- AG Grid table with ~100 rows
- Two modes: **View** (read-only) and **Edit** (editable cells)
- Async data loading with loading state
- Edit / Save / Cancel flow
- Table without virtualization and pagination

---

## What You Need to Implement

### 1. Update rows
- In **Edit** mode, the user can change values in existing rows.
- Changes are applied only after clicking **Save**.
- **Cancel** discards all unsaved changes and restores the last saved state.

### 2. Create rows
- In **Edit** mode, the user can add a new row.
- The new row must appear at the **top of the table** (first row).
- The new row should have initial values for all fields.

### 3. Delete rows
- In **Edit** mode, the user can delete a row.
- Deletion is applied only after clicking **Save** (same as other edit-mode changes).

### 4. Field validation
- **All fields are required** — empty values are not allowed.
- **Email must be unique** — no two rows can have the same email (case-insensitive, e.g. `test@mail.com` and `TEST@mail.com` are duplicates).
- Validation runs on **Save**.
- If validation fails, **Save is blocked** and error messages are shown next to the relevant fields.
- Error messages should be clear (e.g. "This field is required", "Email already exists").

---

## Modes

| Mode   | Behavior |
|--------|----------|
| **View** | Read-only table; only the **Edit** button is available |
| **Edit** | Editable cells + add/delete rows; **Save** / **Cancel** buttons |

---

## Technical Requirements

- **No backend** — all changes are stored in frontend state.
- **No virtualization or pagination** — all rows must be visible at once (already configured; do not change this behavior).
- **Performance** — minimize unnecessary re-renders:
  - do not re-render the entire table when not needed;
  - use memoization where appropriate;
  - avoid unnecessary state updates when editing individual cells.
- **Web Vitals** — keep the UI performant; `reportWebVitals` is already set up in the project.

---

## Code Quality & Architecture

The code should be **easy to read, maintain, and extend**.

We expect:

- **Readability** — clear naming; logic split into small, understandable pieces.
- **Scalability** — the solution should not be hard-coded for one table only; it should be straightforward to add new columns, field types, validation rules, or CRUD operations.
- **Separation of concerns** — UI, business logic, validation, table configuration, and data handling should not live in one large component.
- **Predictable structure** — a new developer should quickly find the form, cell renderers, validation, and column config.
- **No over-engineering** — keep the architecture simple and practical.

> We evaluate not only whether the feature works, but **how** it is implemented.

---

## Tech Stack

- React + TypeScript
- AG Grid v35
- react-final-form + react-final-form-arrays

Work within the existing structure (`src/components/DataTable/`). **Do not rewrite the project from scratch.**

---

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Submit

1. Create your own **Git repository** (GitHub / GitLab / Bitbucket).
2. **Deploy** the project to any free hosting (Vercel, Netlify, GitHub Pages, etc.).
3. Send **two links**:
   - link to your **repository**;
   - link to the **deployed app** running in the browser.

Make sure the deployed version matches the code in the repository and works without local setup.

---

## Acceptance Criteria

- [ ] **View** mode is read-only.
- [ ] **Edit** mode allows changing any field in existing rows.
- [ ] A new row can be added and appears **first** in the table.
- [ ] A row can be deleted in **Edit** mode.
- [ ] **Save** persists all changes (create / update / delete).
- [ ] **Cancel** fully reverts unsaved changes.
- [ ] **All fields are required** — empty values block save.
- [ ] **Email is unique** — duplicates block save with a clear error message.
- [ ] Table has no virtualization or pagination.
- [ ] No noticeable performance issues with ~100 rows.
- [ ] Code is readable, well-structured, and easy to extend.
- [ ] Links to **repository** and **live demo** are provided.