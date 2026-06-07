/**
 * Athena GK/GS Quiz Application - Core Logic & PDF Parser
 */

// Application State
const STATE = {
  quizzes: [],
  stats: {
    quizzesTaken: 0,
    avgScore: 0,
    totalQuestionsSolved: 0,
    history: []
  },
  currentQuiz: null,
  currentQuestionIndex: 0,
  userAnswers: [], // stores index of selected answers (null if skipped)
  timerInterval: null,
  timeRemaining: 0,
  extractedQuestions: [],
  viewHistory: ['dashboard-view']
};

// DOM Elements
const DOM = {
  // Navigation
  logo: document.getElementById('nav-logo'),
  dashboardBtn: document.getElementById('nav-dashboard-btn'),
  importBtn: document.getElementById('nav-import-btn'),
  
  // Views
  dashboardView: document.getElementById('dashboard-view'),
  quizView: document.getElementById('quiz-view'),
  scoreView: document.getElementById('score-view'),
  importView: document.getElementById('import-view'),
  
  // Dashboard Elements
  quizzesContainer: document.getElementById('quizzes-container'),
  statQuizzesTaken: document.getElementById('stats-quizzes-taken'),
  statAvgScore: document.getElementById('stats-avg-score'),
  statTotalQuestions: document.getElementById('stats-total-questions'),
  resetStatsBtn: document.getElementById('reset-stats-btn'),
  quickStartBtn: document.getElementById('hero-quickstart-btn'),
  
  // Quiz Player Elements
  quizTitle: document.getElementById('quiz-run-title'),
  quizCategory: document.getElementById('quiz-run-category'),
  timerContainer: document.getElementById('quiz-timer'),
  timerVal: document.getElementById('timer-val'),
  progressBar: document.getElementById('quiz-progress-bar'),
  questionText: document.getElementById('quiz-question-text'),
  optionsList: document.getElementById('quiz-options-list'),
  quitBtn: document.getElementById('quiz-quit-btn'),
  nextBtn: document.getElementById('quiz-next-btn'),
  
  // Score Screen Elements
  scoreRadial: document.getElementById('score-radial-progress'),
  scoreTextVal: document.getElementById('score-text-val'),
  scoreHeadline: document.getElementById('score-headline'),
  scoreDesc: document.getElementById('score-desc'),
  scoreHomeBtn: document.getElementById('score-home-btn'),
  scoreRetryBtn: document.getElementById('score-retry-btn'),
  scoreReviewList: document.getElementById('score-review-list'),
  
  // PDF Importer Elements
  importTitle: document.getElementById('import-title'),
  importCategory: document.getElementById('import-category'),
  importTimeLimit: document.getElementById('import-time-limit'),
  dragZone: document.getElementById('pdf-drag-zone'),
  fileInput: document.getElementById('pdf-file-input'),
  importLogs: document.getElementById('import-logs'),
  uploaderPanel: document.getElementById('uploader-panel'),
  
  // Editor Wizard Elements
  editorPanel: document.getElementById('editor-panel'),
  editorQuizTitle: document.getElementById('editor-quiz-title-preview'),
  editorQCount: document.getElementById('editor-question-count'),
  editorQContainer: document.getElementById('editor-questions-container'),
  editorAddQBtn: document.getElementById('editor-add-q-btn'),
  editorCancelBtn: document.getElementById('editor-cancel-btn'),
  editorSaveBtn: document.getElementById('editor-save-btn'),
  
  // Modals & Overlays
  loadingOverlay: document.getElementById('loading-overlay'),
  loadingTitle: document.getElementById('loading-title'),
  loadingMsg: document.getElementById('loading-msg'),
  confirmOverlay: document.getElementById('confirm-overlay'),
  confirmCancelBtn: document.getElementById('confirm-cancel-btn'),
  confirmQuitBtn: document.getElementById('confirm-quit-btn')
};

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initEventListeners();
  renderDashboard();
});

// ----------------------------------------------------
// 1. DATA & STORAGE CONTROLLER
// ----------------------------------------------------
function initStorage() {
  // Load quizzes
  const storedQuizzes = localStorage.getItem('athena_quizzes');
  if (storedQuizzes) {
    try {
      STATE.quizzes = JSON.parse(storedQuizzes);
    } catch (e) {
      STATE.quizzes = window.DEFAULT_QUIZZES;
      localStorage.setItem('athena_quizzes', JSON.stringify(STATE.quizzes));
    }
  } else {
    // Seed default quizzes
    STATE.quizzes = window.DEFAULT_QUIZZES;
    localStorage.setItem('athena_quizzes', JSON.stringify(STATE.quizzes));
  }

  // Load stats
  const storedStats = localStorage.getItem('athena_stats');
  if (storedStats) {
    try {
      STATE.stats = JSON.parse(storedStats);
    } catch (e) {
      saveStats();
    }
  } else {
    saveStats();
  }
}

function saveStats() {
  localStorage.setItem('athena_stats', JSON.stringify(STATE.stats));
}

function saveCustomQuiz(quiz) {
  STATE.quizzes.push(quiz);
  localStorage.setItem('athena_quizzes', JSON.stringify(STATE.quizzes));
  renderDashboard();
}

function deleteQuiz(quizId) {
  STATE.quizzes = STATE.quizzes.filter(q => q.id !== quizId);
  localStorage.setItem('athena_quizzes', JSON.stringify(STATE.quizzes));
  renderDashboard();
}

function resetStats() {
  STATE.stats = {
    quizzesTaken: 0,
    avgScore: 0,
    totalQuestionsSolved: 0,
    history: []
  };
  saveStats();
  renderDashboard();
}

// ----------------------------------------------------
// 2. ROUTING & VIEWS SWITCHER
// ----------------------------------------------------
function showView(viewId) {
  const panels = [DOM.dashboardView, DOM.quizView, DOM.scoreView, DOM.importView];
  panels.forEach(panel => {
    panel.classList.remove('active');
  });

  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
  }

  // Update navbar active button
  DOM.dashboardBtn.classList.remove('active');
  DOM.importBtn.classList.remove('active');
  
  if (viewId === 'dashboard-view') {
    DOM.dashboardBtn.classList.add('active');
  } else if (viewId === 'import-view') {
    DOM.importBtn.classList.add('active');
  }
}

// ----------------------------------------------------
// 3. EVENT LISTENERS
// ----------------------------------------------------
function initEventListeners() {
  // Navigation
  DOM.logo.addEventListener('click', (e) => {
    e.preventDefault();
    if (STATE.currentQuiz) {
      showConfirmQuitModal();
    } else {
      showView('dashboard-view');
    }
  });

  DOM.dashboardBtn.addEventListener('click', () => {
    if (STATE.currentQuiz) {
      showConfirmQuitModal();
    } else {
      showView('dashboard-view');
    }
  });

  DOM.importBtn.addEventListener('click', () => {
    if (STATE.currentQuiz) {
      showConfirmQuitModal();
    } else {
      resetImportView();
      showView('import-view');
    }
  });

  DOM.resetStatsBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all your statistics and high scores? This cannot be undone.")) {
      resetStats();
    }
  });

  DOM.quickStartBtn.addEventListener('click', () => {
    if (STATE.quizzes.length > 0) {
      const randomIdx = Math.floor(Math.random() * STATE.quizzes.length);
      startQuiz(STATE.quizzes[randomIdx].id);
    } else {
      alert("No quizzes available. Please import a quiz using PDF Importer.");
    }
  });

  // Quiz Player
  DOM.quitBtn.addEventListener('click', () => {
    showConfirmQuitModal();
  });

  DOM.nextBtn.addEventListener('click', () => {
    nextQuestion();
  });

  // Score Screen Actions
  DOM.scoreHomeBtn.addEventListener('click', () => {
    showView('dashboard-view');
    renderDashboard();
  });

  DOM.scoreRetryBtn.addEventListener('click', () => {
    if (STATE.currentQuiz) {
      startQuiz(STATE.currentQuiz.id);
    }
  });

  // Quit Quiz Modal confirmation
  DOM.confirmCancelBtn.addEventListener('click', hideConfirmQuitModal);
  DOM.confirmQuitBtn.addEventListener('click', () => {
    hideConfirmQuitModal();
    clearInterval(STATE.timerInterval);
    STATE.currentQuiz = null;
    showView('dashboard-view');
    renderDashboard();
  });

  // PDF Drag & Drop
  DOM.dragZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    DOM.dragZone.classList.add('dragover');
  });

  DOM.dragZone.addEventListener('dragleave', () => {
    DOM.dragZone.classList.remove('dragover');
  });

  DOM.dragZone.addEventListener('drop', (e) => {
    e.preventDefault();
    DOM.dragZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handlePDFFile(e.dataTransfer.files[0]);
    }
  });

  DOM.fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handlePDFFile(e.target.files[0]);
    }
  });

  // Editor Wizard Actions
  DOM.editorAddQBtn.addEventListener('click', () => {
    addNewEmptyQuestionEditorCard();
  });

  DOM.editorCancelBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to discard the parsed questions?")) {
      resetImportView();
    }
  });

  DOM.editorSaveBtn.addEventListener('click', () => {
    saveParsedQuiz();
  });
}

// ----------------------------------------------------
// 4. DASHBOARD RENDERER
// ----------------------------------------------------
function renderDashboard() {
  // Update stats cards
  DOM.statQuizzesTaken.innerText = STATE.stats.quizzesTaken;
  DOM.statAvgScore.innerText = `${Math.round(STATE.stats.avgScore)}%`;
  DOM.statTotalQuestions.innerText = STATE.stats.totalQuestionsSolved;

  // Render quizzes
  DOM.quizzesContainer.innerHTML = '';
  
  if (STATE.quizzes.length === 0) {
    DOM.quizzesContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 1rem;">No quizzes found.</p>
        <button class="btn btn-primary" onclick="showView('import-view')">Import Quiz from PDF</button>
      </div>
    `;
    return;
  }

  STATE.quizzes.forEach(quiz => {
    const isCustom = quiz.id.startsWith('custom-');
    
    // Find if user has a high score for this quiz
    const quizHistory = STATE.stats.history.filter(h => h.quizId === quiz.id);
    let highScoreText = 'Not Played';
    if (quizHistory.length > 0) {
      const maxScore = Math.max(...quizHistory.map(h => h.percentage));
      highScoreText = `Best: ${Math.round(maxScore)}%`;
    }

    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span class="quiz-category ${quiz.category || 'Custom'}">${quiz.category || 'Custom'}</span>
          ${isCustom ? `
            <button class="editor-qcard-delete" onclick="event.stopPropagation(); handleDeleteQuiz('${quiz.id}')" title="Delete Quiz">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          ` : ''}
        </div>
        <h3 class="quiz-title">${escapeHTML(quiz.title)}</h3>
        <p class="quiz-desc">${escapeHTML(quiz.description || '')}</p>
      </div>
      <div class="quiz-meta">
        <div class="quiz-qcount">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span>${quiz.questions.length} Questions</span>
        </div>
        <span style="font-weight: 600; font-size: 0.8rem; color: var(--text-muted);">${highScoreText}</span>
        <button class="quiz-play-btn" onclick="event.stopPropagation(); startQuiz('${quiz.id}')">Start</button>
      </div>
    `;
    card.addEventListener('click', () => startQuiz(quiz.id));
    DOM.quizzesContainer.appendChild(card);
  });
}

window.handleDeleteQuiz = function(quizId) {
  if (confirm("Are you sure you want to delete this custom quiz? This cannot be undone.")) {
    deleteQuiz(quizId);
  }
};

// ----------------------------------------------------
// 5. QUIZ RUNNER INTERFACE
// ----------------------------------------------------
function startQuiz(quizId) {
  const quiz = STATE.quizzes.find(q => q.id === quizId);
  if (!quiz) return;

  if (quiz.questions.length === 0) {
    alert("This quiz has no questions. Please add questions first.");
    return;
  }

  STATE.currentQuiz = quiz;
  STATE.currentQuestionIndex = 0;
  STATE.userAnswers = new Array(quiz.questions.length).fill(null);
  
  DOM.quizTitle.innerText = quiz.title;
  DOM.quizCategory.innerText = `Category: ${quiz.category || 'Custom'}`;
  
  // Set Timer: 60 seconds per question, or based on timeLimit
  const minutesLimit = quiz.timeLimit || 5;
  STATE.timeRemaining = minutesLimit * 60;
  updateTimerUI();
  
  clearInterval(STATE.timerInterval);
  STATE.timerInterval = setInterval(() => {
    STATE.timeRemaining--;
    updateTimerUI();
    if (STATE.timeRemaining <= 0) {
      clearInterval(STATE.timerInterval);
      alert("Time is up! Let's submit your answers.");
      finishQuiz();
    }
  }, 1000);

  renderQuestion();
  showView('quiz-view');
}

function updateTimerUI() {
  const mins = Math.floor(STATE.timeRemaining / 60);
  const secs = STATE.timeRemaining % 60;
  const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  DOM.timerVal.innerText = str;
  
  if (STATE.timeRemaining < 30) {
    DOM.timerContainer.classList.add('warning');
  } else {
    DOM.timerContainer.classList.remove('warning');
  }
}

function renderQuestion() {
  const quiz = STATE.currentQuiz;
  const qIdx = STATE.currentQuestionIndex;
  const question = quiz.questions[qIdx];
  
  // Progress Bar
  const pct = (qIdx / quiz.questions.length) * 100;
  DOM.progressBar.style.width = `${pct}%`;
  
  // Question text
  DOM.questionText.innerHTML = `<span style="color: var(--primary); font-weight:700;">Q${qIdx + 1}.</span> ${escapeHTML(question.question)}`;
  
  // Options
  DOM.optionsList.innerHTML = '';
  DOM.nextBtn.disabled = true;

  const choiceLetters = ['A', 'B', 'C', 'D'];
  question.options.forEach((optText, optIdx) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    
    // Check if user already clicked this question (shouldn't happen on fresh page but good for state review)
    const isAnswered = STATE.userAnswers[qIdx] !== null;
    if (isAnswered) {
      const userChoice = STATE.userAnswers[qIdx];
      if (optIdx === question.correctAnswer) {
        item.classList.add('correct');
      } else if (optIdx === userChoice) {
        item.classList.add('wrong');
      }
    }
    
    item.innerHTML = `
      <div class="option-badge">${choiceLetters[optIdx]}</div>
      <div style="flex: 1;">${escapeHTML(optText)}</div>
    `;
    
    if (!isAnswered) {
      item.addEventListener('click', () => selectOption(optIdx));
    }
    DOM.optionsList.appendChild(item);
  });

  // Next / Submit Button
  if (qIdx === quiz.questions.length - 1) {
    DOM.nextBtn.innerHTML = `
      Submit Quiz
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    `;
  } else {
    DOM.nextBtn.innerHTML = `
      Next Question
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    `;
  }
}

function selectOption(selectedIdx) {
  const qIdx = STATE.currentQuestionIndex;
  const question = STATE.currentQuiz.questions[qIdx];
  
  // Store choice
  STATE.userAnswers[qIdx] = selectedIdx;
  
  // Display feedback immediately
  const items = DOM.optionsList.querySelectorAll('.option-item');
  items.forEach((item, idx) => {
    // Disable clicks
    const clone = item.cloneNode(true);
    item.parentNode.replaceChild(clone, item);
    
    // Add visual states
    if (idx === question.correctAnswer) {
      clone.classList.add('correct');
    } else if (idx === selectedIdx) {
      clone.classList.add('wrong');
    }
  });

  // Enable Next button
  DOM.nextBtn.disabled = false;
}

function nextQuestion() {
  STATE.currentQuestionIndex++;
  const totalQuestions = STATE.currentQuiz.questions.length;
  
  if (STATE.currentQuestionIndex >= totalQuestions) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

function finishQuiz() {
  clearInterval(STATE.timerInterval);
  
  const quiz = STATE.currentQuiz;
  let correctCount = 0;
  
  quiz.questions.forEach((q, idx) => {
    if (STATE.userAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / quiz.questions.length) * 100);
  
  // Update stats state
  STATE.stats.quizzesTaken++;
  STATE.stats.totalQuestionsSolved += quiz.questions.length;
  
  // Calculate new average score
  const historyLen = STATE.stats.history.length;
  STATE.stats.avgScore = ((STATE.stats.avgScore * historyLen) + percentage) / (historyLen + 1);
  
  // Add to history log
  STATE.stats.history.push({
    quizId: quiz.id,
    quizTitle: quiz.title,
    score: correctCount,
    total: quiz.questions.length,
    percentage: percentage,
    date: new Date().toLocaleDateString()
  });

  saveStats();

  // Show score summary view
  renderScoreScreen(correctCount, quiz.questions.length, percentage);
  showView('score-view');
}

// ----------------------------------------------------
// 6. SCORE SCREEN & DETAIL REVIEW
// ----------------------------------------------------
function renderScoreScreen(correct, total, percentage) {
  // Update circular percentage ring
  DOM.scoreRadial.style.setProperty('--percentage', percentage);
  DOM.scoreTextVal.innerText = `${correct}/${total}`;
  
  // Headline feedback
  let headline = "Keep Learning!";
  if (percentage >= 90) {
    headline = "Phenomenal! Master Mind!";
  } else if (percentage >= 75) {
    headline = "Outstanding Work!";
  } else if (percentage >= 50) {
    headline = "Good Job!";
  }
  DOM.scoreHeadline.innerText = headline;
  
  // Description Text
  DOM.scoreDesc.innerText = `You scored ${percentage}% by completing the "${escapeHTML(STATE.currentQuiz.title)}" quiz. Take a look at the questions below to review correct answers.`;

  // Render Detailed Review Card list
  DOM.scoreReviewList.innerHTML = '';
  
  const choiceLetters = ['A', 'B', 'C', 'D'];
  STATE.currentQuiz.questions.forEach((q, idx) => {
    const userChoiceIdx = STATE.userAnswers[idx];
    const isCorrect = userChoiceIdx === q.correctAnswer;
    
    const card = document.createElement('div');
    card.className = `review-card ${isCorrect ? 'correct' : 'wrong'}`;
    
    let choicesHtml = '';
    q.options.forEach((optText, optIdx) => {
      let cssClass = '';
      let suffix = '';
      
      if (optIdx === q.correctAnswer) {
        cssClass = 'correct';
        suffix = ' (Correct Answer)';
      } else if (optIdx === userChoiceIdx) {
        cssClass = 'selected-wrong';
        suffix = ' (Your Selection)';
      }
      
      choicesHtml += `
        <div class="review-choice ${cssClass}">
          <strong>${choiceLetters[optIdx]}.</strong> ${escapeHTML(optText)} ${suffix}
        </div>
      `;
    });

    card.innerHTML = `
      <div class="review-qtext">
        <span style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}; font-weight:700;">Q${idx + 1}.</span> 
        ${escapeHTML(q.question)}
      </div>
      <div class="review-answers">
        ${choicesHtml}
      </div>
    `;
    
    DOM.scoreReviewList.appendChild(card);
  });
}

// Confirmation Modals helper
function showConfirmQuitModal() {
  DOM.confirmOverlay.style.display = 'flex';
}

function hideConfirmQuitModal() {
  DOM.confirmOverlay.style.display = 'none';
}

// ----------------------------------------------------
// 7. PDF EXTRACTOR & INTUITIVE PARSER
// ----------------------------------------------------
function resetImportView() {
  DOM.importTitle.value = '';
  DOM.importCategory.value = 'Custom';
  DOM.importTimeLimit.value = 5;
  DOM.fileInput.value = '';
  DOM.importLogs.innerHTML = '<div class="log-entry info">System ready. Awaiting PDF upload...</div>';
  
  DOM.uploaderPanel.style.display = 'flex';
  DOM.editorPanel.style.display = 'none';
  STATE.extractedQuestions = [];
}

function addLog(text, type = 'info') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  entry.innerText = `[${time}] ${text}`;
  
  DOM.importLogs.appendChild(entry);
  DOM.importLogs.scrollTop = DOM.importLogs.scrollHeight;
}

async function handlePDFFile(file) {
  if (!file || file.type !== 'application/pdf') {
    addLog("Error: Selected file is not a valid PDF document.", "error");
    alert("Please select a valid PDF file.");
    return;
  }

  // Pre-fill quiz title from file name if empty
  if (!DOM.importTitle.value.trim()) {
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    DOM.importTitle.value = nameWithoutExt;
  }

  addLog(`Uploading file: ${file.name} (${Math.round(file.size / 1024)} KB)`);
  
  // Show Loading Overlay
  showLoadingSpinner("Reading PDF...", "Initializing core page parser...");

  try {
    const arrayBuffer = await file.arrayBuffer();
    addLog("Buffer created successfully. Loading PDF.js parser...");
    
    // PDFJS is loaded globally in index.html
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    
    addLog(`PDF loaded. Pages found: ${pdf.numPages}`);
    showLoadingSpinner("Parsing pages...", `Extracting text content from 1 to ${pdf.numPages} pages...`);

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      addLog(`Reading text from Page ${i}/${pdf.numPages}...`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    addLog(`Text extraction completed. Total length: ${fullText.length} characters.`);
    
    if (fullText.trim().length < 50) {
      throw new Error("Extracted text is too short. The PDF might contain images/scans rather than raw digital text. Fallback to copy-paste mode or try another PDF.");
    }

    // Run Regex Parser
    showLoadingSpinner("Analyzing structure...", "Applying question, choice and answer regex algorithms...");
    const parsedData = parseQuizText(fullText);
    
    // Append logs
    parsedData.logs.forEach(log => {
      if (log.startsWith('Warning:')) {
        addLog(log, 'warn');
      } else if (log.startsWith('Error:')) {
        addLog(log, 'error');
      } else {
        addLog(log, 'info');
      }
    });

    hideLoadingSpinner();

    if (parsedData.questions.length === 0) {
      alert("We couldn't extract any structured questions automatically. You can still manually add questions using the editor wizard!");
      STATE.extractedQuestions = [];
    } else {
      STATE.extractedQuestions = parsedData.questions;
      addLog(`Successfully extracted ${parsedData.questions.length} questions. Launching verification editor...`);
    }

    // Launch Editor Wizard
    launchVerificationEditor();

  } catch (error) {
    hideLoadingSpinner();
    addLog(`Exception Error: ${error.message}`, "error");
    alert(`Failed to extract text from PDF: ${error.message}`);
  }
}

function showLoadingSpinner(title, msg) {
  DOM.loadingTitle.innerText = title;
  DOM.loadingMsg.innerText = msg;
  DOM.loadingOverlay.style.display = 'flex';
}

function hideLoadingSpinner() {
  DOM.loadingOverlay.style.display = 'none';
}

// ----------------------------------------------------
// 8. STRUCTURAL PARSING ALGORITHM
// ----------------------------------------------------
function parseQuizText(text) {
  const logs = [];
  logs.push("Filtering control characters and line endings...");
  
  // Normalize layout text
  let cleanText = text
    .replace(/\r\n/g, '\n')
    .replace(/\n+/g, '\n')
    // Remove running headers/footers commonly found in study materials
    .replace(/Page\s+\d+\s+of\s+\d+/gi, '')
    .replace(/Page\s+\d+/gi, '');

  // Regex to detect start of questions: e.g. "Q1.", "1.", "1)", "Question 1:" 
  // Should have a space or newline before it and end with a separator.
  const questionMarkers = /(?:^|\n)\s*(?:Q\s*\.?\s*\d+|\d+)\s*[\.\)\]\-]/i;
  
  // Find all matches for question starting locations
  const matches = [];
  let match;
  const regex = new RegExp(questionMarkers, 'gi');
  while ((match = regex.exec(cleanText)) !== null) {
    matches.push({ index: match.index, text: match[0] });
  }

  if (matches.length === 0) {
    logs.push("Warning: Regular sentence detection failed. Trying fallback pattern split...", "warn");
    // Fallback: split by lines starting with numbers
    const fallbackRegex = /(?:^|\n)\s*\d+\s+/g;
    while ((match = fallbackRegex.exec(cleanText)) !== null) {
      matches.push({ index: match.index, text: match[0] });
    }
  }

  if (matches.length === 0) {
    logs.push("Error: No question starts found. Empty question set created.");
    return { questions: [], logs };
  }

  logs.push(`Found ${matches.length} matches. Splitting text blocks...`);

  const questions = [];
  for (let i = 0; i < matches.length; i++) {
    const startIdx = matches[i].index;
    const endIdx = (i + 1 < matches.length) ? matches[i + 1].index : cleanText.length;
    const block = cleanText.substring(startIdx, endIdx).trim();
    
    const questionObj = parseQuestionBlock(block, i + 1, logs);
    if (questionObj) {
      questions.push(questionObj);
    }
  }

  return { questions, logs };
}

function parseQuestionBlock(block, num, logs) {
  // Extract Answer if present at the bottom of block: e.g. Ans: B or Answer: B or Ans (a)
  const answerRegex = /(?:Ans\.?|Answer|Correct(?:\s*Option)?|Key)\s*[\:\.\-]?\s*[\(\[ ]?\s*([A-D])\s*[\)\]]?/i;
  const answerMatch = block.match(answerRegex);
  let answerLetter = null;
  let blockText = block;

  if (answerMatch) {
    answerLetter = answerMatch[1].toUpperCase();
    blockText = block.replace(answerRegex, '');
  }

  // Find Options: A), B), C), D) or (a), (b), (c), (d) or a., b., c., d.
  // Note: we look for alphabetical option headings
  const optionRegex = /(?:\s+|^)[\(\[\b]?(A|B|C|D|a|b|c|d)[\)\]\.\-\s]+(?!\d)/g;
  
  const optionMatches = [];
  let optMatch;
  while ((optMatch = optionRegex.exec(blockText)) !== null) {
    optionMatches.push({
      index: optMatch.index,
      letter: optMatch[1].toUpperCase(),
      fullMatch: optMatch[0]
    });
  }

  let questionText = "";
  const rawOptions = [];

  if (optionMatches.length > 0) {
    // Sort option matches by index order
    optionMatches.sort((a, b) => a.index - b.index);

    // Question text is everything preceding the first option tag
    questionText = blockText.substring(0, optionMatches[0].index).trim();
    // Clean leading question tags (e.g., "1. ", "Q23. ")
    questionText = questionText.replace(/^\s*(?:Q\s*\.?\s*\d+|\d+)\s*[\.\)\]\-]\s*/i, '').trim();

    // Extract options
    for (let j = 0; j < optionMatches.length; j++) {
      const start = optionMatches[j].index + optionMatches[j].fullMatch.length;
      const end = (j + 1 < optionMatches.length) ? optionMatches[j + 1].index : blockText.length;
      let optText = blockText.substring(start, end).trim();
      
      // clean trailing semicolons/commas
      optText = optText.replace(/[,;]+$/, '').trim();

      rawOptions.push({
        letter: optionMatches[j].letter,
        text: optText
      });
    }
  } else {
    // No options found. Set default empty question text and empty options
    questionText = blockText.replace(/^\s*(?:Q\s*\.?\s*\d+|\d+)\s*[\.\)\]\-]\s*/i, '').trim();
    logs.push(`Warning: Question ${num} contains no multiple choice tags. Placeholders generated.`);
  }

  // Format to standard 4 options [A, B, C, D]
  const finalOptions = [];
  const standardLetters = ['A', 'B', 'C', 'D'];
  
  for (let k = 0; k < 4; k++) {
    const targetL = standardLetters[k];
    const matchOpt = rawOptions.find(o => o.letter === targetL);
    if (matchOpt) {
      finalOptions.push(matchOpt.text);
    } else {
      // fallback to array index if matching letter fails, or create default text
      if (rawOptions[k]) {
        finalOptions.push(rawOptions[k].text);
      } else {
        finalOptions.push(`Option ${targetL}`);
      }
    }
  }

  // Map answer key letter to index (0-3)
  const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  let correctIndex = 0;

  if (answerLetter && letterToIndex.hasOwnProperty(answerLetter)) {
    correctIndex = letterToIndex[answerLetter];
  } else {
    // Attempt second level extraction for answers
    const backupAns = blockText.match(/(?:Ans|Answer)\s*(?:is|should\s*be)?\s*([A-D])/i);
    if (backupAns) {
      correctIndex = letterToIndex[backupAns[1].toUpperCase()];
    } else {
      correctIndex = 0; // Default to A
      logs.push(`Warning: Question ${num} has no detectable Answer Key (Ans: A assumed).`);
    }
  }

  return {
    id: num,
    question: questionText || `Question ${num} text`,
    options: finalOptions,
    correctAnswer: correctIndex
  };
}

// ----------------------------------------------------
// 9. VERIFICATION EDITOR WIZARD
// ----------------------------------------------------
function launchVerificationEditor() {
  DOM.uploaderPanel.style.display = 'none';
  DOM.editorPanel.style.display = 'block';
  
  DOM.editorQuizTitle.innerText = `Verify & Edit: ${DOM.importTitle.value || 'Custom Quiz'}`;
  
  renderEditorQuestions();
}

function renderEditorQuestions() {
  DOM.editorQContainer.innerHTML = '';
  DOM.editorQCount.innerText = `${STATE.extractedQuestions.length} Questions`;

  if (STATE.extractedQuestions.length === 0) {
    DOM.editorQContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        No questions yet. Click "Add Question" to create one.
      </div>
    `;
    return;
  }

  STATE.extractedQuestions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'editor-qcard';
    card.dataset.index = idx;
    
    card.innerHTML = `
      <div class="editor-qcard-header">
        <div class="editor-qnumber">Q${idx + 1}</div>
        <button class="editor-qcard-delete" onclick="deleteEditorQuestion(${idx})" title="Delete Question">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
      
      <!-- Question text input -->
      <div class="form-group" style="margin-bottom: 1.25rem;">
        <input type="text" class="form-control editor-qtext-input" value="${escapeHTML(q.question)}" placeholder="Enter question text here..." oninput="updateQuestionText(${idx}, this.value)">
      </div>

      <!-- Options container -->
      <div class="editor-options-grid">
        <div class="editor-opt-group">
          <input type="radio" name="correct-ans-${idx}" class="editor-opt-radio" ${q.correctAnswer === 0 ? 'checked' : ''} onclick="updateQuestionAnswer(${idx}, 0)" title="Mark as correct answer">
          <span style="font-weight: 700; color: var(--text-muted);">A.</span>
          <input type="text" class="editor-opt-input" value="${escapeHTML(q.options[0])}" placeholder="Option A text..." oninput="updateQuestionOption(${idx}, 0, this.value)">
        </div>
        <div class="editor-opt-group">
          <input type="radio" name="correct-ans-${idx}" class="editor-opt-radio" ${q.correctAnswer === 1 ? 'checked' : ''} onclick="updateQuestionAnswer(${idx}, 1)" title="Mark as correct answer">
          <span style="font-weight: 700; color: var(--text-muted);">B.</span>
          <input type="text" class="editor-opt-input" value="${escapeHTML(q.options[1])}" placeholder="Option B text..." oninput="updateQuestionOption(${idx}, 1, this.value)">
        </div>
        <div class="editor-opt-group">
          <input type="radio" name="correct-ans-${idx}" class="editor-opt-radio" ${q.correctAnswer === 2 ? 'checked' : ''} onclick="updateQuestionAnswer(${idx}, 2)" title="Mark as correct answer">
          <span style="font-weight: 700; color: var(--text-muted);">C.</span>
          <input type="text" class="editor-opt-input" value="${escapeHTML(q.options[2])}" placeholder="Option C text..." oninput="updateQuestionOption(${idx}, 2, this.value)">
        </div>
        <div class="editor-opt-group">
          <input type="radio" name="correct-ans-${idx}" class="editor-opt-radio" ${q.correctAnswer === 3 ? 'checked' : ''} onclick="updateQuestionAnswer(${idx}, 3)" title="Mark as correct answer">
          <span style="font-weight: 700; color: var(--text-muted);">D.</span>
          <input type="text" class="editor-opt-input" value="${escapeHTML(q.options[3])}" placeholder="Option D text..." oninput="updateQuestionOption(${idx}, 3, this.value)">
        </div>
      </div>
    `;
    DOM.editorQContainer.appendChild(card);
  });
}

// Editor state updates
window.updateQuestionText = function(idx, val) {
  STATE.extractedQuestions[idx].question = val;
};

window.updateQuestionOption = function(idx, optIdx, val) {
  STATE.extractedQuestions[idx].options[optIdx] = val;
};

window.updateQuestionAnswer = function(idx, correctIdx) {
  STATE.extractedQuestions[idx].correctAnswer = correctIdx;
};

window.deleteEditorQuestion = function(idx) {
  STATE.extractedQuestions.splice(idx, 1);
  renderEditorQuestions();
};

function addNewEmptyQuestionEditorCard() {
  const newQ = {
    id: STATE.extractedQuestions.length + 1,
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0
  };
  STATE.extractedQuestions.push(newQ);
  renderEditorQuestions();
  
  // Scroll editor container to bottom to show new card
  setTimeout(() => {
    DOM.editorQContainer.scrollTop = DOM.editorQContainer.scrollHeight;
  }, 50);
}

function saveParsedQuiz() {
  const title = DOM.importTitle.value.trim();
  const category = DOM.importCategory.value;
  const timeLimit = parseInt(DOM.importTimeLimit.value) || 5;

  if (!title) {
    alert("Please enter a title for the quiz.");
    DOM.importTitle.focus();
    return;
  }

  // Validate questions
  if (STATE.extractedQuestions.length === 0) {
    alert("Please add at least one question before saving.");
    return;
  }

  let hasError = false;
  STATE.extractedQuestions.forEach((q, idx) => {
    if (!q.question.trim()) {
      alert(`Question ${idx + 1} has empty question text. Please fill it in.`);
      hasError = true;
      return;
    }
    q.options.forEach((opt, optIdx) => {
      if (!opt.trim()) {
        alert(`Question ${idx + 1}, Option ${String.fromCharCode(65 + optIdx)} is empty. Please fill it in.`);
        hasError = true;
        return;
      }
    });
  });

  if (hasError) return;

  // Compile final custom quiz object
  const newQuiz = {
    id: `custom-${Date.now()}`,
    title: title,
    category: category,
    description: `User-imported quiz containing ${STATE.extractedQuestions.length} questions. Imported on ${new Date().toLocaleDateString()}.`,
    timeLimit: timeLimit,
    questions: STATE.extractedQuestions.map((q, idx) => ({
      id: idx + 1,
      question: q.question.trim(),
      options: q.options.map(o => o.trim()),
      correctAnswer: q.correctAnswer
    }))
  };

  // Save to memory and LocalStorage
  saveCustomQuiz(newQuiz);
  
  alert(`Quiz "${title}" with ${newQuiz.questions.length} questions imported successfully!`);
  
  // Clean import editor view and swap
  resetImportView();
  showView('dashboard-view');
  renderDashboard();
}

// ----------------------------------------------------
// 10. UTILITIES
// ----------------------------------------------------
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
