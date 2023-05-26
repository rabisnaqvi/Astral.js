# Contributing to Astral.js

Thank you for considering contributing to Astral.js! We welcome any contributions that help improve the library and make it even better. By contributing, you can help us fix bugs, add new features, enhance documentation, and more.

To ensure a smooth collaboration and maintain a high-quality codebase, please follow the guidelines below when contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Contributing Guidelines](#contributing-guidelines)
    - [Bug Reports](#bug-reports)
    - [Feature Requests](#feature-requests)
- [Code Style](#code-style)
- [License](#license)


Thank you for your interest in contributing to this project! We welcome contributions from everyone. Please read this document to understand the process for contributing.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code. Please report any unacceptable behavior to the project maintainers.

## How to Contribute

To contribute to this project, please follow these steps:

1. Make sure there is an internal branch associated with the issue you are working on. If the branch doesn't exist, create one.
2. Fork this repository to your own GitHub account.
3. Clone the forked repository to your local machine.
4. Create a new branch from the internal branch for the specific issue you are working on.
5. Implement your changes or fixes in the new branch.
6. Make sure your code follows the project's code style and guidelines.
7. Run the tests `npm run test` to ensure that your changes don't break any existing functionality.
8. Run the formatter `npm run format` to ensure that your code is formatted correctly.
9. Run the linter `npm run lint` to ensure that your code adheres to the project's code style.
10. Run the build `npm run build` to ensure that your code builds successfully.
11. Commit your changes with descriptive commit messages. (🤗 Emojis are appreciated!)
12. Push the branch to your forked repository.
13. Open a pull request (PR) from your branch to the internal branch associated with the issue.
14. The PR will be reviewed by the project maintainers. Please be patient during the review process.
15. Once the PR is approved, your changes will be merged into the internal feature branch.
16. A new PR will be generated to merge the internal feature branch into the release-candidate branch.
17. The features/fixes will undergo testing and pre-release tasks on the release-candidate branch.
18. When the features/fixes are tested and ready to be released, a PR will be generated to merge the release-candidate branch into the main branch.

Please note that the project maintainers may request further changes to the code before merging the PR. By submitting a PR, you confirm that you have the right to license your contribution under the project's license.


## Contributing Guidelines

### Bug Reports

If you encounter a bug while using Astral.js, please [open an issue](https://github.com/rabisnaqvi/Astral.js/issues). Before opening an issue, please check if a similar issue already exists. If it does, you can add a comment to the existing issue instead of opening a new one.

When opening a new issue, please provide as much information as possible. Include the following details:

- Provide a descriptive title for the issue.
- Clearly describe the problem, including steps to reproduce it.
- If possible, include any relevant code examples or screenshots.

Submit the issue, and we'll review it as soon as possible.

### Feature Requests

If you have a suggestion for a new feature or improvement in Astral.js, we'd love to hear it. To submit a feature request, follow these steps:

1. [Open an issue](https://github.com/rabisnaqvi/Astral.js/issues/new/choose) and select the "Feature Request" template.
2. Provide a descriptive title for the feature request.
3. Clearly describe the feature you'd like to see added.
4. If applicable, include any supporting information such as code snippets, diagrams, or examples.
5. Submit the issue, and we'll review it as soon as possible.

## Code Style

To maintain a consistent code style throughout the project, we use ESLint and Prettier. Before submitting a pull request, please ensure that your code adheres to the linting rules and passes all tests. You can run the following command to check your code:

```bash
npm run format
npm run lint
```

## License

Astral.js is licensed under the [MIT License](https://github.com/rabisnaqvi/Astral.js/blob/main/LICENSE.md). By contributing to the project, you agree to license your contributions under the same license.


---

We appreciate your interest in contributing to Astral.js. Your contributions are valuable and will help make the library more robust and feature-rich. If you have any questions, feel free to reach out to us.

Happy coding!

The Astral.js Team