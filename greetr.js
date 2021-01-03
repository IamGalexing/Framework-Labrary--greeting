(function (global, $) {
  let newGreeting = (firstname, lastname, language) => {
    return new Greetr(firstname, lastname, language);
  };

  // hidden within the scope of the IIFE and never directly accessible
  const supportedLanguages = ["en", "es"];

  // informal greetings
  const greetings = {
    en: "Hello",
    es: "Hola",
  };

  // formal greetings
  const formalGreetings = {
    en: "Greetings",
    es: "Saludos",
  };

  // logger messages
  const logMessages = {
    en: "Logged in",
    es: "Inicio session",
  };

  class Greetr {
    constructor(firstname, lastname, language) {
      this.firstname = firstname || "";
      this.lastname = lastname || "";
      this.language = language || "en";
    }

    // 'this' refers to the calling object at execution time
    fullName() {
      return `${this.firstname} ${this.lastname}`;
    }

    validate() {
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    }

    // retrieve messages from object by referring to properties using [] syntax
    greeting() {
      return `${greetings[this.language]} ${this.firstname} !`;
    }

    formalGreeting() {
      return `${formalGreetings[this.language]}, ${this.fullName()}`;
    }

    // chainable methods return their own containing object
    greet(formal) {
      let msg;

      // if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    }

    log() {
      if (console) {
        console.log(`${logMessages[this.language]}: ${this.fullName()}`);
      }

      return this;
    }

    setLanguage(lang) {
      this.language = lang;

      this.validate();

      // make chainable
      return this;
    }

    setGreetingToElement(selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }

      if (!selector) {
        throw "Missing jQuery selector";
      }

      let greeting = formal ? this.formalGreeting() : this.greeting();

      $(selector).html(greeting);
    }
  }

  // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
  global.Greetr = global.G$ = newGreeting;
})(window, jQuery);
