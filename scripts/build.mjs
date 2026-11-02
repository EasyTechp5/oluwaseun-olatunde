// Static site generator for oluwaseun-olatunde. Run: node scripts/build.mjs
// Writes every page into the repo root so GitHub Pages can serve it as-is.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = (process.env.SITE_URL || "https://easytechp5.github.io/oluwaseun-olatunde").replace(/\/$/, "");
const LINKEDIN = "https://www.linkedin.com/in/oluwaseunolatunde";
const EMAIL = "hello@oluwaseunolatunde.com";
const NAME = "Oluwaseun Olatunde";

/* ---------------------------------------------------------------- icons */
const svg = (d, extra = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const I = {
  ai: svg('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M9 15c1 1 5 1 6 0M12 1v3M12 20v3M1 12h3M20 12h3"/>'),
  quality: svg('<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z"/>'),
  people: svg('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.2a3.2 3.2 0 010 5.6M18 14.4c1.8.8 3 2.6 3 4.6"/>'),
  sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  moon: svg('<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>'),
  in: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.8v.01M12 16v-3.2c0-1.4 1-2.3 2.2-2.3S16.4 11.4 16.4 13V16"/>'),
  cal: svg('<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>'),
  mic: svg('<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>'),
  down: svg('<path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14"/>'),
};
const ARR = `<span class="arr" aria-hidden="true">→</span>`;

/* ---------------------------------------------------------------- content */
const cases = [
  {
    slug: "csat-turnaround",
    title: "Chat CSAT: from 65% to 85%",
    short: "Customers were waiting hours for a reply. We rebuilt how chat support runs and brought satisfaction up twenty points.",
    tag: "Customer experience",
    big: "65 → 85%", bigCap: "Chat CSAT",
    results: [
      { v: "65<em>→</em>85%", k: "Chat customer satisfaction (CSAT)" },
      { v: "3 hrs<em>→</em>15 min", k: "First response time" },
      { v: "2 days<em>→</em>12 hrs", k: "Time to resolution" },
    ],
    context: "Chat is where Flutterwave customers expect an answer in minutes, not days. When I took ownership of the channel, satisfaction sat at 65% and customers were waiting hours for a first reply.",
    challenge: "Slow first response and slow resolution fed each other. Customers chased agents, agents re-read long threads, and quality varied from shift to shift. Adding people alone would not have fixed a broken flow.",
    actions: [
      "Mapped the chat journey end to end and found where time was actually lost between first touch and resolution.",
      "Reworked routing, queues and ownership so every conversation had a clear next step and a clear owner.",
      "Tightened quality coaching around the behaviours that moved CSAT, using conversation reviews rather than random audits.",
      "Tracked response, resolution and satisfaction together every week so one metric could not be improved at another's expense.",
    ],
    lessons: [
      "Fix the system before you add headcount or automation.",
      "Speed and satisfaction are one problem. Customers forgive a hard answer, not a silent wait.",
      "A metric only moves when someone owns it every single week.",
    ],
    tools: ["Intercom", "CSAT surveys", "Quality scorecards", "Weekly operations review"],
  },
  {
    slug: "ai-support-rollout",
    title: "Deploying Intercom Fin AI",
    short: "Automation placed on top of a fixed support system, not a broken one. Workforce optimised by 10% with service levels held.",
    tag: "AI in operations",
    big: "10%", bigCap: "Workforce optimisation held through 2024 and 2025",
    results: [
      { v: "10<em>%</em>", k: "Workforce optimisation, held through 2024 and 2025" },
      { v: "90<em>%+</em>", k: "Response rate maintained" },
      { v: "80<em>%+</em>", k: "Resolution rate maintained" },
    ],
    context: "Support volumes grow faster than any hiring plan. Intercom's Fin AI agent and chatbots offered a way to absorb that growth, but only if the knowledge and workflows behind them were sound.",
    challenge: "AI is an amplifier, not a foundation. Put it on a messy knowledge base and it scales confusion at machine speed. The real work was readying the operation, then proving the automation did not cost customers anything.",
    actions: [
      "Audited support content and common contact reasons so the AI answered from accurate, current material.",
      "Deployed Intercom Fin AI and chatbots, with clear hand-off rules so customers could always reach a person.",
      "Used agent and customer feedback as a training loop: support trains the AI, not the other way around.",
      "Held response and resolution rates as hard guardrails while optimising workforce by 10%.",
    ],
    lessons: [
      "Fix support first, then automate. AI amplifies what is already there.",
      "Guardrail metrics are what let a leadership team trust automation.",
      "The best training data for AI is your best agents' work.",
    ],
    tools: ["Intercom Fin AI", "Chatbots", "Knowledge base", "Conversation QA"],
  },
  {
    slug: "multilingual-team-scale",
    title: "Scaling a multilingual CX team 3x",
    short: "Tripled the team in a single quarter pair, kept response above 90% and resolution above 80%.",
    tag: "Scale with discipline",
    big: "3×", bigCap: "Team scale-up, Q2 to Q3 2023",
    results: [
      { v: "3<em>×</em>", k: "Team size, Q2 to Q3 2023" },
      { v: "90<em>%+</em>", k: "Response rate" },
      { v: "80<em>%+</em>", k: "Resolution rate" },
    ],
    context: "In 2023 Flutterwave needed customer support in more languages and at far greater volume. That meant tripling a multilingual team in months, while customers kept expecting the same standard.",
    challenge: "Rapid hiring usually dilutes quality: new agents learn slowly, coaching thins out, metrics slip. The brief was to grow fast and keep the numbers where they were.",
    actions: [
      "Built a repeatable onboarding and training path so every new agent reached the standard on a predictable timeline.",
      "Used quality assurance as the growth engine: calibrations, scorecards and fast feedback from day one.",
      "Staffed by language and demand pattern rather than flat headcount.",
      "Watched response and resolution rates weekly and slowed intake if either wobbled.",
    ],
    lessons: [
      "You can only scale what you can measure and coach.",
      "Training capacity, not hiring capacity, is the real speed limit.",
      "Grow fast without breaking metrics by deciding the metrics first.",
    ],
    tools: ["Training curriculum", "QA scorecards", "Calibration sessions", "Workforce planning"],
  },
  {
    slug: "quality-framework",
    title: "The Contact Centre Quality Framework",
    short: "Quality as an operating system, not a monthly audit. A framework plus an AppSheet app that made evaluations 30% faster.",
    tag: "Quality and continuous improvement",
    big: "30%", bigCap: "Faster quality evaluations",
    results: [
      { v: "30<em>%</em>", k: "Gain in evaluation efficiency" },
      { v: "15<em>%</em>", k: "Higher customer satisfaction" },
    ],
    context: "Quality assurance at many contact centres is a monthly audit that nobody trusts and agents dread. I wanted a framework that ran every day and helped agents get better.",
    challenge: "Evaluations were slow, inconsistent and disconnected from coaching. Evaluators spent more time filling forms than listening to customers.",
    actions: [
      "Designed the Flutterwave Contact Centre Quality Framework: clear standards, a shared scorecard and a coaching cadence.",
      "Built an AppSheet app so evaluators could score, comment and track in one place, from anywhere.",
      "Connected scores to coaching conversations so every evaluation led to a specific next step.",
      "Calibrated evaluators regularly so a score meant the same thing across the team.",
    ],
    lessons: [
      "Quality is an operating system, not a monthly audit.",
      "Low-code tools can remove friction without waiting for an engineering sprint.",
      "A scorecard earns trust when agents can see how to improve it.",
    ],
    tools: ["AppSheet", "Quality scorecards", "Calibration", "Coaching cadence"],
  },
  {
    slug: "ivr-redesign",
    title: "Revamping a multilingual IVR",
    short: "Voice support rebuilt in four African languages, lifting voice engagement by 15%.",
    tag: "Voice and channels",
    big: "15%", bigCap: "Improvement in voice engagement",
    results: [
      { v: "4", k: "African languages supported" },
      { v: "15<em>%</em>", k: "Improvement in voice engagement" },
    ],
    context: "Phone remains a primary support channel for many customers across Africa. The IVR is the front door, and for many callers it was the hardest part.",
    challenge: "Menus assumed English first, and callers in other languages dropped out or pressed zero. The first minute of a call decided how the rest would go.",
    actions: [
      "Reviewed the call flow and menu structure to remove steps that confused or lost callers.",
      "Rebuilt the IVR in four African languages so customers could be served in the one they think in.",
      "Rewrote prompts in plain, short sentences and tested them with real callers.",
      "Tracked voice engagement before and after to confirm the redesign worked.",
    ],
    lessons: [
      "Language is access. A customer who cannot navigate cannot be helped.",
      "Short, plain prompts beat clever ones.",
      "Test the front door with the people who use it.",
    ],
    tools: ["IVR platform", "Call-flow design", "Voice prompts", "Engagement tracking"],
  },
  {
    slug: "cost-restructure",
    title: "Cutting operating cost by 39%",
    short: "A thoughtful office relocation and transport restructure reduced annual operating cost by 39% in H2 2024.",
    tag: "Operations and finance",
    big: "39%", bigCap: "Annual operating cost reduction, H2 2024",
    results: [
      { v: "39<em>%</em>", k: "Reduction in annual operating cost" },
      { v: "H2 <em>2024</em>", k: "Delivered in the second half of the year" },
    ],
    context: "Customer operations is a people business, which makes it a large cost line. In 2024 there was a clear case to reduce cost without touching service quality.",
    challenge: "Cutting cost in support usually means cutting people, and that shows up in customer experience. We needed savings that customers would never feel.",
    actions: [
      "Reviewed the full operating cost base to separate costs that serve customers from those that do not.",
      "Relocated the office to a more cost-effective setup.",
      "Restructured staff transport arrangements to remove avoidable spend.",
      "Reported savings against service metrics every month to prove quality held.",
    ],
    lessons: [
      "The biggest savings often sit around the work, not in it.",
      "Always pair a cost target with a service guardrail.",
      "Bring people with you; they find savings you cannot see.",
    ],
    tools: ["Cost analysis", "Vendor and facilities review", "Monthly reporting"],
  },
];

const articles = [
  { t: "The spoon of stew: what a Megachicken story teaches about service", c: "Customer Stories", rt: 4, s: "A small, human moment that says more about customer experience than any dashboard. The lesson: customers remember how you made the effort feel." },
  { t: "AI is an amplifier, not a foundation", c: "AI and Automation", rt: 6, s: "Weak systems will only scale chaos. Why I insist on fixing the support operation before automating it, and what to check first." },
  { t: "What should a bank's customer service desk really be asked?", c: "CX Leadership", rt: 5, s: "A simple question that exposes whether a service desk exists for customers or for itself, and how to change the answer." },
  { t: "Kaizen metrics: small improvements, measured every week", c: "Quality and Coaching", rt: 5, s: "How continuous improvement shows up in a contact centre scorecard, and the few numbers worth tracking over time." },
  { t: "Bring Your Own AI: what agents are already doing at work", c: "AI and Automation", rt: 5, s: "Your team is probably already using AI tools. Why that is a signal, not a threat, and how to guide it safely." },
  { t: "Quality-as-a-Service: treating QA as a product", c: "Quality and Coaching", rt: 6, s: "Why quality works best when it serves the agents and the customers, rather than policing them once a month." },
  { t: "40 and grateful: lessons from fifteen years of work", c: "Career Advice", rt: 7, s: "Put God first. Never despise small beginnings. Never burn bridges. Help your boss succeed. Keep learning. Pour into others." },
];
const cats = ["AI and Automation", "Quality and Coaching", "CX Leadership", "Customer Stories", "Career Advice"];

const talks = [
  { t: "How Support Trains AI, Not the Other Way Around", p: "Why your best agents are the real training data for automation." },
  { t: "Going Above and Beyond for Your Customers", p: "Small acts of care that scale across a whole team." },
  { t: "From Audit to Operating System: Building a Culture of Quality", p: "Turning QA from a monthly check into a daily habit." },
  { t: "Scaling Support Without Breaking It", p: "Growing teams, languages and volumes while holding the metrics." },
];

const timeline = [
  { w: "Jan 2026 — now", r: "Head, Customer Operations", o: "Flutterwave", m: "Leads a team of 10 and the AI-enabled customer operation" },
  { w: "Apr 2024 — Jan 2026", r: "Senior Manager, Customer Experience", o: "Flutterwave", m: "Chat CSAT 65% to 85% · 39% lower annual operating cost" },
  { w: "Sep 2022 — May 2024", r: "Manager, CX Quality Assurance and Training", o: "Flutterwave", m: "Quality Framework + AppSheet app: 30% faster evaluations" },
  { w: "2018 — Sep 2022", r: "Quality Analyst, Lead QA, CX Quality Manager", o: "Tek Experts", m: "Led 9 quality analysts · awarded Most Analytical QA" },
  { w: "2015 — Apr 2018", r: "Customer Service Officer to QA Supervisor", o: "First City Monument Bank", m: "Where quality, analytics and Lean Six Sigma took root" },
  { w: "2011 — 2015", r: "Customer Care Representative", o: "MTN Nigeria", m: "Where it all started: the frontline" },
];

/* ---------------------------------------------------------------- helpers */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function thumb(i) {
  const palettes = [
    ["#0e1b2c", "#22385a", "#f4a300"], ["#0f7c7a", "#0e1b2c", "#f4a300"], ["#22385a", "#0e1b2c", "#e4572e"],
    ["#0e1b2c", "#0f7c7a", "#f4a300"], ["#162840", "#0e1b2c", "#6fd6d2"], ["#0e1b2c", "#e4572e", "#f4a300"], ["#f4a300", "#0e1b2c", "#faf7f2"],
  ][i % 7];
  const pts = [];
  let seed = (i + 3) * 9301;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let k = 0; k < 11; k++) pts.push([Math.round(rnd() * 320 + 20), Math.round(rnd() * 150 + 15)]);
  let lines = "";
  for (let a = 0; a < pts.length; a++)
    for (let b = a + 1; b < pts.length; b++) {
      const d = Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1]);
      if (d < 95) lines += `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}"/>`;
    }
  const dots = pts.map((p, k) => `<circle cx="${p[0]}" cy="${p[1]}" r="${k % 3 === 0 ? 5 : 3}" ${k % 3 === 0 ? `fill="${palettes[2]}"` : ""}/>`).join("");
  return `<svg viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${palettes[0]}"/><stop offset="1" stop-color="${palettes[1]}"/></linearGradient></defs><rect width="360" height="180" fill="url(#g${i})"/><g stroke="#fff" stroke-opacity=".28" stroke-width="1">${lines}</g><g fill="#fff" fill-opacity=".75">${dots}</g></svg>`;
}

const nodesBg = `<div class="nodes-bg" aria-hidden="true"><svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"><g>
<line x1="80" y1="120" x2="260" y2="60"/><line x1="260" y1="60" x2="420" y2="170"/><line x1="420" y1="170" x2="610" y2="90"/><line x1="610" y1="90" x2="790" y2="200"/><line x1="790" y1="200" x2="980" y2="110"/><line x1="980" y1="110" x2="1130" y2="230"/>
<line x1="260" y1="60" x2="190" y2="260"/><line x1="420" y1="170" x2="330" y2="350"/><line x1="790" y1="200" x2="720" y2="380"/><line x1="980" y1="110" x2="1040" y2="330"/><line x1="190" y1="260" x2="330" y2="350"/><line x1="720" y1="380" x2="1040" y2="330"/>
<circle cx="80" cy="120" r="4"/><circle cx="260" cy="60" r="6"/><circle cx="420" cy="170" r="4"/><circle cx="610" cy="90" r="5"/><circle cx="790" cy="200" r="6"/><circle cx="980" cy="110" r="4"/><circle cx="1130" cy="230" r="5"/><circle cx="190" cy="260" r="4"/><circle cx="330" cy="350" r="5"/><circle cx="720" cy="380" r="4"/><circle cx="1040" cy="330" r="6"/></g></svg></div>`;

/* ---------------------------------------------------------------- data graphics (animated SVG) */
let vid = 0;
const vizCard = (title, cap, inner, cls = "") =>
  `<figure class="viz reveal ${cls}"><figcaption class="viz-t">${title}</figcaption>${inner}<p class="viz-c">${cap}</p></figure>`;

const vizLine = () => {
  const id = `ga${vid++}`;
  return `<svg viewBox="0 0 420 250" role="img" aria-label="Chat CSAT rose from 65 percent to 85 percent">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a300" stop-opacity=".38"/><stop offset="1" stop-color="#f4a300" stop-opacity="0"/></linearGradient></defs>
<g stroke="currentColor" stroke-opacity=".13">${[40, 95, 150, 205].map((y) => `<line x1="30" x2="400" y1="${y}" y2="${y}"/>`).join("")}</g>
<path class="fade" d="M50 190 C150 186 235 118 378 52 L378 205 L50 205Z" fill="url(#${id})"/>
<path class="draw" pathLength="1" d="M50 190 C150 186 235 118 378 52" fill="none" stroke="#f4a300" stroke-width="4.5" stroke-linecap="round"/>
<circle cx="50" cy="190" r="7" fill="currentColor"/><circle class="pulse" cx="378" cy="52" r="9" fill="#f4a300"/>
<text x="50" y="171" text-anchor="middle" class="vt">65%</text><text x="360" y="38" text-anchor="end" class="vt vt--big">85%</text>
<text x="50" y="234" text-anchor="middle" class="vs">Before</text><text x="378" y="234" text-anchor="middle" class="vs">After</text></svg>`;
};

const vizBars = (rows, aria) => {
  const h = rows.length * 78;
  return `<svg viewBox="0 0 420 ${h}" role="img" aria-label="${aria}">${rows
    .map((r, i) => {
      const y = i * 78;
      return `<text x="0" y="${y + 16}" class="vs">${r.label}</text>
<rect x="0" y="${y + 26}" width="420" height="12" rx="6" fill="currentColor" fill-opacity=".1"/>
<rect class="barx" x="0" y="${y + 26}" width="${r.a}" height="12" rx="6" fill="currentColor" fill-opacity=".38" style="--i:${i * 2}"/>
<text x="${Math.min(r.a + 8, 330)}" y="${y + 36}" class="vs" dominant-baseline="middle" style="font-size:11px">${r.at}</text>
<rect class="barx" x="0" y="${y + 46}" width="${r.b}" height="12" rx="6" fill="#f4a300" style="--i:${i * 2 + 1}"/>
<text x="${Math.min(r.b + 8, 330)}" y="${y + 56}" class="vt" dominant-baseline="middle" style="font-size:14px">${r.bt}</text>`;
    })
    .join("")}</svg>`;
};

const vizRings = (items, aria) =>
  `<svg viewBox="0 0 ${items.length * 140} 150" role="img" aria-label="${aria}">${items
    .map((it, i) => {
      const cx = 70 + i * 140;
      return `<circle cx="${cx}" cy="64" r="46" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="12"/>
<circle class="ring" cx="${cx}" cy="64" r="46" fill="none" stroke="${it.c || "#f4a300"}" stroke-width="12" stroke-linecap="round" pathLength="1" transform="rotate(-90 ${cx} 64)" style="--to:${(1 - it.pct / 100).toFixed(3)}"/>
<text x="${cx}" y="72" text-anchor="middle" class="vt" style="font-size:24px">${it.text}</text>
<text x="${cx}" y="140" text-anchor="middle" class="vs">${it.label}</text>`;
    })
    .join("")}</svg>`;

const person = (x, y, i, hi) => {
  const f = hi ? "#f4a300" : "currentColor";
  const o = hi ? "" : ' fill-opacity=".55"';
  return `<g transform="translate(${x} ${y})"><g class="pop" style="--i:${i}"><circle cx="14" cy="8" r="7" fill="${f}"${o}/><path d="M2 34c0-8 5-13 12-13s12 5 12 13z" fill="${f}"${o}/></g></g>`;
};
const vizTeam = () =>
  `<svg viewBox="0 0 420 190" role="img" aria-label="Team grew three times in two quarters">
<text x="0" y="14" class="vs">Q2 2023</text>${[0, 1, 2].map((k) => person(k * 40, 26, k, false)).join("")}
<text x="0" y="104" class="vs">Q3 2023</text>${Array.from({ length: 9 }, (_, k) => person((k % 9) * 40, 116, k + 3, true)).join("")}
<text x="372" y="62" text-anchor="end" class="vt vt--big">1×</text><text x="416" y="150" text-anchor="end" class="vt vt--big" style="fill:#f4a300">3×</text></svg>`;

const vizMap = {
  "csat-turnaround": () => vizCard("Chat CSAT", "Customer satisfaction before and after.", vizLine()),
  "ai-support-rollout": () => vizCard("Guardrails held", "Workforce optimised 10% while service levels stayed above target.", vizRings([{ pct: 10, text: "10%", label: "Workforce", c: "#6fd6d2" }, { pct: 90, text: "90%+", label: "Response" }, { pct: 80, text: "80%+", label: "Resolution" }], "Workforce optimisation 10 percent, response above 90 percent, resolution above 80 percent")),
  "multilingual-team-scale": () => vizCard("Team scale-up", "Each figure is one group of agents. Indexed, not headcount.", vizTeam()),
  "quality-framework": () => vizCard("Quality, measured", "Indexed to 100 before the framework.", vizBars([{ label: "Evaluation efficiency", a: 322, at: "100", b: 420, bt: "130" }, { label: "Customer satisfaction", a: 322, at: "100", b: 370, bt: "115" }], "Evaluation efficiency up 30 percent, satisfaction up 15 percent")),
  "ivr-redesign": () => vizCard("Voice engagement", "Indexed to 100 before the redesign. Four languages.", vizBars([{ label: "Voice engagement", a: 322, at: "100", b: 370, bt: "115" }], "Voice engagement improved 15 percent")),
  "cost-restructure": () => vizCard("Annual operating cost", "Indexed to 100 before the restructure.", vizBars([{ label: "Annual operating cost", a: 420, at: "100", b: 256, bt: "61" }], "Annual operating cost reduced by 39 percent")),
};

const homeViz = `
<section class="section section--alt">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">The results, visualised</span><h2>Numbers that moved, <span class="italic-serif">and stayed moved.</span></h2><p class="lede">Every chart below is drawn from figures already public on LinkedIn.</p></div>
    <div class="viz-grid">
      ${vizCard("Chat CSAT", "From 65% to 85%.", vizLine())}
      ${vizCard("Speed to a customer", "Relative time, before (faded) and after (amber).", vizBars([{ label: "First response: 3 hours to 15 minutes", a: 420, at: "3 hrs", b: 35, bt: "15 min" }, { label: "Resolution: 2 days to 12 hours", a: 420, at: "2 days", b: 105, bt: "12 hrs" }], "First response cut from 3 hours to 15 minutes, resolution from 2 days to 12 hours"))}
      ${vizCard("Team scale-up", "Tripled in two quarters, metrics held.", vizTeam())}
      ${vizCard("Operating cost", "39% lower annual operating cost in H2 2024.", vizRings([{ pct: 39, text: "−39%", label: "Annual cost", c: "#6fd6d2" }, { pct: 90, text: "90%+", label: "Response held" }, { pct: 80, text: "80%+", label: "Resolution held" }], "Cost down 39 percent while response above 90 and resolution above 80"))}
    </div>
  </div>
</section>`;

const marquee = (items) => {
  const row = items.map((t) => `<span>${t}</span>`).join("");
  return `<div class="marquee" aria-label="Capabilities"><div class="track" aria-hidden="true">${row}${row}</div></div>`;
};

const howIWork = `
<section class="section">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">How I work</span><h2>Fix the system. <span class="italic-serif">Then</span> amplify it.</h2><p class="lede">The same four moves, whether the operation has ten agents or a thousand.</p></div>
    <ol class="process">
      <li class="reveal"><span class="step-n">1</span><div class="step-ico">${I.cal.replace("<svg", '<svg width="28" height="28"')}</div><h3>Diagnose</h3><p>Map the journey and find where time and trust are really lost.</p></li>
      <li class="reveal" style="--d:.1s"><span class="step-n">2</span><div class="step-ico">${I.quality.replace("<svg", '<svg width="28" height="28"')}</div><h3>Fix the system</h3><p>Routing, ownership, knowledge and quality, before anything is automated.</p></li>
      <li class="reveal" style="--d:.2s"><span class="step-n">3</span><div class="step-ico">${I.ai.replace("<svg", '<svg width="28" height="28"')}</div><h3>Automate with AI</h3><p>Deploy tools like Intercom Fin on solid ground, with human hand-offs.</p></li>
      <li class="reveal" style="--d:.3s"><span class="step-n">4</span><div class="step-ico">${I.people.replace("<svg", '<svg width="28" height="28"')}</div><h3>Coach and scale</h3><p>Hold the metrics, grow the team, and pour into the people.</p></li>
    </ol>
  </div>
</section>`;

/* ---------------------------------------------------------------- logo: a conversation bubble holding a rising chain of connected nodes */
const MARK = `<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><path class="b" d="M10 3h28a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8H24l-10 9v-9h-4a8 8 0 0 1-8-8V11a8 8 0 0 1 8-8z"/><polyline class="l" points="11,28 20,19 27,24 37,12" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle class="n" cx="11" cy="28" r="2.6"/><circle class="n" cx="20" cy="19" r="2.6"/><circle class="n" cx="27" cy="24" r="2.6"/><circle class="n" cx="37" cy="12" r="3.8"/></svg>`;
const logo = (r) => `<a class="logo" href="${r}" aria-label="${NAME} — home">${MARK}<span class="logo-text"><b>Oluwaseun Olatunde</b><small>CX · AI · Operations</small></span></a>`;
const markFile = (bg, line, node) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="256" height="256"><path fill="${bg}" d="M10 3h28a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8H24l-10 9v-9h-4a8 8 0 0 1-8-8V11a8 8 0 0 1 8-8z"/><polyline points="11,28 20,19 27,24 37,12" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><g fill="${node}"><circle cx="11" cy="28" r="2.6"/><circle cx="20" cy="19" r="2.6"/><circle cx="27" cy="24" r="2.6"/><circle cx="37" cy="12" r="3.8"/></g></svg>\n`;
const lockupFile = (bg, line, node, text, sub) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 64" width="760" height="128"><g transform="translate(0 8) scale(1)"><svg viewBox="0 0 48 48" width="48" height="48"><path fill="${bg}" d="M10 3h28a8 8 0 0 1 8 8v18a8 8 0 0 1-8 8H24l-10 9v-9h-4a8 8 0 0 1-8-8V11a8 8 0 0 1 8-8z"/><polyline points="11,28 20,19 27,24 37,12" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><g fill="${node}"><circle cx="11" cy="28" r="2.6"/><circle cx="20" cy="19" r="2.6"/><circle cx="27" cy="24" r="2.6"/><circle cx="37" cy="12" r="3.8"/></g></svg></g><text x="62" y="34" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="26" fill="${text}">Oluwaseun Olatunde</text><text x="63" y="52" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="10.5" letter-spacing="3.2" fill="${sub}">CX · AI · OPERATIONS</text></svg>\n`;

const nav = [
  ["about", "About"], ["work", "Work"], ["insights", "Insights"], ["speaking", "Speaking"], ["community", "Community"],
];

function layout({ path, title, desc, body, bodyClass = "", jsonld = "", noindex = false }) {
  const depth = path === "index.html" ? 0 : path.split("/").length - 1;
  const r = "../".repeat(depth);
  const slug = path.replace(/index\.html$/, "");
  const url = `${SITE}/${slug}`;
  const section = slug.split("/")[0];
  const fullTitle = path === "index.html" ? `${NAME} — Designing CX systems that think, learn and scale` : `${title} | ${NAME}`;
  const navLinks = nav.map(([h, l]) => `<a href="${r}${h}/"${section === h ? ' aria-current="page"' : ""}>${l}</a>`).join("");
  const mLinks = nav.map(([h, l]) => `<a class="m-link" href="${r}${h}/">${l}<span>→</span></a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${path === "404.html" ? `<base href="${SITE}/">` : ""}
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : ""}
<meta name="theme-color" content="#0e1b2c">
<meta name="color-scheme" content="light">
${path === "index.html" ? `<link rel="preload" as="image" href="${r}assets/img/oluwaseun.jpg" fetchpriority="high">` : ""}
<meta property="og:type" content="${section === "work" && depth > 1 ? "article" : "website"}">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/img/oluwaseun.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<link rel="icon" type="image/svg+xml" href="${r}assets/img/logo-mark.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/css/styles.css">
${jsonld ? `<script type="application/ld+json">${jsonld}</script>` : ""}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap bar">
    ${logo(r)}
    <nav class="nav" aria-label="Primary">${navLinks}</nav>
    <div class="header-actions">
      <a class="btn btn--sm header-cta" href="${r}contact/">Work With Me ${ARR}</a>
      <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span class="bars"><i></i><i></i><i></i></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  ${mLinks}
  <a class="btn" href="${r}contact/">Work With Me ${ARR}</a>
</div>
<main id="main">
${body(r)}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="f-news">
      <div><span class="eyebrow">The newsletter</span><h2 class="f-h">Practical notes on AI-enabled customer operations.</h2><p>One email, only when there is something worth saying.</p></div>
      <div>
        <form class="news-form" data-form="newsletter" novalidate>
          <div class="field"><label class="sr-only" for="nl-email-${depth}">Email address</label><input id="nl-email-${depth}" type="email" name="email" placeholder="Your email address" autocomplete="email" required aria-describedby="nl-note-${depth}"><span class="err">Enter a valid email.</span></div>
          <button class="btn" type="submit">Subscribe ${ARR}</button>
        </form>
        <p class="news-note" id="nl-note-${depth}">Double opt-in. Unsubscribe any time.</p>
      </div>
    </div>
    <div class="f-grid">
      <div class="f-brand">
        ${logo(r)}
        <p class="about">Designing CX systems that think, learn, and scale. Head of Customer Operations at Flutterwave.</p>
        <div class="socials"><a href="${LINKEDIN}" rel="noopener" aria-label="LinkedIn">${I.in}</a><a href="mailto:${EMAIL}" aria-label="Email">${I.mail}</a></div>
      </div>
      <nav aria-label="Explore"><h3 class="f-t">Explore</h3><ul>${nav.map(([h, l]) => `<li><a href="${r}${h}/">${l}</a></li>`).join("")}<li><a href="${r}contact/">Contact</a></li></ul></nav>
      <nav aria-label="Case studies"><h3 class="f-t">Case studies</h3><ul>${cases.map((c) => `<li><a href="${r}work/${c.slug}/">${c.title}</a></li>`).join("")}</ul></nav>
      <div><h3 class="f-t">Get in touch</h3><ul><li><a href="mailto:${EMAIL}">${EMAIL}</a></li><li><a href="${LINKEDIN}" rel="noopener">LinkedIn</a></li><li><a href="${r}speaking/#book">Book a talk</a></li></ul><p class="f-small">Replies within two working days.</p></div>
    </div>
    <div class="mega" aria-hidden="true">Olatunde</div>
    <div class="footer-bottom"><span>© <span data-year>2026</span> ${NAME}. All rights reserved.</span><nav aria-label="Legal"><a href="${r}privacy/">Privacy</a><a href="${r}terms/">Terms</a><a href="${r}sitemap.xml">Sitemap</a></nav></div>
  </div>
</footer>
<div class="consent" role="dialog" aria-label="Cookie preferences">
  <p>I only use privacy-friendly analytics, and only if you say yes. Nothing non-essential runs by default. <a href="${r}privacy/">Read more</a>.</p>
  <div class="btns"><button class="btn btn--sm btn--dark" type="button" data-consent="declined">Decline</button><button class="btn btn--sm btn--ghost" type="button" data-consent="accepted">Accept</button></div>
</div>
<script src="${r}assets/js/main.js" defer></script>
</body>
</html>
`;
}

const pageHero = (r, crumb, h1, lede) => `
<section class="page-hero">
  ${nodesBg}
  <div class="wrap">
    <div class="crumbs"><a href="${r}">Home</a><span aria-hidden="true">/</span><span>${crumb}</span></div>
    <span class="eyebrow">${crumb}</span>
    <h1>${h1}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ""}
  </div>
</section>`;

const cta = (r, h = "Have a customer operation to run, fix or scale?", p = "Tell me where you are. If I can help, I will say so. If I can't, I will point you to who can.") => `
<section class="section cta">
  <div class="wrap reveal">
    <h2>${h}</h2>
    <p>${p}</p>
    <div class="btns"><a class="btn" href="${r}contact/">Start a conversation ${ARR}</a><a class="btn btn--ghost" href="${r}speaking/#book">Invite me to speak</a></div>
  </div>
</section>`;

const caseCard = (r, c, d = 0) => `
<a class="card case-card reveal" style="--d:${d}s" href="${r}work/${c.slug}/">
  <div class="top"><svg class="spark" viewBox="0 0 160 70" aria-hidden="true"><path d="M2 62 C28 60 42 44 72 38 S126 16 158 5" /><circle cx="158" cy="5" r="4"/></svg><div class="big">${c.big}</div><div class="big-cap">${c.bigCap}</div></div>
  <div class="body"><span class="tag">${c.tag}</span><h3>${c.title}</h3><p>${c.short}</p><span class="go">Read the case study ${ARR}</span></div>
</a>`;

const articleCard = (a, i, d = 0, feat = false) => `
<article class="card article-card reveal${feat ? " feat" : ""}" style="--d:${d}s" data-cat="${esc(a.c)}">
  <div class="thumb">${thumb(i)}<span class="cat">${a.c}</span></div>
  <div class="body"><div class="meta"><span>${a.rt} min read</span><span>Coming to the site</span></div><h3 style="margin-top:12px">${a.t}</h3><p>${a.s}</p></div>
</article>`;

/* ---------------------------------------------------------------- pages */
const pages = [];
const add = (p) => pages.push(p);

// HOME ---------------------------------------------------------------
add({
  path: "index.html",
  title: "Home",
  desc: "Oluwaseun Olatunde is Head of Customer Operations at Flutterwave. Fifteen years turning customer support into a competitive advantage with data, AI and discipline.",
  jsonld: JSON.stringify({
    "@context": "https://schema.org", "@type": "Person", name: NAME, jobTitle: "Head of Customer Operations",
    worksFor: { "@type": "Organization", name: "Flutterwave" }, url: SITE, image: `${SITE}/assets/img/oluwaseun.jpg`,
    sameAs: [LINKEDIN], description: "Designing CX systems that think, learn and scale.",
    knowsAbout: ["Customer experience", "Contact centre quality", "AI in customer support", "Customer operations", "Intercom Fin AI"],
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Lagos State University" }],
  }),
  body: (r) => `
<section class="hero">
  ${nodesBg}
  <div class="wrap hero-grid">
    <div>
      <h1 class="hero-h1"><span class="line"><span style="--d:.1s">Designing CX systems</span></span><span class="line"><span style="--d:.22s">that <em>think, learn,</em></span></span><span class="line"><span style="--d:.34s">and <em>scale.</em></span></span></h1>
      <div class="rotator rise" style="--d:.5s"><span class="rot-dot" aria-hidden="true"></span><span class="rot-label">Currently obsessed with</span><span class="rot-window"><span class="rot-track"><span>AI that amplifies people</span><span>quality as an operating system</span><span>scaling without breaking metrics</span><span>support customers rate highly</span></span></span></div>
      <p class="lede typing rise" style="--d:.6s" data-type><span class="sr-only">Head of Customer Operations at Flutterwave. Fifteen years turning customer support into a competitive advantage with data, AI and discipline.</span><span class="ghost" aria-hidden="true">Head of Customer Operations at Flutterwave. Fifteen years turning customer support into a competitive advantage with data, AI and discipline.</span></p>
      <div class="hero-actions rise" style="--d:.7s">
        <a class="btn" href="${r}contact/">Work With Me ${ARR}</a>
        <a class="btn btn--ghost" href="#results">See the Results</a>
      </div>
      <div class="hero-meta rise" style="--d:.85s"><span>Lagos, Nigeria</span><span>AI · Quality · Operations</span><span>Speaker &amp; mentor</span></div>
    </div>
    <div class="hero-visual">
      <div class="blob" aria-hidden="true"></div>
      <figure class="portrait" style="margin:0"><img src="${r}assets/img/oluwaseun.jpg" alt="Portrait of Oluwaseun Olatunde, smiling with arms folded in a striped shirt" width="502" height="646" fetchpriority="high"></figure>


    </div>
  </div>
<a class="scroll-cue" href="#results" aria-label="Scroll to results"><span></span></a>
</section>

<section class="results" id="results" aria-label="Key results">
  <div class="wrap">
    <div class="metrics">
      <div class="metric"><div class="m-top">Chat CSAT</div><div class="num"><span class="from">65%</span><i aria-hidden="true">→</i><span class="to"><span data-count="85">85</span>%</span></div><div class="cap">Customer satisfaction, up 20 points</div></div>
      <div class="metric"><div class="m-top">First response</div><div class="num"><span class="from">3 hrs</span><i aria-hidden="true">→</i><span class="to"><span data-count="15">15</span> min</span></div><div class="cap">Time to a first reply</div></div>
      <div class="metric"><div class="m-top">Team scale-up</div><div class="num"><span class="to"><span data-count="3">3</span>×</span></div><div class="cap">Multilingual team in two quarters</div></div>
      <div class="metric"><div class="m-top">Cost reduction</div><div class="num"><span class="to"><span data-count="39">39</span>%</span></div><div class="cap">Lower annual operating cost</div></div>
    </div>
  </div>
</section>

${marquee(["Customer experience", "Intercom Fin AI", "Contact-centre quality", "Lean Six Sigma", "CX data and dashboards", "AppSheet", "Multilingual IVR", "Team scale-up", "Voice of Customer", "Coaching and mentoring"])}
<section class="section">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">What I stand for</span><h2>Three ideas that run <span class="italic-serif">every</span> operation I lead.</h2><p class="lede">Customer support is not a cost to be trimmed. Built well, it is the most honest growth engine a company has.</p></div>
    <div class="grid-3">
      <a class="card pillar reveal" href="${r}work/ai-support-rollout/"><span class="num-tag">01</span><div class="ico">${I.ai}</div><h3>AI in Operations</h3><p>Fix the support system first, then automate. AI amplifies what is already there; it does not replace the work of getting the basics right.</p><span class="go">See the AI rollout ${ARR}</span></a>
      <a class="card pillar reveal" style="--d:.1s" href="${r}work/quality-framework/"><span class="num-tag">02</span><div class="ico">${I.quality}</div><h3>Quality at Scale</h3><p>Quality is an operating system, not a monthly audit. Frameworks, scorecards and coaching that keep standards high as you grow.</p><span class="go">See the quality framework ${ARR}</span></a>
      <a class="card pillar reveal" style="--d:.2s" href="${r}work/multilingual-team-scale/"><span class="num-tag">03</span><div class="ico">${I.people}</div><h3>People and Systems</h3><p>Be a river, not a pond. Grow teams fast without breaking the metrics, and pour back into the people coming up behind.</p><span class="go">See the team scale-up ${ARR}</span></a>
    </div>
  </div>
</section>

${howIWork}
${homeViz}
<section class="section">
  <div class="wrap">
    <div class="section-head section-head--row reveal"><div><span class="eyebrow">Featured work</span><h2>Proof, not promises.</h2></div><a class="link-arrow" href="${r}work/">All case studies ${ARR}</a></div>
    <div class="grid-3">${[cases[0], cases[1], cases[3]].map((c, i) => caseCard(r, c, i * 0.1)).join("")}</div>
  </div>
</section>

<section class="section quote-band">
  <div class="wrap reveal">
    <blockquote>AI is an amplifier, <em>not a foundation.</em> Weak systems will only scale chaos.</blockquote>
    <cite>Oluwaseun Olatunde · CX Outsourcing session</cite>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head section-head--row reveal"><div><span class="eyebrow">Latest insights</span><h2>Notes from the operations floor.</h2></div><a class="link-arrow" href="${r}insights/">All insights ${ARR}</a></div>
    <div class="grid-3">${articles.slice(0, 3).map((a, i) => articleCard(a, i, i * 0.1)).join("")}</div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap">
    <div class="split">
      <div class="reveal">
        <span class="eyebrow">Speaking</span>
        <h2>Talks that leave a team with something to <span class="italic-serif">do</span> on Monday.</h2>
        <p class="lede">Conference stages, webinars, panels and podcasts on AI-enabled customer operations, quality and leading support teams in Africa.</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap"><a class="btn" href="${r}speaking/#book">Invite me to speak ${ARR}</a><a class="btn btn--ghost" href="${r}speaking/">See all talks</a></div>
      </div>
      <div class="talk-list">${talks.slice(0, 3).map((t, i) => `<div class="talk reveal" style="--d:${i * 0.1}s"><span class="n">0${i + 1}</span><div><h3>${t.t}</h3><p>${t.p}</p></div></div>`).join("")}</div>
    </div>
    <div class="logos" style="border-color:rgba(255,255,255,.14)"><p style="color:#b9c4d3">Where I have worked and spoken</p><span style="color:#fff">Flutterwave</span><span style="color:#fff">Tek Experts</span><span style="color:#fff">FCMB</span><span style="color:#fff">MTN</span><span style="color:#fff">CX Outsourcing</span><span style="color:#fff">AVOXI</span></div>
  </div>
</section>
${cta(r)}`,
});

// ABOUT --------------------------------------------------------------
add({
  path: "about/index.html",
  title: "About",
  desc: "From MTN call-centre representative in 2011 to Head of Customer Operations at Flutterwave: the story, timeline and lessons of a 15-year CX and operations leader.",
  body: (r) => `
${pageHero(r, "About", "From the frontline to the <span class=\"italic-serif\">system</span>.", "I started on a headset in 2011. Today I build AI into customer support at scale. This is how I got here, and what I learned on the way.")}
<section class="section">
  <div class="wrap">
    <div class="split" style="align-items:start;margin-bottom:clamp(40px,6vw,80px)">
      <figure class="reveal" style="margin:0;max-width:440px"><div class="portrait" style="border-radius:28px"><img src="${r}assets/img/oluwaseun.jpg" alt="Oluwaseun Olatunde" width="502" height="646" loading="lazy"></div></figure>
      <div class="reveal"><span class="eyebrow">The short version</span><h2>Support is where a company keeps its promises.</h2><p class="lede">I am a fifteen-year customer experience and operations leader. I rose from MTN call-centre representative to Head of Customer Operations at Flutterwave, and I now build AI into support at scale. I say the story plainly and prove it with numbers.</p><p>I believe in warm, direct, analytical work: short sentences, honest data, and a lesson in every story.</p><a class="btn" href="${LINKEDIN}" rel="noopener">Connect on LinkedIn ${ARR}</a></div>
    </div>
    <div class="story">
      <div class="beat reveal"><div class="label"><b>01</b>The frontline · 2011</div><div><h3>I learned customers at MTN.</h3><p>In 2011 I answered calls as a Customer Care Representative at MTN Nigeria. No dashboard teaches what a frustrated caller teaches you in ninety seconds: people want to be heard, and then they want it fixed.</p></div></div>
      <div class="beat reveal"><div class="label"><b>02</b>The craft · 2015–2022</div><div><h3>I learned quality, data and discipline.</h3><p>At First City Monument Bank and then Tek Experts I moved from service officer to QA supervisor, Lead QA and CX Quality Manager, leading a team of nine quality analysts. Quality, analytics and Lean Six Sigma became how I think.</p></div></div>
      <div class="beat reveal"><div class="label"><b>03</b>The system · 2022–now</div><div><h3>I learned to build systems that learn.</h3><p>At Flutterwave I built the Contact Centre Quality Framework, scaled a multilingual team three times, lifted chat CSAT from 65% to 85%, deployed Intercom Fin AI and now lead Customer Operations. The aim stays the same: systems that think, learn and scale.</p></div></div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0"><div class="wrap"><blockquote class="pull reveal">Be a river, <em>not a pond.</em><cite>The way I try to lead</cite></blockquote><div class="bento">
  <div class="tile tile--wide reveal"><b><span data-count="15">15</span>+</b><span>years in customer experience and operations</span></div>
  <div class="tile tile--amber tile--wide reveal" style="--d:.06s"><b><span data-count="3">3</span>×</b><span>multilingual team scale-up</span></div>
  <div class="tile reveal" style="--d:.12s"><b><span data-count="9">9</span></b><span>quality analysts led at Tek Experts</span></div>
  <div class="tile tile--teal reveal" style="--d:.18s"><b><span data-count="4">4</span></b><span>African languages in the rebuilt IVR</span></div>
  <div class="tile reveal" style="--d:.24s"><b style="font-size:clamp(1.8rem,3vw,2.4rem)">Most Analytical QA</b><span>Awarded at Tek Experts</span></div>
</div></div></section>
<section class="section section--alt">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Career timeline</span><h2>Fifteen years, one thread.</h2><p class="lede">A metric on every role, because stories need evidence.</p></div>
    <div class="timeline"><div class="line"></div>
      ${timeline.map((t) => `<div class="t-item"><div class="when">${t.w}</div><h3>${t.r}</h3><div class="org">${t.o}</div><span class="metric-pill">${t.m}</span></div>`).join("")}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Lessons from 15 years</span><h2>What I would tell my younger self.</h2></div>
    <div class="lessons">${["Put God first.", "A happy home fuels a strong career.", "Never despise small beginnings.", "Never burn bridges.", "Help your boss succeed.", "Keep learning.", "Pour into others."].map((l, i) => `<div class="lesson reveal" style="--d:${(i % 2) * 0.08}s"><p>${l}</p></div>`).join("")}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="facts">
      <div class="card fact reveal"><h4>Education</h4><b>BSc Fisheries and Aquatic Biology</b><p>Lagos State University, 2002 to 2008.</p></div>
      <div class="card fact reveal" style="--d:.08s"><h4>Certifications</h4><b>Google and LinkedIn Learning</b><p>“Start Writing Prompts like a Pro” and “Managing a Customer Contact Center” (both Jul 2025).</p></div>
      <div class="card fact reveal"><h4>Recognition</h4><b>Most Analytical QA</b><p>Awarded at Tek Experts.</p></div>
      <div class="card fact reveal" style="--d:.08s"><h4>Community</h4><b>Charity CDS Leader</b><p>NYSC Amuwo Odofin LGA, serving since 2009. Faith, family and service shape how I lead.</p></div>
    </div>
  </div>
</section>
${cta(r, "Let's build something that scales.")}`,
});

// WORK INDEX ---------------------------------------------------------
add({
  path: "work/index.html",
  title: "Work and case studies",
  desc: "Six case studies in AI-enabled customer operations: CSAT from 65% to 85%, a 3x team scale-up, Intercom Fin AI, a quality framework, a multilingual IVR and a 39% cost cut.",
  body: (r) => `
${pageHero(r, "Work", "Results you can <span class=\"italic-serif\">check</span>.", "Six operations I have fixed, scaled or rebuilt. Each one follows the same story: context, challenge, what I did, results, lessons and tools.")}
<section class="section"><div class="wrap">
  <div class="grid-3" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))">${cases.map((c, i) => caseCard(r, c, (i % 3) * 0.08)).join("")}</div>
</div></section>
<section class="section section--alt"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow">Frameworks</span><h2>Take them and use them.</h2><p class="lede">One-page tools I use with teams. Coming soon, shared by email.</p></div>
  <div class="kit">
    <div class="card reveal"><span class="tag">Checklist</span><h3>“Fix support before you add AI”</h3><p>A short checklist to run before any automation project, so AI amplifies strengths and not chaos.</p><a class="go" href="${r}contact/?topic=framework">Get notified ${ARR}</a></div>
    <div class="card reveal" style="--d:.08s"><span class="tag">Template</span><h3>QA scorecard starter</h3><p>A simple, fair scorecard you can adapt for chat, email and voice.</p><a class="go" href="${r}contact/?topic=framework">Get notified ${ARR}</a></div>
    <div class="card reveal" style="--d:.16s"><span class="tag">Playbook</span><h3>Incident-recovery playbook</h3><p>What to do in the first hour, the first day and the first week after a service failure.</p><a class="go" href="${r}contact/?topic=framework">Get notified ${ARR}</a></div>
  </div>
</div></section>
${cta(r)}`,
});

// CASE STUDIES -------------------------------------------------------
cases.forEach((c, idx) => {
  const next = [cases[(idx + 1) % cases.length], cases[(idx + 2) % cases.length]];
  add({
    path: `work/${c.slug}/index.html`,
    title: c.title,
    desc: `${c.short}`,
    jsonld: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: c.title, description: c.short, author: { "@type": "Person", name: NAME }, image: `${SITE}/assets/img/oluwaseun.jpg` }),
    body: (r) => `
<section class="cs-hero">
  <div class="wrap">
    <div class="crumbs"><a href="${r}">Home</a><span aria-hidden="true">/</span><a href="${r}work/">Work</a><span aria-hidden="true">/</span><span>${c.title}</span></div>
    <div class="cs-hero-grid">
      <div><span class="eyebrow" style="color:var(--signal)">${c.tag}</span>
      <h1>${c.title}</h1>
      <p class="lede">${c.short}</p></div>
      <div class="cs-viz">${vizMap[c.slug]()}</div>
    </div>
  </div>
</section>
<div class="wrap" style="padding-bottom:0"><div class="cs-results" style="--n:${c.results.length}">${c.results.map((x) => `<div><div class="v">${x.v}</div><div class="k">${x.k}</div></div>`).join("")}</div></div>
<section class="section" style="padding-top:clamp(48px,6vw,80px)">
  <div class="wrap cs-layout">
    <nav class="cs-toc" aria-label="On this page"><a href="#context">Context</a><a href="#challenge">Challenge</a><a href="#what-i-did">What I did</a><a href="#results">Results</a><a href="#lessons">Lessons</a><a href="#tools">Tools</a></nav>
    <div class="cs-body">
      <section id="context"><h2>Context</h2><p>${c.context}</p></section>
      <section id="challenge"><h2>Challenge</h2><p>${c.challenge}</p></section>
      <section id="what-i-did"><h2>What I did</h2><ol class="steps">${c.actions.map((a) => `<li>${a}</li>`).join("")}</ol></section>
      <section id="results"><h2>Results</h2><p class="pullout">${c.bigCap}: ${c.big.replace("→", "to")}.</p></section>
      <section id="lessons"><h2>Lessons</h2><ul class="ticks">${c.lessons.map((l) => `<li>${l}</li>`).join("")}</ul></section>
      <section id="tools"><h2>Tools</h2><ul class="tools">${c.tools.map((t) => `<li>${t}</li>`).join("")}</ul></section>
    </div>
  </div>
</section>
<section class="section section--alt"><div class="wrap"><div class="section-head reveal"><span class="eyebrow">Keep reading</span><h2>More case studies</h2></div><div class="next-case">${next.map((n, i) => caseCard(r, n, i * 0.1)).join("")}</div></div></section>
${cta(r, "Facing something similar?", "Send me a short note about your operation. I read every message.")}`,
  });
});

// INSIGHTS -----------------------------------------------------------
add({
  path: "insights/index.html",
  title: "Insights",
  desc: "Articles on AI and automation, quality and coaching, CX leadership, customer stories and career advice from Oluwaseun Olatunde.",
  body: (r) => `
${pageHero(r, "Insights", "Short lessons from the <span class=\"italic-serif\">floor</span>.", "Stories, frameworks and hard-won lessons on customer operations, AI and leading people. First drafts of long-form versions of my best LinkedIn posts.")}
<section class="section"><div class="wrap">
  <div class="filters" role="group" aria-label="Filter by category"><button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>${cats.map((c) => `<button class="chip" type="button" data-filter="${esc(c)}" aria-pressed="false">${c}</button>`).join("")}</div>
  <div class="grid-auto insights-grid">${articles.map((a, i) => articleCard(a, i, (i % 3) * 0.08, i === 0)).join("")}</div>
  <div class="card reveal" style="margin-top:48px;flex-direction:row;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between"><div style="max-width:56ch"><h3>Prefer LinkedIn?</h3><p style="margin:0;color:var(--text-soft)">I share short posts there most weeks. Follow along and join the conversation.</p></div><a class="btn" href="${LINKEDIN}" rel="noopener">Follow on LinkedIn ${ARR}</a></div>
</div></section>
${cta(r, "Get the next one in your inbox.", "A short, practical email when there is something worth saying. No spam.")}`,
});

// SPEAKING -----------------------------------------------------------
add({
  path: "speaking/index.html",
  title: "Speaking",
  desc: "Book Oluwaseun Olatunde to speak on AI-enabled customer operations, quality culture and scaling support. Signature talks, past appearances, media kit and booking form.",
  body: (r) => `
${pageHero(r, "Speaking", "Talks that help teams get <span class=\"italic-serif\">better</span>.", "Practical, story-led sessions for conferences, webinars, panels and podcasts. Expect numbers, honesty and a clear thing to do on Monday.")}
<section class="section"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow">Signature talks</span><h2>Four talks, adapted to your audience.</h2></div>
  <div class="grid-auto" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr))">${talks.map((t, i) => `<div class="card lift reveal" style="--d:${(i % 2) * 0.08}s"><span class="tag">Talk 0${i + 1}</span><h3>${t.t}</h3><p style="color:var(--text-soft);margin:0">${t.p}</p></div>`).join("")}</div>
</div></section>
<section class="section section--alt"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow">Past appearances</span><h2>Where you can find me.</h2></div>
  <ul class="past reveal">
    <li><span class="d">28 Feb 2026</span><div><b>CX Outsourcing webinar</b><span>AI in customer operations: “AI is an amplifier, not a foundation.”</span></div></li>
    <li><span class="d">30 Oct 2024</span><div><b>Flutterwave Product Workshop</b><span>Panelist.</span></div></li>
    <li><span class="d">Interview</span><div><b>AVOXI</b><span>Conversation on contact-centre operations.</span></div></li>
  </ul>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow">Media kit</span><h2>Everything an organiser needs.</h2></div>
  <div class="kit">
    <div class="card reveal"><span class="ico" style="width:48px;height:48px;border-radius:14px;background:var(--mist);display:grid;place-items:center;margin-bottom:18px;color:var(--teal-text)">${I.mic.replace("<svg", '<svg width="24" height="24"')}</span><h3>Bio in 50, 100 and 250 words</h3><p>Pick the length your programme needs.</p><a class="go" href="mailto:${EMAIL}?subject=Media%20kit%20request">Request the kit ${ARR}</a></div>
    <div class="card reveal" style="--d:.08s"><span class="ico" style="width:48px;height:48px;border-radius:14px;background:var(--mist);display:grid;place-items:center;margin-bottom:18px;color:var(--teal-text)">${I.down.replace("<svg", '<svg width="24" height="24"')}</span><h3>Headshots</h3><p>High-resolution portraits, formal and relaxed.</p><a class="go" href="mailto:${EMAIL}?subject=Headshots%20request">Request headshots ${ARR}</a></div>
    <div class="card reveal" style="--d:.16s"><span class="ico" style="width:48px;height:48px;border-radius:14px;background:var(--mist);display:grid;place-items:center;margin-bottom:18px;color:var(--teal-text)">${I.cal.replace("<svg", '<svg width="24" height="24"')}</span><h3>Topics and formats</h3><p>Keynote, panel, fireside chat, workshop or podcast.</p><a class="go" href="#book">Book a talk ${ARR}</a></div>
  </div>
</div></section>
<section class="section section--alt" id="book"><div class="wrap"><div class="contact-grid">
  <div class="reveal"><span class="eyebrow">Booking</span><h2>Invite me to speak.</h2><p class="lede">Tell me about your event. You will hear back within two working days.</p>
  <form class="form form-card" data-form="speaking" data-subject="Speaking enquiry" novalidate>
    <div class="hp"><label>Leave blank <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="row"><div class="field"><label for="s-name">Your name <span class="req">*</span></label><input id="s-name" name="name" required autocomplete="name"><span class="err">Please enter your name.</span></div><div class="field"><label for="s-email">Email <span class="req">*</span></label><input id="s-email" name="email" type="email" required autocomplete="email"><span class="err">Enter a valid email.</span></div></div>
    <div class="row"><div class="field"><label for="s-org">Organisation <span class="req">*</span></label><input id="s-org" name="org" required autocomplete="organization"><span class="err">Please enter your organisation.</span></div><div class="field"><label for="s-event">Event name <span class="req">*</span></label><input id="s-event" name="event" required><span class="err">Please enter the event name.</span></div></div>
    <div class="row"><div class="field"><label for="s-date">Event date</label><input id="s-date" name="date" type="date"></div><div class="field"><label for="s-size">Audience size</label><input id="s-size" name="size" inputmode="numeric" placeholder="e.g. 200"></div></div>
    <div class="row"><div class="field"><label for="s-format">Format</label><select id="s-format" name="format"><option value="">Select…</option><option>Keynote</option><option>Panel</option><option>Fireside chat</option><option>Workshop</option><option>Podcast or interview</option></select></div><div class="field"><label for="s-budget">Budget range</label><select id="s-budget" name="budget"><option value="">Select…</option><option>Pro bono or community</option><option>Under $1,000</option><option>$1,000 to $3,000</option><option>$3,000+</option></select></div></div>
    <div class="field"><label for="s-msg">Message <span class="req">*</span></label><textarea id="s-msg" name="message" required></textarea><span class="err">Tell me a little about the event.</span></div>
    <button class="btn" type="submit" style="justify-self:start">Send enquiry ${ARR}</button>
  </form></div>
  <aside class="side-list reveal" style="--d:.1s;align-content:start"><div class="side-item"><span class="ico">${I.cal}</span><div><b>Response time</b><span>Within two working days.</span></div></div><a class="side-item" href="${LINKEDIN}" rel="noopener"><span class="ico">${I.in}</span><div><b>LinkedIn</b><span>See recent posts and sessions.</span></div></a><a class="side-item" href="mailto:${EMAIL}"><span class="ico">${I.mail}</span><div><b>Email</b><span>${EMAIL}</span></div></a></aside>
</div></div></section>`,
});

// COMMUNITY ----------------------------------------------------------
add({
  path: "community/index.html",
  title: "Mentorship and Community",
  desc: "Free CX career guidance for graduates and NYSC corps members, mentorship applications, and charity and faith-based leadership from Oluwaseun Olatunde.",
  body: (r) => `
${pageHero(r, "Community", "Be a river, <span class=\"italic-serif\">not a pond</span>.", "Whatever I have learned is meant to flow on. Here is how I try to pour into others.")}
<section class="section"><div class="wrap" style="display:grid;gap:clamp(56px,8vw,110px)">
  <div class="feature reveal"><div class="art"><svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="320" fill="#0e1b2c"/><g stroke="#fff" stroke-opacity=".2"><line x1="50" y1="60" x2="160" y2="140"/><line x1="160" y1="140" x2="280" y2="70"/><line x1="280" y1="70" x2="350" y2="200"/><line x1="160" y1="140" x2="190" y2="260"/><line x1="190" y1="260" x2="350" y2="200"/></g><g fill="#f4a300"><circle cx="50" cy="60" r="6"/><circle cx="160" cy="140" r="9"/><circle cx="280" cy="70" r="6"/><circle cx="350" cy="200" r="7"/><circle cx="190" cy="260" r="6"/></g></svg><span class="glyph">1:1</span></div>
    <div><span class="eyebrow">Mentorship</span><h2>Mentoring for rising CX leaders.</h2><p>I mentor a small number of CX, QA and operations professionals each year. Good mentoring is specific: a real problem, an honest conversation and one next step.</p><ul class="ticks"><li>Career paths from frontline to leadership</li><li>Building quality and coaching habits</li><li>Using AI without losing the human touch</li></ul><a class="btn" href="${r}contact/?topic=mentorship">Apply for mentorship ${ARR}</a></div></div>
  <div class="feature rev reveal"><div class="art" style="background:var(--teal)"><svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#fff" stroke-opacity=".25"><circle cx="200" cy="160" r="60"/><circle cx="200" cy="160" r="110"/><circle cx="200" cy="160" r="160"/></g></svg><span class="glyph" style="color:#fff">NYSC</span></div>
    <div><span class="eyebrow">Career guidance</span><h2>Free guidance for graduates and NYSC corps members.</h2><p>Many graduates do not know that customer experience is a real career with a real ladder. I started on a headset; I would love to help you see what is possible, and how to start.</p><ul class="ticks"><li>How to get into customer experience</li><li>CV, interviews and your first 90 days</li><li>Skills worth building now, including AI</li></ul><a class="btn btn--ghost" href="${r}contact/?topic=mentorship">Ask for guidance ${ARR}</a></div></div>
  <div class="feature reveal"><div class="art" style="background:var(--signal)"><svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g stroke="#0e1b2c" stroke-opacity=".2" fill="none"><circle cx="90" cy="80" r="70"/><circle cx="330" cy="260" r="90"/></g></svg><span class="glyph" style="color:#0e1b2c">Serve</span></div>
    <div><span class="eyebrow">Charity and faith</span><h2>Service and faith-based leadership.</h2><p>Since 2009 I have served as a Charity CDS Leader with NYSC in Amuwo Odofin LGA. Faith, family and service are why I lead the way I do.</p><a class="btn btn--ghost" href="${r}contact/?topic=community">Talk about community ${ARR}</a></div></div>
</div></section>
${cta(r, "Want to pour into someone, or be poured into?")}`,
});

// CONTACT ------------------------------------------------------------
add({
  path: "contact/index.html",
  title: "Contact",
  desc: "Contact Oluwaseun Olatunde for speaking, advisory, mentoring and consulting enquiries. Replies within two working days.",
  body: (r) => `
${pageHero(r, "Contact", "Let's talk about your <span class=\"italic-serif\">operation</span>.", "Speaking, advisory, mentoring or just a good conversation about customer experience. I reply within two working days.")}
<section class="section"><div class="wrap contact-grid">
  <div class="reveal"><form class="form form-card" data-form="contact" data-subject="Website enquiry" novalidate>
    <div class="hp"><label>Leave blank <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="row"><div class="field"><label for="c-name">Name <span class="req">*</span></label><input id="c-name" name="name" required autocomplete="name"><span class="err">Please enter your name.</span></div><div class="field"><label for="c-email">Email <span class="req">*</span></label><input id="c-email" name="email" type="email" required autocomplete="email"><span class="err">Enter a valid email.</span></div></div>
    <div class="field"><label for="c-type">Enquiry type <span class="req">*</span></label><select id="c-type" name="type" required><option value="">Select…</option><option value="speaking">Speaking</option><option value="advisory">Advisory or consulting</option><option value="mentorship">Mentorship</option><option value="framework">Frameworks and resources</option><option value="community">Community</option><option value="other">Something else</option></select><span class="err">Please choose an enquiry type.</span></div>
    <div class="field"><label for="c-msg">Message <span class="req">*</span></label><textarea id="c-msg" name="message" required></textarea><span class="err">Please write a short message.</span></div>
    <button class="btn" type="submit" style="justify-self:start">Send message ${ARR}</button>
  </form></div>
  <aside class="side-list reveal" style="--d:.1s;align-content:start">
    <a class="side-item" href="mailto:${EMAIL}?subject=Discovery%20call"><span class="ico">${I.cal}</span><div><b>Book a discovery call</b><span>A 30-minute conversation about your operation.</span></div></a>
    <a class="side-item" href="${LINKEDIN}" rel="noopener"><span class="ico">${I.in}</span><div><b>LinkedIn</b><span>Connect and follow along.</span></div></a>
    <a class="side-item" href="mailto:${EMAIL}"><span class="ico">${I.mail}</span><div><b>Email</b><span>${EMAIL}</span></div></a>
    <div class="side-item"><span class="ico">${I.mic}</span><div><b>Response time</b><span>Within two working days.</span></div></div>
  </aside>
</div></section>
<script>(function(){var t=new URLSearchParams(location.search).get("topic");var s=document.getElementById("c-type");if(t&&s){for(var i=0;i<s.options.length;i++){if(s.options[i].value===t){s.selectedIndex=i;break}}}})();</script>`,
});

// LEGAL + 404 --------------------------------------------------------
add({
  path: "privacy/index.html", title: "Privacy", desc: "How this site handles your data.",
  body: (r) => `${pageHero(r, "Privacy", "Privacy policy.", "Plain language, short.")}<section class="section"><div class="wrap prose">
<h2>What I collect</h2><p>If you send a message or enquiry, I receive the details you provide (such as your name, email and message) so I can reply. If you subscribe to the newsletter, I receive your email address.</p>
<h2>Analytics and cookies</h2><p>Non-essential tracking is off by default. If analytics is added, it will be privacy-friendly and will only run if you accept. Your consent choice is stored in your browser only.</p>
<h2>Your rights</h2><p>You can ask me to see, correct or delete your data at any time. I aim to follow the Nigeria Data Protection Act and the GDPR for international visitors. Contact <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div></section>`,
});
add({
  path: "terms/index.html", title: "Terms", desc: "Terms of use for this site.",
  body: (r) => `${pageHero(r, "Terms", "Terms of use.", "The simple version.")}<section class="section"><div class="wrap prose">
<h2>Content</h2><p>The content here reflects my own views and experience. It does not represent the views of any employer.</p>
<h2>Use</h2><p>You are welcome to share links and short quotes with credit. Please do not copy full articles or the design without permission.</p>
<h2>No guarantees</h2><p>Information is provided in good faith, without warranty. Results described come from specific situations and will vary.</p></div></section>`,
});
add({
  path: "404.html", title: "Page not found", desc: "This page could not be found.", noindex: true,
  body: (r) => `<section class="section notfound"><div class="wrap"><div class="big">404</div><h1 style="font-size:clamp(2rem,4vw,3rem)">This page took a wrong turn.</h1><p class="lede" style="margin:0 auto 28px">Even the best-designed systems need a good fallback.</p><a class="btn" href="${r || "./"}">Back to home ${ARR}</a></div></section>`,
});

/* ---------------------------------------------------------------- write */
for (const p of pages) {
  const out = join(ROOT, p.path);
  mkdirSync(dirname(out), { recursive: true });
  // 404 must use absolute-looking root links; it is served from the site root.
  writeFileSync(out, layout(p));
}

const urls = pages.filter((p) => !p.noindex).map((p) => `${SITE}/${p.path.replace(/index\.html$/, "")}`);
writeFileSync(join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
writeFileSync(join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(ROOT, ".nojekyll"), "");
mkdirSync(join(ROOT, "assets/img"), { recursive: true });
writeFileSync(join(ROOT, "assets/img/logo-mark.svg"), markFile("#0e1b2c", "#f4a300", "#f4a300"));
writeFileSync(join(ROOT, "assets/img/logo-mark-amber.svg"), markFile("#f4a300", "#0e1b2c", "#0e1b2c"));
writeFileSync(join(ROOT, "assets/img/logo.svg"), lockupFile("#0e1b2c", "#f4a300", "#f4a300", "#0e1b2c", "#3b4a5f"));
writeFileSync(join(ROOT, "assets/img/logo-light.svg"), lockupFile("#f4a300", "#0e1b2c", "#0e1b2c", "#ffffff", "#b9c4d3"));
console.log(`Built ${pages.length} pages → ${ROOT}`);
