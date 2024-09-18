# Trivia Game

## Overview

This is a simple trivia game built using React. Users answer multiple questions, and their score is displayed at the end of the quiz. The game fetches questions from the API and ensures that only valid questions are presented.

## Features

- **Responsive Design:** The app is designed to be responsive and works well on various devices including desktops and mobile phones.
- **Loading Spinner:** A spinner is shown while the question is being fetched.
- **Score Tracking:** Users' scores are tracked and displayed at the end of the quiz.

## Technologies Used
React
Axios
React Loader Spinner
TypeScript

## Key Functions of Quiz.tsx
fetchData(): Fetches a new question and updates state. Handles empty results by retrying.
handleOptionClick(optionText): Tracks the user's selected answer.
handleNext(): Moves to the next question or ends the quiz.
handleReset(): Resets the quiz and score.
