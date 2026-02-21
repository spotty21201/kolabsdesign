import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const items = [
  {
    type: 'Tool',
    title: 'Site Yield Simulator',
    slug: 'site-yield-simulator',
    status: 'Proven',
    one_liner: 'Calculate maximum permissible yield and financial viability for urban infill plots.',
    hero_image: null,
    tags: ['land', 'capital', 'urban'],
    cta_type: 'Try',
    cta_url: '#',
    featured: true,
    published: true,
    published_at: '2024-05-12T10:00:00Z',
    proof_cue: '15% ROI uplift identified',
    decision_md: 'Should we acquire this plot at the asking price based on maximum allowable density?',
    inputs_md: 'Plot boundaries (GeoJSON), local zoning codes, current construction costs, target IRR.',
    output_md: 'Interactive 3D massing model, financial pro-forma, and risk matrix.',
    confidence_md: 'High for residential use cases. Commercial yields require manual adjustment for local vacancy rates.',
    impact_md: 'Reduced feasibility study time from 3 weeks to 4 hours. Identified 15% ROI uplift on average.',
    deleted_at: null,
  },
  {
    type: 'Case',
    title: 'Masterplan Optimization for SOE',
    slug: 'masterplan-optimization-soe',
    status: 'Proven',
    one_liner: 'Restructured a 500-hectare masterplan to align with new mobility corridors.',
    hero_image: null,
    tags: ['infra', 'mobility', 'governance'],
    cta_type: 'Read',
    cta_url: '#',
    featured: true,
    published: true,
    published_at: '2024-04-20T10:00:00Z',
    proof_cue: 'Saved $40M in infrastructure costs',
    decision_md: 'How to phase infrastructure deployment to minimize upfront capital while maximizing early land value?',
    inputs_md: 'Existing masterplan CAD, regional transit plans, phased capital budget constraints.',
    output_md: 'Revised phasing strategy, updated land use mix, and infrastructure deployment schedule.',
    confidence_md: 'Validated by third-party engineering review. Subject to municipal approval timelines.',
    impact_md: 'Saved $40M in upfront infrastructure costs and accelerated phase 1 revenue by 18 months.',
    deleted_at: null,
  },
  {
    type: 'Brief',
    title: 'The AI-Augmented Developer',
    slug: 'ai-augmented-developer',
    status: 'Method',
    one_liner: 'How generative models are compressing the design-to-development lifecycle.',
    hero_image: null,
    tags: ['capital', 'governance'],
    cta_type: 'Download',
    cta_url: '#',
    featured: false,
    published: true,
    published_at: '2024-06-01T10:00:00Z',
    proof_cue: '12-page executive memo',
    decision_md: 'Where should real estate developers invest in AI capabilities today to build a competitive moat?',
    inputs_md: 'Interviews with 20+ GCC developers, analysis of 50+ proptech startups, internal Kolabs experiments.',
    output_md: 'Strategic memo detailing a 3-horizon adoption framework for AI in real estate.',
    confidence_md: 'Horizon 1 and 2 are highly actionable. Horizon 3 remains speculative.',
    impact_md: 'Adopted by 3 master developers to guide their 2025 digital transformation budgets.',
    deleted_at: null,
  },
  {
    type: 'Research',
    title: 'Algorithmic Zoning Analysis',
    slug: 'algorithmic-zoning-analysis',
    status: 'Experiment',
    one_liner: 'Extracting implicit zoning rules from historical building permit data using LLMs.',
    hero_image: null,
    tags: ['land', 'governance'],
    cta_type: 'Read',
    cta_url: '#',
    featured: true,
    published: true,
    published_at: '2024-06-15T10:00:00Z',
    proof_cue: 'Published in Urban Tech Journal',
    decision_md: 'Can we predict zoning variance approvals based on historical precedent?',
    inputs_md: '10 years of municipal building permits, NLP extraction of variance justifications.',
    output_md: 'Predictive model scoring the likelihood of variance approval for new proposals.',
    confidence_md: 'Model achieves 78% accuracy on historical holdout set. Not yet tested in live applications.',
    impact_md: 'Demonstrates the potential to quantify regulatory risk in early-stage land acquisition.',
    deleted_at: null,
  },
  {
    type: 'Tool',
    title: 'Carbon Cost Estimator',
    slug: 'carbon-cost-estimator',
    status: 'Method',
    one_liner: 'Translate early-stage design decisions into embodied carbon and financial cost.',
    hero_image: null,
    tags: ['infra', 'capital'],
    cta_type: 'Request',
    cta_url: '#',
    featured: false,
    published: true,
    published_at: '2024-05-28T10:00:00Z',
    proof_cue: 'Integrates with Revit & Rhino',
    decision_md: 'Which structural system offers the best balance of cost and embodied carbon?',
    inputs_md: 'Basic massing, structural system selection, local material availability.',
    output_md: 'Comparative dashboard showing CapEx vs. Embodied Carbon trade-offs.',
    confidence_md: 'Estimates are +/- 20% accurate at concept stage. Requires detailed LCA for compliance.',
    impact_md: 'Enabled a client to reduce embodied carbon by 12% with zero cost premium on a commercial tower.',
    deleted_at: null,
  },
  {
    type: 'Case',
    title: 'Transit-Oriented Development Strategy',
    slug: 'tod-strategy',
    status: 'Proven',
    one_liner: 'Optimizing land value capture around a new light rail network.',
    hero_image: null,
    tags: ['land', 'mobility', 'capital'],
    cta_type: 'Read',
    cta_url: '#',
    featured: false,
    published: true,
    published_at: '2024-03-10T10:00:00Z',
    proof_cue: '22% increase in projected land value',
    decision_md: 'How to zone station-adjacent parcels to maximize long-term value capture?',
    inputs_md: 'Transit alignment, ridership projections, current land ownership, market absorption rates.',
    output_md: 'Zoning recommendations, value capture mechanisms, and implementation roadmap.',
    confidence_md: 'Highly dependent on timely delivery of the transit infrastructure.',
    impact_md: 'Projected a 22% increase in land value capture over the baseline scenario.',
    deleted_at: null,
  },
];

const { error } = await supabase
  .from('items')
  .upsert(items, { onConflict: 'slug' });

if (error) {
  console.error('Seed failed:', error.message);
  process.exit(1);
}

console.log(`Seeded ${items.length} template items into Supabase.`);
