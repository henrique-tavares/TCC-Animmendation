module.exports = {
  client: {
    service: {
      name: "animmendation",
      // URL to the GraphQL API
      url: "http://host.docker.internal:4000/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.ts"],
  },
};
