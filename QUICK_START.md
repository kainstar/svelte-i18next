# typescript-npm-package-template

> Template to kickstart creating a Node.js module using TypeScript and VSCode

Fork from [typescript-npm-package-template](https://github.com/ryansonshine/typescript-npm-package-template) and make some changes to make to easy use for me.

## Features

keep most features in source repo.

## Changes

- Newer dependencies version
- ESLint version and rules
- remove prepare-commit-msg hooks, use [commitlint](https://github.com/conventional-changelog/commitlint) instead
- Configuration File Location
- Windows and mac compatible
- Private customization

## Getting started

### Create your repository

**Click the "Use this template" button.**

Alternatively, use [tiged](https://github.com/tiged/tiged) downloading repo to your local computer.

```bash
REPO_NAME="repo-name"
pnpx tiged@latest github:kainstar/typescript-npm-package-template $REPO_NAME
# optional install dependencies
cd $REPO_NAME && pnpm install
```

### Initialize your repository

Replace `REPO_NAME` in the script below with your own details to personalize your new package:

Linux or MacOS:

Since incompatible `sed` command in BSD and GNU, I use [`sd`](https://github.com/chmln/sd) to replace string in files, install it with `brew install sd` or `cargo install sd`.

```bash
NPM_PKG_NAME="pkg-name"
sd "(@kainstar/typescript-npm-package-template|my-package-name)" "$NPM_PKG_NAME" package.json README.md

REPO_NAME="repo-name"
sd "(typescript-npm-package-template)" "$REPO_NAME" package.json README.md
```

Windows:

```powershell
$NPM_PKG_NAME="pkg-name"
$REPO_NAME="repo-name"

foreach ($File in @("package.json", "README.md")) {
  (Get-Content $File) | %{$_ -replace "@kainstar/typescript-npm-package-template|my-package-name", $NPM_PKG_NAME} | %{$_ -replace "typescript-npm-package-template", $REPO_NAME} | Set-Content $File
}
```

### Add Token Secrets to GitHub

- Add your npm token to your GitHub repository secrets as `NPM_TOKEN`.

- Add your github token to your GitHub repository secrets as `GH_TOKEN`.

### Add Codecov integration

Enable the Codecov GitHub App [here](https://github.com/apps/codecov).
