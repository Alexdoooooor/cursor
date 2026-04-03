import type {
  ActivityItem,
  AssetRecord,
  Character,
  ContinuityInsight,
  GenerationJob,
  Project,
  PromptTemplate,
  ProviderCapability,
  Scene,
  Take,
  TimelineClip,
  Workspace,
} from "@/types/domain";

const workspaceId = "workspace-cinecraft";
const primaryProjectId = "project-aurora";
const sceneOneId = "scene-bridge";
const sceneTwoId = "scene-platform";
const shotOneId = "shot-bridge-wide";
const shotTwoId = "shot-platform-close";
const shotThreeId = "shot-train-silhouette";

export const demoWorkspace: Workspace = {
  id: workspaceId,
  name: "Студия «Синематека ИИ»",
  plan: "Studio",
  membersCount: 8,
  activeProjectId: primaryProjectId,
};

export const demoScenes: Scene[] = [
  {
    id: sceneOneId,
    title: "Мост над рельсами",
    goal: "Задать тайну и визуальный язык проекта.",
    tone: "Нео-нуар",
    emotionalTone: "Напряжённое предчувствие",
    location: "Северный вокзал / пешеходный мост",
    timeOfDay: "Ночь",
    plannedDurationSec: 94,
    shots: [],
  },
  {
    id: sceneTwoId,
    title: "Платформа призраков",
    goal: "Показать переход из реальности в память.",
    tone: "Сюрреализм",
    emotionalTone: "Сюрреалистическое оцепенение",
    location: "Платформа 9",
    timeOfDay: "Ночь / туман",
    plannedDurationSec: 108,
    shots: [],
  },
];

export const demoCharacters: Character[] = [
  {
    id: "character-alina",
    name: "Алина",
    role: "Главная героиня",
    visualIdentity:
      "Худощавая проводница с коротким чёрным каре, фарфоровой кожей и усталым взглядом.",
    bio: "Проводница, которая замечает трещину в реальности и начинает преследовать поезд памяти.",
    costumeSets: ["Тёмно-синий форменный плащ", "Винтажный шарф цвета меди"],
    motionTraits: ["Сдержанные жесты", "Плавный разворот корпуса", "Низкий центр тяжести"],
    continuityLocks: [
      "Сохранять асимметричную прядь над правым глазом",
      "Не менять фактуру плаща — матовая шерсть",
      "Сохранять холодный макияж и контрастный контур губ",
    ],
    tags: ["герой", "канон", "ночной нео-нуар"],
    voiceProfile: "Низкий мягкий альт, спокойная подача",
  },
  {
    id: "character-passenger-7",
    name: "Пассажир №7",
    role: "Катализатор тайны",
    visualIdentity:
      "Высокий мужчина в длинном пальто, лицо частично скрыто светом купе.",
    bio: "Загадочный спутник, проводящий Алину в пространство воспоминаний.",
    costumeSets: ["Чёрное пальто", "Шляпа с широкими полями"],
    motionTraits: ["Почти неподвижен", "Разворот головы с задержкой", "Минимум мимики"],
    continuityLocks: [
      "Лицо не раскрывать полностью в сценах 1–2",
      "Сохранять узкий силуэт плеч и шляпу",
    ],
    tags: ["антагонист", "сюрреализм"],
    voiceProfile: "Низкий баритон с металлическим тембром",
  },
];

export const demoAssets: AssetRecord[] = [
  {
    id: "asset-keyframe-bridge",
    name: "Keyframe — мост / стартовый кадр",
    type: "image",
    origin: "Загружен вручную и закреплён как first frame source",
    canonical: true,
    tags: ["keyframe", "мост", "ночь"],
    usedIn: ["Сцена 1 / Шот 1"],
    checksum: "9F4A-21BD-01",
  },
  {
    id: "asset-expression-alina",
    name: "Expression sheet — Алина",
    type: "reference",
    origin: "Импорт turnarounds + 12 facial states",
    canonical: true,
    tags: ["герой", "эмоции", "canonical"],
    usedIn: ["Character Bible", "Shot refs"],
    checksum: "2AC8-77EF-99",
  },
  {
    id: "asset-train-sfx",
    name: "SFX — скольжение поезда",
    type: "audio",
    origin: "Сгенерирован mock audio provider",
    canonical: false,
    tags: ["sfx", "поезд"],
    usedIn: ["Timeline / сцена 2"],
    checksum: "441C-EFA2-77",
  },
];

export const demoTakes: Take[] = [
  {
    id: "take-bridge-a",
    shotId: shotOneId,
    name: "Take A / холодный проход",
    status: "approved",
    durationSec: 8,
    continuityScore: 93,
    notes: "Лучший баланс света на плаще и силуэте героини.",
    summary: "Стабильный холодный контровой свет и уверенный silhouette lock.",
    lineage: ["first frame", "character refs", "style bible"],
  },
  {
    id: "take-bridge-b",
    shotId: shotOneId,
    name: "Take B / более агрессивный контраст",
    status: "candidate",
    durationSec: 8,
    continuityScore: 79,
    notes: "Потеряна текстура кожи и появились цифровые ореолы.",
    summary: "Более высокий контраст, но слабее continuity.",
    lineage: ["prompt variant B", "negative blocks"],
  },
  {
    id: "take-platform-a",
    shotId: shotThreeId,
    name: "Take A / платформа в тумане",
    status: "candidate",
    durationSec: 10,
    continuityScore: 88,
    notes: "Хороший ритм света, требуется усилить silhouette lock.",
    summary: "Сильный световой рисунок, но туман требует palette lock.",
    lineage: ["platform refs", "fog variation"],
  },
];

export const demoJobs: GenerationJob[] = [
  {
    id: "job-bridge-wide",
    shotId: shotOneId,
    shotTitle: "Открывающий общий план",
    title: "Генерация opening shot",
    provider: "Mock VFX Core",
    model: "analog-film-v1",
    status: "succeeded",
    type: "generate-video",
    progress: 100,
    createdAt: "2026-04-03T09:00:00.000Z",
    updatedAt: "2026-04-03T09:03:30.000Z",
    startedAt: "2026-04-03T09:00:00.000Z",
    costEstimateUsd: 2.4,
    costLabel: "$2.40",
    outputTakeIds: ["take-bridge-a", "take-bridge-b"],
    outputs: [
      { label: "Режим", value: "image-to-video + first frame control" },
      { label: "Continuity", value: "hero lock + style lock" },
      { label: "Статус", value: "2 candidate takes готовы" },
    ],
    summary: "Сгенерированы два варианта opening shot.",
  },
  {
    id: "job-platform-fog",
    shotId: shotThreeId,
    shotTitle: "Платформа в тумане",
    title: "Генерация платформы призраков",
    provider: "Mock VFX Core",
    model: "analog-film-v1",
    status: "running",
    type: "generate-video",
    progress: 62,
    createdAt: "2026-04-03T10:05:00.000Z",
    updatedAt: "2026-04-03T10:08:30.000Z",
    startedAt: "2026-04-03T10:05:00.000Z",
    costEstimateUsd: 3.1,
    costLabel: "$3.10",
    outputTakeIds: ["take-platform-a"],
    outputs: [
      { label: "Слой", value: "fog + moonlight continuity" },
      { label: "Прогресс", value: "render stage 3 из 5" },
      { label: "Ожидание", value: "нужен повторный pass palette lock" },
    ],
    summary: "Промежуточный рендер платформы в тумане.",
  },
  {
    id: "job-lipsync-alina",
    shotId: shotTwoId,
    shotTitle: "Крупный план Алины",
    title: "Lip-sync для крупного плана",
    provider: "Mock Lip Sync",
    model: "dialog-sync-beta",
    status: "queued",
    type: "lip-sync",
    progress: 14,
    createdAt: "2026-04-03T10:18:00.000Z",
    updatedAt: "2026-04-03T10:18:00.000Z",
    startedAt: "2026-04-03T10:18:00.000Z",
    costEstimateUsd: 1.2,
    costLabel: "$1.20",
    outputTakeIds: [],
    outputs: [
      { label: "Трек", value: "voice profile — Алина" },
      { label: "Режим", value: "placeholder lip-sync" },
      { label: "Следующий шаг", value: "ожидание approved face track" },
    ],
    summary: "Подготовка lip-sync stage после утверждения дубля.",
  },
];

export const demoContinuity: ContinuityInsight[] = [
  {
    id: "continuity-alina-light",
    title: "Свет на лице Алины стабилен",
    severity: "ok",
    description:
      "Контровой лунный свет и медный practical запомнены как каноническая схема для сцен 1–2.",
  },
  {
    id: "continuity-passenger-silhouette",
    title: "Риск дрейфа силуэта Пассажира №7",
    severity: "warning",
    description:
      "Во втором candidate take шляпа теряет ширину полей. Рекомендуется закрепить hero reference bundle.",
  },
  {
    id: "continuity-platform-fog",
    title: "Туман смещает цветовой скрипт",
    severity: "critical",
    description:
      "Платформа 9 уходит в серо-зелёный оттенок и ослабляет медные акценты. Усильте palette lock в prompt blocks.",
  },
];

export const demoTimeline: TimelineClip[] = [
  {
    id: "clip-1",
    shotId: shotOneId,
    takeId: "take-bridge-a",
    label: "Открывающий общий план",
    startSec: 0,
    durationSec: 8,
    lane: "видео",
  },
  {
    id: "clip-2",
    shotId: shotTwoId,
    takeId: "take-bridge-a",
    label: "Крупный план Алины",
    startSec: 8,
    durationSec: 6,
    lane: "видео",
  },
  {
    id: "clip-3",
    shotId: shotThreeId,
    takeId: "take-platform-a",
    label: "Платформа в тумане",
    startSec: 14,
    durationSec: 10,
    lane: "видео",
  },
];

export const demoProviders: ProviderCapability[] = [
  {
    id: "provider-mock-video",
    name: "Mock VFX Core",
    category: "Видео",
    mode: "mock",
    status: "Активен",
    model: "analog-film-v1",
    capabilities: ["text-to-video", "image-to-video", "first/last frame control", "reference locking"],
    latency: "Средняя",
    costHint: "$$$",
    recommendedUseCase: "Сцены с сильным visual continuity и analog-film look",
  },
  {
    id: "provider-mock-lipsync",
    name: "Mock Lip Sync",
    category: "Липсинк",
    mode: "mock",
    status: "Placeholder",
    model: "dialog-sync-beta",
    capabilities: ["batch jobs", "face track selection", "webhook-ready placeholders"],
    latency: "Низкая",
    costHint: "$$",
    recommendedUseCase: "Постобработка одобренных диалоговых кадров",
  },
  {
    id: "provider-mock-audio",
    name: "Mock Voice Forge",
    category: "Аудио",
    mode: "mock",
    status: "Тестовый режим",
    model: "voice-forge-mvp",
    capabilities: ["tts", "тембр", "паузы", "demo adr"],
    latency: "Низкая",
    costHint: "$$",
    recommendedUseCase: "Черновая озвучка и реплики для rough cut",
  },
];

export const demoPromptTemplates: PromptTemplate[] = [
  {
    id: "prompt-analog-noir",
    title: "Аналоговый нео-нуар",
    description:
      "Шаблон для сцен с сильным световым рисунком, мокрыми поверхностями и длинной оптикой.",
    blocks: [
      "Субъект: Алина на мосту над путями, напряжённый взгляд в сторону приближающегося света",
      "Камера: медленный dolly-in, длиннофокусный объектив, микродрожание плёнки",
      "Свет: холодный лунный контур, медные practical highlights, плотные тени",
      "Стиль: зернистый 35mm, высокий микроконтраст, analog halation",
      "Негативные инструкции: без CGI-пластика, без избыточного motion blur, без soft skin smoothing",
    ],
  },
];

export const demoActivities: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Утверждён take для шота «Открывающий общий план»",
    timestamp: "10 минут назад",
    category: "Approval",
  },
  {
    id: "activity-2",
    title: "Запущен lip-sync job для крупного плана Алины",
    timestamp: "24 минуты назад",
    category: "Audio",
  },
  {
    id: "activity-3",
    title: "Обновлён style preset «Аналоговый нео-нуар»",
    timestamp: "48 минут назад",
    category: "Style",
  },
];

export const projectTemplateOptions = [
  { value: "film", label: "Короткометражный фильм" },
  { value: "series", label: "Сериал" },
  { value: "ad", label: "Рекламный ролик" },
  { value: "music-video", label: "Музыкальный клип" },
  { value: "animation", label: "Анимация" },
  { value: "short", label: "Короткий digital-ролик" },
] as const;

export const DEMO_METRICS = [
  {
    label: "Утверждённых тейков",
    value: "7",
    description: "Закреплены как канон и готовы к rough cut.",
  },
  {
    label: "Continuity score",
    value: "91 / 100",
    description: "Средняя стабильность героев, костюмов и света.",
  },
  {
    label: "Активных workflow jobs",
    value: "3",
    description: "Генерация, lip-sync placeholder и аудио-подготовка.",
  },
] as const;

const demoStyleBible = {
  visualStyle: "Аналоговый нео-нуар с зерном 35mm и холодным контровым светом.",
  colorScript: "Стальной синий, медь, молочный белый",
  lightingModel: "Практический свет + лунный fill",
  lensLanguage: "Длиннофокусная оптика, редкие сверхкрупные",
  motionRules: "Медленные dolly-in и статичные тревожные паузы",
  motionIntensity: "Умеренная",
  forbiddenArtifacts: [
    "Пластиковая кожа",
    "Слишком чистые цифровые края",
    "Мягкие тени без структуры",
  ],
  backgroundDensity: "Средняя / контролируемая",
  skinRendering: "Контрастная, с видимой текстурой и холодными полутонами",
  hairRendering: "Чёткие пряди без CGI-гладкости",
};

const demoShots = [
  {
    id: shotOneId,
    sceneId: sceneOneId,
    slug: "s01-sh01",
    title: "Открывающий общий план",
    camera: "Медленный dolly-in с моста",
    framing: "Общий план",
    movement: "dolly-in",
    action: "Алина замечает свет от поезда без отражения",
    lighting: "Холодный контровой + мокрый practical",
    durationTargetSec: 8,
    continuityRisk: "средний" as const,
    continuityLocks: ["плащ Алины", "медь в practical highlights", "мокрый асфальт"],
    status: "утверждён" as const,
    prompt:
      "Алина на мосту, analog-film grain, cold moon rim light, wet metal reflections, slow dolly-in, moody noir.",
    promptBlocks: [
      { id: "subject", title: "Субъект", value: "Алина на мосту над путями" },
      { id: "camera", title: "Камера", value: "Медленный dolly-in, длиннофокусный объектив" },
      { id: "lighting", title: "Свет", value: "Холодный лунный контур, медные practical highlights" },
    ],
    takes: demoTakes.filter((take) => take.shotId === shotOneId),
    approvedTakeId: "take-bridge-a",
  },
  {
    id: shotTwoId,
    sceneId: sceneOneId,
    slug: "s01-sh02",
    title: "Крупный план Алины",
    camera: "Статичный close-up",
    framing: "Крупный план",
    movement: "locked-off",
    action: "Алина осознаёт, что поезд не отражается в стекле",
    lighting: "Лицо разрезано контровым светом и тенью от перил",
    durationTargetSec: 6,
    continuityRisk: "высокий" as const,
    continuityLocks: ["асимметричная прядь", "контрастный макияж", "фарфоровая кожа"],
    status: "готов" as const,
    prompt:
      "Close-up of Alina, porcelain skin, asymmetrical hair strand, noir contrast, shallow depth of field.",
    promptBlocks: [
      { id: "emotion", title: "Эмоция", value: "Тревожное осознание" },
      { id: "framing", title: "Кадрирование", value: "Крупный план, взгляд в сторону" },
      { id: "negative", title: "Negative", value: "Без soft skin smoothing и plastic highlights" },
    ],
    takes: [],
  },
  {
    id: shotThreeId,
    sceneId: sceneTwoId,
    slug: "s02-sh01",
    title: "Платформа в тумане",
    camera: "Плавный боковой проезд",
    framing: "Средний / общий",
    movement: "tracking",
    action: "Поезд появляется из тумана как память",
    lighting: "Лунный верхний свет + линейные лампы вагона",
    durationTargetSec: 10,
    continuityRisk: "высокий" as const,
    continuityLocks: ["силуэт Пассажира №7", "медные акценты", "туман без зелёного сдвига"],
    status: "сгенерирован" as const,
    prompt:
      "Ghost platform in dense fog, moonlight overhead, copper accents, cinematic tracking shot, analog halation.",
    promptBlocks: [
      { id: "environment", title: "Окружение", value: "Платформа 9 в густом тумане" },
      { id: "style", title: "Стиль", value: "Analog halation, controlled grain, no digital sharpness" },
      { id: "locks", title: "Continuity locks", value: "Пассажир №7 не раскрывает лицо полностью" },
    ],
    takes: demoTakes.filter((take) => take.shotId === shotThreeId),
  },
];

demoScenes[0] = { ...demoScenes[0], shots: demoShots.filter((shot) => shot.sceneId === sceneOneId) };
demoScenes[1] = { ...demoScenes[1], shots: demoShots.filter((shot) => shot.sceneId === sceneTwoId) };

export const demoProjects: Project[] = [
  {
    id: primaryProjectId,
    title: "Полуночный экспресс",
    slug: "polunochnyy-ekspress",
    format: "film",
    formatLabel: "Короткометражный фильм",
    status: "generation",
    statusLabel: "В генерации",
    aspectRatio: "2.39:1",
    genre: "Нео-нуар, sci-fi",
    targetDurationSec: 540,
    targetDurationLabel: "9 минут",
    synopsis:
      "История о проводнице, которая преследует поезд, проходящий сквозь воспоминания пассажиров.",
    logline:
      "Проводница замечает поезд без отражений и следует за ним в пространство чужой памяти.",
    tags: ["нео-нуар", "аналоговая фактура", "длинная форма"],
    healthScore: 89,
    continuityScore: 91,
    readinessScore: 84,
    latestActivity: "10 минут назад",
    approvedTakeCount: 1,
    stats: {
      scenes: demoScenes.length,
      shots: demoShots.length,
      takes: demoTakes.length,
      characters: demoCharacters.length,
      assets: demoAssets.length,
    },
    storyBible: {
      logline:
        "Проводница замечает поезд без отражений и следует за ним в пространство чужой памяти.",
      synopsis:
        "Полуночный экспресс — история о хрупкой границе между реальностью и памятью, где каждый новый вагон разворачивает чужую судьбу.",
      mood: "Тревожный, меланхоличный, гипнотический",
      acts: [
        { id: "act-1", title: "Зов поезда", summary: "Алина замечает аномалию и начинает преследование." },
        { id: "act-2", title: "Переход", summary: "Реальность смещается, и платформа становится пространством памяти." },
      ],
      scenes: demoScenes,
    },
    characters: demoCharacters,
    locations: [
      {
        id: "location-bridge",
        name: "Северный вокзал / пешеходный мост",
        description: "Мокрый металлический мост с видом на пустые пути.",
        timeOfDay: "Ночь",
        lightingSetup: "Холодный контровой свет и лампы натрия",
        weather: "После дождя",
        season: "Осень",
        continuityNotes: ["Сохранять мокрый блеск металла", "Не убирать туман над путями"],
      },
      {
        id: "location-platform-9",
        name: "Платформа 9",
        description: "Платформа без пассажиров, наполненная густым туманом и эхом вагонов.",
        timeOfDay: "Ночь / туман",
        lightingSetup: "Лунный верхний свет + линейные лампы вагона",
        weather: "Густой туман",
        season: "Осень",
        continuityNotes: ["Держать медные блики", "Не допускать зелёного цветового дрейфа"],
      },
    ],
    styleBible: demoStyleBible,
    assets: demoAssets,
    scenes: demoScenes,
    shots: demoShots,
    timeline: demoTimeline,
    providers: demoProviders,
    jobs: demoJobs,
    queue: demoJobs.filter((job) => job.status !== "succeeded"),
    takes: demoTakes,
    audio: {
      workflow: ["Диалоговые линии", "TTS placeholder", "Lip-sync placeholder", "Музыкальный черновик"],
    },
    usage: {
      estimatedCost: "$128.40",
      totalJobs: 3,
      completedJobs: 1,
      totalCostUsd: 128.4,
      queuedJobs: 2,
      averageContinuityScore: 91,
    },
    continuityWarnings: demoContinuity.map((item) => `${item.title}: ${item.description}`),
    activities: demoActivities,
  },
  {
    id: "project-neon-ad",
    title: "Neon Reverie",
    slug: "neon-reverie",
    format: "ad",
    formatLabel: "Рекламный ролик",
    status: "preproduction",
    statusLabel: "Препродакшн",
    aspectRatio: "16:9",
    genre: "Fashion / Tech",
    targetDurationSec: 45,
    targetDurationLabel: "45 секунд",
    synopsis: "Премиальная рекламная история о свете, стекле и цифровой ткани.",
    logline: "Технологичный fashion-ролик, где ткань реагирует на неон и движение тела.",
    tags: ["fashion", "commercial", "neon"],
    healthScore: 76,
    continuityScore: 88,
    readinessScore: 61,
    latestActivity: "вчера",
    approvedTakeCount: 0,
    stats: {
      scenes: 2,
      shots: 4,
      takes: 0,
      characters: 1,
      assets: 2,
    },
    storyBible: {
      logline: "Технологичный fashion-ролик, где ткань реагирует на неон и движение тела.",
      synopsis: "Короткая визуальная история про ткань, свет и отражения как язык бренда.",
      mood: "Глянцевый, премиальный, ритмичный",
      acts: [{ id: "act-brand", title: "Reveal", summary: "Неон и стекло подчеркивают форму продукта." }],
      scenes: [],
    },
    characters: [
      {
        id: "character-model-x1",
        name: "Модель X1",
        role: "Главная фигура кадра",
        bio: "Пластичная модель с подчёркнутой геометрией силуэта.",
        visualIdentity: "Платиновая стрижка, зеркальный макияж, длинный силуэт.",
        costumeSets: ["Хромированный плащ", "Полупрозрачный неон-корсет"],
        motionTraits: ["Плавная пластика", "Ритмичный поворот плеч", "Контролируемая походка"],
        continuityLocks: ["Зеркальный макияж", "Чёткий силуэт плеч", "Сохранять хромовые отражения"],
        tags: ["fashion", "hero"],
        voiceProfile: "N/A",
      },
    ],
    locations: [],
    styleBible: {
      ...demoStyleBible,
      visualStyle: "Неоновый luxury-tech",
      colorScript: "Фуксия, электрический синий, серебро",
    },
    assets: demoAssets.slice(0, 2),
    scenes: [],
    shots: [],
    timeline: [],
    providers: demoProviders,
    jobs: [],
    queue: [],
    takes: [],
    audio: {
      workflow: ["Музыкальный референс", "Voice-over placeholder"],
    },
    usage: {
      estimatedCost: "$0.00",
      totalJobs: 0,
      completedJobs: 0,
      totalCostUsd: 0,
      queuedJobs: 0,
      averageContinuityScore: 0,
    },
    continuityWarnings: [],
    activities: [],
  },
];

export function findProjectById(projectId: string): Project | null {
  return demoProjects.find((project) => project.id === projectId) ?? null;
}

export function findProjectBySlug(projectSlug: string): Project | null {
  return demoProjects.find((project) => project.slug === projectSlug) ?? null;
}

export function buildProjectFromInput(input: {
  title: string;
  format: Project["format"];
  aspectRatio: Project["aspectRatio"];
  genre: string;
  targetDurationSec: number;
  synopsis: string;
}): Project {
  const slug = input.title
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");

  return {
    id: `project-${Date.now()}`,
    title: input.title,
    slug,
    format: input.format,
    formatLabel:
      projectTemplateOptions.find((option) => option.value === input.format)?.label ?? "Проект",
    status: "draft",
    statusLabel: "Черновик",
    aspectRatio: input.aspectRatio,
    genre: input.genre,
    targetDurationSec: input.targetDurationSec,
    targetDurationLabel: `${Math.ceil(input.targetDurationSec / 60)} минут`,
    synopsis: input.synopsis,
    logline: input.synopsis,
    tags: ["новый проект"],
    healthScore: 62,
    continuityScore: 0,
    readinessScore: 22,
    latestActivity: "только что",
    approvedTakeCount: 0,
    stats: {
      scenes: 0,
      shots: 0,
      takes: 0,
      characters: 0,
      assets: 0,
    },
    storyBible: {
      logline: input.synopsis,
      synopsis: input.synopsis,
      mood: "Не задано",
      acts: [],
      scenes: [],
    },
    characters: [],
    locations: [],
    styleBible: demoStyleBible,
    assets: [],
    scenes: [],
    shots: [],
    timeline: [],
    providers: demoProviders,
    jobs: [],
    queue: [],
    takes: [],
    audio: {
      workflow: ["Подготовьте voice profile и диалоговые линии"],
    },
    usage: {
      estimatedCost: "$0.00",
      totalJobs: 0,
      completedJobs: 0,
      totalCostUsd: 0,
      queuedJobs: 0,
      averageContinuityScore: 0,
    },
    continuityWarnings: [
      "Добавьте первого героя и style bible, чтобы открыть generation workflow.",
    ],
    activities: [],
  };
}
