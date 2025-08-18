import Fuse from 'fuse.js';
import chatData from '@/data/chatData.json';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface QnAItem {
  id: number;
  question: string;
  keywords: string[];
  answer: string;
  category: string;
}

class ChatMatcher {
  private fuse: Fuse<QnAItem>;
  private fallbacks: string[];
  private corrections: { [key: string]: string };
  private synonyms: { [key: string]: string[] };
  private questionPatterns: { pattern: RegExp; category: string; priority: number }[];

  constructor() {
    const options = {
      keys: [
        { name: 'question', weight: 0.4 },
        { name: 'keywords', weight: 0.4 },
        { name: 'answer', weight: 0.2 }
      ],
      threshold: 0.2,
      includeScore: true,
      ignoreLocation: true,
      findAllMatches: true
    };

    this.fuse = new Fuse(chatData.qna, options);
    this.fallbacks = chatData.fallbacks;
    
    this.corrections = {
      'stregth': 'strength', 'strenght': 'strength', 'strenth': 'strength',
      'weekness': 'weakness', 'weaknes': 'weakness', 'waekness': 'weakness',
      'qualitie': 'qualities', 'qualitis': 'qualities',
      'experiance': 'experience', 'expirience': 'experience',
      'kuberentes': 'kubernetes', 'kubernets': 'kubernetes',
      'terrafrom': 'terraform', 'terrafrm': 'terraform',
      'devops': 'devops', 'devop': 'devops',
      'cicd': 'ci cd', 'ci/cd': 'ci cd'
    };

    this.synonyms = {
      'skills': ['abilities', 'expertise', 'knowledge', 'technologies', 'tools'],
      'experience': ['background', 'work', 'career', 'history'],
      'company': ['organization', 'employer', 'workplace', 'firm'],
      'current': ['present', 'now', 'currently', 'today'],
      'previous': ['past', 'former', 'old', 'before'],
      'achievements': ['accomplishments', 'success', 'results', 'impact'],
      'strengths': ['strong', 'good', 'best', 'advantages'],
      'weaknesses': ['weak', 'improve', 'areas', 'development']
    };

    this.questionPatterns = [
      { pattern: /what (are|is) your (top|best|main)? ?(\d+)? ?(skills|technologies|tools)/i, category: 'skills', priority: 10 },
      { pattern: /tell me about your (aws|amazon|cloud) (experience|background|skills)/i, category: 'aws', priority: 10 },
      { pattern: /what (is|are) your (kubernetes|k8s) (experience|skills)/i, category: 'kubernetes', priority: 10 },
      { pattern: /(where|which company) (do you|are you) (work|working) (currently|now|at)/i, category: 'current-work', priority: 10 },
      { pattern: /what (companies|organizations) (have you|did you) work/i, category: 'companies', priority: 9 },
      { pattern: /(tell me about|what are) your (biggest|main|top) (achievements|accomplishments)/i, category: 'achievements', priority: 9 },
      { pattern: /what (are|is) your (strengths|strong points)/i, category: 'strengths', priority: 9 },
      { pattern: /what (are|is) your (weaknesses|weak points)/i, category: 'weaknesses', priority: 9 },
      { pattern: /(how much|what is) your (experience|total experience)/i, category: 'experience', priority: 8 },
      { pattern: /what (programming|coding) languages/i, category: 'programming', priority: 8 }
    ];
  }

  findBestMatch(query: string): string {
    let normalizedQuery = query.toLowerCase().trim();
    
    // Apply auto-correction and synonym expansion
    normalizedQuery = this.enhanceQuery(normalizedQuery);
    
    // 1. Pattern-based matching (highest priority)
    const patternMatch = this.findPatternMatch(normalizedQuery);
    if (patternMatch) {
      return patternMatch;
    }

    // 2. Enhanced fuzzy search with better scoring
    const fuzzyResults = this.fuse.search(normalizedQuery);
    if (fuzzyResults.length > 0) {
      const bestMatch = fuzzyResults[0];
      if (bestMatch.score! < 0.3) {
        return bestMatch.item.answer;
      }
    }

    // 3. Contextual matching with intent detection
    const contextMatch = this.findContextualMatch(normalizedQuery);
    if (contextMatch) {
      return contextMatch;
    }

    // 4. Multi-keyword scoring
    const multiKeywordMatch = this.findMultiKeywordMatch(normalizedQuery);
    if (multiKeywordMatch) {
      return multiKeywordMatch;
    }

    // 5. Partial matching with confidence scoring
    const partialMatch = this.findPartialMatch(normalizedQuery);
    if (partialMatch) {
      return partialMatch;
    }

    // 6. Intelligent fallback
    return this.getIntelligentFallback(normalizedQuery);
  }

  private enhanceQuery(query: string): string {
    let enhanced = query;
    
    // Apply corrections
    for (const [wrong, correct] of Object.entries(this.corrections)) {
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      enhanced = enhanced.replace(regex, correct);
    }
    
    // Expand synonyms
    for (const [key, synonyms] of Object.entries(this.synonyms)) {
      for (const synonym of synonyms) {
        if (enhanced.includes(synonym)) {
          enhanced += ` ${key}`;
        }
      }
    }
    
    return enhanced;
  }

  private findPatternMatch(query: string): string | null {
    // Sort patterns by priority
    const sortedPatterns = this.questionPatterns.sort((a, b) => b.priority - a.priority);
    
    for (const { pattern, category } of sortedPatterns) {
      if (pattern.test(query)) {
        const item = chatData.qna.find(item => item.category === category);
        if (item) return item.answer;
      }
    }
    
    return null;
  }

  private findMultiKeywordMatch(query: string): string | null {
    const queryWords = query.split(' ').filter(word => word.length > 2);
    let bestMatch: { item: any; score: number } | null = null;
    
    for (const item of chatData.qna) {
      let score = 0;
      const allText = `${item.question} ${item.keywords.join(' ')} ${item.answer}`.toLowerCase();
      
      for (const word of queryWords) {
        if (allText.includes(word)) {
          score += word.length; // Longer words get higher scores
        }
      }
      
      // Bonus for exact keyword matches
      for (const keyword of item.keywords) {
        if (query.includes(keyword.toLowerCase())) {
          score += keyword.length * 2;
        }
      }
      
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { item, score };
      }
    }
    
    return bestMatch && bestMatch.score > 8 ? bestMatch.item.answer : null;
  }

  private findPartialMatch(query: string): string | null {
    const queryWords = query.split(' ');
    
    for (const item of chatData.qna) {
      for (const keyword of item.keywords) {
        for (const queryWord of queryWords) {
          if (queryWord.length > 3 && keyword.toLowerCase().includes(queryWord)) {
            return item.answer;
          }
        }
      }
    }
    
    return null;
  }

  private findContextualMatch(query: string): string | null {
    // Handle qualities/strengths/weaknesses
    if ((query.includes('three') || query.includes('3')) && (query.includes('best') || query.includes('top')) && (query.includes('qualities') || query.includes('strength'))) {
      return chatData.qna.find(item => item.category === 'qualities')?.answer || null;
    }
    
    if (query.includes('strength') || query.includes('strong') || (query.includes('good') && query.includes('at'))) {
      return chatData.qna.find(item => item.category === 'strengths')?.answer || null;
    }
    
    if (query.includes('weakness') || query.includes('weak') || query.includes('improve') || query.includes('bad')) {
      return chatData.qna.find(item => item.category === 'weaknesses')?.answer || null;
    }
    
    if (query.includes('unique') || query.includes('different') || query.includes('special')) {
      return chatData.qna.find(item => item.category === 'unique')?.answer || null;
    }
    
    if (query.includes('motivate') || query.includes('drives') || query.includes('passionate')) {
      return chatData.qna.find(item => item.category === 'motivation')?.answer || null;
    }
    
    if (query.includes('stress') || query.includes('pressure') || query.includes('difficult')) {
      return chatData.qna.find(item => item.category === 'stress')?.answer || null;
    }
    
    // Handle work/company related questions
    if (query.includes('work') && (query.includes('where') || query.includes('company') || query.includes('currently'))) {
      return chatData.qna.find(item => item.category === 'current-work')?.answer || null;
    }
    
    // Handle experience + specific technology
    if (query.includes('experience') && query.includes('aws')) {
      return chatData.qna.find(item => item.category === 'aws')?.answer || null;
    }
    
    if (query.includes('experience') && (query.includes('kubernetes') || query.includes('k8s'))) {
      return chatData.qna.find(item => item.category === 'kubernetes')?.answer || null;
    }
    
    // Handle salary/compensation questions
    if (query.includes('salary') || query.includes('compensation') || query.includes('pay')) {
      return chatData.qna.find(item => item.category === 'compensation')?.answer || null;
    }
    
    return null;
  }

  private findCategoryMatch(query: string): string | null {
    const categoryMap: { [key: string]: string[] } = {
      'qualities': ['qualities', 'quality', 'best', 'top'],
      'strengths': ['strength', 'strong', 'good'],
      'weaknesses': ['weakness', 'weak', 'improve', 'bad'],
      'unique': ['unique', 'different', 'special', 'standout'],
      'motivation': ['motivate', 'motivation', 'drives', 'passionate'],
      'stress': ['stress', 'pressure', 'difficult', 'challenging'],
      'skills': ['skill', 'technology', 'tech', 'tool'],
      'experience': ['experience', 'background', 'career'],
      'achievements': ['achievement', 'accomplishment', 'success'],
      'contact': ['contact', 'reach', 'email', 'phone'],
      'education': ['education', 'degree', 'university', 'college'],
      'certifications': ['certification', 'certified', 'credential']
    };
    
    for (const [category, keywords] of Object.entries(categoryMap)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        const item = chatData.qna.find(item => item.category === category);
        if (item) return item.answer;
      }
    }
    
    return null;
  }

  private findKeywordMatch(query: string): string | null {
    let bestMatch: { item: any; score: number } | null = null;
    
    for (const item of chatData.qna) {
      let score = 0;
      for (const keyword of item.keywords) {
        if (query.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords get higher scores
        }
      }
      
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { item, score };
      }
    }
    
    return bestMatch?.item.answer || null;
  }

  private getIntelligentFallback(query: string): string {
    // Analyze query intent and provide contextual fallback
    const queryLower = query.toLowerCase();
    
    if (queryLower.match(/(technical|technology|programming|coding|development)/)) {
      return "I'd be happy to discuss Shashank's technical expertise! He has 4.5+ years of experience with AWS, Kubernetes, Python, and DevOps tools. Try asking about specific technologies like 'AWS experience' or 'Kubernetes skills'. For detailed technical discussions, connect with him at shashank.shukla1202@gmail.com.";
    }
    
    if (queryLower.match(/(career|job|opportunity|role|position)/)) {
      return "Shashank is currently at Nielsen and open to senior DevOps/SRE opportunities. He has experience with cloud infrastructure, automation, and team leadership. For career discussions, reach out at shashank.shukla1202@gmail.com or connect on LinkedIn!";
    }
    
    if (queryLower.match(/(project|work|achievement|accomplishment)/)) {
      return "Shashank has impressive achievements including 95% AWS cost reduction and managing 100+ microservices. Try asking 'What are your biggest achievements?' or 'Tell me about your projects' for detailed information.";
    }
    
    if (queryLower.match(/(contact|email|phone|reach|connect)/)) {
      return "You can reach Shashank at shashank.shukla1202@gmail.com or +91 7737602733. He's also on LinkedIn: linkedin.com/in/shashank-shukla-b84b7a162/ and GitHub: github.com/sh-shukla";
    }
    
    // Suggest better questions
    const suggestions = [
      "Try asking: 'What are your technical skills?'",
      "Ask about: 'Tell me about your AWS experience'",
      "Try: 'What are your biggest achievements?'",
      "Ask: 'Where do you work currently?'"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    return `I didn't quite understand that question. ${randomSuggestion} Or feel free to contact Shashank directly at shashank.shukla1202@gmail.com for detailed discussions!`;
  }

  getSuggestions(): string[] {
    return chatData.suggestions;
  }

  getGreeting(): string {
    const greetings = [
      "👋 Hi there! I'm Shashank's AI assistant. I'm here to help you learn about his DevOps expertise, achievements, and professional background. What would you like to know?",
      "Hello! 🚀 Welcome to Shashank's portfolio. I can share insights about his 4.5+ years of DevOps experience, technical skills, and career achievements. How can I help you today?",
      "Hey! 👨‍💻 I'm here to tell you all about Shashank Shukla - his DevOps journey, AWS expertise, and impressive track record. What interests you most?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

export const chatMatcher = new ChatMatcher();