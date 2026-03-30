# River Health Report Card

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Multi-parameter river health dataset (dissolved oxygen, pH, turbidity, temperature, nitrates, E.coli, flow rate, macroinvertebrates)
- Weighted scoring formula: each parameter has a defined weight; raw scores normalized to 0-100, then weighted sum produces overall score
- Grade/threshold classification: A (90-100), B (75-89), C (60-74), D (45-59), F (<45)
- Interactive SVG river map with monitoring station markers positioned along a stylized river
- Clicking a station opens a modal/popup with detailed parameter breakdown, scores, trend indicators
- Overall river health dashboard with grade badge, score gauge, and summary stats
- Parameter cards showing individual grades with color coding
- Historical trend sparklines per parameter

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: store river stations and their parameter readings; expose query methods for stations and readings
2. Frontend: SVG river map component with clickable station nodes; weighted scoring engine; grade classifier; modal detail view; dashboard summary
