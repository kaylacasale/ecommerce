# E-Commerce Back-End: Object-Relational Mapping (ORM)
A back-end application for an e-commerce site. This application requires the configuration of Express.js API in order to use Sequelize to interact with a MySQL database and dotenv npm package to secure user information. The application demonstrates the API routes (in the controllers folder) to perfom RESTful CRUD operations visualized through Postman in the walkthrough video below.

# ecommerce
E-Commerce or Electronic Commerce is a type of business model which enables companies and customers to buy and sell goods online or with the help of the internt. Online shopping is growing so fast that ecommerce website development skills are in huge demand. The website plays the most crucial part in creating and maintaining the online presence and reputation of an E-Commerce business. In today's business, web development plays a key role in E-Commerce business. It is also important to know the E-Commerce web development has two faces- 1) Front-end development 2) Back-end development. 

## User Story
```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```
## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Walk-through Video](#walk-through-video)
* [Built With](#built-with)
* [ERD](#erd)
* [Database - MySQL Tables](#database---mysql-tables)

## Description
E-Commerce web development has two faces- 1) Front-end development 2) Back-end development. This application focuses on the back-end using MySQL2 and Sequelize packages to connect the Express.js API to a MySQL database and the `dotenv` package to use environment variables to store sensitive data (e.g. username, password, and database name). Lastly, using any API platform that allows developers to design, build, test, and iterate their APIs (e.g. Insomnia), I test all controller routes (`GET`, `POST`, `PUT`, `DELETE`) through **Postman**.

## Installation
- [x] Clone the GitHub repository locally
- [x] Install necessary dependencies
- [x] Create schema from the MySQL shell
- [x] Seed the database from the command-line

1. To clone this project from GitHub to your local computer

> Click the Code drop-down button in this page and Copy URL for that repository:

![Copy Code](assets/copy-code-ecommerce.png "Clone GitHub Repo")

> Enter the following command in your terminal on the level of your project folder (assuming you have Git installed)

    `git clone <URL>`
    > URL = https://github.com/kaylacasale/ecommerce.git




2. To install neccessary packages

This application uses Node.js, Inquirer, MySQL, and console.table in order to run on the command-line.

> Enter into the terminal in your source folder

    `npm install`

OR

    `npm i`

> Alternative: install each dependency manually

    `npm i dotenv`

    `npm i express`

    `npm i mysql2`

    `npm i sequelize`


3. Create employee-tracker database in your MySQL Workbench

> Enter `schema.sql` content into your MySQL Workbench
![Drop MySQL Database](assets/drop-mysql-database.png "Insert schema.sql in MySQL Workbench locally")

## Video Walkthrough


https://user-images.githubusercontent.com/115776118/216014311-b8921b39-df18-4bdc-a746-9aceb9dde0c0.mp4

