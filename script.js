const root = document.documentElement;
const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.getElementById("site-nav");
const brandTrigger = document.querySelector("[data-brand-trigger]");
const brandBubble = document.getElementById("brand-bubble");
const brandLogo = document.querySelector(".brand-logo");

const possibilities = {
  web: {
    kicker: "Shipping online",
    title: "Web apps and APIs",
    description:
      "Python gives you both batteries-included frameworks and lean, modern API tools. It is equally comfortable behind a dashboard, an internal admin, a SaaS backend, or a public service.",
    tools: "Django, FastAPI, Flask, Pydantic, SQLAlchemy",
    outcome: "Dashboards, platform backends, CRUD apps, internal tools, and clean service layers.",
    code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/health\")\ndef health():\n    return {\"ok\": True}",
    accent: "rgba(55, 118, 171, 0.32)",
  },
  automation: {
    kicker: "Useful by lunchtime",
    title: "Automation that removes repetitive work",
    description:
      "Python excels at the small scripts and sturdy workflows that save hours every week: file processing, browser tasks, reports, integrations, deployment helpers, and system glue.",
    tools: "pathlib, requests, Playwright, Typer, subprocess",
    outcome: "File pipelines, browser automation, scheduled jobs, reports, and API-driven operations.",
    code: "from pathlib import Path\n\nfor report in Path(\"incoming\").glob(\"*.csv\"):\n    cleaned = report.read_text().replace(\"draft\", \"ready\")\n    Path(\"out\", report.name).write_text(cleaned)",
    accent: "rgba(255, 211, 67, 0.3)",
  },
  data: {
    kicker: "Thinking with data",
    title: "Data science and scientific computing",
    description:
      "Python became a serious home for analysis because it balances expressive code with mature numerical and notebook tooling. It supports exploration, rigor, and communication in one workflow.",
    tools: "NumPy, pandas, Jupyter, SciPy, Polars",
    outcome: "Notebook exploration, ETL, analysis, simulation, dashboards, and reproducible research.",
    code: "import pandas as pd\n\nframe = pd.read_csv(\"experiments.csv\")\nsummary = frame.groupby(\"team\")[\"score\"].mean()\nprint(summary.sort_values(ascending=False))",
    accent: "rgba(55, 118, 171, 0.22)",
  },
  ai: {
    kicker: "Model friendly",
    title: "AI and machine learning",
    description:
      "From classic machine learning to deep learning and model experimentation, Python remains the common language across research, prototyping, evaluation, and deployment workflows.",
    tools: "PyTorch, scikit-learn, Transformers, TensorFlow",
    outcome: "Training loops, evaluation scripts, notebooks, inference services, and experimentation platforms.",
    code: "from sklearn.linear_model import LogisticRegression\n\nmodel = LogisticRegression()\nmodel.fit(features, labels)\nprint(model.score(features, labels))",
    accent: "rgba(255, 211, 67, 0.26)",
  },
  tooling: {
    kicker: "Better ways to build",
    title: "Tooling, testing, and developer experience",
    description:
      "Python is also a language for making software creation itself better. Teams use it for CLIs, lint rules, test automation, release scripts, packaging, and workflow glue.",
    tools: "pytest, Ruff, uv, Poetry, nox",
    outcome: "Command-line tools, test suites, packaging flows, code quality, and build orchestration.",
    code: "def test_slug_keeps_words():\n    assert slugify(\"Python With Depth\") == \"python-with-depth\"",
    accent: "rgba(55, 118, 171, 0.28)",
  },
  education: {
    kicker: "Welcoming without being shallow",
    title: "Learning, teaching, and first serious projects",
    description:
      "Python helps people understand programming concepts without burying them in syntax noise. That is why it works so well in classrooms, tutorials, bootcamps, and self-guided exploration.",
    tools: "IDLE, Jupyter, turtle, PyGame, docs.python.org",
    outcome: "Lessons, classroom demos, beginner projects, visual experiments, and concept-first learning.",
    code: "name = input(\"What are you building? \")\nprint(f\"Start small, {name}. Then keep going.\")",
    accent: "rgba(255, 211, 67, 0.22)",
  },
};

root.dataset.theme = "dark";

if (brandLogo?.dataset.logoDark) {
  brandLogo.src = brandLogo.dataset.logoDark;
}

function setNavState(isOpen) {
  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  siteNav.classList.toggle("is-open", isOpen);
}

function setBrandBubbleState(isOpen) {
  if (!brandTrigger || !brandBubble) {
    return;
  }

  brandTrigger.setAttribute("aria-expanded", String(isOpen));
  brandTrigger.classList.toggle("is-bubble-open", isOpen);
  brandBubble.setAttribute("aria-hidden", String(!isOpen));
}

setNavState(false);
setBrandBubbleState(false);

if (brandTrigger && brandBubble) {
  brandTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    const isOpen = brandTrigger.getAttribute("aria-expanded") !== "true";
    setBrandBubbleState(isOpen);
  });

  document.addEventListener("click", (event) => {
    if (!brandTrigger.contains(event.target)) {
      setBrandBubbleState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setBrandBubbleState(false);
    }
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") !== "true";
    setNavState(isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 960) {
        setNavState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      setNavState(false);
    }
  });
}

const revealItems = [...document.querySelectorAll("[data-reveal]")];

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const triggers = [...document.querySelectorAll(".possibility-trigger")];
const stage = document.querySelector(".possibility-stage");
const stageKicker = document.getElementById("stage-kicker");
const stageTitle = document.getElementById("stage-title");
const stageDescription = document.getElementById("stage-description");
const stageTools = document.getElementById("stage-tools");
const stageOutcome = document.getElementById("stage-outcome");
const stageCode = document.getElementById("stage-code");

function setStage(key) {
  const next = possibilities[key];

  if (!next || !stage || !stageKicker || !stageTitle || !stageDescription || !stageTools || !stageOutcome || !stageCode) {
    return;
  }

  stageKicker.textContent = next.kicker;
  stageTitle.textContent = next.title;
  stageDescription.textContent = next.description;
  stageTools.textContent = next.tools;
  stageOutcome.textContent = next.outcome;
  stageCode.textContent = next.code;
  stage.style.setProperty("--stage-accent", next.accent);

  triggers.forEach((trigger) => {
    const active = trigger.dataset.key === key;
    trigger.classList.toggle("is-active", active);
    trigger.setAttribute("aria-pressed", String(active));
  });
}

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => setStage(trigger.dataset.key));
});

const initialTrigger = document.querySelector(".possibility-trigger.is-active") || triggers[0];

if (initialTrigger) {
  setStage(initialTrigger.dataset.key);
}
