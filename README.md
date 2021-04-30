# KevinGilbertWiffleball

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploying

Code should be built and deployed with Node 12. You may need to install nvm to manage your node versions correctly. The following steps will allow you to run the build with the relevant version:
`nvm install 12.0.0`
`nvm use 12.0.0`

Run `firebase login` and login to the correct project.

Run `firebase use kevin-gilbert-wiffleball-<env>` to switch to the environment you'd like to deploy to.

Run `ng deploy` to deploy the code.

## Viewing Logs

1. Install `gloud` command line tools.
2. `gcloud auth login`
3. `gcloud config set project kevin-gilbert-wiffleball-<env>`
4. `gcloud functions logs read`

## FAQ

Build fails with:
```
Error: budgets: initial exceeded maximum budget. Budget 1.00 MB was not met by 24.20 kB with a total of 1.02 MB.
ENOENT: no such file or directory, rename 'dist\kevin-gilbert-wiffleball\dist\kevin-gilbert-wiffleball\browser\index.html' -> 'dist\kevin-gilbert-wiffleball\dist\kevin-gilbert-wiffleball\browser\index.original.html'
```
This is different from the warning, this error will completely gate the build. You'll need to update the `budgets` field in `angular.json` to allow the build to deploy correctly.


