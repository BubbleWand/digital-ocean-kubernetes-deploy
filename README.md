# Bubble API

An API for the Bubble app.

## Status
[status.blowabubble.com](http://status.blowabubble.com)

![Image Size Flag](https://img.shields.io/docker/image-size/ikejs/bubble-api)
![Build Status Flag](https://img.shields.io/circleci/build/github/BubbleWand/api)
![Ping Status Flag](https://img.shields.io/website.svg?url=http://api.blowabubble.com/)

## Installation

Install using Docker

```bash
docker pull ikejs/bubble-api
```
```bash
docker run -it ikejs/bubble-api
```
Make requests to [localhost:3000](http://localhost:3000).

## Endpoints
### /signup [POST]
- username
- password
- displayName
- phone
- email
- profilePhoto (file)

Responses
```json
{
    "msg": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi...",
    "user": {
        "...": "..."
    }
}
```
```json
{
    "errors": ["That account already exists!"]
}
```


### /login [POST]
- username
- password


Responses
```json
{
    "status": 200,
    "message": "Success: Logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi..."
}
```
```json
{
    "errors": ["That account already exists!"]
}
```
