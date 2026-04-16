/** Full process page: anchors align with in-page nav (`#process-phase-*`). */
export const processPagePhases = [
  {
    id: "process-phase-discovery",
    phase: "01",
    tag: "Phase 01",
    title: "Discovery",
    blocks: [
      {
        label: "What happens",
        text: "We clarify goals, constraints, users, and success criteria. We map current workflows, data sources, and integrations so the architecture matches reality, not assumptions.",
      },
      {
        label: "Why it matters",
        text: "Most expensive rework traces back to fuzzy requirements. Discovery front-loads the hard questions so build time is spent shipping, not undoing.",
      },
      {
        label: "Outcome",
        text: "A shared picture of scope, risks, and milestones you can plan around.",
      },
    ],
  },
  {
    id: "process-phase-build",
    phase: "02",
    tag: "Phase 02",
    title: "Build",
    blocks: [
      {
        label: "What happens",
        text: "We implement the UI, application logic, database layer, and integrations in tight loops, with regular checkpoints so you see progress, not a black box.",
      },
      {
        label: "Why it matters",
        text: "Custom software only wins if it’s maintainable. We favor clear structure, sensible defaults, and documentation your team can grow into.",
      },
      {
        label: "Outcome",
        text: "Working software in staging that reflects agreed scope and is ready for hardening.",
      },
    ],
  },
  {
    id: "process-phase-test-launch",
    phase: "03",
    tag: "Phase 03",
    title: "Test & Launch",
    blocks: [
      {
        label: "What happens",
        text: "QA passes, edge cases, performance checks, and a controlled go-live. We verify backups, monitoring hooks, and rollback paths where they matter.",
      },
      {
        label: "Why it matters",
        text: "Launch day shouldn’t be the first time someone tries the critical path. Testing reduces surprises for your team and your customers.",
      },
      {
        label: "Outcome",
        text: "Production deployment with confidence, plus a short stabilization window to catch real-world nuances.",
      },
    ],
  },
  {
    id: "process-phase-improve",
    phase: "04",
    tag: "Phase 04",
    title: "Improve",
    blocks: [
      {
        label: "What happens",
        text: "We measure, tune, and extend: performance work, feature increments, and operational hardening based on real usage.",
      },
      {
        label: "Why it matters",
        text: "The first release is not the finish line. Software that improves calmly over time protects your investment.",
      },
      {
        label: "Outcome",
        text: "A living system with a clear path for the next iteration.",
      },
    ],
  },
] as const;
