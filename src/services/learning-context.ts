// Learning Context Service for Educational Features
import { relationshipMap } from '../constants/relationships';

interface LearningTip {
  id: string;
  category: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  relatedItems: string[];
  references?: string[];
}

interface UserProgress {
  userId: string;
  completedTips: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  strengths: string[];
  areasForImprovement: string[];
  lastAssessment: Date;
}

class LearningContextService {
  private static instance: LearningContextService;
  private learningTips: Map<string, LearningTip> = new Map();
  private userProgress: UserProgress | null = null;

  private constructor() {
    this.initializeLearningContent();
    this.loadUserProgress();
  }

  static getInstance(): LearningContextService {
    if (!LearningContextService.instance) {
      LearningContextService.instance = new LearningContextService();
    }
    return LearningContextService.instance;
  }

  // Get contextual learning tip based on selected items
  getContextualTip(selectedItems: string[]): LearningTip | null {
    // Find relevant tips based on selected items
    for (const [id, tip] of this.learningTips) {
      const hasRelatedItem = tip.relatedItems.some(item => 
        selectedItems.includes(item)
      );
      
      if (hasRelatedItem && !this.isTipCompleted(id)) {
        return tip;
      }
    }
    
    return null;
  }

  // Get tips for specific category
  getTipsByCategory(category: string): LearningTip[] {
    const tips: LearningTip[] = [];
    
    for (const tip of this.learningTips.values()) {
      if (tip.category === category) {
        tips.push(tip);
      }
    }
    
    return tips.sort((a, b) => {
      // Sort by level: beginner first
      const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
      return levelOrder[a.level] - levelOrder[b.level];
    });
  }

  // Mark tip as completed
  markTipCompleted(tipId: string): void {
    if (!this.userProgress) {
      this.userProgress = this.createDefaultProgress();
    }
    
    if (!this.userProgress.completedTips.includes(tipId)) {
      this.userProgress.completedTips.push(tipId);
      this.saveUserProgress();
      this.updateSkillLevel();
    }
  }

  // Check if tip is completed
  isTipCompleted(tipId: string): boolean {
    return this.userProgress?.completedTips.includes(tipId) || false;
  }

  // Get user's skill level
  getSkillLevel(): 'beginner' | 'intermediate' | 'advanced' {
    return this.userProgress?.skillLevel || 'beginner';
  }

  // Get learning recommendations
  getRecommendations(): LearningTip[] {
    const level = this.getSkillLevel();
    const recommendations: LearningTip[] = [];
    
    for (const tip of this.learningTips.values()) {
      if (tip.level === level && !this.isTipCompleted(tip.id)) {
        recommendations.push(tip);
      }
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  }

  // Analyze user's documentation patterns
  analyzeDocumentationPatterns(selectedItems: Record<string, any>): {
    strengths: string[];
    improvements: string[];
  } {
    const itemCategories = new Map<string, number>();
    
    // Count items by category
    Object.keys(selectedItems).forEach(key => {
      const [category] = key.split('-');
      itemCategories.set(category, (itemCategories.get(category) || 0) + 1);
    });
    
    const strengths: string[] = [];
    const improvements: string[] = [];
    
    // Analyze patterns
    if (itemCategories.get('assessment') || 0 > 5) {
      strengths.push('Comprehensive assessment documentation');
    } else {
      improvements.push('Include more assessment details');
    }
    
    if (itemCategories.get('situation') || 0 > 3) {
      strengths.push('Good situation awareness');
    }
    
    if (!itemCategories.has('recommendation')) {
      improvements.push('Add recommendations for next shift');
    }
    
    return { strengths, improvements };
  }

  // Private methods
  private initializeLearningContent(): void {
    // Initialize with educational content
    const tips: LearningTip[] = [
      {
        id: 'tip_sbar_basics',
        category: 'SBAR',
        title: 'SBAR Framework Basics',
        content: 'SBAR (Situation, Background, Assessment, Recommendation) is a communication framework that ensures complete and accurate information transfer during handoffs.',
        level: 'beginner',
        relatedItems: ['SBAR'],
        references: ['IHI.org', 'Joint Commission']
      },
      {
        id: 'tip_vital_trends',
        category: 'Vitals',
        title: 'Documenting Vital Sign Trends',
        content: 'Always document vital sign trends rather than single values. This helps identify deterioration patterns early.',
        level: 'intermediate',
        relatedItems: ['BP', 'HR', 'RR', 'Temp', 'O2'],
        references: ['AHA Guidelines']
      },
      {
        id: 'tip_pain_assessment',
        category: 'Assessment',
        title: 'Comprehensive Pain Assessment',
        content: 'Document pain using PQRST: Provocation, Quality, Region/Radiation, Severity, and Timing.',
        level: 'beginner',
        relatedItems: ['Pain Scale', 'Pain Location', 'Pain Meds'],
        references: ['Pain Management Guidelines']
      },
      {
        id: 'tip_fall_prevention',
        category: 'Safety',
        title: 'Fall Risk Documentation',
        content: 'When documenting fall risk, include: mobility status, cognitive state, medications, and environmental factors.',
        level: 'intermediate',
        relatedItems: ['Fall Risk', 'Confused', 'Bed Alarm', 'Assist x1', 'Assist x2'],
        references: ['CMS Fall Prevention']
      },
      {
        id: 'tip_cardiac_assessment',
        category: 'Cardiac',
        title: 'Cardiac Rhythm Documentation',
        content: 'Document rhythm, rate, and any ectopy. Include telemetry alarms and interventions.',
        level: 'advanced',
        relatedItems: ['SR', 'AF', 'AF RVR', 'PVCs', 'Paced'],
        references: ['ACC/AHA Guidelines']
      },
      {
        id: 'tip_respiratory',
        category: 'Respiratory',
        title: 'Oxygen Therapy Documentation',
        content: 'Document O2 delivery method, flow rate/FiO2, and patient response. Include work of breathing assessment.',
        level: 'beginner',
        relatedItems: ['RA', 'NC', 'FM', 'HFNC', 'BiPAP', 'CPAP', 'Vent'],
        references: ['AARC Clinical Practice Guidelines']
      },
      {
        id: 'tip_neuro_assessment',
        category: 'Neuro',
        title: 'Neurological Status Documentation',
        content: 'Use consistent terminology: A&O x4 (person, place, time, situation). Document any changes from baseline.',
        level: 'beginner',
        relatedItems: ['A&O x4', 'A&O x3', 'Confused', 'Sedated'],
        references: ['Neurological Assessment Standards']
      },
      {
        id: 'tip_medication_safety',
        category: 'Medications',
        title: 'High-Alert Medication Documentation',
        content: 'For high-alert meds (insulin, heparin, opioids), document: dose, route, time, and patient response.',
        level: 'advanced',
        relatedItems: ['Insulin', 'Heparin gtt', 'Morphine', 'Dilaudid', 'Fentanyl'],
        references: ['ISMP High-Alert Medications']
      },
      {
        id: 'tip_skin_assessment',
        category: 'Skin',
        title: 'Pressure Injury Prevention',
        content: 'Document skin assessment every shift, including Braden score and prevention interventions.',
        level: 'intermediate',
        relatedItems: ['Intact', 'Stage 1', 'Stage 2', 'Braden Score'],
        references: ['NPUAP Guidelines']
      },
      {
        id: 'tip_discharge_planning',
        category: 'Planning',
        title: 'Effective Discharge Documentation',
        content: 'Start discharge planning on admission. Document barriers, education needs, and follow-up requirements.',
        level: 'advanced',
        relatedItems: ['D/C Plan', 'Home', 'SNF', 'Rehab', 'Education'],
        references: ['CMS Discharge Planning']
      }
    ];
    
    tips.forEach(tip => {
      this.learningTips.set(tip.id, tip);
    });
  }

  private createDefaultProgress(): UserProgress {
    return {
      userId: 'default',
      completedTips: [],
      skillLevel: 'beginner',
      strengths: [],
      areasForImprovement: [],
      lastAssessment: new Date()
    };
  }

  private updateSkillLevel(): void {
    if (!this.userProgress) return;
    
    const completedCount = this.userProgress.completedTips.length;
    const totalTips = this.learningTips.size;
    const completionRate = completedCount / totalTips;
    
    if (completionRate >= 0.7) {
      this.userProgress.skillLevel = 'advanced';
    } else if (completionRate >= 0.4) {
      this.userProgress.skillLevel = 'intermediate';
    } else {
      this.userProgress.skillLevel = 'beginner';
    }
    
    this.saveUserProgress();
  }

  private saveUserProgress(): void {
    if (this.userProgress) {
      localStorage.setItem('learning_progress', JSON.stringify(this.userProgress));
    }
  }

  private loadUserProgress(): void {
    const saved = localStorage.getItem('learning_progress');
    if (saved) {
      try {
        this.userProgress = JSON.parse(saved);
      } catch (error) {
        console.error('Failed to load learning progress:', error);
        this.userProgress = this.createDefaultProgress();
      }
    } else {
      this.userProgress = this.createDefaultProgress();
    }
  }
}

export default LearningContextService;