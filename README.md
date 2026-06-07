# Athena GK/GS Quiz Platform

A premium, modern, single-page web application (SPA) designed to play General Knowledge (GK) and General Studies (GS) quizzes. It features real-time performance tracking (stats) and a built-in client-side **PDF Quiz Importer** that parses multiple-choice question sheets automatically.

## 🚀 How to Run the App

This application is designed to be fully self-contained and runs client-side in the browser. You do **not** need a local server (like Node.js or Python) to run it.

1. Locate the project folder at `C:\Users\r7277\.gemini\antigravity\scratch\gk-gs-quiz-app` on your system.
2. Double-click the **[index.html](file:///C:/Users/r7277/.gemini/antigravity/scratch/gk-gs-quiz-app/index.html)** file.
3. The app will open instantly in your default web browser (Chrome, Edge, Firefox, or Safari).

---

## 📚 PDF Quiz Formatter Guide

The built-in PDF parser uses regular expression models to automatically extract questions, choices, and answers from text-based PDFs. For the best parsing results, format your quiz documents like the following templates:

### Format Template 1 (Standard numbered)
```text
1. Who is known as the Father of the Indian Constitution?
(a) Mahatma Gandhi
(b) Dr. B.R. Ambedkar
(c) Jawaharlal Nehru
(d) Dr. Rajendra Prasad
Ans. (b)

2. What is the minimum age required to become the President of India?
A) 25 years
B) 30 years
C) 35 years
D) 40 years
Answer: C
```

### Format Template 2 (Prefix format)
```text
Q1. Which is the largest ocean on Earth?
A. Atlantic Ocean
B. Indian Ocean
C. Arctic Ocean
D. Pacific Ocean
Correct Option: D
```

### 💡 Parser Highlights:
- **Questions**: Start with a number followed by a dot, parenthesis, or bracket (e.g. `1.`, `Q1.`, `2)`, `[3]`).
- **Options**: Start with standard options letters (e.g. `A)`, `(b)`, `C.`, `d.`).
- **Answers**: Prefix with common answer tokens (e.g. `Ans.`, `Answer:`, `Correct Option:`, `Key:`) followed by the option letter (`A`, `B`, `C`, or `D`).
- **Verification Editor**: Even if your PDF has unusual layouts, formatting errors, or watermarks, **the app will not fail**. Once loaded, it shows a **Verify & Edit wizard** listing all parsed questions. You can manually adjust texts, change the correct answers, delete unwanted text, or click "Add Question" to manually add more.

---

## ✨ Features

- **Premium Aesthetics**: Dark mode default UI featuring HSL color schemes, glassmorphism, responsive CSS Grid, and custom scrollbars.
- **Dynamic Quiz Engine**: Smooth progress tracking, instant question feedback (correct/incorrect answer highlights), and countdown timers.
- **Score Visualizer**: Interactive radial progress charts, headline reviews, and question-by-question breakdown matching user selections against correct answers.
- **Performance Analytics**: Dashboard tracking total quizzes played, average scores, and cumulative questions solved.
- **LocalStorage Sync**: Custom quizzes and user stats are stored directly in your browser. All data stays offline on your machine.
