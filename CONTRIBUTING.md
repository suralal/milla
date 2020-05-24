# Contribution Guideline

Welcome to early draft of how to contribute to this repository. This guide broadly outlines on how to contribute to the repo.

* Clone the repo (Only if you havent done so before !)
* Pull the latest changes to main devleopment branch and checkout a new branch for working on the feature, bug etc
* Do whatever you were planning to do. Follow the style guide and add test cases if necessary
* Commit the changes . Follow commit message guidelines
* Push the new branch to repo and make a PR and assign it to someone. follow PR guideline
* After the code is reviewed and if its ready to go, merge and delete the branch.

### Style Guide

---

One of the early authors really hates unwanted usage of semicolons and decided to go with [Standard](https://github.com/standard/standard) coding style. Stick to it , CI is going to beat semicolons out of you anyway!

### Commit Message Guide

---

Each commit message should include a **type**, a **scope** and a **subject**:

```
 <type>(<scope>): <subject>
```

Lines should not exceed 100 characters. This allows the message to be easier to read on github as well as in various git tools and produces a nice, neat commit log ie:

```
 #271 feat(standard): add style config and refactor to match
 #270 fix(config): only override publicPath when served by webpack
 #269 feat(eslint-config-defaults): replace eslint-config-airbnb
 #268 feat(config): allow user to configure webpack stats output
```

#### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope

The scope could be anything specifying place of the commit change. For example `webpack`,
`babel`, `redux` etc...

#### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### PR Guide

---

Make sure that a single PR has only a single feature or a fix or a chore activity in it (makes it easier to revert when found buggy at some later point!). Add a simple descriptive PR message explaining what the commit is about. Also explain if code contains something tricky or if have made changes to an exisiting part of the system (care to explain why?).

---

> **Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.**
