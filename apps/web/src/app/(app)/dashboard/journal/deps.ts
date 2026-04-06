import {
  Leaf,
  Moon,
  Users,
  Baby,
  Lightbulb,
  MessageCircleQuestion,
  TrendingUp,
} from "lucide-react";

export const PROMPT_CATEGORIES = [
  {
    id: "shadow",
    title: "The Shadow",
    icon: Leaf,
    prompts: [
      "What trait do I judge most in others, and why does it trigger me?",
      "When did I last feel envious? What does that envy reveal about my desires?",
      "What am I currently hiding from my closest friends or partner?",
    ],
  },
  {
    id: "dream",
    title: "Dream Work",
    icon: Moon,
    prompts: [
      "Describe a recurring symbol in your dreams. What might it represent?",
      "What dominant emotion did you feel upon waking up today?",
      "If the person in your dream was a part of you, which part would they be?",
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    icon: Users,
    prompts: [
      "Who am I trying to please right now, and at what cost to myself?",
      "What conversation am I avoiding having, and what am I afraid will happen?",
    ],
  },
  {
    id: "inner-child",
    title: "Inner Child",
    icon: Baby,
    prompts: [
      "When did I last feel truly playful? What allowed or blocked that?",
      "What did younger me need to hear that I can offer myself now?",
      "Where in my life am I still seeking external approval I never got?",
    ],
  },
];

export const AI_BENEFITS = [
  {
    icon: Lightbulb,
    text: "Highlight possible shadow patterns and projections.",
  },
  {
    icon: MessageCircleQuestion,
    text: "Suggest questions for deeper integration work.",
  },
  {
    icon: TrendingUp,
    text: "Track how your tone and themes shift over time.",
  },
];
