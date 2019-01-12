# From image
FROM javierbrea/node-headless-chrome:1.0.0

# Set the working directory
WORKDIR /narval

# Copy resources
ADD ./install-resources .
ADD ./docker-resources .

# Copy resources
RUN ["chmod", "-R", "775", "."]
RUN ["ls", "-la"]

# Run install script
RUN ./.narval/scripts/install.sh

# Expose ports

# Start service
CMD ["sh", "-c", "./.narval/scripts/run-cmd.sh \"${command_to_run}\" \"${command_params}\" \"${coverage_options}\" \"${coverage_enabled}\" \"${wait_on}\" \"${exit_after}\""]
