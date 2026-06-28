// The editable content of the portfolio, extracted from the original design.
// This is the seed/fallback. Once seeded into MongoDB, the admin panel is the
// source of truth and this file is only used as a fallback if the DB is empty.

module.exports = {
  hero: {
    badge: 'OPEN TO OPPORTUNITIES',
    eyebrow: '◍ SOFTWARE ENGINEER · FULL-STACK & 3D WEB',
    nameLine1: 'PRAVEEN',
    nameLine2: 'RAJAK',
    intro:
      "I build fast, cinematic interfaces — and the systems behind them. Competitive programmer, full-stack engineer, and a believer that the web can feel like a place.",
    ctaPrimary: { label: 'Explore the data ↘', route: 'dsa' },
    ctaSecondary: { label: 'See the work', route: 'projects' },
    // stats[0] (problems solved) and stats[1] (peak rating) auto-fill from live DSA
    // when available; the stored value is the fallback. The last two are always manual.
    stats: [
      { value: 360, suffix: '+', label: 'PROBLEMS SOLVED', live: 'totalSolved' },
      { value: 1606, suffix: '', label: 'PEAK RATING', live: 'leetcodeRating' },
      { value: 2, suffix: '×', label: 'HACKATHON WINS', live: '' },
      { value: 5, suffix: '+', label: 'NATIONAL FINALS', live: '' }
    ]
  },

  about: {
    eyebrow: '001 — WHO',
    heading: 'Shipping production code while still in college.',
    paragraphs: [
      'I\'m a Computer Science undergrad at <b>Gyan Ganga Institute of Technology</b> (RGPV, Jabalpur), partway through my B.Tech. I work full-time as a Software Engineer at <b>Paraleagle</b> — a seat I landed in my second year.',
      'My stack leans modern and front-end-heavy — React, Next.js, and <b style="color:#22d3ee">Three.js / react-three-fiber</b> — backed by Node, Express, FastAPI and MongoDB, with C++ and Python underneath.'
    ],
    cards: [
      { value: '7.73', label: 'CGPA · 93.2% in 12th', gradient: true },
      { value: '−30%', label: 'front-end build time · reusable React lib', gradient: false },
      { value: '2×', label: 'national hackathon wins · Genethon, FossHack', gradient: false }
    ]
  },

  dsa: {
    eyebrow: '002 — THE GRIND',
    heading: 'Competitive programming,<br>rendered as a galaxy.',
    note: '▣ Live from LeetCode &amp; Codeforces public profiles',
    leetcodeUser: 'praveen_raj027',
    codeforcesUser: 'praveenrajak0506'
  },

  projects: {
    eyebrow: '003 — BUILDS',
    heading: 'Selected work.',
    featured: {
      tag: 'FEATURED · WEBGL',
      title: 'OpenPulse',
      desc:
        'An interactive 3D dependency-graph explorer — pull any public GitHub repo and explore its packages as a navigable scene. Tuned with level-of-detail culling to hold <b>60fps on 50+ node graphs</b>.',
      url: 'https://open-pulse.onrender.com',
      cta: 'live demo ↗',
      tags: ['Three.js', 'react-three-fiber', 'GitHub API']
    },
    items: [
      {
        tag: 'SERVICE',
        title: 'CloudStore',
        desc:
          'A Cloudinary-style storage service with a token-based upload system and a tiered-quota monetisation model.',
        url: '',
        tags: ['Node', 'Express', 'MongoDB']
      },
      {
        tag: 'SITE',
        title: 'Portfolio v.next',
        desc:
          'A Next.js portfolio engineered for speed — scoring <b>95+ on Lighthouse</b> across the board.',
        url: '',
        tags: ['Next.js', 'React', 'Lighthouse 95+']
      }
    ]
  },

  experience: {
    eyebrow: '004 — JOURNEY',
    heading: 'The path so far.',
    items: [
      {
        badge: 'NOW · FULL-TIME',
        color: '#d946ef',
        title: 'Software Engineer — Paraleagle',
        desc:
          'Full-time engineer, landed in my second year of B.Tech. Building product across the stack.'
      },
      {
        badge: 'INTERNSHIP',
        color: '#22d3ee',
        title: 'Full-Stack Developer — Nuvance Technologies',
        desc:
          'Built an e-commerce platform end to end — catalogue, cart, checkout — in React and Node/Express, getting the client live inside a single sprint. Published a reusable React component library that cut front-end build time across internal projects by ~30%.'
      },
      {
        badge: 'EDUCATION',
        color: '#8a95ab',
        title: 'B.Tech CSE — Gyan Ganga Institute of Technology',
        desc:
          'RGPV University, Jabalpur · 7.73 CGPA. Two national hackathon wins and multiple top-10 national finishes along the way.'
      }
    ]
  },

  skills: {
    eyebrow: '005 — STACK',
    heading: 'An orbiting toolkit.',
    intro:
      'Front-end-heavy and 3D-fluent, with the backend and data chops to back it up. Drag the sphere to give it a spin.',
    groups: [
      { label: 'frontend', color: '#22d3ee', items: 'React · Next.js · Three.js · r3f · HTML · CSS' },
      { label: 'backend', color: '#e879f9', items: 'Node · Express · FastAPI · MongoDB · SQL' },
      { label: 'languages', color: '#22d3ee', items: 'C++ · JavaScript · Python' },
      { label: 'data / ml', color: '#e879f9', items: 'NumPy · pandas · Matplotlib · Seaborn' }
    ],
    sphereTags: [
      'React', 'Next.js', 'Three.js', 'r3f', 'C++', 'JavaScript', 'Python', 'Node',
      'Express', 'FastAPI', 'MongoDB', 'SQL', 'HTML', 'CSS', 'GSAP', 'NumPy',
      'pandas', 'Matplotlib', 'Seaborn', 'GLSL', 'WebGL', 'Git'
    ]
  },

  contact: {
    eyebrow: "006 — LET'S TALK",
    headingLine1: "LET'S BUILD",
    headingLine2: 'SOMETHING',
    email: 'hello@praveenrajak.dev',
    ctaLabel: 'Say hi ✦',
    note: 'placeholder — swap your real email',
    socials: [
      { label: 'LeetCode ↗', url: 'https://leetcode.com/u/praveen_raj027' },
      { label: 'Codeforces ↗', url: 'https://codeforces.com/profile/praveenrajak0506' },
      { label: 'GitHub ↗', url: '#' },
      { label: 'LinkedIn ↗', url: '#' }
    ]
  }
};
