-- Add new fields
ALTER TABLE public.items
ADD COLUMN problem_md TEXT,
ADD COLUMN solution_md TEXT,
ADD COLUMN how_md TEXT;

-- One-time migration script
UPDATE public.items
SET
  problem_md = COALESCE(decision_md, ''),
  solution_md = COALESCE(impact_md, ''),
  how_md = '**Inputs:**\n' || COALESCE(inputs_md, '') || '\n\n**Outputs:**\n' || COALESCE(output_md, '')
WHERE problem_md IS NULL AND solution_md IS NULL AND how_md IS NULL;
