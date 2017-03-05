module.exports = {

  friendlyName: 'Say hello',

  description: 'Log a hello message with a generated secret code and other information',

  extendedDescription: 'This example machine is part of machinepack-boilerplate, used to introduce everyone to machines.',

  inputs: {

    name: {

      example: 'John',

      description: 'The name of the person that will be sent the hello message.',

      required: true
    },
    email: {

      example: 'example@example.com',

      description: 'The email of the person that will be sent the hello message to.',

      required: true
    }

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'An unexpected error occurred.'
    },

    success: {
      example:  {
        numLettersInName: 4,
        secretCode: "e9ec627220bc9e8ca66f916b7fba92f3"
      },
    },

    wrongEmailFormat: {
       description: 'User entered wrong email format'
    }

  },

  fn: function (inputs, exits) {
    const validator = require('validator');   


    // Generate a secret code.
    var secretCode = ''+(Math.random());

    // Get the number of characters in the provided `name`.
    var nameLength = inputs.name.length;
    var emailLength = inputs.email.length; 


    // sanity check on email format
    if (!validator.isEmail(inputs.email)){
      return exits.wrongEmailFormat(); 
    }

    // Log the provided name and the secret code.
    console.log('Hello %s, your email is %s and your secret code is %s', inputs.name, inputs.email, secretCode);

    // Return an object containing myLength and the secretCode
    return exits.success({
      numLettersInName: nameLength,
      numLettersInEmail: emailLength,
      secretCode: secretCode
    });

  }

};
