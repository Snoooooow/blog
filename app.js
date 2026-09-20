const legacyPosts = [
  {
    id: "post-january",
    title: "一月",
    publishedAt: "2023-01-28T23:15:19",
    source: "庆橙",
    summary: "关于 level / 管理者祛魅，以及行为和目的互相生成的短笔记。"
  },
  {
    id: "post-wang-xiaobo",
    title: "有时候人会忘记把自己当做是个人看",
    publishedAt: "2020-02-02T18:34:19",
    source: "庆橙",
    summary: "重读《思维的乐趣》：关于王小波、思维、自由、传统和真实表达。"
  },
  {
    id: "post-first",
    title: "第一篇",
    publishedAt: "2020-01-26T17:17:19",
    source: "庆橙",
    summary: "这个中二的小站名字是我梦中出现的名字。以后在这里集中写一些东西。"
  }
];

function normalizeArticleTitle(title) {
  return title
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[‐‑‒–—―﹘﹣－-]/g, "-")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function dedupeByOldestPublication(posts) {
  const oldestByTitle = new Map();

  for (const article of posts) {
    const key = normalizeArticleTitle(article.title);
    const existing = oldestByTitle.get(key);
    if (!existing || article.publishedAt.localeCompare(existing.publishedAt) < 0) {
      oldestByTitle.set(key, article);
    }
  }

  return [...oldestByTitle.values()];
}

const allImportedPosts = dedupeByOldestPublication([...importedPosts, ...mediumPosts]);

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const articleIndex = dedupeByOldestPublication([...allImportedPosts, ...legacyPosts]).sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

const readingNoteIds = new Set([
  "wp-83",
  "wp-50",
  "post-wang-xiaobo",
  "medium-a31d025bb2b",
  "medium-43177d6feb22"
]);
const readingNotes = articleIndex.filter((article) => readingNoteIds.has(article.id));
const writingArticles = articleIndex.filter((article) => !readingNoteIds.has(article.id));

let currentLanguage = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "zh";

function t(key) {
  return siteTranslations[currentLanguage][key];
}

function localizedArticle(article) {
  if (currentLanguage !== "en" || !englishArticles[article.id]) return article;
  return { ...article, ...englishArticles[article.id] };
}

const readingBooks = [
  {
    titleZh: "智能简史",
    titleEn: "A Brief History of Intelligence",
    authorZh: "[美] 麦克斯·班尼特",
    authorEn: "Max Bennett",
    metaZh: "中译出版社 · 2025 · 读过",
    metaEn: "CITIC Press · 2025 · Read",
    cover: "brief-history-of-intelligence.jpg",
    status: "read",
    rating: 5,
    route: "book-intelligence"
  },
  {
    titleZh: "智能：AI时代的商业、组织与战略的本质",
    titleEn: "Intelligence: Business, Organization, and Strategy in the AI Era",
    authorZh: "曾鸣",
    authorEn: "Zeng Ming",
    cover: "intelligence-ai-era.jpg",
    status: "read"
  },
  {
    titleZh: "Million Dollar Weekend",
    titleEn: "Million Dollar Weekend",
    authorZh: "[美] Noah Kagan、Tahl Raz",
    authorEn: "Noah Kagan and Tahl Raz",
    cover: "million-dollar-weekend.jpg",
    status: "read",
    doubanUrl: "https://book.douban.com/subject/36759480/"
  },
  {
    titleZh: "深度学习推荐系统2.0",
    titleEn: "Deep Learning Recommender Systems 2.0",
    authorZh: "王喆",
    authorEn: "Wang Zhe",
    cover: "recommender-systems-2.jpg",
    status: "read"
  },
  {
    titleZh: "真希望我父母读过这本书",
    titleEn: "The Book You Wish Your Parents Had Read",
    authorZh: "[英] 菲利帕·佩里",
    authorEn: "Philippa Perry",
    cover: "parents-read-this-book.jpg",
    status: "read"
  },
  {
    titleZh: "以日为鉴：衰退时代生存指南",
    titleEn: "Learning from Japan: A Survival Guide for an Era of Decline",
    authorZh: "分析师Boden",
    authorEn: "Boden",
    cover: "learning-from-japan.jpg",
    status: "read"
  },
  {
    titleZh: "康熙的红票：全球化中的清朝",
    titleEn: "Emperor Kangxi's Red Manifesto",
    authorZh: "孙立天",
    authorEn: "Sun Litian",
    cover: "kangxi-red-manifesto.jpg",
    status: "read"
  },
  {
    titleZh: "党员、党权与党争",
    titleEn: "Party Members, Party Power, and Party Struggles",
    authorZh: "王奇生",
    authorEn: "Wang Qisheng",
    cover: "party-power-struggles.jpg",
    status: "read",
    doubanUrl: "https://book.douban.com/subject/3924144/"
  },
  {
    titleZh: "独裁者手册",
    titleEn: "The Dictator's Handbook",
    authorZh: "[美] 布鲁斯·布恩诺·德·梅斯奎塔、阿拉斯泰尔·史密斯",
    authorEn: "Bruce Bueno de Mesquita and Alastair Smith",
    cover: "dictators-handbook.jpg",
    status: "read"
  },
  {
    titleZh: "李诞脱口秀工作手册",
    titleEn: "Li Dan's Stand-Up Comedy Work Manual",
    authorZh: "李诞",
    authorEn: "Li Dan",
    cover: "li-dan-standup-manual.jpg",
    status: "read",
    doubanUrl: "https://book.douban.com/subject/35552655/"
  },
  {
    titleZh: "东晋门阀政治",
    titleEn: "The Aristocratic Politics of the Eastern Jin",
    authorZh: "田余庆",
    authorEn: "Tian Yuqing",
    cover: "eastern-jin-politics.jpg",
    status: "read"
  },
  {
    titleZh: "大道：段永平投资问答录",
    titleEn: "The Way: Duan Yongping's Investment Q&A",
    authorZh: "赵理亚 选编、芒格书院 编",
    authorEn: "Selected by Zhao Liya; Munger Academy",
    cover: "the-way-duan-yongping.jpg",
    status: "read"
  },
  {
    titleZh: "波峰与波谷：秦汉魏晋南北朝的政治文明",
    titleEn: "Peaks and Valleys",
    authorZh: "阎步克",
    authorEn: "Yan Buke",
    cover: "peaks-and-valleys.png",
    status: "read"
  },
  {
    titleZh: "The Mom Test",
    titleEn: "The Mom Test",
    authorZh: "[英] Rob Fitzpatrick",
    authorEn: "Rob Fitzpatrick",
    cover: "the-mom-test.jpg",
    status: "read"
  },
  {
    titleZh: "天朝的崩溃：鸦片战争再研究",
    titleEn: "The Collapse of the Heavenly Dynasty",
    authorZh: "茅海建",
    authorEn: "Mao Haijian",
    cover: "collapse-of-heavenly-dynasty.jpg",
    status: "read"
  },
  {
    titleZh: "南明史",
    titleEn: "A History of the Southern Ming",
    authorZh: "顾诚",
    authorEn: "Gu Cheng",
    cover: "southern-ming-history.jpg",
    status: "read"
  },
  {
    titleZh: "邓小平时代",
    titleEn: "Deng Xiaoping and the Transformation of China",
    authorZh: "[美] 傅高义",
    authorEn: "Ezra F. Vogel",
    cover: "deng-xiaoping-era.jpg",
    status: "read",
    doubanUrl: "https://book.douban.com/subject/20424526/"
  }
];

function doubanBookSearch(title) {
  return `https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(title)}&cat=1001`;
}

function renderBookCard(book) {
  const title = currentLanguage === "en" ? book.titleEn : book.titleZh;
  const author = currentLanguage === "en" ? book.authorEn : book.authorZh;
  const rating = Number(book.rating) || 0;
  const stars = Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < rating;
    return `<span class="${isFilled ? "is-filled" : ""}" aria-hidden="true">${isFilled ? "★" : "☆"}</span>`;
  }).join("");
  const ratingLabel = rating
    ? (currentLanguage === "en" ? `${rating} out of 5 stars` : `${rating} 星（满分 5 星）`)
    : (currentLanguage === "en" ? "Not rated" : "未评分");
  const link = book.route
    ? `href="#${book.route}" data-route="${book.route}"`
    : `href="${book.doubanUrl || doubanBookSearch(book.titleZh)}" target="_blank" rel="noreferrer"`;

  return `
    <a class="book-card" ${link}>
      <span class="book-cover">
        <img src="./assets/books/${book.cover}" alt="《${book.titleZh}》封面" loading="lazy" />
      </span>
      <span class="book-info">
        <span class="book-title">${title}</span>
        <span class="book-author">${author}</span>
        <span class="book-rating" aria-label="${ratingLabel}">
          <span class="book-stars">${stars}</span>
          ${rating ? `<span class="book-rating-value">${rating.toFixed(1)}</span>` : ""}
        </span>
      </span>
    </a>
  `;
}

const pages = {
  home: {
    title: "Home",
    text: "Jingyu 庆橙 Snoooooow personal website homepage software projects writing books.",
    render: () => `
      <section class="home">
        <section class="home-writing" aria-label="${t("writing")}">
          ${renderPostList(writingArticles.slice(0, 6))}
          <div class="archive-pager-wrap">
            <a class="archive-pager" href="#blog" data-route="blog" aria-label="${t("viewAll")}">»</a>
          </div>
        </section>
      </section>
    `
  },
  blog: {
    title: "Blog",
    text: writingArticles.map((article) => `${article.title} ${article.summary}`).join(" "),
    render: () => `
      <section class="page archive-page">
        <h1>${t("writing")}</h1>
        ${renderPostList(writingArticles)}
      </section>
    `
  },
  "reading-notes": {
    title: "Reading Notes",
    text: readingNotes.map((article) => `${article.title} ${article.summary}`).join(" "),
    render: () => `
      <section class="page archive-page">
        <h1>${t("readingNotes")}</h1>
        ${renderPostList(readingNotes)}
      </section>
    `
  },
  "post-first": post("第一篇", "2020-01-26", `
    <p>这个中二的小站名字是我梦中出现的名字。觉得很酷就用了。</p>
    <p>以后会在这个地方作为集中写一些东西，创作一些内容的仓库。把分散的想法和细枝末节都能铺陈开来。</p>
  `, {}, "post-first"),
  "post-wang-xiaobo": post("有时候人会忘记把自己当做是个人看 -- 重读《思维的乐趣》杂文集", "2020-02-02", `
    <p>“我插队的地方有军代表管着我们， 现在我认为， 他们是一批单纯的好人，但我还认为，在我这一生里， 再也没有谁比他们是我更加痛苦过了。” --- 《思维的乐趣》</p>
    <p>有时候人会忘记把自己当做是个人看，王小波总是好心提醒。他也当然不是书中那一头非常出名猪，但是他非常羡慕那头特立独行的猪。</p>
    <p>第一次看这个杂文集是在高中的运动会上，当时是个小小的雨天，我在露天运动场台阶上坐着，扛着伞，等着自己班级的参赛选手出现。百无聊赖，借来坐在旁边的班花美女同位的这本书来看。</p>
    <p>嗯，王小波， 久仰大名，就那个总是觉得自己被大锤子锤的人嘛，看名字就踏实——三个字都朴实无华。</p>
    <p>比赛快结束了，太阳出来了， 我看完了这本书。 完全没看懂。并且其中有些文章，看到一半就不懂了，所以有些跳着看，看完脑子里只剩下花啊子模啥的古怪名字。 我把书还给班花，说 “我怎么没看懂”，她说 “以后就看懂了”。 当时我觉得自己是一个弱智，成为了运动场呐喊声中最没有嚣张气焰的又疑似阅读障碍的一个呆傻女同学。</p>
    <p>大概十年后，这次在日常通勤时候断断续续把这本书又看完了。虽然每次看了几章，脑子就有点累了，甚至有点想睡觉。不知道是因为车内缺氧还是人老了看的时候太费脑。我觉得是第二种原因占上风。 人老了确实好像变聪明了。这次不仅知道了花剌子模怎么读，还猜到了皇帝新衣里面的那个小孩的模样。 是在七八十年代的在农场挠头说着“我不明白哇”的王小波。</p>
    <p>作为一个追求最基本的逻辑，最基本的说话发声，最基本的思想自由的人都不会明白那个年代。 他小小的身体仿佛在一口巨大而深的井底，污泥雨水慢慢填进来，我怕他有一天会被活埋。替他窒息，替他感到前所未有的孤独和恐惧。害怕着这样的年岁会一直下去，永无尽头。</p>
    <p>这本书毕竟是个杂文集子，有时候感觉想到哪里他就写到了哪里，不过还是能看出来一些集中的想法。 首先王小波当然希望大家都有思维，用现在的话就是——脑子是个好东西。但真的不一定每个人都有。当时大多数人就没有。 有的是凌于别人之上的发号施令的快乐，听从命令的安逸快乐， 却不甚知晓什么是思维，又何谈乐趣。他们很开心，但是又令人很伤心。</p>
    <p>不止没有脑子，有些人也是没有嘴的。 每天用鼻子吸气，鼻子呼气，嘴巴只是用来吃饭而已。尊卑有序，大多数人没有疑问，就算有，也只是不敢上课举手问问题的孩子，呆望着班长和各种委员小组长风起云涌，自己贴着“弱势”的牌子，慢慢被挤出教室而已。</p>
    <p>没有人说真话，没有人去追求真相。 没有学问的老姑妈才敢质疑亩产。 层出不穷的牛鬼蛇神，坚强不息的善良思想慢慢成为身边的二氧化碳，挤走氧气的空间，把人挤成厌氧生物，渐渐忘记氧气的存在。 王小波却还想着呼吸氧气，想着最朴素的科学道理，想着最基本的逻辑真实，也号召大家一起来说真话，拥抱科学体系。倒是有个回声啊大家。</p>
    <p>传统，国学，智慧，和文化。王小波用只会缝扣子的阿姨的傻女儿，到处炫耀自己这唯一技能作为文章放大器的入口不得不说这例子确实是高明。 孔孟下来的东西，浩浩汤汤千年，颇有天上天下唯我独尊的感觉。 狭隘的民族性像厚而大的棉袄把大家的思想包的严严实实。极端的相信传统，道德上的自恃，行为上的不问青红皂白，慢慢演化出一种极端的保守。 故步自封而不知，杜绝讲道理的所有可能性。 无论是什么事情，永远能用老祖宗传下来的话，下一碗面，并且给你打出一组漂亮的组合太极，管他空手道，跆拳道，拳击， 火药，还是炸弹，统统趴下。 问题还在那里，下层百姓生活一样艰辛如常。</p>
    <p>“更何况那些高尚和低下完全是以自己的立场来度量的， 假如我全盘接受， 无异于请那些善良思想的母鸡到我脑子里下蛋，而我总不肯相信，自己的脖子上方，原来是长了一座鸡窝。”</p>
    <p>--- 《思维的乐趣》</p>
    <p>还有不明所以的形式崇高。 青年舍身跳入水中，奋力捞起国家财产——木头杆子，最终牺牲的例子在书中出现多次。 不思考的盲目舍身取“义”，说一百道一千是被别人口舌所控制，被虚无缥缈的选择性记忆所笼络。哪怕想一想，再去跳，性质也会不一样。 “饿死是小，失节事大”， “存天理，灭人欲”。 联想当时为了高考的我，也颇有些贯彻灭人欲的倾向。饭不好好吃，长头发洗完澡不吹干，挤出时间偏偏要去做题， 最后冷风一吹，落下个头疼发烧。 还觉得自己简直是英雄主义坚毅品质的当代发扬，继续坚持，尤未悔也。怪不得当时我看不懂，以为王小波根本在说胡话嘛，真是的。当然王小波说的不是考生主动地自虐受虐的小小心理变态，说的当时五湖四海的渴望盲目崇高，青史留名的有志青年们。这些青年们现在也还是存在的， 不过希望少了很多， 让写下文章的他能感觉到舒畅一些。</p>
    <p>在《人性的逆转》这一篇里面王小波想的更深一层，真正把弗洛伊德，受虐狂和现代人被孔孟程朱哲学牢牢锁死的干涉关系放在一起。在这种哲学统治下，人的思想和行为之间的重力颠倒。 人的思想受到规定行为的反作用，毫无痕迹的被畸形演化，忘记氧气，开心的作为厌氧细胞，相信着，快乐着，并且把这种快乐的方式传给一代又一代新细胞。身体可能变成书中说的欧洲酷刑犯人，做着无价值的吃苦活动，日复一日，脑子感觉这崇高又有意义。</p>
    <p>《跳出手掌心》 这一篇， 我觉得这是王小波最最想要畅想的的未来，和来自内心的号召。 撇开诉说现状的不解和讽刺，它说出创造与贡献个人价值这个终极目的。艺术，文学和科学平起平坐，都有着超越人类的事业机会。知识分子要面向未来，开放思想，成就有意义的事情，写出有思想的文章当然也极好。不要局限于让别人在自己的手掌心下呼吸，享受统治别人的快乐，而是去想着跳出所在的手掌心，在旁边的广阔空间去生长，传播自由。</p>
    <p>王小波的的文章，虽然说了一些当时看来大逆不道的话，但是读起来却不觉得嚣张跋扈，反而满满都是谦卑。 他的文章总是按捺不住有些希冀的话语，但是又不想变成自己口中那个“为了你好的”的善良之人，自己憎恶自己，又会补上一些让大家自己想想的结尾。真是温柔。</p>
    <p>所以看书的时候感觉又好笑又害怕。 你看，他写“所谓文学，在我看来就是先把文章写好看了再说，别的就别管她妈的。”，这种话怎么能不让我在公交上笑起来，像极了当时在运动场上看不懂书的傻人。</p>
    <p>很喜欢王小波的这本的神神叨叨话册子，虽然书中排列词汇的艺术还有待商榷——例如把屎橛子，屙尿，动物们，和皇帝排站在两页之间，真怕他们会打起来，但在我看来它仿佛是一个小小的斗士赶在夜里在墙根角落糊的小字报们，发出最质朴的呐喊。</p>
    <p>而且这本书没有序言和简介，我喜欢这种直接和对读者的信任，虽然有的话我也不会看的。</p>
  `, {}, "post-wang-xiaobo"),
  "post-january": post("一月", "2023-01-28", `
    <ol>
      <li>对于 level / 管理者的祛魅</li>
      <li>行为产生目的， 目的又产生更多相关行为。 以至于前后无从分清。</li>
    </ol>
  `, {}, "post-january"),
  links: page("Links", "Curated links from around the web.", [
    ["Engineering", "References and articles worth returning to."],
    ["Tools", "Small utilities, libraries, and workflows that proved useful."]
  ]),
  books: {
    title: "Books",
    text: readingBooks.map((book) => `${book.titleZh} ${book.titleEn} ${book.authorZh} ${book.authorEn}`).join(" "),
    render: () => `
      <section class="page books-page">
        <h1>${t("reading")}</h1>
        <div class="book-list" data-book-list>
          ${readingBooks.map(renderBookCard).join("")}
        </div>
      </section>
    `
  },
  "book-intelligence": post("智能简史", "读书笔记", `
    <p>《智能简史》把神经科学、进化史和人工智能放在同一个框架里讨论：人脑并不是一次性设计出来的完美机器，而是在漫长演化中通过多次关键突破逐步形成的系统。</p>
    <p>这本书值得关注的核心问题是：为什么现代 AI 已经能在许多符号任务、文本任务和博弈任务上表现惊人，却仍然难以复现人类大脑在常识、身体协调、灵活规划和开放环境学习中的能力。</p>
    <p>待补充正式读书笔记。</p>
    <p><a class="inline-link" href="https://book.douban.com/subject/37252220/" target="_blank" rel="noreferrer">豆瓣条目</a></p>
  `, {}, "book-intelligence"),
  projects: {
    title: "Projects",
    text: "Projects 项目 Personal website Workbench",
    render: () => page(
      t("projects"),
      "",
      currentLanguage === "en"
        ? [["Personal website", "A compact, searchable home for writing, reading, and projects."], ["Workbench", "Small experiments and prototypes in progress."]]
        : [["个人网站", "汇集写作、阅读与项目的极简个人主页。"], ["工作台", "持续进行中的小型实验与原型。"]]
    ).render()
  },
  privacy: page("Privacy", "This static website does not intentionally collect personal data.", [
    ["Analytics", "No analytics script is included in this local version."],
    ["Contact", "Email links open your mail client and are not processed by this site."]
  ]),
  terms: page("Terms", "Simple terms for a personal website.", [
    ["Content", "The writing and placeholders are provided as-is."],
    ["Links", "External links are provided for convenience."]
  ])
};

for (const article of allImportedPosts) {
  const sources = [{ label: article.source, url: article.sourceUrl }];
  if (mediumCrossposts[article.id]) sources.push(mediumCrossposts[article.id]);
  pages[article.id] = post(article.title, article.publishedAt, article.content, {
    source: article.source,
    sources
  }, article.id);
}

function formatDate(value) {
  const [year, month, day] = value.slice(0, 10).split("-");
  return `${year}.${month}.${day}`;
}

function renderPostList(posts) {
  return `
    <div class="post-list">
      ${posts.map((originalArticle) => {
        const article = localizedArticle(originalArticle);
        return `
        <a class="post-row" href="#${article.id}" data-route="${article.id}">
          <time datetime="${article.publishedAt}">${formatDate(article.publishedAt)}</time>
          <span class="post-row-copy">
            <strong>${article.title}</strong>
          </span>
          <span class="post-arrow" aria-hidden="true">↗</span>
        </a>
      `;}).join("")}
    </div>
  `;
}

function page(title, description, items) {
  return {
    title,
    text: `${title} ${description} ${items.map((item) => item.join(" ")).join(" ")}`,
    render: () => `
      <section class="page">
        <h1>${title}</h1>
        <div class="item-list">
          ${items.map(([heading, body]) => `<article class="item"><h2>${heading}</h2><p>${body}</p></article>`).join("")}
        </div>
      </section>
    `
  };
}

function post(title, date, body, metadata = {}, translationKey = "") {
  return {
    title,
    text: `${title} ${date} ${body.replace(/<[^>]+>/g, " ")}`,
    displayTitle: () => currentLanguage === "en" && englishArticles[translationKey] ? englishArticles[translationKey].title : title,
    render: () => {
      const translation = currentLanguage === "en" ? englishArticles[translationKey] : null;
      const visibleTitle = translation?.title || title;
      const visibleBody = translation?.content || body;
      const plainText = visibleBody.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const minutes = Math.max(1, Math.ceil(plainText.length / (currentLanguage === "en" ? 1000 : 450)));
      const backRoute = translationKey === "book-intelligence" ? "books" : (readingNoteIds.has(translationKey) ? "reading-notes" : "blog");
      const backLabel = translationKey === "book-intelligence" ? t("backToReading") : (readingNoteIds.has(translationKey) ? t("backToReadingNotes") : t("backToWriting"));
      return `
      <article class="page post">
        <a class="back-link" href="#${backRoute}" data-route="${backRoute}">← ${backLabel}</a>
        ${translation ? `<p class="translation-note">Translated from the original Chinese and lightly adapted for natural English.</p>` : ""}
        <div class="post-kicker">${metadata.sources ? metadata.sources.map((source) => source.label).join(" · ") : (metadata.source || "庆橙")}</div>
        <h1>${visibleTitle}</h1>
        <div class="post-meta">
          <time datetime="${date}">${formatDate(date)}</time>
          <span>${minutes} ${t("minuteRead")}</span>
          ${metadata.sources ? metadata.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label} ${t("original")} ↗</a>`).join("") : ""}
        </div>
        <div class="post-body">${visibleBody}</div>
      </article>
    `;}
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
  const visibleTitle = pages[key].displayTitle ? pages[key].displayTitle() :
    ({ home: t("brand"), blog: t("writing"), "reading-notes": t("readingNotes"), books: t("reading"), projects: t("projects") }[key] || pages[key].title);
  document.title = key === "home" ? `${t("brand")} — Jingyu` : `${visibleTitle} | ${t("brand")}`;
  mobileNav.classList.remove("is-open");
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, left: 0 });
  requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }));
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
    const title = pageData.displayTitle ? pageData.displayTitle() : pageData.title;
    return !q || `${title} ${pageData.text}`.toLowerCase().includes(q);
  });

  searchResults.innerHTML = matches
    .map(([route, pageData]) => `
      <a class="result" href="#${route}" data-route="${route}">
        <strong>${pageData.displayTitle ? pageData.displayTitle() : pageData.title}</strong>
      </a>
    `)
    .join("");
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  });
  searchInput.placeholder = t("searchPages");
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "zh";
  const url = new URL(window.location.href);
  if (currentLanguage === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  applyLanguage();
  navigate(currentRoute());
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
  const languageButton = event.target.closest("[data-language]");
  if (languageButton) setLanguage(languageButton.dataset.language);
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

applyLanguage();
navigate(currentRoute());
