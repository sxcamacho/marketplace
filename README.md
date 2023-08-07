# Marketplace

## Description

Marketplace is a [Node.js](https://nodejs.org/en/) application for managing online transactions between users. This application demonstrates a basic use case of managing users and orders.

## API Documentation

This project uses [Swagger UI](https://swagger.io/tools/swagger-ui/) for API documentation. You can view the interactive documentation and try out the API endpoints at http://localhost:3001/api-docs/ after running the server (WIP).

## Installation

### Pre-requisites
- [Node.js](https://nodejs.org/en/download/) installed
- [MySQL](https://dev.mysql.com/downloads/installer/) installed
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/sxcamacho/marketplace.git
   ```
2. Navigate into the project directory:
   ```
   cd marketplace
   ```
3. Install the dependencies using yarn:
   ```
   yarn install
   ```
4. Copy the `.env-example` file and create your own `.env` file:
   ```
   cp .env-example .env
   ```
5. Update the `.env` file with your own settings.

   For example, to generate a `JWT_SECRET`, you can use Node.js built-in `crypto` module:
   ```javascript
   require('crypto').randomBytes(64).toString('hex')
   ```
6. Start the MySQL server and create a database for the project.

## Running the Project
After the installation, you can run the project using:

```
yarn start
```