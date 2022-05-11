# Newsly Frontend

[Newsly](https://startling-wisp-52e360.netlify.app/)

## About

Newsly was created to be more than just a newsreader app. Being bombarded by articles and headlines and the highs and lows of normal news channels are commonplace in the world today. So when setting out to create Newsly, I wanted to do something more. I wanted to give someone a way to empirically track what they were exposing themselves to. And then I wanted to go one step further — to build an app where someone can choose their consumption preferences, and then be help accountable to them. For discipline, or for self-care, this mindful app for news consumption was created to put more control in the hands of the readers of news.

## Features

Newsly allows a user to create a profile and set a goal, allowing them to be aware of what types of news they're consuming. Users have the ability to change this goal later, as well as the ability to edit their user information, or even delete their accounts. In addition to the app's metrics tracking abilities, logged in users can take advantage of Newsly's bookmark feature, which lets users save articles on a shortlist to read later, or to revisit as they like.

Many other features are available to all users, registered or not. Every Newsly visitor can read the news on our site. They can browse through the newest published articles on Newsly's Front Page, or they can search for articles more aligned to their interests.

The features were implemented in this way to allow a wide variety of users to enjoy Newsly, whether or not they're trying to be careful of what they read.

## User Flow

The primary user flows all begin by landing on the Newsly homepage. Once there, a user can login or register for Newsly's services.

If they're new to the site, registration will prompt users to enter their names and to pick out a username. It will then ask users to pick a goal for their metrics to be measured against (this can be changed later). Once this is complete, users are returned to the homepage.

Whether or not a Newsly visitor has completed the login/register flow, they are free to begin browsing the news! Visitng the Front Page gives a user the most recently published articles, while the Search page allows a user to lookup different articles by section name or keyword.

## Tech Stack

Frotend:
- React
- React Router
- animejs
- CSS

Backend:
- Node/Express
- PostgreSQL
- Bcrypt
- Node-pg
- JSON Web Token

## Miscellaneous

Future goals for Newsly include the addition of functional pagination for the search page. At this time, only the pagination for the homepage is functional. 

Other goals for Newsly are stylistic, with the additions of more loading screens across all applicable pages where asynchronous operations may prevent the immediate viewing of data. Additional site animations and interactions will be added in further release versions.