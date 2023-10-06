<br/>

<br/>

<p align="center">
  <img src="https://github.com/sliit-foss/bashaway-official/assets/73662613/c15f7a94-592b-410f-b581-c98d25a9ca42" width="420" alt="Bashaway Logo"/>
</p>

<br/>

<p align="center">
  <a aria-label="SLIIT FOSS logo" href="https://sliitfoss.org">
    <img src="https://img.shields.io/badge/Made_by_the_SLIIT_FOSS_Community-blue">
  </a>
  <a aria-label="License" href="https://github.com/sliit-foss/scorekeeper/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

<br/>

# Scorekeeper

An automated testing and scoring solution which leverages the power of GitHub Actions

---

## Invoking tests

```bash
curl --location 'https://api.github.com/repos/sliit-foss/scorekeeper/dispatches' \
--header 'Authorization: Bearer {{personal_access_token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "event_type": "run-{{env}}-tests",
    "client_payload": {
        "name": "Runtime Terror",
        "email": "akalankaperera128@gmail.com",
        "submission_id": "64d295ffc4d6d90618f8bf79",
        "submission_url": "{{url}}/submission.zip",
        "question_url": "{{url}}/question.zip",
        "question_name": "Fool's Gold",
        "strict_inputs": true
    }
}'
```

## Constraints

- The runner OS is Ubuntu 20.04 LTS. Please make sure your submission scripts are compatible with it.
- Jobs must finish executing within a maximum of 5 minutes
- All tests must pass for a submission to be scored

## Getting started

- Run `pnpm install` to install all dependencies
- Run `pnpm dev` to start the development server

## Commit messages

- We follow conventional commits during our development workflow as a good practice. More information can be found at their official [documentation](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#examples)
- Refer the [commitlint.config.js](https://github.com/sliit-foss/scorekeeper/blob/main/commitlint.config.cjs) file for a full list of supported commit message prefixes

## Additional tools

- This project is bootstrapped with [Lefthook](https://evilmartians.com/opensource/lefthook), [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/). Please make good use of them.

<br/>
