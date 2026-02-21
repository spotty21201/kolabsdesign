export type AssetType = 'Tool' | 'Case' | 'Brief' | 'Research';
export type AssetStatus = 'Experiment' | 'Method' | 'Proven';
export type CtaType = 'Try' | 'Read' | 'Download' | 'Request';

export interface Asset {
  id: string;
  type: AssetType;
  title: string;
  slug: string;
  status: AssetStatus;
  oneLiner: string;
  heroImage: string;
  tags: string[];
  ctaType: CtaType;
  ctaUrl: string;
  featured: boolean;
  publishedAt: string;
  proofCue: string;
  
  // Detail blocks
  decision: string;
  inputs: string;
  output: string;
  confidence: string;
  impact: string;
}

export const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    type: 'Tool',
    title: 'Site Yield Simulator',
    slug: 'site-yield-simulator',
    status: 'Proven',
    oneLiner: 'Calculate maximum permissible yield and financial viability for urban infill plots.',
    heroImage: '',
    tags: ['land', 'capital', 'urban'],
    ctaType: 'Try',
    ctaUrl: '#',
    featured: true,
    publishedAt: '2024-05-12T10:00:00Z',
    proofCue: '15% ROI uplift identified',
    decision: 'Should we acquire this plot at the asking price based on maximum allowable density?',
    inputs: 'Plot boundaries (GeoJSON), local zoning codes, current construction costs, target IRR.',
    output: 'Interactive 3D massing model, financial pro-forma, and risk matrix.',
    confidence: 'High for residential use cases. Commercial yields require manual adjustment for local vacancy rates.',
    impact: 'Reduced feasibility study time from 3 weeks to 4 hours. Identified 15% ROI uplift on average.',
  },
  {
    id: '2',
    type: 'Case',
    title: 'Masterplan Optimization for SOE',
    slug: 'masterplan-optimization-soe',
    status: 'Proven',
    oneLiner: 'Restructured a 500-hectare masterplan to align with new mobility corridors.',
    heroImage: '',
    tags: ['infra', 'mobility', 'governance'],
    ctaType: 'Read',
    ctaUrl: '#',
    featured: true,
    publishedAt: '2024-04-20T10:00:00Z',
    proofCue: 'Saved $40M in infrastructure costs',
    decision: 'How to phase infrastructure deployment to minimize upfront capital while maximizing early land value?',
    inputs: 'Existing masterplan CAD, regional transit plans, phased capital budget constraints.',
    output: 'Revised phasing strategy, updated land use mix, and infrastructure deployment schedule.',
    confidence: 'Validated by third-party engineering review. Subject to municipal approval timelines.',
    impact: 'Saved $40M in upfront infrastructure costs and accelerated phase 1 revenue by 18 months.',
  },
  {
    id: '3',
    type: 'Brief',
    title: 'The AI-Augmented Developer',
    slug: 'ai-augmented-developer',
    status: 'Method',
    oneLiner: 'How generative models are compressing the design-to-development lifecycle.',
    heroImage: '',
    tags: ['capital', 'governance'],
    ctaType: 'Download',
    ctaUrl: '#',
    featured: false,
    publishedAt: '2024-06-01T10:00:00Z',
    proofCue: '12-page executive memo',
    decision: 'Where should real estate developers invest in AI capabilities today to build a competitive moat?',
    inputs: 'Interviews with 20+ GCC developers, analysis of 50+ proptech startups, internal Kolabs experiments.',
    output: 'Strategic memo detailing a 3-horizon adoption framework for AI in real estate.',
    confidence: 'Horizon 1 and 2 are highly actionable. Horizon 3 remains speculative.',
    impact: 'Adopted by 3 master developers to guide their 2025 digital transformation budgets.',
  },
  {
    id: '4',
    type: 'Research',
    title: 'Algorithmic Zoning Analysis',
    slug: 'algorithmic-zoning-analysis',
    status: 'Experiment',
    oneLiner: 'Extracting implicit zoning rules from historical building permit data using LLMs.',
    heroImage: '',
    tags: ['land', 'governance'],
    ctaType: 'Read',
    ctaUrl: '#',
    featured: true,
    publishedAt: '2024-06-15T10:00:00Z',
    proofCue: 'Published in Urban Tech Journal',
    decision: 'Can we predict zoning variance approvals based on historical precedent?',
    inputs: '10 years of municipal building permits, NLP extraction of variance justifications.',
    output: 'Predictive model scoring the likelihood of variance approval for new proposals.',
    confidence: 'Model achieves 78% accuracy on historical holdout set. Not yet tested in live applications.',
    impact: 'Demonstrates the potential to quantify regulatory risk in early-stage land acquisition.',
  },
  {
    id: '5',
    type: 'Tool',
    title: 'Carbon Cost Estimator',
    slug: 'carbon-cost-estimator',
    status: 'Method',
    oneLiner: 'Translate early-stage design decisions into embodied carbon and financial cost.',
    heroImage: '',
    tags: ['infra', 'capital'],
    ctaType: 'Request',
    ctaUrl: '#',
    featured: false,
    publishedAt: '2024-05-28T10:00:00Z',
    proofCue: 'Integrates with Revit & Rhino',
    decision: 'Which structural system offers the best balance of cost and embodied carbon?',
    inputs: 'Basic massing, structural system selection, local material availability.',
    output: 'Comparative dashboard showing CapEx vs. Embodied Carbon trade-offs.',
    confidence: 'Estimates are +/- 20% accurate at concept stage. Requires detailed LCA for compliance.',
    impact: 'Enabled a client to reduce embodied carbon by 12% with zero cost premium on a commercial tower.',
  },
  {
    id: '6',
    type: 'Case',
    title: 'Transit-Oriented Development Strategy',
    slug: 'tod-strategy',
    status: 'Proven',
    oneLiner: 'Optimizing land value capture around a new light rail network.',
    heroImage: '',
    tags: ['land', 'mobility', 'capital'],
    ctaType: 'Read',
    ctaUrl: '#',
    featured: false,
    publishedAt: '2024-03-10T10:00:00Z',
    proofCue: '22% increase in projected land value',
    decision: 'How to zone station-adjacent parcels to maximize long-term value capture?',
    inputs: 'Transit alignment, ridership projections, current land ownership, market absorption rates.',
    output: 'Zoning recommendations, value capture mechanisms, and implementation roadmap.',
    confidence: 'Highly dependent on timely delivery of the transit infrastructure.',
    impact: 'Projected a 22% increase in land value capture over the baseline scenario.',
  }
];
