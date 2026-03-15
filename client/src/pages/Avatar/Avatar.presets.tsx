export interface AvatarPreset {
  id: string;
  label: string;
  labelKey: string;
  emoji: string;
  prompt: string;
}

export type GenderTab = 'male' | 'female';

export const MALE_PRESETS: AvatarPreset[] = [
  {
    id: 'm-business',
    label: 'Business',
    labelKey: 'avatar.styles.business',
    emoji: '💼',
    prompt: 'professional business portrait, wearing a tailored suit, corporate headshot, clean background, confident pose, studio lighting',
  },
  {
    id: 'm-cyberpunk',
    label: 'Cyberpunk',
    labelKey: 'avatar.styles.cyberpunk',
    emoji: '🤖',
    prompt: 'cyberpunk male character, neon lights, futuristic visor, tech wear jacket, glowing circuits, dystopian city background',
  },
  {
    id: 'm-medieval',
    label: 'Medieval',
    labelKey: 'avatar.styles.medieval',
    emoji: '⚔️',
    prompt: 'medieval knight portrait, steel armor, dramatic castle background, epic fantasy lighting, heroic pose, sword and shield',
  },
  {
    id: 'm-astronaut',
    label: 'Astronaut',
    labelKey: 'avatar.styles.astronaut',
    emoji: '🚀',
    prompt: 'astronaut portrait, NASA-style space suit, helmet visor reflection, galaxy and stars background, cinematic lighting',
  },
  {
    id: 'm-superhero',
    label: 'Superhero',
    labelKey: 'avatar.styles.superhero',
    emoji: '🦸',
    prompt: 'superhero portrait, custom suit with cape, dynamic action pose, city skyline background, dramatic volumetric lighting, comic book style',
  },
  {
    id: 'm-anime',
    label: 'Anime',
    labelKey: 'avatar.styles.anime',
    emoji: '🎌',
    prompt: 'anime-style male character portrait, vibrant colors, detailed manga art style, expressive eyes, dynamic hair, sakura petals background',
  },
  {
    id: 'm-pirate',
    label: 'Pirate',
    labelKey: 'avatar.styles.pirate',
    emoji: '🏴‍☠️',
    prompt: 'pirate captain portrait, tricorn hat, weathered coat, ocean and ship background, golden sunset, adventurous look',
  },
  {
    id: 'm-viking',
    label: 'Viking',
    labelKey: 'avatar.styles.viking',
    emoji: '🪓',
    prompt: 'viking warrior portrait, braided hair and beard, fur cloak, battle-worn armor, snowy mountain background, dramatic stormy sky',
  },
  {
    id: 'm-detective',
    label: 'Detective',
    labelKey: 'avatar.styles.detective',
    emoji: '🕵️',
    prompt: 'noir detective portrait, trench coat and fedora hat, rainy city night background, moody film noir lighting, mysterious atmosphere',
  },
  {
    id: 'm-athlete',
    label: 'Athlete',
    labelKey: 'avatar.styles.athlete',
    emoji: '🏆',
    prompt: 'athletic champion portrait, sportswear, stadium background, powerful pose, dynamic motion blur, golden hour lighting, victory moment',
  },
  {
    id: 'm-samurai',
    label: 'Samurai',
    labelKey: 'avatar.styles.samurai',
    emoji: '⛩️',
    prompt: 'samurai warrior portrait, traditional armor and helmet, katana sword, cherry blossom trees background, dramatic Japanese landscape, cinematic lighting',
  },
  {
    id: 'm-wizard',
    label: 'Wizard',
    labelKey: 'avatar.styles.wizard',
    emoji: '🧙',
    prompt: 'powerful wizard portrait, long robe and staff, glowing magical runes, ancient library background, mystical blue and purple lighting, fantasy art style',
  },
];

export const FEMALE_PRESETS: AvatarPreset[] = [
  {
    id: 'f-business',
    label: 'Business',
    labelKey: 'avatar.styles.business',
    emoji: '💼',
    prompt: 'professional business portrait, elegant blazer, corporate headshot, clean background, confident pose, studio lighting',
  },
  {
    id: 'f-cyberpunk',
    label: 'Cyberpunk',
    labelKey: 'avatar.styles.cyberpunk',
    emoji: '🤖',
    prompt: 'cyberpunk female character, neon lights, futuristic headset, tech wear outfit, glowing circuits, dystopian city background',
  },
  {
    id: 'f-fantasy',
    label: 'Fantasy',
    labelKey: 'avatar.styles.fantasy',
    emoji: '🧝',
    prompt: 'fantasy elf queen portrait, ethereal gown, pointed ears, enchanted forest background, magical glowing particles, soft dreamy lighting',
  },
  {
    id: 'f-astronaut',
    label: 'Astronaut',
    labelKey: 'avatar.styles.astronaut',
    emoji: '🚀',
    prompt: 'astronaut portrait, NASA-style space suit, helmet visor reflection, galaxy and stars background, cinematic lighting',
  },
  {
    id: 'f-superhero',
    label: 'Superhero',
    labelKey: 'avatar.styles.superhero',
    emoji: '🦸‍♀️',
    prompt: 'superheroine portrait, custom suit with cape, dynamic action pose, city skyline background, dramatic volumetric lighting, comic book style',
  },
  {
    id: 'f-anime',
    label: 'Anime',
    labelKey: 'avatar.styles.anime',
    emoji: '🎌',
    prompt: 'anime-style female character portrait, vibrant colors, detailed manga art style, expressive eyes, flowing hair, sakura petals background',
  },
  {
    id: 'f-royal',
    label: 'Royal',
    labelKey: 'avatar.styles.royal',
    emoji: '👑',
    prompt: 'royal queen portrait, ornate golden crown, elegant royal gown, grand palace throne room background, regal pose, Renaissance oil painting style',
  },
  {
    id: 'f-goddess',
    label: 'Goddess',
    labelKey: 'avatar.styles.goddess',
    emoji: '✨',
    prompt: 'mythological goddess portrait, flowing divine robes, golden laurel wreath, celestial clouds and light rays background, ethereal glow',
  },
  {
    id: 'f-witchy',
    label: 'Witchy',
    labelKey: 'avatar.styles.witchy',
    emoji: '🔮',
    prompt: 'mystical witch portrait, dark flowing robes, magical aura, enchanted forest with glowing potions, moonlit atmosphere, dark fantasy style',
  },
  {
    id: 'f-athlete',
    label: 'Athlete',
    labelKey: 'avatar.styles.athlete',
    emoji: '🏆',
    prompt: 'athletic champion portrait, sportswear, stadium background, powerful pose, dynamic motion blur, golden hour lighting, victory moment',
  },
  {
    id: 'f-mermaid',
    label: 'Mermaid',
    labelKey: 'avatar.styles.mermaid',
    emoji: '🧜‍♀️',
    prompt: 'mermaid portrait, shimmering scales, flowing underwater hair, coral reef and ocean background, sunlight rays through water, ethereal aquatic lighting',
  },
  {
    id: 'f-samurai',
    label: 'Samurai',
    labelKey: 'avatar.styles.samurai',
    emoji: '⛩️',
    prompt: 'female samurai warrior portrait, elegant armor and kimono, katana sword, cherry blossom trees background, dramatic Japanese landscape, cinematic lighting',
  },
];
