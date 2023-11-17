class ServerException extends Error {
  
    constructor(message, code) {
      super(message); // (1)
      this.code = code;
    }
  }
  
  module.exports = ServerException;