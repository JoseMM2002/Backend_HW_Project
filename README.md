# Casetext Homework Assignment
This project is a backend based on Express to manage operations related to accounts and cards. It uses Sequelize as an ORM to interact with databases.

## Table of Contents
- [Casetext Homework Assignment](#casetext-homework-assignment)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run Project](#run-project)
  - [Run jobs](#run-jobs)
- [This script creates a Card that is also a requirement to execute operations](#this-script-creates-a-card-that-is-also-a-requirement-to-execute-operations)

  
  
## Technologies Used
- **Express**: A JavaScript library for building REST APIs.
- **Sequelize**: A modern ORM for JavaScript and TypeScript.

## Prerequisites
To work on this project, you need to have Node.js installed in your local environment. This project also uses [PNPM](https://pnpm.io/installation), a fast and efficient package manager. Follow the instructions on its official page to install PNPM.

- Node.js >= 20.12.2
- PNPM >= 9.0.2

Additionally, for this project, you need to install [Mkcert](https://github.com/FiloSottile/mkcert). Follow the instructions in the GitHub repository to install it.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JoseMM2002/Backend_HW_Project.git
   cd Frontend_HW_Project

2. **Install Dependencies:**
    ```bash
   pnpm install

## Run Project

1. **Development Mode**
    ```bash
   pnpm run dev

2. **Build and Start Project:**
    ```bash
    pnpm run start:build

## Run jobs
For this project, as it's not required to create users, accounts, or cards via an API, some scripts are provided for these models.

1. **Create Users**
    ```bash
    # This script creates a User that is a requirement to create the other 2 Models
    pnpm run script scripts/jobs/job-createUser.ts


2. **Create Accounts**
    ```bash
    # This script creates an Account that is a requirement to create Cards and execute balance operations
    pnpm run script scripts/jobs/job-createAccount.ts

3. **Create Cards**
   ```bash
   # This script creates a Card that is also a requirement to execute operations
   pnpm run script scripts/jobs/job-createCard.ts