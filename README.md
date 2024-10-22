# Personal Expense Tracker

A RESTful API built with Node.js and Express.js for managing personal financial records. This application allows users to record their income and expenses, retrieve past transactions, and get summaries by category or time period.

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)

## Objective

The goal is to develop a backend API that manages personal finances, providing users with the ability to add, view, update, and delete transactions and generate summaries by category or date.

## Features

- Record income and expenses.
- Retrieve all transactions.
- Update or delete transactions.
- Get summary reports (total income, total expenses, and balance).
- Error handling for invalid inputs and missing data.

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: SQLite

## Database Setup

### SQLite

For SQLite, the following schema is used:

- `categories`: 
  - `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
  - `name` (TEXT)
  - `type` (TEXT, either `income` or `expense`)

- `transactions`:
  - `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
  - `type` (TEXT, either `income` or `expense`)
  - `category_id` (INTEGER, references `categories(id)`)
  - `amount` (REAL)
  - `date` (TEXT)
  - `description` (TEXT)

### MongoDB (if using)

- `transactions`: { type, category, amount, date, description }
- `categories`: { name, type }

## API Endpoints

| HTTP Method | Endpoint             | Description                                                |
|-------------|----------------------|------------------------------------------------------------|
| `POST`      | `/transactions`       | Add a new transaction (income or expense)                  |
| `GET`       | `/transactions`       | Retrieve all transactions                                  |
| `GET`       | `/transactions/:id`   | Retrieve a specific transaction by ID                      |
| `PUT`       | `/transactions/:id`   | Update a specific transaction by ID                        |
| `DELETE`    | `/transactions/:id`   | Delete a specific transaction by ID                        |
| `GET`       | `/summary`            | Get a summary of transactions (total income, total expense, balance) |

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/personal-expense-tracker.git
cd personal-expense-tracker
```bash
