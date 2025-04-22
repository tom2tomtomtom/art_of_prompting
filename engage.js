// Engaging Interactivity for The Art of Prompting

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav buttons
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Interactive Prompt Builder
  const steps = Array.from(document.querySelectorAll('.builder-steps .step'));
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const preview = document.getElementById('final-prompt');
  const copyBtn = document.getElementById('copy-prompt');

  let currentStep = 0;
  const roleInput = document.getElementById('ai-role');
  const taskInput = document.getElementById('task-description');
  const contextInput = document.getElementById('context');
  const formatInput = document.getElementById('format');

  function showStep(idx) {
    steps.forEach((step, i) => step.classList.toggle('active', i === idx));
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.textContent = idx === steps.length - 1 ? 'Finish' : 'Next';
  }

  function buildPrompt() {
    if (!roleInput?.value && !taskInput?.value && !contextInput?.value && !formatInput?.value) {
      if (preview) preview.innerHTML = '<p>Complete the previous steps to generate your prompt.</p>';
      return;
    }

    const segments = [];
    if (roleInput?.value) {
      segments.push(`You are a ${roleInput.value.trim()}, celebrated for your insight and clarity.`);
    }
    if (taskInput?.value) {
      segments.push(`Your mission: ${taskInput.value.trim()}. Approach this with thoughtful analysis, creative flair, and impeccable logic.`);
    }
    if (contextInput?.value) {
      segments.push(`Context to keep in mind: ${contextInput.value.trim()}. Use this background to ground your answer in reality and avoid unsupported assumptions.`);
    }
    if (formatInput?.value) {
      segments.push(`When you reply, structure your output as follows: ${formatInput.value.trim()}. Feel free to employ bullet points, tables, or numbered lists for maximum readability.`);
    }
    // Universal guidance
    segments.push('Think step‑by‑step, cite sources where relevant, and strive for a concise yet comprehensive answer.');

    if (preview) preview.innerText = segments.join('\n\n');
  }

  [roleInput, taskInput, contextInput, formatInput].forEach(input => {
    if (input) input.addEventListener('input', buildPrompt);
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        buildPrompt();
        if (preview) preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = preview?.innerText;
      if (!text || text.includes('Complete the previous steps')) return;
      navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy to Clipboard'), 1200);
    });
  }

  // Move Other Tools section to just above footer for better page flow
  const otherTools = document.getElementById('other-tools');
  const footer = document.querySelector('footer');
  if (otherTools && footer) {
    footer.parentNode.insertBefore(otherTools, footer);
  }

  // Reposition Follow Creators section to bottom (after other tools)
  const followCreators = document.getElementById('follow-creators');
  if (followCreators && footer) {
    footer.parentNode.insertBefore(followCreators, footer);
  }

  // --- Bullet Details Inline Boxes ---
  const bulletDetails = {
    "What is a prompt? How AI models \"think\"": "A prompt is the instruction or query you give an AI. Models convert prompts into tokens, run them through layers, and predict the next token. Clear prompts = clear thinking.",
    "The 5 elements of an effective prompt: role, task, context, constraints, format": "Role gives the AI identity, task describes the job, context shares background, constraints set limits, and format tells how to structure the response.",
    "Clarity, specificity, and intent": "Avoid ambiguity. Be specific about what you want and why you want it. This guides the model toward the right answer.",
    "System prompts & persona shaping": "System prompts set the model's overarching behavior (e.g., \"You are a helpful tutor\"). Persona shaping tailors tone and expertise.",
    "Chain-of-thought reasoning (step-by-step thinking)": "Ask the model to 'think step‑by‑step' to improve logical accuracy and reveal its reasoning for verification.",
    "Few-shot prompting (showing examples)": "Provide the model with example Q&A pairs so it learns the pattern and style you expect.",
    "Iterative refinement (edit and improve prompts/results)": "Treat prompting as a dialogue: review output, critique, and refine your prompt to improve results iteratively.",
    "GPT-4o: Leverage multimodal input, use system messages, request citations": "GPT-4o processes text, images, and audio. Combine inputs and ask for cited sources to enhance credibility.",
    "Claude 3.5: Ask for \"Extended Thinking Mode\" for deep analysis": "Claude excels at transparent reasoning. Request 'Extended Thinking' for long, structured answers.",
    "Gemini: Use structured prompts and Google integration": "Gemini integrates with Google search. Ask it to reference web results or structured data.",
    "Compare context windows, speed, and cost": "Pick models based on your token budget, latency needs, and document size.",
    "Business: Report generation, analysis, email drafting": "Use prompts with clear structure requests (tables, bullet points) and company tone guidelines.",
    "Education: Lesson planning, quiz creation, feedback": "Provide learning objectives and student profiles for tailored educational content.",
    "Programming: Code generation, review, debugging": "State language, libraries, coding standards, and ask for comments + test cases.",
    "Creative: Brainstorming, story writing, design": "Set genre, style, audience, and constraints (e.g., word count, tone).",
    "Overly vague or broad prompts": "Broad prompts lead to generic answers. Narrow scope and define specifics.",
    "Missing context or unclear instructions": "Without context the model guesses. Include background info and define goals.",
    "Ignoring model limitations (context window, output length)": "Large inputs may be truncated. Chunk inputs or use a bigger‑window model.",
    "Not iterating or refining based on results": "First draft rarely perfect. Review, critique, and refine prompts until satisfied.",
    "Responsible use: avoid bias, respect privacy, verify facts": "Always fact‑check sensitive outputs and avoid disallowed content.",
    "Attribution and citation for generated content": "Ask the model to cite sources or mark AI‑generated sections to maintain transparency.",
    "Prompt security: avoid leaking sensitive info": "Don’t include confidential data in prompts unless using a secure, private endpoint.",
    "Future-proofing: keep learning as models evolve": "Stay updated on model changes and adjust prompting strategies accordingly."
  };

  // Ensure each module-content has a bullet-detail container
  document.querySelectorAll('.module-content').forEach(mc => {
    if (!mc.querySelector('.bullet-detail')) {
      const p = document.createElement('p');
      p.className = 'bullet-detail';
      mc.appendChild(p);
    }
  });

  // Attach click listeners to module bullet points (show detail inline)
  document.querySelectorAll('.module-content ul li').forEach(li => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      const text = li.textContent.trim();
      const detail = bulletDetails[text] || 'Details coming soon...';
      const detailBox = li.closest('.module-content').querySelector('.bullet-detail');
      if (detailBox) {
        const isVisible = detailBox.style.display === 'block';
        if (isVisible && detailBox.textContent === detail) {
          detailBox.style.display = 'none'; // toggle off
        } else {
          detailBox.textContent = detail;
          detailBox.style.display = 'block';
        }
      }
    });
  });

  // --- Model Suggestion Tool ---
  const ROSTER = [
    { id: 'gpt-4o', name: 'GPT-4o', keywords: ['most', 'questions', 'general', 'omni', 'default'], hint: 'Great for most questions' },
    { id: 'gpt-4o-scheduled', name: 'GPT-4o with scheduled tasks', keywords: ['scheduled', 'tasks', 'follow up', 'reminder'], hint: 'Ask ChatGPT to follow up later' },
    { id: 'gpt-4.5', name: 'GPT-4.5', keywords: ['writing', 'exploring', 'ideas', 'creative'], hint: 'Good for writing and exploring ideas' },
    { id: 'o3', name: 'o3', keywords: ['advanced', 'reasoning', 'logic', 'chain'], hint: 'Uses advanced reasoning' },
    { id: 'o4-mini', name: 'o4-mini', keywords: ['fast', 'advanced', 'reasoning', 'speed'], hint: 'Fastest at advanced reasoning' },
    { id: 'o4-mini-high', name: 'o4-mini-high', keywords: ['coding', 'visual', 'reasoning', 'high'], hint: 'Great at coding and visual reasoning' },
    { id: 'gpt-4o-mini', name: 'GPT-4o mini', keywords: ['faster', 'most', 'questions', 'mini'], hint: 'Faster for most questions' }
  ];

  function pickFromRoster(text) {
    const t = text.toLowerCase();
    let best = { score: 0, tool: ROSTER[0], matches: [] };
    ROSTER.forEach(tool => {
      const matches = tool.keywords.filter(kw => t.includes(kw));
      if (matches.length > best.score) best = { score: matches.length, tool, matches };
    });
    return best;
  }

  const suggestBtn = document.getElementById('suggest-model-btn');
  const modelTaskInput = document.getElementById('task-input');
  const suggestionBox = document.getElementById('model-suggestion');

  const updateSuggestion = () => {
    const { tool, matches } = pickFromRoster(modelTaskInput.value);
    const reason = matches.length ? `because we detected: ${matches.join(', ')}` : 'based on your description';
    suggestionBox.innerHTML = `→ We recommend <strong>${tool.name}</strong> <em>(${tool.hint})</em><br/><span class="text-xs">${reason}</span>`;
  };

  if (suggestBtn) {
    suggestBtn.addEventListener('click', updateSuggestion);
  }
  modelTaskInput?.addEventListener('input', updateSuggestion);

  const askTomBtn = document.getElementById('ask-tom-btn');
  if (askTomBtn) {
    askTomBtn.addEventListener('click', () => {
      const at = 'tomh';
      const domain = 'redbaez.com';
      window.location.href = `mailto:${at}@${domain}?subject=Question%20from%20Art%20of%20Prompting%20Visitor`;
    });
  }

  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Post to Netlify
      const formData = new FormData(contactForm);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      }).then(() => {
        contactForm.style.display = 'none';
        if (contactSuccess) contactSuccess.style.display = 'block';
      }).catch(() => {
        contactForm.style.display = 'none';
        if (contactSuccess) {
          contactSuccess.innerHTML = '<h3>Thank you!</h3><p>Your message has been sent. Tom will get back to you soon.</p><a class="tool-link" href="/">Return Home</a>';
          contactSuccess.style.display = 'block';
        }
      });
    });
  }

  // Initial state
  showStep(currentStep);
  buildPrompt();
});
