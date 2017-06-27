# To-Do List Facebook Messenger Bot

## Table of Contents
1. [About](#about)
1. [Requirements](#requirements)
1. [Development](#development)

## About

A Facebook Messenger Bot that creates and lists tasks as well as delete them

## Requirements
- Node
- Yarn

## Development
- Clone repo
- Run `yarn install`

## Demo of Core Functionality
- Login to your Facebook to communicate with the bot at `https://www.messenger.com/t/488335691503172`
- Use the following requests in your message:
  - `LIST`- bot will list all your tasks
  - `#<int> DONE`- bot marks this task as complete. For example, `#3 DONE`
  - `ADD <task description>`- bot adds this task to your LIST
  - `LIST DONE`- bot lists all completed tasks

## Schema Design

- User
 - Id
 - Username
- Tasks
 - Id
 - Description
 - Date_created
 - Date_modified
- Tags (To Do)
 - Id
 - Name
- Task_tags (associative table- To Do)
 - Id
 - Task_id
 - Tag_id

## To Do
- add delete and update functionality
- add ability to add tags. User can request all tasks under a specified tag
- add search functionality
- make bot messages more personalized and informal, e.g. NLP
- Make use of Facebook’s message template to provide a richer UI experience
