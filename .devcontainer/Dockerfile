# Use the official Node.js image as a base
FROM node:16

# Install Deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

# Add Deno to the PATH
ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

# Set the working directory
WORKDIR /workspace

# Install any additional dependencies if needed
# RUN apt-get update && apt-get install -y <your-dependencies>

# Expose any ports if necessary
# EXPOSE <port>
