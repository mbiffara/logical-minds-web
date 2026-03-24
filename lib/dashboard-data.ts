// ── Types ──────────────────────────────────────────────────────────────────

export type AgentStatus = "active" | "idle" | "working" | "error";

export type PipelineStage =
  | "orchestration"
  | "productDiscovery"
  | "productDesign"
  | "softwareDev"
  | "qualityAssurance"
  | "cloudInfra"
  | "aiIntegration"
  | "productGrowth";

export interface AgentIntegration {
  name: string;
  status: "connected" | "syncing" | "disconnected";
  lastSync: string;
  eventsToday: number;
}

export interface AgentInfraInfo {
  instanceId: string;
  region: string;
  status: "running" | "idle" | "scaling";
  cpu: number;
  memory: number;
  uptime: string;
  model: string;
}

export interface LinearTask {
  id: string;
  title: string;
  status: "in_progress" | "done" | "todo" | "blocked";
  priority: "urgent" | "high" | "medium" | "low";
  assigneeKey: string;
}

export interface AgentData {
  id: string;
  nameKey: string;
  roleKey: string;
  stage: PipelineStage;
  status: AgentStatus;
  metrics: {
    tasksCompleted: number;
    successRate: number;
    avgResponseTime: number;
  };
  activity: number[]; // 24 sparkline data points
  lastAction: {
    descriptionKey: string;
    timestamp: string;
  };
  integrations: AgentIntegration[];
  infra: AgentInfraInfo;
  llmConfig: AgentLLMConfig;
  skills: string[]; // translation keys
  cost: AgentCostBreakdown;
  linearTasks: LinearTask[];
}

export interface PipelineStageData {
  key: PipelineStage;
  number: string;
  titleKey: string;
  agents: AgentData[];
}

export interface GlobalStats {
  totalAgents: number;
  activeAgents: number;
  tasksToday: number;
  successRate: number;
  avgResponseTime: number;
  activeProjects: number;
}

export interface TeamDef {
  id: string;
  nameKey: string;
  agentCount: number;
  color: string;
  stageKeys: string[];
}

export const teams: TeamDef[] = [
  {
    id: "tech",
    nameKey: "dashboard.teams.tech.name",
    agentCount: 22,
    color: "violet",
    stageKeys: [
      "dashboard.teams.tech.stages.productDiscovery",
      "dashboard.teams.tech.stages.productDesign",
      "dashboard.teams.tech.stages.softwareDev",
      "dashboard.teams.tech.stages.qualityAssurance",
      "dashboard.teams.tech.stages.cloudInfra",
      "dashboard.teams.tech.stages.aiIntegration",
      "dashboard.teams.tech.stages.productGrowth",
    ],
  },
  {
    id: "marketing",
    nameKey: "dashboard.teams.marketing.name",
    agentCount: 12,
    color: "cyan",
    stageKeys: [
      "dashboard.teams.marketing.stages.contentStrategy",
      "dashboard.teams.marketing.stages.seoGrowth",
      "dashboard.teams.marketing.stages.paidAds",
      "dashboard.teams.marketing.stages.analytics",
    ],
  },
  {
    id: "sales",
    nameKey: "dashboard.teams.sales.name",
    agentCount: 8,
    color: "amber",
    stageKeys: [
      "dashboard.teams.sales.stages.leadGeneration",
      "dashboard.teams.sales.stages.salesPipeline",
      "dashboard.teams.sales.stages.dealClosing",
    ],
  },
  {
    id: "management",
    nameKey: "dashboard.teams.management.name",
    agentCount: 6,
    color: "emerald",
    stageKeys: [
      "dashboard.teams.management.stages.strategyPlanning",
      "dashboard.teams.management.stages.financeBudgets",
      "dashboard.teams.management.stages.operations",
    ],
  },
  {
    id: "design",
    nameKey: "dashboard.teams.design.name",
    agentCount: 10,
    color: "pink",
    stageKeys: [
      "dashboard.teams.design.stages.userResearch",
      "dashboard.teams.design.stages.uiDesign",
      "dashboard.teams.design.stages.motionInteraction",
      "dashboard.teams.design.stages.designQA",
    ],
  },
];

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  agentNameKey: string;
  stage: PipelineStage;
  actionKey: string;
  type: "success" | "info" | "warning";
}

export interface AgentLLMConfig {
  provider: "OpenAI" | "Anthropic";
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  systemPromptKey: string;
}

export interface AgentCostBreakdown {
  server: number;   // monthly USD
  database: number;  // monthly USD
  llm: number;       // monthly USD
  total: number;     // monthly USD
}

export interface IntegrationTool {
  name: string;
  connected: boolean;
  latency: number;
}

export interface IntegrationCategory {
  key: string;
  labelKey: string;
  tools: IntegrationTool[];
}

export interface CapabilityMetric {
  labelKey: string;
  value: number;
  suffix: string;
  trend: number;
}

export interface CapabilityData {
  key: string;
  labelKey: string;
  metrics: CapabilityMetric[];
}

// ── Helpers ────────────────────────────────────────────────────────────────

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getTimeSeed(): number {
  // Changes every 30 seconds for subtle "live" shifts
  return Math.floor(Date.now() / 30000);
}

function generateSparkline(rand: () => number, base: number, variance: number): number[] {
  const points: number[] = [];
  let current = base;
  for (let i = 0; i < 24; i++) {
    current += (rand() - 0.45) * variance;
    current = Math.max(base * 0.3, Math.min(base * 1.7, current));
    points.push(Math.round(current));
  }
  return points;
}

function formatTimeAgo(minutesAgo: number): string {
  if (minutesAgo < 1) return "dashboard.agents.timeAgo.justNow";
  if (minutesAgo < 60) return "dashboard.agents.timeAgo.minutesAgo";
  return "dashboard.agents.timeAgo.hoursAgo";
}

// ── Per-agent integration mapping ─────────────────────────────────────────

const agentIntegrationMap: Record<string, string[]> = {
  "product-manager": ["Linear", "Slack", "Notion", "Figma", "GitHub"],
  "market-research": ["Notion", "Google Analytics", "Slack"],
  "product-strategy": ["Linear", "Notion", "Slack"],
  "competitive-analysis": ["Notion", "Slack", "GitHub"],
  "ux-research": ["Figma", "Notion", "Slack"],
  "ui-design": ["Figma", "Storybook", "GitHub"],
  "design-qa": ["Figma", "GitHub", "Slack"],
  "frontend-dev": ["GitHub", "VS Code", "Linear", "Vercel"],
  "backend-dev": ["GitHub", "VS Code", "Linear", "AWS"],
  "code-review": ["GitHub", "Linear", "Slack"],
  "test-automation": ["GitHub", "Vercel", "Slack"],
  "performance": ["Datadog", "AWS", "Slack"],
  "security-audit": ["GitHub", "AWS", "Slack"],
  "infrastructure": ["AWS", "Terraform", "Datadog"],
  "devops-pipeline": ["GitHub", "Docker", "Vercel"],
  "monitoring": ["Datadog", "Slack", "AWS"],
  "prompt-engineering": ["OpenAI", "Anthropic", "Notion"],
  "api-integration": ["GitHub", "Supabase", "Postman"],
  "database": ["Supabase", "PostgreSQL", "Datadog"],
  "growth-marketing": ["HubSpot", "Mailchimp", "Google Ads"],
  "seo-content": ["Google Analytics", "Semrush", "Notion"],
  "analytics-conversion": ["Mixpanel", "Hotjar", "Google Analytics"],
};

const agentModelMap: Record<string, string> = {
  "product-manager": "claude-opus",
  "market-research": "claude-sonnet",
  "product-strategy": "gpt-4o",
  "competitive-analysis": "claude-sonnet",
  "ux-research": "gpt-4o",
  "ui-design": "claude-sonnet",
  "design-qa": "gpt-4o",
  "frontend-dev": "claude-sonnet",
  "backend-dev": "claude-sonnet",
  "code-review": "gpt-4o",
  "test-automation": "claude-sonnet",
  "performance": "gpt-4o",
  "security-audit": "claude-sonnet",
  "infrastructure": "gpt-4o",
  "devops-pipeline": "claude-sonnet",
  "monitoring": "gpt-4o",
  "prompt-engineering": "gpt-4o",
  "api-integration": "claude-sonnet",
  "database": "gpt-4o",
  "growth-marketing": "gpt-4o",
  "seo-content": "claude-sonnet",
  "analytics-conversion": "gpt-4o",
};

const agentLLMParamsMap: Record<string, { temperature: number; maxTokens: number; topP: number }> = {
  "product-manager": { temperature: 0.3, maxTokens: 16384, topP: 0.9 },
  "market-research": { temperature: 0.4, maxTokens: 4096, topP: 0.95 },
  "product-strategy": { temperature: 0.6, maxTokens: 8192, topP: 0.90 },
  "competitive-analysis": { temperature: 0.3, maxTokens: 4096, topP: 0.90 },
  "ux-research": { temperature: 0.5, maxTokens: 4096, topP: 0.95 },
  "ui-design": { temperature: 0.7, maxTokens: 4096, topP: 0.95 },
  "design-qa": { temperature: 0.2, maxTokens: 2048, topP: 0.85 },
  "frontend-dev": { temperature: 0.3, maxTokens: 8192, topP: 0.90 },
  "backend-dev": { temperature: 0.3, maxTokens: 8192, topP: 0.90 },
  "code-review": { temperature: 0.2, maxTokens: 4096, topP: 0.85 },
  "test-automation": { temperature: 0.2, maxTokens: 4096, topP: 0.85 },
  "performance": { temperature: 0.3, maxTokens: 4096, topP: 0.90 },
  "security-audit": { temperature: 0.1, maxTokens: 4096, topP: 0.80 },
  "infrastructure": { temperature: 0.3, maxTokens: 4096, topP: 0.90 },
  "devops-pipeline": { temperature: 0.2, maxTokens: 4096, topP: 0.85 },
  "monitoring": { temperature: 0.2, maxTokens: 2048, topP: 0.85 },
  "prompt-engineering": { temperature: 0.8, maxTokens: 8192, topP: 0.95 },
  "api-integration": { temperature: 0.3, maxTokens: 4096, topP: 0.90 },
  "database": { temperature: 0.2, maxTokens: 4096, topP: 0.85 },
  "growth-marketing": { temperature: 0.7, maxTokens: 8192, topP: 0.95 },
  "seo-content": { temperature: 0.6, maxTokens: 8192, topP: 0.95 },
  "analytics-conversion": { temperature: 0.3, maxTokens: 4096, topP: 0.90 },
};

const agentBaseCostMap: Record<string, { server: number; database: number; llm: number }> = {
  "product-manager": { server: 95, database: 45, llm: 280 },
  "market-research": { server: 45, database: 20, llm: 120 },
  "product-strategy": { server: 35, database: 15, llm: 180 },
  "competitive-analysis": { server: 40, database: 25, llm: 95 },
  "ux-research": { server: 30, database: 20, llm: 150 },
  "ui-design": { server: 50, database: 10, llm: 110 },
  "design-qa": { server: 35, database: 10, llm: 85 },
  "frontend-dev": { server: 60, database: 15, llm: 200 },
  "backend-dev": { server: 80, database: 45, llm: 190 },
  "code-review": { server: 40, database: 10, llm: 160 },
  "test-automation": { server: 70, database: 20, llm: 130 },
  "performance": { server: 90, database: 30, llm: 110 },
  "security-audit": { server: 55, database: 15, llm: 140 },
  "infrastructure": { server: 120, database: 25, llm: 95 },
  "devops-pipeline": { server: 85, database: 15, llm: 75 },
  "monitoring": { server: 100, database: 35, llm: 60 },
  "prompt-engineering": { server: 35, database: 10, llm: 250 },
  "api-integration": { server: 65, database: 30, llm: 120 },
  "database": { server: 50, database: 80, llm: 90 },
  "growth-marketing": { server: 40, database: 20, llm: 175 },
  "seo-content": { server: 35, database: 25, llm: 160 },
  "analytics-conversion": { server: 55, database: 40, llm: 135 },
};

function generateAgentCost(agentId: string, rand: () => number): AgentCostBreakdown {
  const base = agentBaseCostMap[agentId] || { server: 50, database: 20, llm: 100 };
  // Add small variance so costs feel "live"
  const server = +(base.server + (rand() - 0.5) * base.server * 0.1).toFixed(2);
  const database = +(base.database + (rand() - 0.5) * base.database * 0.1).toFixed(2);
  const llm = +(base.llm + (rand() - 0.5) * base.llm * 0.1).toFixed(2);
  return { server, database, llm, total: +(server + database + llm).toFixed(2) };
}

const agentSkillsMap: Record<string, string[]> = {
  "product-manager": ["dashboard.agents.skills.taskDelegation", "dashboard.agents.skills.crossStageCoordination", "dashboard.agents.skills.stakeholderManagement", "dashboard.agents.skills.progressTracking"],
  "market-research": ["dashboard.agents.skills.marketAnalysis", "dashboard.agents.skills.trendDetection", "dashboard.agents.skills.dataMining"],
  "product-strategy": ["dashboard.agents.skills.roadmapping", "dashboard.agents.skills.featureScoring", "dashboard.agents.skills.okrAlignment"],
  "competitive-analysis": ["dashboard.agents.skills.competitorTracking", "dashboard.agents.skills.swotAnalysis", "dashboard.agents.skills.pricingIntel"],
  "ux-research": ["dashboard.agents.skills.userInterviews", "dashboard.agents.skills.heatmapAnalysis", "dashboard.agents.skills.personaBuilding"],
  "ui-design": ["dashboard.agents.skills.designSystems", "dashboard.agents.skills.componentLibraries", "dashboard.agents.skills.wcagCompliance"],
  "design-qa": ["dashboard.agents.skills.visualRegression", "dashboard.agents.skills.responsiveTesting", "dashboard.agents.skills.specMatching"],
  "frontend-dev": ["dashboard.agents.skills.reactNextjs", "dashboard.agents.skills.performance", "dashboard.agents.skills.accessibility"],
  "backend-dev": ["dashboard.agents.skills.apiDesign", "dashboard.agents.skills.databaseArch", "dashboard.agents.skills.microservices"],
  "code-review": ["dashboard.agents.skills.staticAnalysis", "dashboard.agents.skills.securityScanning", "dashboard.agents.skills.styleEnforcement"],
  "test-automation": ["dashboard.agents.skills.e2eTesting", "dashboard.agents.skills.unitTests", "dashboard.agents.skills.coverageAnalysis"],
  "performance": ["dashboard.agents.skills.loadTesting", "dashboard.agents.skills.profiling", "dashboard.agents.skills.optimization"],
  "security-audit": ["dashboard.agents.skills.penTesting", "dashboard.agents.skills.dependencyAudit", "dashboard.agents.skills.owaspTop10"],
  "infrastructure": ["dashboard.agents.skills.terraform", "dashboard.agents.skills.costOptimization", "dashboard.agents.skills.multiCloud"],
  "devops-pipeline": ["dashboard.agents.skills.cicdPipelines", "dashboard.agents.skills.docker", "dashboard.agents.skills.qualityGates"],
  "monitoring": ["dashboard.agents.skills.apmSetup", "dashboard.agents.skills.alertConfig", "dashboard.agents.skills.incidentResponse"],
  "prompt-engineering": ["dashboard.agents.skills.promptDesign", "dashboard.agents.skills.fewShotPatterns", "dashboard.agents.skills.chainOfThought"],
  "api-integration": ["dashboard.agents.skills.apiOrchestration", "dashboard.agents.skills.webhooks", "dashboard.agents.skills.oauthAuth"],
  "database": ["dashboard.agents.skills.postgresql", "dashboard.agents.skills.mongodb", "dashboard.agents.skills.supabase"],
  "growth-marketing": ["dashboard.agents.skills.campaignOptimization", "dashboard.agents.skills.funnelAnalysis", "dashboard.agents.skills.leadNurturing"],
  "seo-content": ["dashboard.agents.skills.keywordResearch", "dashboard.agents.skills.seoAudits", "dashboard.agents.skills.contentPlanning"],
  "analytics-conversion": ["dashboard.agents.skills.abTesting", "dashboard.agents.skills.behaviorAnalytics", "dashboard.agents.skills.cro"],
};

const linearTaskTitles: string[] = [
  "dashboard.linear.tasks.updateApiEndpoints",
  "dashboard.linear.tasks.refactorAuthModule",
  "dashboard.linear.tasks.addUnitTests",
  "dashboard.linear.tasks.optimizeDbQueries",
  "dashboard.linear.tasks.implementCaching",
  "dashboard.linear.tasks.reviewPrFeedback",
  "dashboard.linear.tasks.updateDesignTokens",
  "dashboard.linear.tasks.configureMonitoring",
  "dashboard.linear.tasks.securityPatchDeps",
  "dashboard.linear.tasks.writeDocumentation",
  "dashboard.linear.tasks.setupCiPipeline",
  "dashboard.linear.tasks.performLoadTest",
];

function generateAgentIntegrations(agentId: string, rand: () => number): AgentIntegration[] {
  const tools = agentIntegrationMap[agentId] || [];
  const statuses: AgentIntegration["status"][] = ["connected", "connected", "connected", "syncing"];
  const syncTimes = ["1m ago", "2m ago", "5m ago", "12m ago", "30m ago", "1h ago"];

  return tools.map((name) => ({
    name,
    status: statuses[Math.floor(rand() * statuses.length)],
    lastSync: syncTimes[Math.floor(rand() * syncTimes.length)],
    eventsToday: Math.floor(20 + rand() * 280),
  }));
}

function generateAgentInfra(agentId: string, rand: () => number): AgentInfraInfo {
  const regions = ["us-east-1", "us-west-2", "eu-west-1"];
  const infraStatuses: AgentInfraInfo["status"][] = ["running", "running", "running", "idle", "scaling"];
  const days = Math.floor(5 + rand() * 25);
  const hours = Math.floor(rand() * 24);

  return {
    instanceId: `ocl-${agentId.replace(/-/g, "-")}-01`,
    region: regions[Math.floor(rand() * regions.length)],
    status: infraStatuses[Math.floor(rand() * infraStatuses.length)],
    cpu: Math.floor(15 + rand() * 55),
    memory: Math.floor(25 + rand() * 45),
    uptime: `${days}d ${hours}h`,
    model: agentModelMap[agentId] || "gpt-4o",
  };
}

function generateLinearTasks(agentNameKey: string, rand: () => number): LinearTask[] {
  const count = 2 + Math.floor(rand() * 3);
  const statuses: LinearTask["status"][] = ["in_progress", "done", "todo", "blocked", "done", "in_progress"];
  const priorities: LinearTask["priority"][] = ["urgent", "high", "medium", "low", "medium", "high"];
  const tasks: LinearTask[] = [];

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: `LM-${200 + Math.floor(rand() * 300)}`,
      title: linearTaskTitles[Math.floor(rand() * linearTaskTitles.length)],
      status: statuses[Math.floor(rand() * statuses.length)],
      priority: priorities[Math.floor(rand() * priorities.length)],
      assigneeKey: agentNameKey,
    });
  }

  return tasks;
}

function generateAgentLLMConfig(agentId: string): AgentLLMConfig {
  const model = agentModelMap[agentId] || "gpt-4o";
  const provider: "OpenAI" | "Anthropic" = model.startsWith("claude") ? "Anthropic" : "OpenAI";
  const params = agentLLMParamsMap[agentId] || { temperature: 0.5, maxTokens: 4096, topP: 0.90 };

  return {
    provider,
    model,
    temperature: params.temperature,
    maxTokens: params.maxTokens,
    topP: params.topP,
    systemPromptKey: `dashboard.agentDetail.llm.prompts.${agentId}`,
  };
}

// ── Agent definitions ──────────────────────────────────────────────────────

interface AgentDef {
  id: string;
  nameKey: string;
  roleKey: string;
  stage: PipelineStage;
  baseTasks: number;
  baseSuccess: number;
  baseResponse: number;
}

const agentDefinitions: AgentDef[] = [
  // Product Manager
  { id: "product-manager", nameKey: "dashboard.agents.names.productManager", roleKey: "dashboard.agents.roles.productManager", stage: "orchestration", baseTasks: 72, baseSuccess: 99.6, baseResponse: 0.8 },
  // Product Discovery
  { id: "market-research", nameKey: "dashboard.agents.names.marketResearch", roleKey: "dashboard.agents.roles.marketAnalyst", stage: "productDiscovery", baseTasks: 34, baseSuccess: 98.5, baseResponse: 1.1 },
  { id: "product-strategy", nameKey: "dashboard.agents.names.productStrategy", roleKey: "dashboard.agents.roles.strategyArchitect", stage: "productDiscovery", baseTasks: 28, baseSuccess: 99.2, baseResponse: 0.9 },
  { id: "competitive-analysis", nameKey: "dashboard.agents.names.competitiveAnalysis", roleKey: "dashboard.agents.roles.intelSpecialist", stage: "productDiscovery", baseTasks: 41, baseSuccess: 97.8, baseResponse: 1.4 },
  // Product & UX/UI
  { id: "ux-research", nameKey: "dashboard.agents.names.uxResearch", roleKey: "dashboard.agents.roles.userResearcher", stage: "productDesign", baseTasks: 22, baseSuccess: 99.0, baseResponse: 1.3 },
  { id: "ui-design", nameKey: "dashboard.agents.names.uiDesign", roleKey: "dashboard.agents.roles.visualDesigner", stage: "productDesign", baseTasks: 19, baseSuccess: 98.8, baseResponse: 1.6 },
  { id: "design-qa", nameKey: "dashboard.agents.names.designQA", roleKey: "dashboard.agents.roles.qualityInspector", stage: "productDesign", baseTasks: 37, baseSuccess: 99.5, baseResponse: 0.8 },
  // Software Dev
  { id: "frontend-dev", nameKey: "dashboard.agents.names.frontendDev", roleKey: "dashboard.agents.roles.frontendEngineer", stage: "softwareDev", baseTasks: 45, baseSuccess: 99.1, baseResponse: 1.2 },
  { id: "backend-dev", nameKey: "dashboard.agents.names.backendDev", roleKey: "dashboard.agents.roles.backendEngineer", stage: "softwareDev", baseTasks: 52, baseSuccess: 98.7, baseResponse: 1.5 },
  { id: "code-review", nameKey: "dashboard.agents.names.codeReview", roleKey: "dashboard.agents.roles.codeReviewer", stage: "softwareDev", baseTasks: 63, baseSuccess: 99.8, baseResponse: 0.7 },
  // Quality Assurance
  { id: "test-automation", nameKey: "dashboard.agents.names.testAutomation", roleKey: "dashboard.agents.roles.qaAutomator", stage: "qualityAssurance", baseTasks: 89, baseSuccess: 99.4, baseResponse: 0.6 },
  { id: "performance", nameKey: "dashboard.agents.names.performance", roleKey: "dashboard.agents.roles.performanceTester", stage: "qualityAssurance", baseTasks: 31, baseSuccess: 98.9, baseResponse: 2.1 },
  { id: "security-audit", nameKey: "dashboard.agents.names.securityAudit", roleKey: "dashboard.agents.roles.securityAnalyst", stage: "qualityAssurance", baseTasks: 26, baseSuccess: 99.7, baseResponse: 1.8 },
  // Cloud & Infra
  { id: "infrastructure", nameKey: "dashboard.agents.names.infrastructure", roleKey: "dashboard.agents.roles.cloudArchitect", stage: "cloudInfra", baseTasks: 18, baseSuccess: 99.9, baseResponse: 0.5 },
  { id: "devops-pipeline", nameKey: "dashboard.agents.names.devopsPipeline", roleKey: "dashboard.agents.roles.cicdEngineer", stage: "cloudInfra", baseTasks: 42, baseSuccess: 99.3, baseResponse: 0.9 },
  { id: "monitoring", nameKey: "dashboard.agents.names.monitoring", roleKey: "dashboard.agents.roles.observabilityLead", stage: "cloudInfra", baseTasks: 156, baseSuccess: 99.6, baseResponse: 0.3 },
  // AI Integration
  { id: "prompt-engineering", nameKey: "dashboard.agents.names.promptEngineering", roleKey: "dashboard.agents.roles.promptArchitect", stage: "aiIntegration", baseTasks: 38, baseSuccess: 98.3, baseResponse: 1.7 },
  { id: "api-integration", nameKey: "dashboard.agents.names.apiIntegration", roleKey: "dashboard.agents.roles.integrationEngineer", stage: "aiIntegration", baseTasks: 47, baseSuccess: 99.0, baseResponse: 1.1 },
  { id: "database", nameKey: "dashboard.agents.names.database", roleKey: "dashboard.agents.roles.dataArchitect", stage: "aiIntegration", baseTasks: 33, baseSuccess: 99.5, baseResponse: 0.4 },
  // Product Growth
  { id: "growth-marketing", nameKey: "dashboard.agents.names.growthMarketing", roleKey: "dashboard.agents.roles.growthStrategist", stage: "productGrowth", baseTasks: 36, baseSuccess: 97.6, baseResponse: 1.3 },
  { id: "seo-content", nameKey: "dashboard.agents.names.seoContent", roleKey: "dashboard.agents.roles.contentStrategist", stage: "productGrowth", baseTasks: 44, baseSuccess: 98.4, baseResponse: 1.5 },
  { id: "analytics-conversion", nameKey: "dashboard.agents.names.analyticsConversion", roleKey: "dashboard.agents.roles.conversionAnalyst", stage: "productGrowth", baseTasks: 51, baseSuccess: 99.1, baseResponse: 0.9 },
];

const lastActionKeys = [
  "dashboard.activity.actions.analyzedMarketTrends",
  "dashboard.activity.actions.updatedRoadmap",
  "dashboard.activity.actions.completedCodeReview",
  "dashboard.activity.actions.deployedToStaging",
  "dashboard.activity.actions.ranSecurityScan",
  "dashboard.activity.actions.optimizedQueries",
  "dashboard.activity.actions.generatedTestSuite",
  "dashboard.activity.actions.updatedDesignSystem",
  "dashboard.activity.actions.processedApiRequests",
  "dashboard.activity.actions.monitoredPerformance",
  "dashboard.activity.actions.configuredPipeline",
  "dashboard.activity.actions.refinedPrompts",
];

// ── Generators ─────────────────────────────────────────────────────────────

export function generateAgents(): AgentData[] {
  const seed = getTimeSeed();
  const rand = seededRandom(seed);

  // Status distribution: 18 active, 2 working, 1 idle, 1 error
  const statusPool: AgentStatus[] = [
    ...Array(18).fill("active" as AgentStatus),
    "working", "working", "idle", "error",
  ];
  // Shuffle
  for (let i = statusPool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [statusPool[i], statusPool[j]] = [statusPool[j], statusPool[i]];
  }

  return agentDefinitions.map((def, i) => {
    const taskVariance = Math.floor(rand() * 8) - 3;
    const minutesAgo = Math.floor(rand() * 90);

    return {
      id: def.id,
      nameKey: def.nameKey,
      roleKey: def.roleKey,
      stage: def.stage,
      status: statusPool[i],
      metrics: {
        tasksCompleted: def.baseTasks + taskVariance,
        successRate: Math.min(100, +(def.baseSuccess + (rand() - 0.5) * 1.2).toFixed(1)),
        avgResponseTime: +(def.baseResponse + (rand() - 0.5) * 0.4).toFixed(1),
      },
      activity: generateSparkline(rand, def.baseTasks, def.baseTasks * 0.3),
      lastAction: {
        descriptionKey: lastActionKeys[Math.floor(rand() * lastActionKeys.length)],
        timestamp: formatTimeAgo(minutesAgo),
      },
      integrations: generateAgentIntegrations(def.id, rand),
      infra: generateAgentInfra(def.id, rand),
      llmConfig: generateAgentLLMConfig(def.id),
      skills: agentSkillsMap[def.id] || [],
      cost: generateAgentCost(def.id, rand),
      linearTasks: generateLinearTasks(def.nameKey, rand),
    };
  });
}

export function generateGlobalStats(agents: AgentData[]): GlobalStats {
  const activeCount = agents.filter((a) => a.status === "active" || a.status === "working").length;
  const totalTasks = agents.reduce((sum, a) => sum + a.metrics.tasksCompleted, 0);
  const avgSuccess = agents.reduce((sum, a) => sum + a.metrics.successRate, 0) / agents.length;
  const avgResponse = agents.reduce((sum, a) => sum + a.metrics.avgResponseTime, 0) / agents.length;

  return {
    totalAgents: agents.length,
    activeAgents: activeCount,
    tasksToday: totalTasks,
    successRate: +avgSuccess.toFixed(1),
    avgResponseTime: +avgResponse.toFixed(1),
    activeProjects: 7,
  };
}

export function generatePipeline(agents: AgentData[]): PipelineStageData[] {
  const stages: { key: PipelineStage; number: string; titleKey: string }[] = [
    { key: "productDiscovery", number: "01", titleKey: "dashboard.pipeline.stages.productDiscovery" },
    { key: "productDesign", number: "02", titleKey: "dashboard.pipeline.stages.productDesign" },
    { key: "softwareDev", number: "03", titleKey: "dashboard.pipeline.stages.softwareDev" },
    { key: "qualityAssurance", number: "04", titleKey: "dashboard.pipeline.stages.qualityAssurance" },
    { key: "cloudInfra", number: "05", titleKey: "dashboard.pipeline.stages.cloudInfra" },
    { key: "aiIntegration", number: "06", titleKey: "dashboard.pipeline.stages.aiIntegration" },
    { key: "productGrowth", number: "07", titleKey: "dashboard.pipeline.stages.productGrowth" },
  ];

  return stages.map((stage) => ({
    ...stage,
    agents: agents.filter((a) => a.stage === stage.key),
  }));
}

export function generateActivityLog(): ActivityLogEntry[] {
  const seed = getTimeSeed();
  const rand = seededRandom(seed + 999);
  const entries: ActivityLogEntry[] = [];

  const actionKeys = [
    "dashboard.activity.actions.analyzedMarketTrends",
    "dashboard.activity.actions.updatedRoadmap",
    "dashboard.activity.actions.completedCodeReview",
    "dashboard.activity.actions.deployedToStaging",
    "dashboard.activity.actions.ranSecurityScan",
    "dashboard.activity.actions.optimizedQueries",
    "dashboard.activity.actions.generatedTestSuite",
    "dashboard.activity.actions.updatedDesignSystem",
    "dashboard.activity.actions.processedApiRequests",
    "dashboard.activity.actions.monitoredPerformance",
    "dashboard.activity.actions.configuredPipeline",
    "dashboard.activity.actions.refinedPrompts",
  ];

  const types: ("success" | "info" | "warning")[] = ["success", "success", "success", "info", "info", "warning"];

  for (let i = 0; i < 15; i++) {
    const agentIdx = Math.floor(rand() * agentDefinitions.length);
    const agent = agentDefinitions[agentIdx];
    const minutesAgo = i * 4 + Math.floor(rand() * 3);
    const now = new Date();
    now.setMinutes(now.getMinutes() - minutesAgo);

    entries.push({
      id: `log-${i}`,
      timestamp: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
      agentNameKey: agent.nameKey,
      stage: agent.stage,
      actionKey: actionKeys[Math.floor(rand() * actionKeys.length)],
      type: types[Math.floor(rand() * types.length)],
    });
  }

  return entries;
}

export function generateNewActivityEntry(index: number): ActivityLogEntry {
  const rand = seededRandom(Date.now() + index);
  const agentIdx = Math.floor(rand() * agentDefinitions.length);
  const agent = agentDefinitions[agentIdx];

  const actionKeys = [
    "dashboard.activity.actions.analyzedMarketTrends",
    "dashboard.activity.actions.updatedRoadmap",
    "dashboard.activity.actions.completedCodeReview",
    "dashboard.activity.actions.deployedToStaging",
    "dashboard.activity.actions.ranSecurityScan",
    "dashboard.activity.actions.optimizedQueries",
    "dashboard.activity.actions.generatedTestSuite",
    "dashboard.activity.actions.updatedDesignSystem",
    "dashboard.activity.actions.processedApiRequests",
    "dashboard.activity.actions.monitoredPerformance",
    "dashboard.activity.actions.configuredPipeline",
    "dashboard.activity.actions.refinedPrompts",
  ];

  const types: ("success" | "info" | "warning")[] = ["success", "success", "info", "warning"];
  const now = new Date();

  return {
    id: `log-live-${Date.now()}-${index}`,
    timestamp: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
    agentNameKey: agent.nameKey,
    stage: agent.stage,
    actionKey: actionKeys[Math.floor(rand() * actionKeys.length)],
    type: types[Math.floor(rand() * types.length)],
  };
}

export function generateIntegrationCategories(): IntegrationCategory[] {
  const seed = getTimeSeed();
  const rand = seededRandom(seed + 777);

  return [
    {
      key: "communication",
      labelKey: "dashboard.orchestration.categories.communication",
      tools: [
        { name: "Slack", connected: true, latency: Math.floor(12 + rand() * 8) },
        { name: "Teams", connected: true, latency: Math.floor(18 + rand() * 12) },
        { name: "Discord", connected: true, latency: Math.floor(8 + rand() * 6) },
      ],
    },
    {
      key: "development",
      labelKey: "dashboard.orchestration.categories.development",
      tools: [
        { name: "GitHub", connected: true, latency: Math.floor(15 + rand() * 10) },
        { name: "GitLab", connected: true, latency: Math.floor(20 + rand() * 15) },
        { name: "VS Code", connected: true, latency: Math.floor(5 + rand() * 5) },
      ],
    },
    {
      key: "projectManagement",
      labelKey: "dashboard.orchestration.categories.projectMgmt",
      tools: [
        { name: "Jira", connected: true, latency: Math.floor(22 + rand() * 12) },
        { name: "Linear", connected: true, latency: Math.floor(10 + rand() * 5) },
        { name: "Notion", connected: true, latency: Math.floor(14 + rand() * 8) },
      ],
    },
    {
      key: "design",
      labelKey: "dashboard.orchestration.categories.design",
      tools: [
        { name: "Figma", connected: true, latency: Math.floor(11 + rand() * 7) },
        { name: "Framer", connected: rand() > 0.1, latency: Math.floor(16 + rand() * 10) },
      ],
    },
    {
      key: "cicd",
      labelKey: "dashboard.orchestration.categories.cicd",
      tools: [
        { name: "Vercel", connected: true, latency: Math.floor(8 + rand() * 4) },
        { name: "AWS", connected: true, latency: Math.floor(25 + rand() * 15) },
        { name: "Docker", connected: true, latency: Math.floor(6 + rand() * 4) },
      ],
    },
    {
      key: "data",
      labelKey: "dashboard.orchestration.categories.data",
      tools: [
        { name: "Supabase", connected: true, latency: Math.floor(9 + rand() * 5) },
        { name: "PostgreSQL", connected: true, latency: Math.floor(4 + rand() * 3) },
        { name: "MongoDB", connected: true, latency: Math.floor(7 + rand() * 5) },
      ],
    },
  ];
}

export function generateCapabilities(): CapabilityData[] {
  const seed = getTimeSeed();
  const rand = seededRandom(seed + 555);

  return [
    {
      key: "deployments",
      labelKey: "dashboard.ecosystem.capabilities.deployments",
      metrics: [
        { labelKey: "dashboard.ecosystem.metrics.todaysDeploys", value: Math.floor(6 + rand() * 4), suffix: "", trend: +(2.1 + rand() * 3).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.successRate", value: +(99 + rand() * 1).toFixed(1), suffix: "%", trend: +(0.3 + rand() * 0.5).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.avgBuildTime", value: Math.floor(32 + rand() * 15), suffix: "s", trend: +(-2.5 - rand() * 3).toFixed(1) },
      ],
    },
    {
      key: "analytics",
      labelKey: "dashboard.ecosystem.capabilities.analytics",
      metrics: [
        { labelKey: "dashboard.ecosystem.metrics.conversionRate", value: +(4.1 + rand() * 0.8).toFixed(1), suffix: "%", trend: +(0.5 + rand() * 0.8).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.bounceRate", value: Math.floor(28 + rand() * 6), suffix: "%", trend: +(-1.2 - rand() * 1.5).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.avgSession", value: +(3.1 + rand() * 0.8).toFixed(1), suffix: "m", trend: +(0.3 + rand() * 0.4).toFixed(1) },
      ],
    },
    {
      key: "sprint",
      labelKey: "dashboard.ecosystem.capabilities.sprint",
      metrics: [
        { labelKey: "dashboard.ecosystem.metrics.velocity", value: Math.floor(31 + rand() * 8), suffix: "pts", trend: +(1.5 + rand() * 2).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.completion", value: Math.floor(72 + rand() * 15), suffix: "%", trend: +(3.2 + rand() * 4).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.blockers", value: Math.floor(1 + rand() * 3), suffix: "", trend: +(-1 - rand() * 2).toFixed(1) },
      ],
    },
    {
      key: "monitoring",
      labelKey: "dashboard.ecosystem.capabilities.monitoring",
      metrics: [
        { labelKey: "dashboard.ecosystem.metrics.uptime", value: +(99.95 + rand() * 0.04).toFixed(2), suffix: "%", trend: +(0.01 + rand() * 0.02).toFixed(2) },
        { labelKey: "dashboard.ecosystem.metrics.cpuUsage", value: Math.floor(22 + rand() * 18), suffix: "%", trend: +(-2 + rand() * 4 - 2).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.alerts", value: Math.floor(rand() * 3), suffix: "", trend: +(-1 - rand()).toFixed(1) },
      ],
    },
    {
      key: "codeReview",
      labelKey: "dashboard.ecosystem.capabilities.codeReview",
      metrics: [
        { labelKey: "dashboard.ecosystem.metrics.openPRs", value: Math.floor(3 + rand() * 5), suffix: "", trend: +(rand() * 2 - 1).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.codeCoverage", value: Math.floor(82 + rand() * 8), suffix: "%", trend: +(0.8 + rand() * 1.5).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.avgReviewTime", value: +(1.5 + rand() * 2).toFixed(1), suffix: "h", trend: +(-0.3 - rand() * 0.5).toFixed(1) },
      ],
    },
    {
      key: "tasks",
      labelKey: "dashboard.ecosystem.capabilities.tasks",
      metrics: [
        { labelKey: "dashboard.ecosystem.metrics.inProgress", value: Math.floor(10 + rand() * 8), suffix: "", trend: +(1 + rand() * 3).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.completedToday", value: Math.floor(18 + rand() * 10), suffix: "", trend: +(4.5 + rand() * 3).toFixed(1) },
        { labelKey: "dashboard.ecosystem.metrics.blocked", value: Math.floor(1 + rand() * 4), suffix: "", trend: +(-1 - rand() * 2).toFixed(1) },
      ],
    },
  ];
}
