# dishboard backend

Contains the code for the dishboard backend.

## Installation

Follow these steps for the first-time setup:

### 1. Install yarn

Follow the instructions from [yarn's website](https://classic.yarnpkg.com/lang/en/docs/install) to install the `yarn` CLI.

### 2. Install dependencies

Run `yarn install`.

### 3. Install docker

Create a [Docker account](https://hub.docker.com/signup).

Install [Docker](https://docs.docker.com/install/).

Run `docker login`.

### 4. Create and start the database

- If this is your first-time setup - run `yarn server db-create` (from the root workspace `fullstack/task`). This will create (and overwrite!) a docker container for the database.
- Otherwise, run the docker container that was created during the first-time setup.

### 5. Start the server

Run `yarn server start` from the root workspace.

## Updating database entities

The databasee synchronization is turned off by default. Whenever you update an entity and want to propagate that change to the database you need to run a migration.

First, generate the migration. Make sure to use a descriptive name, like in a commit message.

```
yarn server migration -c generate --name migration-name
```

This will create a file describing all the changes to the database, s.t. it can be replicated or reverted easily. 

All pending migrations are ran automatically when the server starts.
