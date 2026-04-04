import mongoose, { Schema } from "mongoose";

const StoryActSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { _id: false },
);

const StoryBibleSchema = new Schema(
  {
    logline: { type: String, required: true },
    synopsis: { type: String, required: true },
    mood: { type: String, required: true },
    acts: { type: [StoryActSchema], default: [] },
  },
  { _id: false },
);

const CharacterSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    visualIdentity: { type: String, required: true },
    costumeSets: { type: [String], default: [] },
    motionTraits: { type: [String], default: [] },
    continuityLocks: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    voiceProfile: { type: String, required: true },
  },
  { _id: false },
);

const LocationSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    timeOfDay: { type: String, required: true },
    lightingSetup: { type: String, required: true },
    weather: { type: String, required: true },
    season: { type: String, required: true },
    continuityNotes: { type: [String], default: [] },
  },
  { _id: false },
);

const StyleBibleSchema = new Schema(
  {
    visualStyle: { type: String, required: true },
    colorScript: { type: String, required: true },
    lightingModel: { type: String, required: true },
    lensLanguage: { type: String, required: true },
    motionRules: { type: String, required: true },
    motionIntensity: { type: String, required: true },
    forbiddenArtifacts: { type: [String], default: [] },
    backgroundDensity: { type: String, required: true },
    skinRendering: { type: String, required: true },
    hairRendering: { type: String, required: true },
  },
  { _id: false },
);

const AssetSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    origin: { type: String, required: true },
    canonical: { type: Boolean, required: true },
    tags: { type: [String], default: [] },
    usedIn: { type: [String], default: [] },
    checksum: { type: String, required: true },
  },
  { _id: false },
);

const PromptBlockSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const TakeSchema = new Schema(
  {
    id: { type: String, required: true },
    shotId: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    continuityScore: { type: Number, required: true },
    durationSec: { type: Number, required: true },
    notes: { type: String, required: true },
    lineage: { type: [String], default: [] },
    previewImage: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    summary: { type: String, default: "" },
  },
  { _id: false },
);

const ShotSchema = new Schema(
  {
    id: { type: String, required: true },
    sceneId: { type: String, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    camera: { type: String, required: true },
    framing: { type: String, required: true },
    movement: { type: String, required: true },
    action: { type: String, required: true },
    lighting: { type: String, required: true },
    durationTargetSec: { type: Number, required: true },
    continuityRisk: { type: String, required: true },
    continuityLocks: { type: [String], default: [] },
    status: { type: String, required: true },
    prompt: { type: String, required: true },
    promptBlocks: { type: [PromptBlockSchema], default: [] },
    takes: { type: [TakeSchema], default: [] },
    approvedTakeId: { type: String, default: "" },
  },
  { _id: false },
);

const SceneSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    goal: { type: String, required: true },
    tone: { type: String, required: true },
    emotionalTone: { type: String, required: true },
    location: { type: String, required: true },
    timeOfDay: { type: String, required: true },
    plannedDurationSec: { type: Number, required: true },
    shots: { type: [ShotSchema], default: [] },
  },
  { _id: false },
);

const TimelineClipSchema = new Schema(
  {
    id: { type: String, required: true },
    shotId: { type: String, required: true },
    takeId: { type: String, required: true },
    label: { type: String, required: true },
    startSec: { type: Number, required: true },
    durationSec: { type: Number, required: true },
    lane: { type: String, required: true },
  },
  { _id: false },
);

const ProviderSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    mode: { type: String, required: true },
    status: { type: String, required: true },
    model: { type: String, required: true },
    capabilities: { type: [String], default: [] },
    latency: { type: String, required: true },
    costHint: { type: String, required: true },
    recommendedUseCase: { type: String, required: true },
  },
  { _id: false },
);

const GenerationOutputSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const GenerationJobSchema = new Schema(
  {
    id: { type: String, required: true },
    shotId: { type: String, required: true },
    shotTitle: { type: String, required: true },
    title: { type: String, required: true },
    provider: { type: String, required: true },
    model: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    progress: { type: Number, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    startedAt: { type: String, required: true },
    costEstimateUsd: { type: Number, required: true },
    costLabel: { type: String, required: true },
    outputTakeIds: { type: [String], default: [] },
    outputs: { type: [GenerationOutputSchema], default: [] },
    summary: { type: String, required: true },
  },
  { _id: false },
);

const UsageSchema = new Schema(
  {
    estimatedCost: { type: String, required: true },
    totalJobs: { type: Number, required: true },
    completedJobs: { type: Number, required: true },
    totalCostUsd: { type: Number, required: true },
    queuedJobs: { type: Number, required: true },
    averageContinuityScore: { type: Number, required: true },
  },
  { _id: false },
);

const AudioSchema = new Schema(
  {
    workflow: { type: [String], default: [] },
  },
  { _id: false },
);

const ActivitySchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    timestamp: { type: String, required: true },
    category: { type: String, required: true },
  },
  { _id: false },
);

const StatsSchema = new Schema(
  {
    scenes: { type: Number, required: true },
    shots: { type: Number, required: true },
    takes: { type: Number, required: true },
    characters: { type: Number, required: true },
    assets: { type: Number, required: true },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    id: { type: String, required: true, index: true, unique: true },
    slug: { type: String, required: true, index: true, unique: true },
    title: { type: String, required: true },
    format: { type: String, required: true },
    formatLabel: { type: String, required: true },
    status: { type: String, required: true },
    statusLabel: { type: String, required: true },
    aspectRatio: { type: String, required: true },
    genre: { type: String, required: true },
    targetDurationSec: { type: Number, required: true },
    targetDurationLabel: { type: String, required: true },
    synopsis: { type: String, required: true },
    logline: { type: String, required: true },
    tags: { type: [String], default: [] },
    healthScore: { type: Number, required: true },
    continuityScore: { type: Number, required: true },
    readinessScore: { type: Number, required: true },
    latestActivity: { type: String, required: true },
    approvedTakeCount: { type: Number, required: true },
    stats: { type: StatsSchema, required: true },
    storyBible: { type: StoryBibleSchema, required: true },
    characters: { type: [CharacterSchema], default: [] },
    locations: { type: [LocationSchema], default: [] },
    styleBible: { type: StyleBibleSchema, required: true },
    assets: { type: [AssetSchema], default: [] },
    scenes: { type: [SceneSchema], default: [] },
    shots: { type: [ShotSchema], default: [] },
    timeline: { type: [TimelineClipSchema], default: [] },
    providers: { type: [ProviderSchema], default: [] },
    jobs: { type: [GenerationJobSchema], default: [] },
    queue: { type: [GenerationJobSchema], default: [] },
    takes: { type: [TakeSchema], default: [] },
    audio: { type: AudioSchema, required: true },
    usage: { type: UsageSchema, required: true },
    continuityWarnings: { type: [String], default: [] },
    activities: { type: [ActivitySchema], default: [] },
  },
  {
    collection: "projects",
    timestamps: true,
  },
);

export const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
