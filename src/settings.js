const settings = {
    "RepChain": {
      "default": {
        "url_subscribe": "ws://localhost:8081/event",
        "url_api": "http://localhost:8081/"
      }
    },
    "Prisma": {
      "endpoint": "http://localhost:4466",
      "url_subscribe": "ws://localhost:4466/"
    },
    "Crypto": {
      "certificate_file_location": "../users",
      "prvkey_file_location": "../users"
    }
  }

  export default settings;