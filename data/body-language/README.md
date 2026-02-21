# Body Language Dataset

## Overview

This dataset contains 35 curated body language training exercises spanning 5 difficulty levels, from basic individual signals to expert-level power dynamics analysis.

## Structure

```
body-language/
├── dataset.json          # Main dataset (35 exercises)
├── README.md            # This file
└── media/               # (Future) Actual video/image files
    ├── videos/
    └── images/
```

## Dataset Schema

Each exercise includes:

- **ID & Metadata:** Unique ID, skill type, level, difficulty
- **Media:** Type (video/image), URL placeholder
- **Title & Description:** Clear learning objective
- **Baseline Concept:** 
  - `baseline_context`: Description of neutral behavior
  - `baseline_duration_sec`: How long to show baseline
  - `deviation_timestamp_sec`: When behavior changes
- **Categorization:** 
  - `category`: neutral, estrés, confianza, mentira, atracción, incomodidad
  - `difficulty`: easy, medium, hard, very_hard, expert
- **Questions:** Multiple choice with explanations
- **Learning Metadata:**
  - `theory_tags`: Relevant concepts
  - `references`: Academic/expert sources

## Statistics

### By Level
- **Level 1:** 7 exercises (basic signals)
- **Level 2:** 7 exercises (clusters)
- **Level 3:** 7 exercises (context)
- **Level 4:** 7 exercises (incongruence)
- **Level 5:** 7 exercises (power dynamics)

### By Category
- **Neutral:** 5 exercises
- **Estrés:** 8 exercises
- **Confianza:** 6 exercises
- **Mentira:** 8 exercises
- **Atracción:** 3 exercises
- **Incomodidad:** 5 exercises

### By Media Type
- **Video:** 28 exercises (80%)
- **Image:** 7 exercises (20%)

## Theory Coverage

### Core Experts

1. **Joe Navarro** (FBI behavioral analyst)
   - Pacifying behaviors
   - Limbic reactions
   - Feet as honest indicators
   - Baseline deviations
   - Cluster rule

2. **Allan Pease** (body language expert)
   - Territorial displays
   - Power posing
   - Pupil dilation
   - Mirroring and rapport

3. **Paul Ekman** (emotions researcher)
   - Microexpressions
   - Display rules
   - Deception indicators
   - Leakage theory

4. **Edward T. Hall** (anthropologist)
   - Proxemics
   - Personal space
   - Cultural variations

### Additional References
- Albert Mehrabian (verbal vs non-verbal)
- Chartrand & Bargh (mirroring effect)
- Aldert Vrij (deception detection)
- John Gottman (contempt in relationships)
- Robert Greene (power dynamics)

## Key Concepts

### Baseline & Deviation
**Innovation:** Show neutral baseline first, then detect deviations.

> "Everyone has their own baseline. What matters is CHANGE." - Joe Navarro

### Cluster Rule
**Principle:** One signal = hypothesis. Multiple signals = confirmation.

Never interpret a single signal in isolation. Look for clusters of 3+ congruent signals.

### Context Dependency
**Principle:** Same behavior, different meanings in different contexts.

A smile at a funeral could be:
- Appropriate (remembering happy moments)
- Inappropriate (humor at wrong time)
- Nervous (discomfort)

Context determines interpretation.

### Incongruence Detection
**Principle:** When channels conflict, non-verbal is more reliable.

Verbal: "I'm happy to be here"  
Non-verbal: Crossed arms + avoiding eye contact + flat tone  
→ Non-verbal reveals true emotion

### Power Dynamics
**Principle:** Status manifests in microinteractions.

- Who speaks first after silence
- Who can interrupt whom
- Who controls space (proximity, height)
- Who shows more stress signals

## Usage

### Loading Dataset

```typescript
import dataset from '@/data/body-language/dataset.json';

// Get exercises for specific level
const level2Exercises = dataset.exercises.filter(e => e.level === 2);

// Get exercises by category
const stressExercises = dataset.exercises.filter(e => e.category === 'estrés');

// Get random exercise for level
function getRandomExercise(level: number) {
  const exercises = dataset.exercises.filter(e => e.level === level);
  return exercises[Math.floor(Math.random() * exercises.length)];
}
```

### Exercise Structure Example

```json
{
  "id": "bl_001",
  "skill": "body_language",
  "level": 1,
  "type": "video",
  "media_url": "/placeholders/bl_001.mp4",
  "title": "Brazos Cruzados - Defensiva Básica",
  "description": "Persona en reunión cruza los brazos repentinamente",
  "baseline_context": "Persona con brazos relajados a los lados",
  "baseline_duration_sec": 5,
  "deviation_timestamp_sec": 8,
  "category": "estrés",
  "difficulty": "easy",
  "questions": [
    {
      "id": "bl_001_q1",
      "question": "¿Qué cambio principal observas?",
      "type": "emotional_state",
      "correct_answer": "Brazos cruzados - postura defensiva",
      "options": ["...", "...", "...", "..."],
      "explanation": "Los brazos cruzados son una barrera física..."
    }
  ],
  "theory_tags": ["baseline_deviation", "defensive_posture"],
  "references": ["Navarro, Joe - What Every Body is Saying"]
}
```

## Media Integration (Future)

### Current State
- Placeholder URLs (`/placeholders/bl_XXX.mp4`)
- No actual media files yet
- Component ready for real media

### Planned Integration

**Sources:**
- YouTube Creative Commons
- Pexels (royalty-free)
- Custom recordings
- Licensed stock footage

**Format:**
- Videos: MP4 (H.264), max 1080p, 15-60 seconds
- Images: JPG/PNG, min 1280x720

**Directory Structure:**
```
/public/media/body-language/
  /videos/
    bl_001.mp4
    bl_002.mp4
    ...
  /images/
    bl_003.jpg
    bl_008.jpg
    ...
```

## Quality Standards

### Exercise Quality

- ✅ Based on peer-reviewed research or expert consensus
- ✅ Clear baseline description
- ✅ Obvious deviation moment (for videos)
- ✅ Multiple choice questions (3-4 options)
- ✅ Detailed explanation with theory
- ✅ Cited references
- ✅ Appropriate difficulty for level

### What to Avoid

- ❌ Pseudoscience (e.g., "looking left means lying")
- ❌ Overgeneralization (e.g., "crossed arms ALWAYS means defensive")
- ❌ Cultural assumptions (note variations)
- ❌ Deterministic claims (body language is probabilistic)
- ❌ Single signals without context

## Contributing

### Adding New Exercises

1. **Research:** Find credible source/study
2. **Design:** Plan baseline + deviation
3. **Write JSON:** Follow schema exactly
4. **Add Media:** Record or source appropriate footage
5. **Test:** Verify difficulty level matches target
6. **Document:** Update statistics in this README

### Exercise Checklist

- [ ] Unique ID follows pattern (`bl_XXX`)
- [ ] Level appropriate (1-5)
- [ ] Baseline context described
- [ ] Clear deviation moment
- [ ] 1-3 questions per exercise
- [ ] All questions have explanations
- [ ] Theory tags added
- [ ] References cited
- [ ] Difficulty accurate
- [ ] Category appropriate

## Version History

**v1.0 (2026-02-21)**
- Initial dataset with 35 exercises
- 5 levels fully covered
- Placeholder media URLs
- Complete theory coverage

**Planned v1.1**
- Add real media files
- Expand to 50 exercises
- Add video timestamps for key moments
- Captions/transcripts for accessibility

**Planned v2.0**
- Interactive exercises (choose timestamp)
- User-submitted scenarios
- AI-generated variations
- Cultural variants (same signal, different cultures)

## License

**Dataset:** CC-BY-4.0  
**Attribution Required:**
- Joe Navarro (theoretical framework)
- Allan Pease (territorial/power concepts)
- Paul Ekman (microexpression integration)
- Edward T. Hall (proxemics)

## Contact

**Issues:** GitHub repository  
**Suggestions:** PRs welcome  
**Questions:** See main documentation

---

**Total Exercises:** 35  
**Last Updated:** 2026-02-21  
**Status:** Production Ready (with placeholder media)
