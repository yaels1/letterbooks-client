# Project Title

LetterBooks

## Overview

A new way to find book recommendations. With records of your personal book history along with a little questionnaire about what you're looking for, this app will find the best recommendations for your next book adventure.

### Problem

For the ongoing struggle of not knowing what to read, of having just finished a book or a series and not knowing where to go next, or just of wanting to have a record of all the books you've read in one place. People in this position will usually go down the time-consuming process of a Google search rabbit hole, asking too many people for too many recommendations, being bombarded with a bunch of suggestions that do not fit the criteria they are looking for.

Whether there is a solid idea of what you're looking for or none at all, the you can input what theme and size you would want in the next read into this app, and it will generate the most appropriate option(s) for you, taking into accounts the length of the book, desired themes, fiction or non-fiction and soon to be many more!

### User Profile

Avid book readers or people trying to get into reading who:

- are a bit lost trying to find their next read
- want to keep track of which books they have read.

### Features

- As a user, I want to be recommended what book I should read next, with a questionnaire.

- As a user, I want to be able to see the list of all of the books that are in this application.

- As a user, I want to be able to create an account to add my library of books to a list.
- As a user, I want to be able to log in to my account to manage my library of books.

- As a logged in user, I want to be able to make a list of the books I have read
- As a logged in user, I want to have a list of book recommendations generated for me

#### Nice to have

- As a logged in user, I want to be able to update a rating of a book out of 5
- As a logged in user, I want to be able to rate a book out of 5

- As a logged in user, I want to be able to make a list of the books that I would like to read

## Implementation

### Tech Stack

- Client libraries:

  - react
  - react-router
  - axios
  - sass
  - jwt-decode

- Server libraries:
  - Express
  - bycrypt
  - cors
  - dotenv
  - express
  - jsonwebtoken
  - knex
  - mysql2

### APIs

no external APIs used

### Sitemap

- Register page / Login page
- Header: logo and name. nav bar with links to home page, profile page, lists page, questionnaire form
- Home page: short explanation of app, menu with browse, read list,
- Single book page: image, title, author, blurb/short summary of the story, add to list of read books
- Personal info page: name, email, phone, address, age, what kind of user, favourite book. link to home, all books, read books, questionnaire
- List page: list of books added from read books list, results for recommendations, list of all books in application
- Questionnaire for next book recommendation: form of questions and drop down options, link to recommendations list

#### Nice to have

- List page: wishlist
- Home page, list page, profile page: link to wish list

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

figma link / screenshots of figma page

![](../letterbooks-client/src/assets/mockups/header.png)
![](../letterbooks-client/src/assets/mockups/homepage.png)
![](../letterbooks-client/src/assets/mockups/list.png)
![](../letterbooks-client/src/assets/mockups/profile.png)
![](../letterbooks-client/src/assets/mockups/singlebook.png)

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

hard code 50 books with a variety of themes

user table:

- id
- first name
- last name
- email
- password
- phone
- age
- address
- favourite book
- role

book table:

- book id
- author id
- title
- number of pages
- description
- img

author table:

- author id
- author name

theme table:

- id
- fiction
- theme name

book_theme join table

- book id
- theme id

user_read_book join table

- book id
- user id

#### Nice to have

link to api to get larger range of books and information about the books, e.g. ratings

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

_BOOKS_

- Get data for all books
  **GET /book**

- Get data for a single book
  **GET /book/:id**

_LIST_

- Get list of read books
  **GET /list/:userID/read**

- Add book to list of read books
  **POST /list/read**

_QUESTIONNAIRE_

- get questions from questionnaire
  **GET /questionnaire**

_USERS_

- Add a user account
  **POST /users/register**

- Login a user
  **POST /users/login**

- Get user profile information
  **GET /users/profile**

#### Nice to have

- remove book from the recommendations list
  **delete /list/recommendations**

- Get list of books already added onto wishlist
  **GET /list/wishlist**

  -Add a book to the wish list
  **POST /list/wishlist**

  delete books from list
  **delete /list/wishlist**

### Auth

- JWT auth
  -added after core features have first been implemented
  - stored JWT in localStorage, remove when a user logs out
  - change UI for some pages for when the user is logged in or out

## Roadmap

- Feature: Home page

- Feature: Header

  - create a nav list menu with links to the home page, profile page and questionnaire

- Feature: List of books

  - implement list page
  - create GET /list endpoint
  - create GET /list/read and GET /list/recommendations
  - create POST /list/read
  - states for adding books

- Feature: View Book

  - implement single book page
  - create Get / book/:id endpoint
  - add link to the list page for read

- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login
  - Implement login page + form
  - Create POST /users/login endpoint

## Nice-to-haves

- Top 5 books in profile page
- Wish list
- link to buy, if online link to buy page, if offline link to location. price
- Search Page: search, view, books
- Ratings function
- Forgot password functionality
- More books
- Forgot password functionality
- Ability to add books not in the system to wishlist / read books list

- filter in recommendations to show if in wishlist
