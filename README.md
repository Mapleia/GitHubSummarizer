# GitHub Summarizer

A GitHub app to see the list of issues in one place.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Useful links

- https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app
- https://github.com/octokit/octokit.js
- https://www.npmjs.com/package/@octokit/types
- https://bareynol.github.io/mui-theme-creator

## To Do List

- [x] User should be able to provide GitHub organization and repository to fetch issues
- [x] Pagination is used to navigate between pages
- [x] Issues can be filtered by state:
  - open
  - closed
  - all
- [x] Issues can be sorted by:
  - created date
  - updated date
  - amount of comments
- User should be able to select an issue to view details
- Selected issue can be bookmarked/unbookmarked
- Bookmarked issues are presented separately

## Setup

1. If you haven't already, install Node.js.
2. If you haven't already, browser extensions like React Dev-Tools and Redux Dev-Tools is highly recommended.
3. Run
   ```sh
     npm i
   ```
4. Create private access token in GitHub -> Personal Settings -> Developer Settings.
5. Set the key value to the environmental variable (see `.env.template`).
5. Run the start command (`npm start`) to see the project in development mode.

### Side notes
Tried to authenticate this app with GitHub App credentials, not working at the moment.
Steps needed to set it up to try it is below.
1. Create a GitHub App to get GitHub API access, and download the private key.
2. Convert the .pem key to a .key and fill in the .env variable with it's content ([explained why here](https://github.com/gr2m/universal-github-app-jwt)).

   ```sh
     openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private-key.pem -out private-key-pkcs8.key
   ```
## Library Notes

- `MUI` (Material UI) was picked as the library for UI components.
- `Redux` (Toolkit) is used for state management.
- `Octokit` is used for easier access to GitHub APIs.
- `fontsource` is used to load in fonts

## Production Deployment

To have a production ready deployment, simply build then host the Docker container.

```sh
export APP_TAG="v0.1.0"
docker build -t "GitHubSummarizer:$APP_TAG" .
```

```ps1
$env:APP_TAG="v0.1.0"
docker build -t "GitHubSummarizer:$env:APP_TAG" .
```

## Known Issues

The webpack version (5) used to build the create-react-app does not polyfill anymore, thus variables like `process.env` is not available (not that it should be on a frontend app anyways...).

To fix this, [this advice](https://stackoverflow.com/a/70982884) was heeded, in combination with [this advice](https://stackoverflow.com/a/63281179)

Or, prefix the variable name with `REACT_APP_...`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

> Currently not available.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run lint`

Lints the application according to the `.eslintrc.js` configuration, and fixes any automatically fixable mistakes. This config enforces code style rules as well.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
