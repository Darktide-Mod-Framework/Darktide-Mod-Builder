let tasks = {
    // Prints all existing commands with params
    help: require('./tasks/help'),

    // Sets and/or displayes config file values
    // Limited to non-object values
    config: require('./tasks/config'),

    // Creates a copy of the template mod and renames it to the provided name
    // Uploads an empty mod file to the workshop to create an id
    create: require('./tasks/create')
};

module.exports = tasks;