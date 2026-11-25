export const MODULE_REWARDS = {
  welcome: { points: 25, badge: "Kigali Explorer" },
  kinyarwanda: { points: 30, badge: "Muraho Speaker" },
  culture: { points: 25, badge: "Umuganda Spirit" },
  history: { points: 25, badge: "Mindful Learner" },
  scenarios: { points: 45, badge: "Campus Navigator" },
};

export const WELCOME_SECTIONS = [
  {
    id: "geography",
    tag: "GEOGRAPHY & CLIMATE",
    title: "Land of a Thousand Hills",
    summary:
      "Rwanda sits in East-Central Africa with mild, temperate weather year-round due to its elevation (around 1,500m in Kigali). Expect two rainy seasons (March–May and October–December) and cool evenings.",
    tips: [
      "Carry a light jacket or umbrella—afternoon showers in Kigali pass quickly.",
      "Kigali is organized into three main districts: Gasabo, Kicukiro, and Nyarugenge.",
    ],
  },
  {
    id: "currency",
    tag: "MONEY & PAYMENTS",
    title: "Rwandan Franc (RWF) & Mobile Money",
    summary:
      "The official currency is the Rwandan Franc (RWF). While cash is useful for small shops and moto-taxis, Mobile Money (MTN MoMo and Airtel Money) is accepted almost everywhere.",
    tips: [
      "Register an MTN or Airtel SIM card with your passport or student ID as soon as you arrive.",
      "Dial *182# on MTN to pay merchants, send money, or buy airtime and data bundles.",
    ],
  },
  {
    id: "transport",
    tag: "GETTING AROUND KIGALI",
    title: "Moto-Taxis, Buses & Tap&Go",
    summary:
      "Public buses run on major routes using a reloadable Tap&Go card, while licensed motorcycle taxis (motos) offer fast door-to-door trips across the city.",
    tips: [
      "Always wear the passenger helmet provided by your moto driver—it is strictly enforced.",
      "Agree on the fare before hopping on, or use ride-hailing apps like Yego or Move.",
    ],
  },
  {
    id: "campus",
    tag: "STUDENT ESSENTIALS",
    title: "Cleanliness, Safety & Connectivity",
    summary:
      "Kigali is renowned for clean streets and strong community safety. Single-use plastic bags are banned nationwide, so pack reusable tote bags.",
    tips: [
      "Emergency toll-free numbers: 112 (General Emergency) and 113 (Traffic Police).",
      "Keep digital and printed copies of your student permit and passport handy.",
    ],
  },
];

export const KINYARWANDA_PHRASES = [
  {
    id: "muraho",
    category: "Greetings",
    kinyarwanda: "Muraho",
    pronunciation: "moo-RAH-ho",
    english: "Hello (general / formal)",
    example: "Muraho! Amakuru yawe? (Hello! How are you?)",
    contextNote: "Works any time of day and shows warm respect to elders and peers alike.",
  },
  {
    id: "amakuru",
    category: "Greetings",
    kinyarwanda: "Amakuru? / Ni meza",
    pronunciation: "ah-mah-KOO-roo / nee MEH-zah",
    english: "How are you? / I am well (it is good)",
    example: "Amakuru y'uyu munsi? — Ni meza cyane! (How is today? — Very good!)",
    contextNote: "Taking a moment to ask Amakuru before jumping into business is customary.",
  },
  {
    id: "mwaramutse",
    category: "Time of Day",
    kinyarwanda: "Mwaramutse",
    pronunciation: "mwah-rah-MOOT-seh",
    english: "Good morning",
    example: "Mwaramutse neza, mwarimu. (Good morning well, teacher.)",
    contextNote: "Used from early morning until around midday.",
  },
  {
    id: "mwiriwe",
    category: "Time of Day",
    kinyarwanda: "Mwiriwe",
    pronunciation: "mwee-REE-weh",
    english: "Good afternoon / Good evening",
    example: "Mwiriwe! Murakaza neza. (Good afternoon! Welcome.)",
    contextNote: "Used from midday through the evening.",
  },
  {
    id: "murakoze",
    category: "Politeness",
    kinyarwanda: "Murakoze (cyane)",
    pronunciation: "moo-rah-KOH-zeh (CHAH-neh)",
    english: "Thank you (very much)",
    example: "Murakoze cyane ku bufasha bwanyu. (Thank you very much for your help.)",
    contextNote: "Add 'cyane' to express extra gratitude.",
  },
  {
    id: "mbabarira",
    category: "Politeness",
    kinyarwanda: "Mbabarira / Buretse gato",
    pronunciation: "mbah-bah-REE-rah / boo-RET-seh GAH-toh",
    english: "Excuse me / Sorry — Just a moment",
    example: "Mbabarira, inzira ijya i Kimironko ni iyihe? (Excuse me, which way goes to Kimironko?)",
    contextNote: "Helpful when navigating busy markets or getting someone's attention politely.",
  },
  {
    id: "amafaranga",
    category: "Everyday Campus & Market",
    kinyarwanda: "Nangahe? / Ni angahe?",
    pronunciation: "NAHNN-ga-heh / nee ahn-GAH-heh",
    english: "How much? / How much does it cost?",
    example: "Iki gitabo ni angahe? (How much is this book?)",
    contextNote: "Essential phrase for local markets, shops, and negotiating moto rides.",
  },
  {
    id: "murabeho",
    category: "Greetings",
    kinyarwanda: "Murabeho",
    pronunciation: "moo-rah-BEH-ho",
    english: "Goodbye",
    example: "Murabeho, tuzabonana ejo! (Goodbye, see you tomorrow!)",
    contextNote: "Warm farewell when parting ways.",
  },
];

export const CULTURE_CARDS = [
  {
    id: "umuganda",
    pillar: "Community & Civic Life",
    title: "Umuganda (Last Saturday Service)",
    description:
      "On the last Saturday morning of every month (8:00 AM – 11:00 AM), communities across Rwanda come together to clean streets, build infrastructure, and hold local meetings. Shops and public transit pause during this window.",
    takeaway:
      "Plan errands for the day before Saturday morning—or join your neighborhood Umuganda to meet locals!",
  },
  {
    id: "etiquette",
    pillar: "Social Etiquette",
    title: "Warm Greetings & Two-Handed Respect",
    description:
      "Rushing straight into a request without greeting can feel abrupt. When handing or receiving an item from an elder or host, using both hands—or touching your right forearm with your left hand—is a traditional sign of respect.",
    takeaway: "Always lead with 'Muraho' or 'Mwaramutse' before asking a question.",
  },
  {
    id: "dining",
    pillar: "Food & Hospitality",
    title: "Sharing Meals & Rwandan Staples",
    description:
      "Hospitality is central to Rwandan life. Popular everyday foods include isombe (cassava leaves), ibishyimbo (beans), umuceri (rice), brochettes (grilled skewers), and fresh local fruits like tree tomatoes and avocados.",
    takeaway: "Eating while walking in public is generally uncommon; sit and enjoy your meal or snack.",
  },
  {
    id: "dialogue",
    pillar: "Communication Style",
    title: "Calm Tone & Collective Harmony",
    description:
      "Public interactions value composure, patience, and mutual respect. Raising your voice in frustration rarely resolves a disagreement and can cause social discomfort.",
    takeaway: "A calm, polite tone goes a long way in offices, markets, and campus spaces.",
  },
];

export const HISTORY_TIMELINE = [
  {
    era: "Pre-Colonial Era",
    title: "Shared Language, Culture & Social Cohesion",
    detail:
      "Before colonial rule, Rwandans shared one language (Kinyarwanda), cultural traditions, and a centralized kingdom with social mobility across cattle-herding and farming livelihoods.",
  },
  {
    era: "Colonial Period (1897–1962)",
    title: "Rigid Identity Cards & Division",
    detail:
      "German and later Belgian colonial administrations institutionalized rigid ethnic classifications through mandatory identity cards in 1933, deepening social divisions.",
  },
  {
    era: "1994",
    title: "The 1994 Genocide Against the Tutsi",
    detail:
      "Over 100 days between April and July 1994, more than one million Tutsi—along with moderate Hutu who opposed the violence—were murdered. Annual Kwibuka commemoration begins every April 7.",
  },
  {
    era: "1994 – Present",
    title: "Unity, Reconciliation & Ndi Umunyarwanda",
    detail:
      "Through homegrown restorative justice (Gacaca courts), civic reconciliation, and a focus on shared national identity ('Ndi Umunyarwanda' — I am Rwandan), Rwanda rebuilt institutions and social cohesion.",
  },
];

export const SCENARIO_QUIZZES = [
  {
    id: "s1",
    situation:
      "You walk up to a campus admin desk or a local shopkeeper in Kigali to ask for directions.",
    question: "What is the most respectful way to start the conversation?",
    options: [
      {
        text: "Immediately ask: 'Where is the main library?' so you don't waste their time.",
        isCorrect: false,
        feedback:
          "Jumping straight into a question without a greeting can feel abrupt in Rwandan etiquette.",
      },
      {
        text: "Say 'Muraho' or 'Mwaramutse', pause for their response, and then ask politely.",
        isCorrect: true,
        feedback:
          "Spot on! Starting with a warm greeting sets a respectful, welcoming tone.",
      },
      {
        text: "Wave from across the hallway and point at your map.",
        isCorrect: false,
        feedback:
          "Approaching calmly and offering a verbal greeting is much better received.",
      },
    ],
  },
  {
    id: "s2",
    situation:
      "It is 9:00 AM on the last Saturday of the month, and you need to take a bus across Kigali.",
    question: "Why are the streets quiet and buses paused?",
    options: [
      {
        text: "It is Umuganda, the monthly nationwide community service morning.",
        isCorrect: true,
        feedback:
          "Correct! Umuganda runs from 8:00 AM to 11:00 AM on the last Saturday of every month.",
      },
      {
        text: "Public buses never operate on Saturdays in Rwanda.",
        isCorrect: false,
        feedback:
          "Buses run every day, except during the morning Umuganda window on the final Saturday of the month.",
      },
      {
        text: "All businesses close every weekend until Monday.",
        isCorrect: false,
        feedback:
          "Businesses reopen right after Umuganda finishes around 11:00 AM.",
      },
    ],
  },
  {
    id: "s3",
    situation:
      "You are about to hop on a moto-taxi from Kimironko to your residence.",
    question: "Which two habits keep your trip safe and smooth?",
    options: [
      {
        text: "Put on the passenger helmet provided and confirm the fare before departing.",
        isCorrect: true,
        feedback:
          "Yes! Wearing a helmet is mandatory and confirming the fare avoids misunderstandings.",
      },
      {
        text: "Hold the helmet on your lap and negotiate the price after arriving.",
        isCorrect: false,
        feedback:
          "Riding without wearing the helmet is unsafe and illegal, and fares should be agreed upfront.",
      },
      {
        text: "Pay with a foreign currency note without asking.",
        isCorrect: false,
        feedback:
          "Local transactions use Rwandan Francs (RWF) or MTN/Airtel Mobile Money.",
      },
    ],
  },
  {
    id: "s4",
    situation:
      "A classmate greets you with 'Amakuru yawe?' when you arrive at morning lectures.",
    question: "How should you reply?",
    options: [
      {
        text: "'Ni meza! Amakuru yawe?' (I'm well! How are you?)",
        isCorrect: true,
        feedback:
          "Great job! 'Ni meza' is the natural, friendly response to 'Amakuru'.",
      },
      {
        text: "'Murabeho' (Goodbye)",
        isCorrect: false,
        feedback:
          "'Murabeho' means goodbye—use 'Ni meza' when someone asks how you are.",
      },
      {
        text: "'Ni angahe?' (How much is it?)",
        isCorrect: false,
        feedback:
          "'Ni angahe?' asks for the price of an item, not a greeting response.",
      },
    ],
  },
];