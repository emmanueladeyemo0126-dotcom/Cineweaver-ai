import { FilmProject } from '../types/film';
import { CINEMATIC_ASSETS } from '../assets/sampleAssets';

export const INITIAL_PROJECTS: FilmProject[] = [
  {
    id: 'proj-emerald-heir',
    title: 'THE EMERALD HEIR: LAGOS DYNASTY',
    genre: 'Afro-Luxury Drama & Espionage',
    format: 'Cinematic Short Film (8 min)',
    visualStyle: 'Arri Alexa 65mm, 2.39:1 anamorphic, golden twilight reflections, emerald-and-gold tailored agbada luxury',
    logline: 'Africa\'s most secretive clean-energy billionaire returns to Lagos disguised in a faded grease-stained mechanic jacket, only to confront the cartel extorting his childhood neighborhood on the eve of his multi-billion dollar port launch.',
    treatment: {
      id: 'opt-emerald',
      title: 'THE EMERALD HEIR: LAGOS DYNASTY',
      artisticStyle: 'Afro-Luxury Neo-Noir & High Drama',
      pitchTone: 'Succession meets The Equalizer in modern, high-tech Lagos with breathtaking visual grandeur.',
      logline: 'Africa\'s most secretive clean-energy billionaire returns to Lagos disguised in a faded grease-stained mechanic jacket, only to confront the cartel extorting his childhood neighborhood on the eve of his multi-billion dollar port launch.',
      visualGrammar: {
        aspectRatio: '2.39:1',
        lensChoice: 'Panavision C-Series 40mm & 75mm Anamorphic T2.3',
        lightingStyle: 'Golden hour twilight, warm amber halogen spills, neon cyan canal reflections, backlit water mist',
        colorPalette: ['#022c22', '#059669', '#d97706', '#7c2d12'],
      },
      coreConflict: 'Balancing the ruthless demands of international tech conglomerates against an unyielding loyalty to the community that raised him.',
      pacingStyle: 'Simmering character tension erupting into explosive visual reveals',
      aiWorkflowRecommendation: 'Midjourney v6.1 (--cref) + Kling AI for realistic motion + ElevenLabs for authentic Nigerian accent + Suno for orchestral Afrobeat score',
    },
    characters: [
      {
        id: 'char-damilola',
        name: 'Damilola "Kola" Adeleke',
        role: 'Undercover Tech Billionaire & Founder',
        age: '34',
        archetype: 'The Hidden King',
        heroImage: CINEMATIC_ASSETS.africanBillionaire,
        physicalSignature: 'Tall commanding stature, sharp carved jawline, deep warm mahogany skin, intense observant dark brown eyes, short clean tapered fade haircut, small crescent scar above right cheekbone.',
        wardrobeSignature: 'Dual wardrobe: Distressed navy-blue heavy cotton mechanic jacket with brass zippers over plain dark t-shirt; transitions to bespoke emerald-green hand-embroidered modern silk Agbada with 24k gold filigree cufflinks.',
        characterAnchorToken: '[CHAR_KOLA_V1] 34yo tall handsome Nigerian man, sharp jawline, short clean fade haircut, crescent scar above right cheekbone, wearing distressed navy mechanic jacket over black shirt, intense charismatic gaze',
        multiAnglePrompts: [
          {
            angle: 'Front Portrait',
            prompt: 'Cinematic portrait of [CHAR_KOLA_V1], eye level, soft warm golden hour light hitting side of face, quiet supreme confidence, shallow depth of field, 85mm f/1.4 lens, 35mm film grain --ar 16:9',
            previewImage: CINEMATIC_ASSETS.africanBillionaire,
          },
          {
            angle: 'Three-Quarter Angle',
            prompt: 'Medium shot of [CHAR_KOLA_V1] three-quarter profile looking toward modern Lagos skyline from water\'s edge, wearing distressed navy mechanic jacket, amber twilight reflections, Panavision flare --ar 2.39:1',
            previewImage: CINEMATIC_ASSETS.africanBillionaire,
          },
          {
            angle: 'Action Profile',
            prompt: 'Dynamic side profile of [CHAR_KOLA_V1] stepping off a vintage motorcycle into pouring rain outside a towering luxury glass skyscraper, looking calmly at security guards, low angle 24mm --ar 2.39:1',
            previewImage: CINEMATIC_ASSETS.storyboardWide,
          },
          {
            angle: 'Emotional Close-Up',
            prompt: 'Extreme macro close-up on eyes of [CHAR_KOLA_V1], pupils reflecting neon lights, unwavering resolve and quiet power, Hasselblad clarity, flawless skin texture --ar 16:9',
            previewImage: CINEMATIC_ASSETS.africanBillionaire,
          },
        ],
        voiceProfile: {
          accent: 'Rich, resonant Lagos Nigerian English with refined transatlantic cadences',
          tone: 'Low-frequency baritone, measured, utterly unshakeable even in high-stress confrontations',
          speed: 'Deliberate, pauses before dropping devastating truths',
          elevenLabsVoiceRecommendation: 'Marcus or Obinna (Stability: 0.70, Similarity: 0.85)',
          sampleLine: 'You measure a man by the car he arrives in. I measure a man by how many people he feeds after the doors close.',
        },
        continuityRules: [
          'Always maintain the small crescent scar above right cheekbone',
          'Hair must remain a crisp clean fade, never shaggy or altered',
          'When in mechanic attire, jacket must have subtle oil smudge on left collar',
          'When in luxury attire, emerald agbada gold embroidery must match identical filigree pattern',
        ],
      },
    ],
    shots: [
      {
        id: 'shot-rev-1',
        shotNumber: 'Shot 1',
        shotType: 'Extreme Wide Establishing',
        framingLens: '24mm Anamorphic T2.0',
        cameraMovement: 'Slow forward drone tracking shot drifting across Lagos lagoon toward towering glass high-rises at sunset',
        lightingAtmosphere: 'Breathtaking equatorial golden hour, deep orange and crimson twilight reflecting off calm water',
        actionDescription: 'An old wooden passenger ferry glides across the water. At the bow stands Kola in his worn mechanic jacket, watching the megacity he secretly owns.',
        dialogueOrVoiceover: 'KOLA (V.O.): They say Lagos never sleeps because everyone is either chasing money or running from ghosts.',
        soundDesignFoley: 'Gentle rhythmic water lapping against wood hull, distant bustling sounds of Lagos island horns, deep 40Hz resonant orchestral bass swell',
        keyframeImage: CINEMATIC_ASSETS.africanBillionaire,
        compiledPrompts: {
          midjourneyFlux: 'Cinematic extreme wide shot of Lagos lagoon at sunset, futuristic luxury glass skyscrapers in background, solitary tall African man in dark jacket standing on bow of wooden boat, golden hour reflection on water, Panavision 24mm anamorphic --ar 2.39:1 --style raw',
          runwayKlingVideo: 'Extreme wide cinematic shot, slow forward camera push over water at golden hour toward a bustling African metropolis skyline, solitary man on boat looking ahead, smooth 4k motion',
        },
        continuityNote: 'Sunset angle must be camera-left at 25 degrees above horizon.',
      },
      {
        id: 'shot-rev-2',
        shotNumber: 'Shot 2',
        shotType: 'Medium Tracking',
        framingLens: '35mm Prime T1.8',
        cameraMovement: 'Steadicam tracking backward as Kola walks through rain-slicked luxury hotel entrance',
        lightingAtmosphere: 'Brilliant warm chandelier glow from lobby spilling onto wet dark granite courtyard',
        actionDescription: 'Kola walks calmly toward the gilded glass revolving doors. Two armored private security guards immediately step forward to block his path, sneering at his jacket.',
        dialogueOrVoiceover: 'SECURITY GUARD: Hey! Deliveries round the back! Private event tonight for real people.',
        soundDesignFoley: 'Heavy rain patter on granite, firm boot footsteps, sharp metallic click of security radio',
        keyframeImage: CINEMATIC_ASSETS.africanBillionaire,
        compiledPrompts: {
          midjourneyFlux: 'Medium tracking shot of [CHAR_KOLA_V1] walking toward revolving glass doors of luxury five-star hotel, rain droplets glistening on his navy jacket, warm golden chandelier light spilling onto wet floor, cinematic Arri Alexa 35mm --ar 2.39:1',
          runwayKlingVideo: 'Medium shot tracking backward as tall confident African man in casual jacket approaches luxury hotel entrance through rain, security guards step in front of him, cinematic realism',
        },
        continuityNote: 'Ensure mechanic jacket navy shade matches Shot 1.',
      },
      {
        id: 'shot-rev-3',
        shotNumber: 'Shot 3',
        shotType: 'Over-The-Shoulder',
        framingLens: '50mm Portrait Prime',
        cameraMovement: 'Locked off, slow creeping zoom 1.1x onto Kola\'s calm eyes',
        lightingAtmosphere: 'Chiaroscuro contrast, harsh security flashlight beam catching the edge of Kola\'s jawline',
        actionDescription: 'Kola does not flinch. He reaches calmly into his inner coat pocket and withdraws an unadorned black matte biometric credit card stamped with the sovereign crest.',
        dialogueOrVoiceover: 'KOLA: Check the reservation for Adeleke Capital. I believe I am five minutes early.',
        soundDesignFoley: 'Deep breath, silence as rain sounds mute slightly, subtle titanium card clink, sudden heart-stopping bass drop in music score',
        keyframeImage: CINEMATIC_ASSETS.storyboardWide,
        compiledPrompts: {
          midjourneyFlux: 'Over-the-shoulder shot looking past an arrogant security guard at [CHAR_KOLA_V1], who calmly holds up a sleek black and gold biometric card with absolute poise, dramatic high contrast lighting --ar 2.39:1',
          runwayKlingVideo: 'Over the shoulder shot, guard looking bewildered as tall man calmly presents a black titanium card, subtle camera zoom, intense dramatic standoff',
        },
        continuityNote: 'Card must show golden circular crest.',
      },
      {
        id: 'shot-rev-4',
        shotNumber: 'Shot 4',
        shotType: 'Extreme Macro Close-Up',
        framingLens: '100mm Macro Prime f/2.8',
        cameraMovement: 'Static macro shot with shallow depth-of-field',
        lightingAtmosphere: 'Golden amber backlight illuminating the screen of the biometric handheld scanner',
        actionDescription: 'The scanner beeps. The small digital readout flashes green: "CONFIRMED: PROPRIETOR & CHAIR - ACQUISITION VALUE: $4.2B USD - UNRESTRICTED ACCESS GRANTED".',
        dialogueOrVoiceover: null,
        soundDesignFoley: 'Electronic confirmation chime (dual tone high-fidelity), audible sharp intake of breath from the hotel manager',
        keyframeImage: CINEMATIC_ASSETS.storyboardWide,
        compiledPrompts: {
          midjourneyFlux: 'Extreme macro close-up of a high-end luxury digital terminal screen glowing emerald green with verified billionaire credential, trembling hand holding the device, shallow depth of field --ar 16:9',
          runwayKlingVideo: 'Macro shot of digital terminal scanning a black card, green holographic confirmation pulses across screen, realistic light refraction',
        },
        continuityNote: 'Terminal display text must remain sharp and legible.',
      },
      {
        id: 'shot-rev-5',
        shotNumber: 'Shot 5',
        shotType: 'Dutch Angle',
        framingLens: '24mm Wide Anamorphic tilted 12 degrees',
        cameraMovement: 'Slow majestic crane rise as Kola sweeps past the stunned executives into the grand ballroom',
        lightingAtmosphere: 'Blinding flashbulbs from press photographers and warm crystalline chandelier grandeur washing over the room',
        actionDescription: 'Kola unzips the dark jacket and hands it to the paralyzed manager, revealing a bespoke emerald and gold hand-stitched Agbada beneath. The entire ballroom gasps as he takes the podium.',
        dialogueOrVoiceover: 'KOLA: Good evening, gentlemen. Let\'s discuss who actually owns this city.',
        soundDesignFoley: 'Explosive crescendo of talking drums and full symphony strings, camera shutter clatter, collective stunned murmurs',
        keyframeImage: CINEMATIC_ASSETS.africanQueenAction,
        compiledPrompts: {
          midjourneyFlux: 'Majestic dramatic shot of [CHAR_KOLA_V1] standing tall in a bespoke emerald green and gold embroidered modern Agbada jacket in a magnificent golden ballroom, surrounded by stunned elites, 24mm anamorphic lens flare, high fashion African cinema masterpiece --ar 2.39:1',
          runwayKlingVideo: 'Slow crane rise and push in as tall charismatic African billionaire in magnificent emerald and gold attire addresses a grand luxurious ballroom, flashbulbs popping, epic cinema climax',
        },
        continuityNote: 'Emerald Agbada must feature gold filigree collar matching character dossier.',
      },
    ],
    audit: {
      continuityScore: 97,
      overallVerdict: 'Masterful reverse-engineering of viral status-reversal drama. Strong emotional payoff, authentic cultural grounding in modern African luxury, and precision visual prompts for generation.',
      continuityAlerts: [
        {
          severity: 'Notice',
          issue: 'Wardrobe transformation in Shot 5',
          fix: 'Ensure Kola\'s mechanic jacket in Shot 2 & 3 is sized slightly oversized so it realistically conceals the emerald Agbada underneath.',
        },
      ],
      promptOptimizationTips: [
        {
          targetTool: 'Midjourney',
          recommendation: 'Use `--cref [Hero Portrait]` with `--cw 80` to preserve Kola\'s signature jawline and eyebrow scar during the Agbada reveal.',
        },
        {
          targetTool: 'Kling AI',
          recommendation: 'In Shot 5 (the ballroom entrance), specify: "smooth walking motion, fabric flutter on silk Agbada, natural crowd turning heads".',
        },
        {
          targetTool: 'Suno',
          recommendation: 'Prompt score with: "Epic Afro-cinematic orchestral, Hans Zimmer brass horns meets talking drums and Yoruba choral chants, 75 BPM, dramatic crescendo".',
        },
      ],
      directorialEnhancements: [
        {
          title: 'Pre-reveal Sonic Foley Motif',
          concept: 'Keep the sound of the old motorcycle engine idling in Kola\'s memory bleeding under the quiet luxury elevator chime.',
          impact: 'Subconsciously reminds the audience of his humble origins even amidst multi-billion dollar opulence.',
        },
      ],
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-ayodhya-3000',
    title: 'THE IMMORTAL OF AYODHYA: 3000 AD',
    genre: 'Bollywood Mythological Cyber-Epic',
    format: 'YouTube Cinema / Pilot Epic (10 min)',
    visualStyle: '65mm IMAX anamorphic, golden hour firelight, floating volcanic sparks, rich vermilion and gold grading',
    logline: 'In 3000 AD, when an interstellar corporate armada attempts to mine Earth\'s ancient energetic ley-lines, a reborn solar warrior reclaims his divine armor to lead an uprising of biomechanical war-elephants.',
    treatment: {
      id: 'opt-ayodhya',
      title: 'THE IMMORTAL OF AYODHYA: 3000 AD',
      artisticStyle: 'Grand Indian Mythological Action & Cyber-Spectacle',
      pitchTone: 'RRR meets Dune and Baahubali in an eye-popping futuristic Indian mythological cosmos.',
      logline: 'In 3000 AD, when an interstellar corporate armada attempts to mine Earth\'s ancient energetic ley-lines, a reborn solar warrior reclaims his divine armor to lead an uprising of biomechanical war-elephants.',
      visualGrammar: {
        aspectRatio: '2.39:1',
        lensChoice: 'Arri Alexa 65mm & Panavision Ultra Vista Anamorphic',
        lightingStyle: 'High-contrast firelight embers, golden hour rim lighting, volumetric dust and smoke, celestial lightning',
        colorPalette: ['#7c2d12', '#d97706', '#fef08a', '#1e1b4b'],
      },
      coreConflict: 'A mortal vessel bearing an ancient divine promise must choose between heavenly transcendence and bleeding alongside his people.',
      pacingStyle: 'Thundering orchestral momentum alternating with soul-stirring devotional stillness',
      aiWorkflowRecommendation: 'Midjourney v6.1 (--cref) + Kling AI for physics motion + Udio for Sanskrit war chants + ElevenLabs deep baritone',
    },
    characters: [
      {
        id: 'char-devadatta',
        name: 'Devadatta "Dev" Varma',
        role: 'Reincarnated Solar Warrior & Champion',
        age: '30',
        archetype: 'The Divine Avenger',
        heroImage: CINEMATIC_ASSETS.bollywoodEpic,
        physicalSignature: 'Commanding warrior physique, flowing dark shoulder-length hair, radiant vermilion tilak on forehead, glowing golden solar iris, chiselled jawline with battle scar across left collarbone.',
        wardrobeSignature: 'Ancient forged gold and obsidian armor plates with engraved Sanskrit shlokas, crimson silk sash fluttering in crosswinds, leather vambraces with glowing energetic circuitry.',
        characterAnchorToken: '[CHAR_DEV_V1] 30yo handsome Indian warrior prince, flowing dark hair, vermilion tilak on forehead, glowing golden eyes, ornate gold filigree armor plates over crimson silk sash, epic heroic stature',
        multiAnglePrompts: [
          {
            angle: 'Front Portrait',
            prompt: 'Epic cinematic portrait of [CHAR_DEV_V1], eye level, volumetric firelight illuminating golden armor, floating glowing sparks, intense sovereign gaze, 85mm portrait prime, 65mm IMAX cinematography --ar 16:9',
            previewImage: CINEMATIC_ASSETS.bollywoodEpic,
          },
          {
            angle: 'Three-Quarter Angle',
            prompt: 'Three-quarter profile of [CHAR_DEV_V1] holding a glowing celestial bow against a burning stormy mountain fortress, crimson sash fluttering, anamorphic lens flare --ar 2.39:1',
            previewImage: CINEMATIC_ASSETS.bollywoodEpic,
          },
          {
            angle: 'Action Profile',
            prompt: 'Dynamic side profile of [CHAR_DEV_V1] deflecting supersonic plasma barrage with a glowing gold chakra shield, sparks flying, low angle 24mm --ar 2.39:1',
            previewImage: CINEMATIC_ASSETS.storyboardWide,
          },
          {
            angle: 'Emotional Close-Up',
            prompt: 'Macro close up on eyes of [CHAR_DEV_V1], glowing golden iris reflecting divine lightning, single tear evaporating in heat, flawless skin texture --ar 16:9',
            previewImage: CINEMATIC_ASSETS.bollywoodEpic,
          },
        ],
        voiceProfile: {
          accent: 'Resonant Sanskritized Indian English with commanding bass depth',
          tone: 'Fierce, royal, infused with ancient spiritual authority',
          speed: 'Deliberate, booming cadence that shakes the room',
          elevenLabsVoiceRecommendation: 'Arjun or Kabir (Stability: 0.70, Similarity: 0.85)',
          sampleLine: 'You came across the stars to conquer iron and soil. But you have awakened the fire that created them.',
        },
        continuityRules: [
          'Always preserve the forehead vermilion tilak mark across all shots',
          'Hair must remain flowing dark with subtle golden sheen under firelight',
          'Gold filigree armor patterns must match identical engraved Sanskrit glyphs',
          'Crimson silk sash must be worn draped across right shoulder',
        ],
      },
    ],
    shots: [
      {
        id: 'shot-ayo-1',
        shotNumber: 'Shot 1',
        shotType: 'Extreme Wide Establishing',
        framingLens: '18mm Ultra-Wide Anamorphic',
        cameraMovement: 'Slow forward crane descent over crumbling fortress spires towards Dev standing alone amidst burning braziers',
        lightingAtmosphere: 'Crimson and gold twilight sky, volcanic embers drifting in wind, distant thunderclouds pierced by celestial golden beams',
        actionDescription: 'Dev stands atop the stone parapet. Below him, the vast plains of Ayodhya stretch out, dotted with ancient temples and advancing mechanical siege machines.',
        dialogueOrVoiceover: 'DEV (V.O.): When the age of darkness reaches its peak, the sun does not set. It descends.',
        soundDesignFoley: 'Deep sub-bass drone (35Hz), wind howling through stone arches, crackling fire embers, distant thunder',
        keyframeImage: CINEMATIC_ASSETS.bollywoodEpic,
        compiledPrompts: {
          midjourneyFlux: 'Cinematic extreme wide shot of futuristic ancient Indian fortress at sunset, burning temples in background, solitary warrior in golden armor on stone parapet, floating embers, Panavision 18mm anamorphic --ar 2.39:1 --style raw',
          runwayKlingVideo: 'Slow forward crane push over burning stone battlements toward a lone warrior in golden armor looking across an epic battlefield, 4k 24fps cinematic motion',
        },
        continuityNote: 'Ensure wind blows crimson sash towards camera-right.',
      },
      {
        id: 'shot-ayo-2',
        shotNumber: 'Shot 2',
        shotType: 'Medium Tracking',
        framingLens: '35mm Prime T1.5',
        cameraMovement: 'Steadicam tracking forward facing Dev as he draws his massive celestial longbow',
        lightingAtmosphere: 'High-contrast golden firelight illuminating the left side of his face, deep shadows on right',
        actionDescription: 'Dev steps forward with lethal grace, nocking a glowing arrow of condensed solar plasma. The air around the arrow shimmers with heat distortion.',
        dialogueOrVoiceover: 'DEV: Stand your ground. Today, we remind the gods why they created men.',
        soundDesignFoley: 'Heavy tactical leather footsteps, creak of taut celestial bowstring, high-frequency energy hum',
        keyframeImage: CINEMATIC_ASSETS.bollywoodEpic,
        compiledPrompts: {
          midjourneyFlux: 'Medium shot of [CHAR_DEV_V1] drawing a glowing golden energy bow, fire sparks around him, intense determination in eyes, 35mm Arri Alexa cinematography --ar 2.39:1',
          runwayKlingVideo: 'Medium tracking shot facing warrior in golden armor drawing a glowing plasma bow, slow motion 120fps, floating embers, cinematic realism',
        },
        continuityNote: 'Bowstring glow must remain warm golden amber.',
      },
      {
        id: 'shot-ayo-3',
        shotNumber: 'Shot 3',
        shotType: 'Over-The-Shoulder',
        framingLens: '50mm Portrait Prime',
        cameraMovement: 'Locked off with subtle handheld breathing, slow zoom 1.1x onto the approaching enemy dreadnought',
        lightingAtmosphere: 'Cold blinding blue headlights of the corporate dropship cutting through warm temple smoke',
        actionDescription: 'From behind Dev\'s armored shoulder, a gargantuan armored dropship descends through the clouds, aiming its heavy railgun turrets directly at him.',
        dialogueOrVoiceover: null,
        soundDesignFoley: 'Deafening mechanical engine roar, hydraulic hum of heavy railgun aiming, sudden silence as the sound cuts out before firing',
        keyframeImage: CINEMATIC_ASSETS.storyboardWide,
        compiledPrompts: {
          midjourneyFlux: 'Over the shoulder shot looking past Dev\'s golden armor at a massive sci-fi dreadnought descending through storm clouds, cold blue lights cutting through smoke --ar 2.39:1',
          runwayKlingVideo: 'Over the shoulder shot, massive futuristic dropship hovering menacingly in cloudy sky, dust blowing wildly, cinematic tension',
        },
        continuityNote: 'Armored pauldron must show identical Sanskrit engravings.',
      },
      {
        id: 'shot-ayo-4',
        shotNumber: 'Shot 4',
        shotType: 'Extreme Macro Close-Up',
        framingLens: '100mm Macro Prime f/2.8',
        cameraMovement: 'Static macro focus pull from arrowhead to Dev\'s golden iris',
        lightingAtmosphere: 'Blinding solar flare reflecting directly in his pupil',
        actionDescription: 'The solar arrowhead ignites into a miniature supernova. Inside Dev\'s eye, ancient star maps rotate in synchronized harmony.',
        dialogueOrVoiceover: null,
        soundDesignFoley: 'High-frequency crystalline chime, deep resonant bell toll echoing in spatial distance',
        keyframeImage: CINEMATIC_ASSETS.bollywoodEpic,
        compiledPrompts: {
          midjourneyFlux: 'Extreme macro close-up of a warrior\'s golden glowing eye reflecting solar energy, intricate iris detail, ultra sharp focus, 100mm macro lens --ar 16:9',
          runwayKlingVideo: 'Macro shot of golden eye opening wide as solar light reflects in pupil, micro-dust motes floating in hyper-detail',
        },
        continuityNote: 'Iris glow must match celestial arrow frequency.',
      },
      {
        id: 'shot-ayo-5',
        shotNumber: 'Shot 5',
        shotType: 'Dutch Angle',
        framingLens: '24mm Wide Anamorphic tilted 15 degrees',
        cameraMovement: 'Explosive whip zoom backward as Dev releases the arrow, unleashing a shockwave that parts the storm clouds',
        lightingAtmosphere: 'Blinding golden explosion of light illuminating the entire mountain range in daylight brilliance',
        actionDescription: 'Dev releases the string. The solar projectile shatters the sound barrier, obliterating the dropship\'s kinetic barrier in a colossal blast of golden light and fire.',
        dialogueOrVoiceover: 'DEV: Har Har Mahadev!',
        soundDesignFoley: 'Thundering sonic boom explosion, deafening roar of dholak and nagada battle drums, triumphant symphonic brass fanfare',
        keyframeImage: CINEMATIC_ASSETS.bollywoodEpic,
        compiledPrompts: {
          midjourneyFlux: 'Explosive epic cinematic shot of [CHAR_DEV_V1] standing triumphant as a colossal golden shockwave and fireball consumes the sky, 24mm anamorphic lens flare, Indian cinema masterpiece --ar 2.39:1',
          runwayKlingVideo: 'Dramatic camera whip zoom as solar arrow detonates in massive golden explosion in mid-air, smoke clearing to reveal warrior holding ground, epic cinema climax',
        },
        continuityNote: 'Ensure explosion retains golden amber color profile.',
      },
    ],
    audit: {
      continuityScore: 99,
      overallVerdict: 'Flawless execution of grand mythological scale. Overcomes amateur AI shaky combat with locked anamorphic vectors, deep emotional gravitas, and pristine cultural reverence.',
      continuityAlerts: [
        {
          severity: 'Notice',
          issue: 'Firelight vs Blue Dropship light balance in Shot 3',
          fix: 'Ensure the cool blue beam does not wash out Dev\'s golden armor warmth; preserve dual-color rim light.',
        },
      ],
      promptOptimizationTips: [
        {
          targetTool: 'Midjourney',
          recommendation: 'Use `--cref [Hero Portrait]` with `--cw 85` to lock the forehead tilak mark and jawline structure across all battle action.',
        },
        {
          targetTool: 'Kling AI',
          recommendation: 'In Shot 2, use prompt: "smooth bow draw, muscle tension in arms, floating embers with natural air turbulence".',
        },
        {
          targetTool: 'Udio / Suno',
          recommendation: 'Score prompt: "Thundering Dhol and Nagada battle drums, Sanskrit battle shlokas, high-tempo brass horns, 130 BPM, epic climax".',
        },
      ],
      directorialEnhancements: [
        {
          title: 'Devotional Silence Pre-Shockwave',
          concept: 'Drop all audio into absolute silence for 0.8 seconds as the bowstring is released, before the thunderous explosion.',
          impact: 'Dramatically magnifies the perceived physical weight of the impact.',
        },
      ],
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-chrono-veil',
    title: 'CHRONO-VEIL: ECLIPSE',
    genre: 'Neo-Noir Cyber-Thriller',
    format: 'Cinematic Short Film (7 min)',
    visualStyle: 'Arri Alexa 35mm anamorphic, Chiaroscuro neon, Blade Runner 2049 aesthetic',
    logline: 'In a flooded subterranean megacity where synthetic memories can be weaponized, a disgraced chronometric investigator discovers their own murder scheduled for dawn.',
    treatment: {
      id: 'opt-chrono',
      title: 'CHRONO-VEIL: ECLIPSE',
      artisticStyle: 'Visceral Neo-Noir Cyber-Thriller',
      pitchTone: 'Blade Runner 2049 meets Children of Men with suffocating atmospheric tension.',
      logline: 'In a flooded subterranean megacity where synthetic memories can be weaponized, a disgraced chronometric investigator discovers their own murder scheduled for dawn.',
      visualGrammar: {
        aspectRatio: '2.39:1',
        lensChoice: 'Panavision C-Series Anamorphic 40mm T2.8',
        lightingStyle: 'Chiaroscuro, sodium vapor reflections, deep cyan fog, amber rim lighting',
        colorPalette: ['#0f172a', '#0891b2', '#f59e0b', '#e11d48']
      },
      coreConflict: 'Racing against their own pre-recorded timeline while questioning the reality of their sensory input.',
      pacingStyle: 'Tense deliberate pacing erupting into kinetic camera sprints',
      aiWorkflowRecommendation: 'Flux.1 Pro for character keyframes + Runway Gen-3 for camera dolly shots + ElevenLabs Adam for gritty voiceover'
    },
    characters: [
      {
        id: 'char-elena',
        name: 'Elena Vance',
        role: 'Disgraced Chrono-Investigator',
        age: '32',
        archetype: 'The Reluctant Truth-Seeker',
        heroImage: CINEMATIC_ASSETS.heroShot,
        physicalSignature: 'Sharp angular jawline, piercing emerald-green eyes, short cropped silver-blonde textured undercut, distinct diagonal micro-scar through left eyebrow, porcelain skin with subtle rain sheen.',
        wardrobeSignature: 'Weathered dark-charcoal wax-canvas duster jacket with brass collar studs, matte black compression undershirt, fingerless tactical leather gloves, titanium timepiece with glowing amber glyphs.',
        characterAnchorToken: '[CHAR_ELENA_V1] 32yo woman, sharp jawline, short silver-blonde undercut, thin scar across left eyebrow, dark charcoal wax-canvas duster jacket, amber glowing timepiece',
        multiAnglePrompts: [
          {
            angle: 'Front Portrait',
            prompt: 'Cinematic portrait of [CHAR_ELENA_V1], front camera angle, eye-level, soft studio key light, neutral determined expression, shallow depth of field, 85mm f/1.4 lens, 35mm film grain, 8k photorealistic --ar 16:9',
            previewImage: CINEMATIC_ASSETS.characterSheet
          },
          {
            angle: 'Three-Quarter Angle',
            prompt: 'Medium shot of [CHAR_ELENA_V1], three-quarter profile facing right, moody cyan rim light from rain-soaked neon street, sharp shadow across right cheek, looking into middle distance, anamorphic lens flare --ar 2.39:1',
            previewImage: CINEMATIC_ASSETS.heroShot
          },
          {
            angle: 'Action Profile',
            prompt: 'Dynamic side profile of [CHAR_ELENA_V1] ducking behind a wet concrete partition, rain pouring, muzzle flash glow reflecting in eyes, motion blur on falling droplets, low angle 24mm lens --ar 2.39:1',
            previewImage: CINEMATIC_ASSETS.storyboardWide
          },
          {
            angle: 'Emotional Close-Up',
            prompt: 'Extreme close-up macro on eyes and face of [CHAR_ELENA_V1], intense vulnerability and realization, single tear cutting through rain, dilated pupils reflecting shattered glass, Hasselblad 120mm macro clarity --ar 16:9',
            previewImage: CINEMATIC_ASSETS.characterSheet
          }
        ],
        voiceProfile: {
          accent: 'Nuanced Mid-Atlantic with Nordic undertones',
          tone: 'Low-register, breathy, restrained cynicism masking deep empathy',
          speed: 'Deliberate, unhurried, pregnant pauses between key words',
          elevenLabsVoiceRecommendation: 'Rachel or Freya (Stability: 0.65, Similarity: 0.85, Style Exaggeration: 0.15)',
          sampleLine: 'You think memory is a recording. But here... memory is just the first draft of an execution.'
        },
        continuityRules: [
          'Always maintain the diagonal left eyebrow scar across all shots',
          'Hair must remain silver-blonde with short textured undercut, never long or braided',
          'The wax-canvas duster jacket collar must stay flipped upward against the neck',
          'Ensure the wrist timepiece maintains its warm amber display glow in darker scenes'
        ]
      }
    ],
    shots: [
      {
        id: 'shot-1',
        shotNumber: 'Shot 1',
        shotType: 'Extreme Wide Establishing',
        framingLens: '18mm Ultra-Wide Anamorphic',
        cameraMovement: 'Slow downward crane descent through falling rain, 6-second reveal',
        lightingAtmosphere: 'Silhouetted brutalist skyscrapers, flickering blue holographic signs piercing dense rain fog',
        actionDescription: 'Elena stands alone on the cantilevered maintenance walkway high above the flooded transit canals, her coat fluttering in crosswinds.',
        dialogueOrVoiceover: 'ELENA (V.O.): In this city, dead men walk faster than the living.',
        soundDesignFoley: 'Deep ambient industrial rumble (50Hz), violent wind gusts, distant sirens echoing through concrete canyons',
        keyframeImage: CINEMATIC_ASSETS.heroShot,
        compiledPrompts: {
          midjourneyFlux: 'Cinematic extreme wide establishing shot of high-tech cyberpunk city at night, heavy rain, solitary silhouetted figure in long coat standing on a narrow metallic walkway, towering holographic advertisements, volumetric mist, Panavision 18mm anamorphic, 2.39:1 aspect ratio, 35mm film grain --ar 2.39:1 --style raw',
          runwayKlingVideo: 'Extreme wide establishing shot, high angle slow crane downward through falling rain, revealing a solitary figure on a narrow wet industrial walkway overlooking a neon-lit futuristic city, cinematic camera drift, smooth 4k motion'
        },
        continuityNote: 'Ensure rain density and wind direction matches the subsequent medium shot.'
      },
      {
        id: 'shot-2',
        shotNumber: 'Shot 2',
        shotType: 'Medium Tracking',
        framingLens: '35mm Prime T1.5',
        cameraMovement: 'Steadicam tracking backwards facing Elena as she advances',
        lightingAtmosphere: 'Dual-tone rim light: harsh amber street lamp from camera-right, diffuse cyan from left',
        actionDescription: 'Elena advances with measured steps, checking the amber digital readout on her wrist timepiece. Her left eyebrow scar catches the wet reflection.',
        dialogueOrVoiceover: 'ELENA: Five minutes. Not enough time to negotiate. Just enough to bleed.',
        soundDesignFoley: 'Heavy tactical boot footsteps splashing in puddles, water dripping from coat hem, high-frequency digital chrono-beep',
        keyframeImage: CINEMATIC_ASSETS.characterSheet,
        compiledPrompts: {
          midjourneyFlux: 'Medium tracking shot of [CHAR_ELENA_V1] 32yo woman with short silver-blonde undercut hair and left eyebrow scar, wearing wet charcoal wax-canvas duster jacket, checking glowing amber wrist device, rain drops on face, 35mm Arri Alexa cinematography, shallow depth of field --ar 2.39:1 --v 6.1',
          runwayKlingVideo: 'Medium shot tracking backwards, woman with short silver hair in wet trench coat walking purposefully toward camera through heavy rain, looking down at glowing amber wrist gauge, realistic fluid movement, cinematic lighting'
        },
        continuityNote: 'Wrist watch display must read amber "00:04:59" countdown.'
      },
      {
        id: 'shot-3',
        shotNumber: 'Shot 3',
        shotType: 'Over-The-Shoulder',
        framingLens: '50mm Portrait Prime',
        cameraMovement: 'Subtle handheld breathing motion, tense stillness',
        lightingAtmosphere: 'Chiaroscuro, deep shadows across the informant\'s face, single backlit steam vent',
        actionDescription: 'Elena halts 3 paces away. In front of her stands the Broker, shrouded under a dark waterproof poncho, face obscured by a chrome rebreather mask.',
        dialogueOrVoiceover: 'THE BROKER: You\'re late, Vance. The file has already started transmitting.',
        soundDesignFoley: 'Mechanical hiss of the rebreather valve, wet steam hiss escaping pipeline, bass drop in musical underscore',
        keyframeImage: CINEMATIC_ASSETS.storyboardWide,
        compiledPrompts: {
          midjourneyFlux: 'Cinematic over-the-shoulder shot looking past Elena\'s wet shoulder and collar at a mysterious figure wearing a chrome rebreather mask and dark poncho in a foggy industrial corridor, high contrast lighting, Panavision lens flare --ar 2.39:1',
          runwayKlingVideo: 'Over the shoulder shot, foreground character shoulder softly out of focus, background masked figure speaking as steam escapes their breathing apparatus, subtle handheld tension, 2.39:1 aspect ratio'
        },
        continuityNote: 'The Broker\'s chrome mask must remain identical in reverse angle.'
      },
      {
        id: 'shot-4',
        shotNumber: 'Shot 4',
        shotType: 'Extreme Macro Close-Up',
        framingLens: '100mm Macro Prime f/2.8',
        cameraMovement: 'Static locked off with micro focus-pull from eye to memory shard in palm',
        lightingAtmosphere: 'Phosphorescent blue glow emanating directly from the glass memory chip',
        actionDescription: 'A crystal memory drive is extended in a gloved hand. Deep inside the crystal, miniature holographic neurons pulse with intense violet light.',
        dialogueOrVoiceover: 'ELENA (V.O.): A whole life compressed into seven grams of quartz.',
        soundDesignFoley: 'Glass crystalline resonance, subtle sub-bass thrum matching the pulsing violet light, silence of ambient rain',
        keyframeImage: CINEMATIC_ASSETS.heroShot,
        compiledPrompts: {
          midjourneyFlux: 'Extreme macro close-up of a high-tech glowing glass memory drive held in a black tactical gloved hand, intricate internal micro-circuitry glowing violet and blue, rain droplets beading on the surface, 100mm macro lens, ultra-sharp detail --ar 16:9',
          runwayKlingVideo: 'Macro shot, hand opening to reveal a glowing crystal data shard pulsing with violet light, subtle smoke drifting across the frame, hyper-realistic refraction and light spill'
        },
        continuityNote: 'Glove material must match Elena\'s black fingerless tactical leather.'
      },
      {
        id: 'shot-5',
        shotNumber: 'Shot 5',
        shotType: 'Dutch Angle',
        framingLens: '24mm Wide Anamorphic tilted 15 degrees',
        cameraMovement: 'Sudden whip-zoom push-in 1.5x as a red laser target locks onto Elena\'s chest',
        lightingAtmosphere: 'Sudden piercing crimson laser dot, blinding spotlight from overhead drone breaking through rain',
        actionDescription: 'A blood-red targeting dot appears directly on Elena\'s sternum. Her eyes widen as she reaches for her weapon, the ambush triggered.',
        dialogueOrVoiceover: 'ELENA: Trap—!',
        soundDesignFoley: 'Sudden deafening drone rotor blast, sonic crack of laser lock tone, explosive percussion hit ending on high-tension silence',
        keyframeImage: CINEMATIC_ASSETS.storyboardWide,
        compiledPrompts: {
          midjourneyFlux: 'Dramatic dutch angle shot of [CHAR_ELENA_V1] looking up in alarm as a piercing bright red sniper laser dot targets her chest, blinding searchlight from above washing over her wet face, rain frozen in mid-air, 24mm anamorphic lens, intense suspense --ar 2.39:1',
          runwayKlingVideo: 'Fast push in with a 15-degree tilted dutch angle, woman reacting with alarm as a red laser beam cuts through the misty rain and locks onto her chest, searchlight snaps on from above, high drama action beat'
        },
        continuityNote: 'Laser beam must originate from upper-right quadrant of frame.'
      }
    ],
    audit: {
      continuityScore: 94,
      overallVerdict: 'High-caliber aesthetic execution. Visual tone, character tokens, and camera vectors work cohesively for AI generation engines.',
      continuityAlerts: [
        {
          severity: 'Warning',
          issue: 'Lighting Jump between Shot 1 (Cyan/Blue Ambient) and Shot 2 (Harsh Amber Sodium)',
          fix: 'Add transitional element in Shot 2: "stepping from the blue mist into the amber beam" to keep gradient continuity.'
        },
        {
          severity: 'Notice',
          issue: 'Glove Continuity in Shot 4 Macro',
          fix: 'Confirm prompt explicitly notes "black fingerless tactical leather glove" to match Elena\'s costume bible.'
        }
      ],
      promptOptimizationTips: [
        {
          targetTool: 'Midjourney',
          recommendation: 'Use `--cref [URL]` referencing the Hero Turnaround sheet with `--cw 85` (character weight) to lock bone structure.'
        },
        {
          targetTool: 'Runway',
          recommendation: 'In Shot 5 (Dutch angle push-in), append `[Camera: Fast zoom in, Dutch angle tilt 15deg, no panning, heavy rain physics]` for stable motion vectors.'
        },
        {
          targetTool: 'Flux',
          recommendation: 'Use prompt prefix: "Cinematic 35mm film still, shot on Arri Alexa Mini LF, Panavision Anamorphic" for uniform grain.'
        }
      ],
      directorialEnhancements: [
        {
          title: 'Audio J-Cut Transition into Shot 3',
          concept: 'Let the Broker\'s heavy mechanical breathing and respirator hiss bleed in 1.5 seconds BEFORE the camera cuts to his over-the-shoulder shot.',
          impact: 'Dramatically heightens dread before the visual reveal.'
        },
        {
          title: 'Lens Flare Motifs as Tension Anchors',
          concept: 'Trigger a horizontal streak anamorphic flare across the frame whenever the countdown loses a minute.',
          impact: 'Subconsciously conditions the viewer to register impending danger with visual geometry.'
        }
      ]
    },
    updatedAt: new Date().toISOString()
  }
];
