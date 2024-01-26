# Project Title

LetterBooks

## Overview

A new way to find book recommendations. With records of your personal book history along with a little questionnaire about what you're looking for, this app will find the best recommendations for your next book adventure.

### Problem

For the ongoing struggle of not knowing what to read, of having just finished a book or a series and not knowing where to go next, or just of wanting to have a record of all the books you've read in one place. People in this position will usually go down the time-consuming process of going down Google search rabbit hole, having to ask way too many people for recommendations and then being bombarded with a bunch of suggestions that do not fit the criteria they are looking for.

Whether there is a solid idea of what you're looking for or none at all, the user can input what they would want in the next read into this app, and it will generate the most appropriate option(s) for the next, taking into accounts the length of the book, the location of the user, the read themes and desired themes, fiction or non-fiction, online or offline, perhaps an audiobook and many more.

### User Profile

Avid book readers or people trying to get into reading who:

- are a bit lost trying to find their next read
- want to keep track of which books they have read.

### Features

- As a user, I want to be recommended what book I should read next, with a questionnaire.

- As a user, I want to be able to create an account to manage my library of books.
- As a user, I want to be able to log in to my account to manage my library of books.

- As a logged in user, I want to be able to make a list of the books I have read

#### Nice to have

- As a logged in user, I want to be able to update a rating of a book out of 5
- As a logged in user, I want to be able to rate a book out of 5

- As a logged in user, I want to be able to make a list of the books that I would like to read

## Implementation

### Tech Stack

- React
- mySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - express

### APIs

no external APIs used

### Sitemap

- Register page / Login page
- Home page: short explanation of app, menu with browse, read list,
- Single book page: image, title, author, blurb/short summary of the story, add to list
- Personal info page: name, drop down lists of read books and want to read books, link to questionnaire
- List page: list of books added from read books list, results for recommendations
- Questionnaire for next book recommendation: form of questions and drop down options

#### Nice to have

- List page: want to read books
- Home page: link to wish list

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

figma link / screenshots of figma page

![](./mockups/header.png)
![](./mockups/homepage.png)
![](./mockups/list.png)
![](./mockups/profile.png)
![](./mockups/singlebook.png)

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

hard code around 10 themes with 5 books each

user table:

- user
- email
- password

book table:

- book id
- author id
- theme id
- title
- img
- number of pages
- description

author table:

- author id
- author name

theme table:

- theme id
- theme

join table:

- id
- book id
- theme id

#### Nice to have

link to api to get larger range of books and information about the books, e.g. ratings

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

**GET /book**

- Get data for all books
  **GET /book/:id**
- Get data for a single book

**GET /list**

- Get all list
  **GET /list/read**
- Get list of read books
  **POST /list/read**
- Add book to list of read books

**GET /list/recommendations**

- Get a list of book recommendations

**POST /questionnaire**

- add information from questionnaire to find the book(s) that meet the most requirements

#### Nice to have

**POST /users/register**

- Add a user account

**POST /users/login**

- Login a user

**GET /list/wishlist**

- Get list of books already added onto wishlist
  **POST /list/wishlist**
  -Add a book to the wish list

  delete books from list

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

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

#### Nice to have

- GET /list/wishlist
  -POST /list/wishlist endpoints

- add link to the list page for read or wishlist

## Nice-to-haves

- top 5 books in profile page
- wish list
- link to buy, if online link to buy page, if offline link to location. price
- Search Page: search, view, books
- ratings function
