# Resilient Email Service

A robust email-sending service built using **Node.js**, **Express**, **MongoDB**, and **Nodemailer**. This service implements fallback mechanisms, retry logic, idempotency, rate limiting, and status tracking to ensure reliable email delivery.

---

## Features

- **Retry Mechanism**: Automatically retries failed email sending attempts with an exponential backoff strategy.
- **Fallback Between Providers**: Switches to an alternative email provider upon failure of the primary provider.
- **Idempotency**: Ensures no duplicate email is sent for the same request.
- **Rate Limiting**: Controls the number of emails sent within a specific time frame to prevent abuse.
- **Status Tracking**: Tracks the status of each email, including success, failure, and retries.

---

## Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB
- **Email Providers**: Mock Email Providers with `Nodemailer`
- **Environment Management**: Dotenv

---

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- npm (comes with Node.js)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/resilient-email-service.git
   cd resilient-email-service
