# Cline Frontend (Angular) Bootcamp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Project Setup

1. Clone this repo
2. Run `npm install`
3. Run `ng serve`

## VS Code Setup (EG environment)

1. Make sure you VS Code installed, and have set up GitHub Copilot for it
2. Install the Cline extension
3. In cline settings choose `VS Code LM API` as the api provider, and a good language model, such as `copilot - claude-3.5-sonnet` as the language model.

## Example prompts

Note: consider deleting the content in app.component.ts first; it seems that Cline has sometimes trouble replacing it.

1:
```
@/src/app/app.component.html @/src/app/app.component.ts : Replace the Angular boilerplate code (replace everything in the HTML page). I want to create a search UI for countries. This will have a text field for country name, and a 'search' button. The search results should simply contain a list of common names of the countries returned by the back end.
```

2:
```
Please show the flag of the country in front of the country name in the search results.
```
