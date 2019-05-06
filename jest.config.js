const path = require('path');

module.exports = {
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "json"],
    moduleDirectories: [path.resolve("."), "node_modules"],
    testRegex: "/test/.*[.]tests[.](ts|js)$",
    reporters: [
        "default",
        ["jest-junit", { outputDirectory: "test-reports" }]
    ]
};