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
  - [Backend System Flow](#backend-system-flow)
  - [Account Structure](#account-structure)
  - [Transaction Model](#transaction-model)
  - [Transaction Flow](#transaction-flow)

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


## Backend System Flow
The backend system is designed to emulate real-world banking scenarios where users can open multiple accounts with various types. The type of account indicates the financial institution it belongs to, such as VISA, MASTERCARD, MAESTRO, etc. The system includes a model for transactions that supports differential typing, allowing for various operations, such as withdrawals and deposits, with specific behaviors.

## Account Structure
In this system, users can create multiple accounts. Each account is associated with a type that corresponds to a specific financial institution. This structure allows users to have different types of accounts, each with unique properties and purposes.
**Account Types**: STAR, PULSE, MAESTRO, MASTERCARD, PLUS, VISA
The system allows for flexibility, enabling users to manage multiple accounts and perform transactions as needed.

## Transaction Model
The transaction model in the backend manages all financial operations within the system. Transactions are differentiated based on their type, which determines the specific behavior of the operation.
Transaction Types:
 1. Withdrawal: Reduces the balance of an account.
 2. Deposit: Increases the balance of an account.

The transaction model has a detailed record-keeping system to track all transactions, allowing for comprehensive auditing and reporting. The differential typing enables distinct operations for each type of transaction, ensuring that each transaction behaves as expected.

## Transaction Flow
The flow of transactions follows a clear pattern, depending on the type of operation:
 1. Withdrawal:
     The system checks if the account has sufficient funds.
     If funds are sufficient, it reduces the account balance by the specified amount.
     Records the transaction in the transaction table for auditing purposes.
 2. Deposit:
     The system adds the specified amount to the account balance.
     Records the transaction in the transaction table.