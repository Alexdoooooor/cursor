export type ProjectFormat =
  | "film"
  | "series"
  | "ad"
  | "music-video"
  | "animation"
  | "short";

export type ProjectStatus =
  | "draft"
  | "preproduction"
  | "generation"
  | "review"
  | "post"
  | "final";

export type GenerationJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

export type GenerationProvider =
  | "veo-3.1"
  | "runway-gen4"
  | "mock-video"
  | "mock-lipsync"
  | "mock-audio";

export interface Workspace {
  id: string;
  name: string;
  plan: string;
  membersCount: number;
  activeProjectId?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  category: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  bio: string;
  visualIdentity: string;
  costumeSets: string[];
  motionTraits: string[];
  continuityLocks: string[];
  tags: string[];
  voiceProfile: string;
}

export interface CharacterInput {
  name: string;
  role: string;
  bio: string;
  visualIdentity: string;
  costumeSets: string[];
  motionTraits: string[];
  continuityLocks: string[];
  tags: string[];
  voiceProfile: string;
}

export interface LocationPreset {
  id: string;
  name: string;
  description: string;
  timeOfDay: string;
  lightingSetup: string;
  weather: string;
  season: string;
  continuityNotes: string[];
}

export interface StyleBible {
  visualStyle: string;
  colorScript: string;
  lightingModel: string;
  lensLanguage: string;
  motionRules: string;
  motionIntensity: string;
  forbiddenArtifacts: string[];
  backgroundDensity: string;
  skinRendering: string;
  hairRendering: string;
}

export interface AssetRecord {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "reference";
  origin: string;
  canonical: boolean;
  tags: string[];
  usedIn: string[];
  checksum: string;
}

export interface AssetInput {
  name: string;
  type: AssetRecord["type"];
  origin: string;
  canonical: boolean;
  tags: string[];
  usedIn: string[];
}

export interface PromptBlock {
  id: string;
  title: string;
  value: string;
}

export interface Take {
  id: string;
  shotId: string;
  name: string;
  title?: string;
  status: "draft" | "candidate" | "approved" | "rejected";
  continuityScore: number;
  durationSec: number;
  notes: string;
  lineage: string[];
  previewImage?: string;
  videoUrl?: string;
  summary?: string;
}

export interface Shot {
  id: string;
  sceneId: string;
  slug: string;
  title: string;
  camera: string;
  framing: string;
  movement: string;
  action: string;
  lighting: string;
  durationTargetSec: number;
  continuityRisk: "низкий" | "средний" | "высокий";
  continuityLocks: string[];
  status: "черновик" | "готов" | "в очереди" | "сгенерирован" | "утверждён";
  prompt: string;
  promptBlocks: PromptBlock[];
  takes: Take[];
  approvedTakeId?: string;
}

export interface Scene {
  id: string;
  title: string;
  goal: string;
  tone: string;
  emotionalTone: string;
  location: string;
  timeOfDay: string;
  plannedDurationSec: number;
  shots: Shot[];
}

export interface TimelineClip {
  id: string;
  shotId: string;
  takeId: string;
  label: string;
  startSec: number;
  durationSec: number;
  lane: "видео" | "диалог" | "музыка";
}

export interface ProviderConfig {
  id: string;
  name: string;
  category: string;
  mode: "mock" | "api";
  status: string;
  model: string;
  capabilities: string[];
  latency: string;
  costHint: string;
  recommendedUseCase: string;
}

export type ProviderCapability = ProviderConfig;

export interface GenerationJobOutput {
  label: string;
  value: string;
}

export interface GenerationJob {
  id: string;
  shotId: string;
  shotTitle: string;
  title: string;
  provider: string;
  model: string;
  status: GenerationJobStatus;
  type: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  costEstimateUsd: number;
  costLabel: string;
  outputTakeIds: string[];
  outputs: GenerationJobOutput[];
  summary: string;
}

export interface UsageSummary {
  estimatedCost: string;
  totalJobs: number;
  completedJobs: number;
  totalCostUsd: number;
  queuedJobs: number;
  averageContinuityScore: number;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  blocks: string[];
}

export interface ContinuityInsight {
  id: string;
  title: string;
  severity: "ok" | "warning" | "critical";
  description: string;
}

export interface StoryAct {
  id: string;
  title: string;
  summary: string;
}

export interface StoryBible {
  logline: string;
  synopsis: string;
  mood: string;
  acts: StoryAct[];
  scenes: Scene[];
}

export interface StoryBibleUpdate {
  logline: string;
  synopsis: string;
  mood: string;
}

export interface MetricItem {
  label: string;
  value: string;
  description: string;
}

export interface ProjectStats {
  scenes: number;
  shots: number;
  takes: number;
  characters: number;
  assets: number;
}

export interface AudioStage {
  workflow: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  format: ProjectFormat;
  formatLabel: string;
  status: ProjectStatus;
  statusLabel: string;
  aspectRatio: "16:9" | "9:16" | "2.39:1" | "1:1";
  genre: string;
  targetDurationSec: number;
  targetDurationLabel: string;
  synopsis: string;
  logline: string;
  tags: string[];
  healthScore: number;
  continuityScore: number;
  readinessScore: number;
  latestActivity: string;
  approvedTakeCount: number;
  stats: ProjectStats;
  storyBible: StoryBible;
  characters: Character[];
  locations: LocationPreset[];
  styleBible: StyleBible;
  assets: AssetRecord[];
  scenes: Scene[];
  shots: Shot[];
  timeline: TimelineClip[];
  providers: ProviderConfig[];
  jobs: GenerationJob[];
  queue: GenerationJob[];
  takes: Take[];
  audio: AudioStage;
  usage: UsageSummary;
  continuityWarnings: string[];
  activities: ActivityItem[];
}

export type ProjectRecord = Project;
export type DemoProject = ProjectRecord;
