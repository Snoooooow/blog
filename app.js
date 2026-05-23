const pages = {
  home: {
    title: "Home",
    text: "Jingyu 光明螺旋 Snoooooow personal website homepage software projects writing books weeks now.",
    render: () => `
      <section class="home">
        <div class="portrait" role="img" aria-label="Jingyu profile placeholder"></div>
        <div class="intro">
          <h1>Hi, I'm Jingyu.</h1>
          <p class="tagline">This is 光明螺旋, a small home for writing, projects, and notes.</p>
          <div class="rule"></div>
          <div class="bio">
            <p>I use this site as a home base for notes, projects, reading, and experiments that do not fit neatly anywhere else.</p>
            <p>The original blog content from GitHub Pages is merged here, including the first post, the Wang Xiaobo reading note, and the January note.</p>
            <p>I care about useful software, clear thinking, durable systems, and the craft behind turning ideas into working things.</p>
            <p>Outside work I <a class="inline-link" href="#books" data-route="books">read</a> and keep a small record of what I am learning.</p>
          </div>
        </div>
      </section>
    `
  },
  blog: {
    title: "Blog",
    text: "第一篇 有时候人会忘记把自己当做是个人看 思维的乐趣 王小波 一月 光明螺旋 writing essays notes.",
    render: () => `
      <section class="page">
        <h1>Blog</h1>
        <p>Short essays, technical notes, and field reports.</p>
        <div class="item-list">
          <a class="item item-link" href="#post-first" data-route="post-first">
            <h2>第一篇</h2>
            <p>这个中二的小站名字是我梦中出现的名字。以后会在这个地方作为集中写一些东西，创作一些内容的仓库。</p>
          </a>
          <a class="item item-link" href="#post-wang-xiaobo" data-route="post-wang-xiaobo">
            <h2>有时候人会忘记把自己当做是个人看</h2>
            <p>重读《思维的乐趣》杂文集的长读书笔记，关于王小波、思维、自由、传统和真实表达。</p>
          </a>
          <a class="item item-link" href="#post-january" data-route="post-january">
            <h2>一月</h2>
            <p>关于 level / 管理者祛魅，以及行为和目的互相生成的短笔记。</p>
          </a>
          <article class="item">
            <h2>Designing small systems well</h2>
            <p>Notes on keeping personal projects understandable after the first burst of energy.</p>
          </article>
        </div>
      </section>
    `
  },
  "post-first": post("第一篇", "2020-01-26", `
    <p>这个中二的小站名字是我梦中出现的名字。觉得很酷就用了。</p>
    <p>以后会在这个地方作为集中写一些东西，创作一些内容的仓库。把分散的想法和细枝末节都能铺陈开来。</p>
  `),
  "post-wang-xiaobo": post("有时候人会忘记把自己当做是个人看", "2020-02-02", `
    <p>重读《思维的乐趣》杂文集。第一次看这本书是在高中，很多地方没有看懂。十年后再读，留下的是关于思维、真实、自由和个人表达的复杂感受。</p>
    <p>王小波的文章常常在提醒人不要忘记把自己当作一个会思考的人。文章里对盲目崇高、传统权威、形式主义和不讲逻辑的批评，现在读起来依然有锋利的现实感。</p>
    <p>这篇旧文保留了原博客的核心内容：读王小波，想自由表达，想基本逻辑，想一个人怎样在令人窒息的环境里仍然保留思想的氧气。</p>
    <p>原始长文仍保存在仓库的 <code>_posts/2020-02-02-有时候人会忘记把自己当做是个人看 -- 重读《思维的乐趣》杂文集.markdown</code>。</p>
  `),
  "post-january": post("一月", "2023-01-28", `
    <p>对于 level / 管理者的祛魅。</p>
    <p>行为产生目的，目的又产生更多相关行为。以至于前后无从分清。</p>
  `),
  links: page("Links", "Curated links from around the web.", [
    ["Engineering", "References and articles worth returning to."],
    ["Tools", "Small utilities, libraries, and workflows that proved useful."]
  ]),
  books: page("Books", "Reading notes and book summaries.", [
    ["《思维的乐趣》", "重读王小波杂文集后的笔记已经从旧 GitHub Pages 博客合并到这里。"],
    ["Recently read", "A running list of useful books and the ideas that stuck."],
    ["Want to read", "A queue for research, software, biography, and systems thinking."]
  ]),
  projects: page("Projects", "Projects and prototypes.", [
    ["Personal website", "A compact static site with search, navigation, and responsive pages."],
    ["Workbench", "A collection of experiments that are too small for standalone repositories."]
  ]),
  weeks: {
    title: "Weeks",
    text: "Life in weeks visualization Birth Teens 20s 30s 40s 50s 60s 70s 80s Wait But Why World Wide Web Berlin Wall Windows 95 9/11 ChatGPT.",
    render: () => {
      const birthYear = 1987;
      const currentAge = 40;
      const eventByAge = Object.fromEntries(weekEvents.map((event) => [event.age, event]));
      const cells = Array.from({ length: 52 * 85 }, (_, i) => {
        const age = Math.floor(i / 52) + 1;
        const event = eventByAge[age];
        const label = event ? `${event.year}: ${event.label}` : "";
        return `<span class="week ${age <= currentAge ? "filled" : ""} ${event ? "has-event" : ""}" ${event ? `tabindex="0" data-label="${escapeHtml(label)}"` : ""}></span>`;
      }).join("");
      const yearList = Array.from({ length: 85 }, (_, i) => {
        const age = i + 1;
        const year = birthYear + i;
        const event = eventByAge[age];
        return `<div class="week-event"><strong>${age} in ${year}</strong><span>${event ? event.label : ""}</span></div>`;
      })
        .join("");
      return `
        <section class="page weeks-page">
          <h1>My Life in Weeks</h1>
          <div class="week-legend">
            <span>Birth</span>
            <span>Teens</span>
            <span>20s</span>
            <span>30s</span>
            <span>40s</span>
            <span>50s</span>
            <span>60s</span>
            <span>70s</span>
            <span>80s</span>
          </div>
          <p>Inspired by Wait But Why, adapted from Gina Trapani's project, and rebuilt for this site. Each row is one year; highlighted cells mark notable milestones from the reference timeline.</p>
          <div class="weeks-grid" aria-label="Life in weeks grid">${cells}</div>
          <div class="week-events">${yearList}</div>
        </section>
      `;
    }
  },
  now: page("Now", "What I am focused on now.", [
    ["Current focus", "Merging the old GitHub Pages blog with a cleaner personal homepage."],
    ["Recently", "Refreshing 光明螺旋 into a compact, searchable personal site."]
  ]),
  privacy: page("Privacy", "This static website does not intentionally collect personal data.", [
    ["Analytics", "No analytics script is included in this local version."],
    ["Contact", "Email links open your mail client and are not processed by this site."]
  ]),
  terms: page("Terms", "Simple terms for a personal website.", [
    ["Content", "The writing and placeholders are provided as-is."],
    ["Links", "External links are provided for convenience."]
  ])
};

function page(title, description, items) {
  return {
    title,
    text: `${title} ${description} ${items.map((item) => item.join(" ")).join(" ")}`,
    render: () => `
      <section class="page">
        <h1>${title}</h1>
        <p>${description}</p>
        <div class="item-list">
          ${items.map(([heading, body]) => `<article class="item"><h2>${heading}</h2><p>${body}</p></article>`).join("")}
        </div>
      </section>
    `
  };
}

function post(title, date, body) {
  return {
    title,
    text: `${title} ${date} ${body.replace(/<[^>]+>/g, " ")}`,
    render: () => `
      <article class="page post">
        <a class="back-link" href="#blog" data-route="blog">Back to Blog</a>
        <h1>${title}</h1>
        <p>${date}</p>
        <div class="post-body">${body}</div>
      </article>
    `
  };
}

const app = document.querySelector("#app");
const mobileNav = document.querySelector("[data-mobile-nav]");
const searchModal = document.querySelector("[data-search-modal]");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");

function navigate(route) {
  const key = pages[route] ? route : "home";
  app.innerHTML = pages[key].render();
  document.title = key === "home" ? "Jingyu | 光明螺旋" : `${pages[key].title} | 光明螺旋`;
  mobileNav.classList.remove("is-open");
  app.focus({ preventScroll: true });
}

function currentRoute() {
  return window.location.hash.replace("#", "") || "home";
}

function openSearch() {
  searchModal.classList.add("is-open");
  searchModal.setAttribute("aria-hidden", "false");
  searchInput.value = "";
  renderSearch("");
  requestAnimationFrame(() => searchInput.focus());
}

function closeSearch() {
  searchModal.classList.remove("is-open");
  searchModal.setAttribute("aria-hidden", "true");
}

function renderSearch(query) {
  const q = query.trim().toLowerCase();
  const matches = Object.entries(pages).filter(([, pageData]) => {
    return !q || `${pageData.title} ${pageData.text}`.toLowerCase().includes(q);
  });

  searchResults.innerHTML = matches
    .map(([route, pageData]) => `
      <a class="result" href="#${route}" data-route="${route}">
        <strong>${pageData.title}</strong>
        <span>${pageData.text.split(" ").slice(0, 16).join(" ")}...</span>
      </a>
    `)
    .join("");
}

document.addEventListener("click", (event) => {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) {
    event.preventDefault();
    const route = routeLink.dataset.route;
    history.pushState(null, "", `#${route}`);
    navigate(route);
    closeSearch();
    return;
  }

  if (event.target.closest("[data-open-search]")) openSearch();
  if (event.target.closest("[data-close-search]")) closeSearch();
  if (event.target.closest("[data-menu-toggle]")) mobileNav.classList.toggle("is-open");
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
  if (event.key === "Escape") closeSearch();
});

searchInput.addEventListener("input", (event) => renderSearch(event.target.value));
window.addEventListener("popstate", () => navigate(currentRoute()));

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const weekEvents = [
  { age: 1, year: 1987, label: "Born" },
  { age: 2, year: 1988, label: "World Wide Web invented" },
  { age: 3, year: 1989, label: "Berlin Wall falls" },
  { age: 5, year: 1991, label: "Soviet Union dissolves" },
  { age: 6, year: 1992, label: "Elementary school" },
  { age: 8, year: 1994, label: "Windows 95 released" },
  { age: 11, year: 1997, label: "Princess Diana dies" },
  { age: 12, year: 1998, label: "Middle school" },
  { age: 15, year: 2001, label: "9/11 attacks" },
  { age: 16, year: 2002, label: "Boarding school; Iraq War begins" },
  { age: 18, year: 2004, label: "Facebook founded" },
  { age: 19, year: 2005, label: "Hurricane Katrina" },
  { age: 20, year: 2006, label: "Met my future wife; iPhone announced" },
  { age: 21, year: 2007, label: "Performing in Leipzig; first flight; exchange study in Hong Kong" },
  { age: 22, year: 2008, label: "Lehman Brothers collapses; Bitcoin genesis block" },
  { age: 23, year: 2009, label: "Married; US grad school; first photonics paper" },
  { age: 25, year: 2011, label: "Fukushima nuclear disaster; Bin Laden killed; roadtrip across US; moved to Delaware" },
  { age: 26, year: 2012, label: "Hardware startup; got into cycling" },
  { age: 27, year: 2013, label: "First paper in electronics; moved to NYC" },
  { age: 29, year: 2015, label: "Miami; China; got Mango" },
  { age: 30, year: 2016, label: "Hawaii; quit hardware" },
  { age: 31, year: 2017, label: "Works at AWS; mom visited US; first ML paper" },
  { age: 33, year: 2019, label: "First US COVID case; started photography; Puerto Rico; works at Instagram" },
  { age: 34, year: 2020, label: "Zion, Arches, Bryce" },
  { age: 35, year: 2021, label: "Became a US citizen; Italy; Spain; Washington DC" },
  { age: 36, year: 2022, label: "Kenya; Seattle; right elbow pain; Japan; ChatGPT launches; started reading philosophy books; Paris" },
  { age: 37, year: 2023, label: "First cello lessons; New Orleans; London for Jay Chou; Antarctica; Iceland" },
  { age: 38, year: 2024, label: "Dolomites; Taiwan; built this; first custom mechanical keyboard; started BJJ training" },
  { age: 39, year: 2025, label: "Started at OpenAI; Peru; moving to San Francisco; started piano" },
  { age: 40, year: 2026, label: "40 in 2026" }
];

navigate(currentRoute());
