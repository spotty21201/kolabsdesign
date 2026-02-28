-- Make the CMS content model authoritative on problem/solution/how.
UPDATE public.items
SET
  problem_md = COALESCE(NULLIF(problem_md, ''), decision_md, ''),
  solution_md = COALESCE(NULLIF(solution_md, ''), impact_md, ''),
  how_md = COALESCE(
    NULLIF(how_md, ''),
    CASE
      WHEN COALESCE(inputs_md, '') = '' AND COALESCE(output_md, '') = '' THEN ''
      ELSE '**Inputs:**\n'
        || COALESCE(inputs_md, '')
        || '\n\n**Outputs:**\n'
        || COALESCE(output_md, '')
    END,
    ''
  );

ALTER TABLE public.items
ALTER COLUMN problem_md SET DEFAULT '',
ALTER COLUMN solution_md SET DEFAULT '',
ALTER COLUMN how_md SET DEFAULT '';

UPDATE public.items
SET
  problem_md = COALESCE(problem_md, ''),
  solution_md = COALESCE(solution_md, ''),
  how_md = COALESCE(how_md, '');

ALTER TABLE public.items
ALTER COLUMN problem_md SET NOT NULL,
ALTER COLUMN solution_md SET NOT NULL,
ALTER COLUMN how_md SET NOT NULL;
