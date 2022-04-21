# dev-containers

This workshop will guide you through setting up vscode dev containers to work with an existing project.

The aim of the workshop is that a new user will be able to click a button on the Github repo that will setup their
workspace for them. The user should immediately be able to run the server and execute the tests.

## Dependencies

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Visual studio code](https://code.visualstudio.com/)
- [Remote containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)


## The Project

This repository contains a simple express application that depends on a Postgres database as well as an AWS S3 bucket.
It has a single endpoint, `/health`, that checks the database and S3 connection. This endpoint has an integration test
that will fail if we haven't correctly setup the application dependencies.

We'll need to setup a local docker container and authenticate with AWS to access the S3 bucket in the sandbox account.

## Workshop Steps

### 1. Getting Started

Start by forking this repository into your Github account.
> We need to do this rather than creating a branch so that we can add the magic button at the end of the workshop.

Next clone the repository to your laptop.
We are now the same state as a new joiner. Typically they would have to install all of the required tools before they can develop. But we are going to get vscode dev containers to do it for them.

### 2. Converting to dev containers

Now let's convert the project to use dev containers. 

Create a new directory called `.devcontainer` and file in the directory called `devcontainer.json`. This file will describe our dev container for vscode. Let's start by pasting the following into the json file
```json
{
  "name": "dev-containers",
  "image": "node:16.14.0",
  "remoteUser": "node",
  "extensions": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "Prisma.prisma",
    "yzhang.markdown-all-in-one"
  ]
}
```
Where `name` is the name of the project, `image` is the image that the container should be built from and `user` is the user that we will sign in as in the container. We have also added some helpful vscode extensions like prettier and eslint so that the developer doesn't have to.

Now we are ready to start out container, do so by opening the vscode command palette and running the `Remote-containers: Reopen in container` command.
This command will locate the config we just added and build our basic dev container for us. It can take a little bit of time the first time you run it. You will know when it has finished once the bottom left corner of the vscode window shows green.

We are now inside our dev container, open up a terminal and try `node -v`, you should see `16.14.0`, the version of the image we chose. 

### 3. Installing docker

Next, we need docker inside the container in order to run our postgres container. We can see that docker isn't installed yet by running `docker ps`.

As we are already inside a container, we'll need to use a `docker-in-docker` solution. Luckily vscode makes that easy, simply open up the `devcontainer.json` file again and add the following line to it:
```json
  "features": {
    "docker-in-docker": "latest"
  },
```

Now open the command palette and run the `Remote-containers: Rebuild Container` to apply these changes to the container.

Once the container has rebuilt, try running `docker ps` again, this time you should see an empty table.

### 4. Authenticating with AWS

The `/health` endpoint will check for the presence of an S3 bucket in the tractable sandbox account so we'll need to authenticate with AWS to give
the server access to that bucket.

We'll need to install `saml2aws` into the container to be able to authenticate. We'll need to change our setup to use a Dockerfile that we can install the cli.

Start by creating a Dockerfile in the `.devcontainer/` directory and paste the following:
```Dockerfile
FROM node:16.14.0

ARG SAML2AWS_VERSION=2.33.0

RUN \
  # Update
  apt-get update -y && \
  # Install dependencies
  apt-get install unzip wget -y

################################
# Install saml2aws
################################

RUN \
    wget https://github.com/Versent/saml2aws/releases/download/v${SAML2AWS_VERSION}/saml2aws_${SAML2AWS_VERSION}_linux_amd64.tar.gz && \
    tar -xvzf saml2aws_${SAML2AWS_VERSION}_linux_amd64.tar.gz && \
    mv saml2aws /usr/local/bin
```


We'll also need to swap out the `"image"` property in the `devcontainer.json` file to point at the dockerfile:
```diff
-   "image":"node:16.14.0",
+   "build": {
+     "dockerfile": "./Dockerfile"
+   },
```

We can also mount our `saml2aws` and `aws` files into the container so that we can share credentials with our host machine (meaning if we are signed in on host then we are signed in on the container). Add the following to the `devcontainer.json`:
```json
  "mounts": [
    "source=${localEnv:HOME}/.saml2aws,target=/home/node/.saml2aws,type=bind,consistency=cached",
    "source=${localEnv:HOME}/.aws/,target=/home/node/.aws/,type=bind,consistency=cached"
  ]
```

Apply these changes by running the `Remote-containers: Rebuild Container` command again

Now we can authenticate with AWS by running `saml2aws login && eval "$(saml2aws script)"` and selecting the `sandbox` account.

### 5. Testing the server

First, let's run the `setup.sh` script at the root of the application. This script will pull the postgres docker image and start the container for us as well as install all the npm dependencies of the project.

Once this has finished we can give the tests a go:

`yarn test`

🎉🎉🎉🎉🎉🎉 The tests pass!!! 🎉🎉🎉🎉🎉🎉

We have successfully setup our development environment inside the docker container.

### 6. Final touches

The first final touch is to add a `postCreateCommand` to the `devcontainer.json` file to automatically run the `setup.sh` script when the container has finished starting up meaning there are no manual steps:

```json
  "postCreateCommand": "../setup.sh"
```

Finally, let's add a button to the README so that a new developer can spin up their development environment at the press of a button. Add the following to your README making sure to replace the link with a link to your own github repo:

```md
[![Open in Remote - Containers](https://img.shields.io/static/v1?label=Remote%20-%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/harrywithers/dev-containers)
```

All finished!!!

Commit your changes and push them up to the remote.

To test out the final product, shut the window and prune your laptop docker host: `docker container prune && docker volume prune`. Then click and the button and wait!
 
