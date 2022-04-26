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