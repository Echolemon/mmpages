## Masters Advanced Software Project (SWEN90013) - Team Missing Mezzuzot

# Backend

This repository contains the backend of the Mezzuzot Project web application. It is a Node.js app, and makes use of several npm packages, including express, cors, jest and qs. API endpoints for this backend can be found under `Handover - Design` > `Handover - API Endpoints` in [Handover Documentation](./Handover-Documentation.pdf). This backend communicates with the DynamoDB database using the aws-sdk package.

&nbsp;

## Instructions to run (dev)
(For first time) Run `npm install`
1. `npm run dev` to start the server on localhost
2. Send requests to 'http://localhost:8080/'

&nbsp;

## Testing Instructions

- [Jest](https://jestjs.io/) is chosen as the test tool.
- All test files are located in the `/Backend/tests` folder.
- Setup
  - Open terminal and move to `/Backend`
  - Type `npm install` to install all the dependencies. 
  - Type `npm run test` to run.
- More details can be found in `Handover - Testing Plan` under [Handover Documentation](./Handover-Documentation.pdf)

&nbsp;

## Git Rebase instructions

Make sure you have already pushed your local branch to remote before following these steps

1. `git checkout dev`
2. `git pull`
3. `git checkout <branch>` where <branch> is the branch you have been working on
4. `git rebase dev`
5. Resolve any merge conflicts if necessary
6. `git push --force`
  
&nbsp;