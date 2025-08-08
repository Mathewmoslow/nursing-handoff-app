import { SelectedItem, Patient } from '../types/index';

// AI Service Types
export interface AIProvider {
  analyze(prompt: string): Promise<any>;
  isConfigured(): boolean;
}

export interface AIAnalysisResult {
  hiddenConnections: string[];
  predictedNextSteps: string[];
  customProtocols: string[];
  riskFactors: string[];
  clinicalInsights: string[];
  confidence: number;
}

// OpenAI Provider
class OpenAIProvider implements AIProvider {
  private apiKey: string | undefined;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.model = process.env.REACT_APP_AI_MODEL || 'gpt-4';
    this.temperature = parseFloat(process.env.REACT_APP_AI_TEMPERATURE || '0.7');
    this.maxTokens = parseInt(process.env.REACT_APP_AI_MAX_TOKENS || '2000');
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async analyze(prompt: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are an expert clinical decision support AI assistant trained in nursing SBAR methodology. 
            Analyze patient data and provide evidence-based recommendations following best practices.
            Focus on patient safety, clinical protocols, and nursing interventions.
            Provide specific, actionable insights based on the current clinical picture.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: this.temperature,
        max_tokens: this.maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    return response.json();
  }
}

// Anthropic Provider
class AnthropicProvider implements AIProvider {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async analyze(prompt: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    return response.json();
  }
}

// Azure OpenAI Provider
class AzureOpenAIProvider implements AIProvider {
  private apiKey: string | undefined;
  private endpoint: string | undefined;
  private deploymentName: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
    this.endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
    this.deploymentName = process.env.REACT_APP_AZURE_DEPLOYMENT_NAME || 'gpt-4';
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.endpoint);
  }

  async analyze(prompt: string): Promise<any> {
    if (!this.apiKey || !this.endpoint) {
      throw new Error('Azure OpenAI not configured');
    }

    const url = `${this.endpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=2023-05-15`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.apiKey
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are an expert clinical decision support AI...'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Azure OpenAI API error: ${response.statusText}`);
    }

    return response.json();
  }
}

// AI Service Factory
class AIService {
  private provider: AIProvider;
  private isEnabled: boolean;
  private fallbackToRules: boolean;

  constructor() {
    this.isEnabled = process.env.REACT_APP_ENABLE_AI === 'true';
    this.fallbackToRules = process.env.REACT_APP_AI_FALLBACK_TO_RULES !== 'false';
    
    // Select provider based on available configuration
    if (process.env.REACT_APP_OPENAI_API_KEY) {
      this.provider = new OpenAIProvider();
    } else if (process.env.REACT_APP_ANTHROPIC_API_KEY) {
      this.provider = new AnthropicProvider();
    } else if (process.env.REACT_APP_AZURE_OPENAI_API_KEY) {
      this.provider = new AzureOpenAIProvider();
    } else {
      this.provider = new OpenAIProvider(); // Default, will fail isConfigured()
    }
  }

  async analyzePatientContext(
    selectedItems: Record<string, SelectedItem>,
    patient: Patient
  ): Promise<AIAnalysisResult> {
    if (!this.isEnabled || !this.provider.isConfigured()) {
      if (this.fallbackToRules) {
        return this.ruleBasedAnalysis(selectedItems, patient);
      }
      throw new Error('AI service not enabled or configured');
    }

    try {
      const prompt = this.buildAnalysisPrompt(selectedItems, patient);
      const response = await this.provider.analyze(prompt);
      return this.parseAIResponse(response);
    } catch (error) {
      console.error('AI analysis failed:', error);
      if (this.fallbackToRules) {
        return this.ruleBasedAnalysis(selectedItems, patient);
      }
      throw error;
    }
  }

  private buildAnalysisPrompt(
    selectedItems: Record<string, SelectedItem>,
    patient: Patient
  ): string {
    const items = Object.values(selectedItems).map(item => 
      `${item.category}: ${item.item}`
    ).join(', ');

    const vitals = Object.entries(patient.vitals).map(([key, value]) => 
      `${key}: ${value}`
    ).join(', ');

    const labs = Object.entries(patient.labs).map(([key, value]) => 
      `${key}: ${value}`
    ).join(', ');

    return `
Analyze this patient's clinical picture and provide insights:

Patient Information:
- Age: ${patient.age}
- Allergies: ${patient.allergies.join(', ')}
- Code Status: ${patient.code}

Current Selections:
${items}

Vital Signs:
${vitals || 'None recorded'}

Lab Results:
${labs || 'None recorded'}

Please provide:
1. Hidden clinical connections not immediately obvious
2. Predicted next clinical steps based on current pattern
3. Custom protocol recommendations specific to this patient
4. Risk factors to monitor
5. Key clinical insights

Format your response as JSON with these keys:
{
  "hiddenConnections": [],
  "predictedNextSteps": [],
  "customProtocols": [],
  "riskFactors": [],
  "clinicalInsights": [],
  "confidence": 0.0-1.0
}
`;
  }

  private parseAIResponse(response: any): AIAnalysisResult {
    try {
      // Handle different provider response formats
      let content: string;
      
      if (response.choices && response.choices[0]) {
        // OpenAI/Azure format
        content = response.choices[0].message.content;
      } else if (response.content && response.content[0]) {
        // Anthropic format
        content = response.content[0].text;
      } else {
        throw new Error('Unknown response format');
      }

      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback parsing if not proper JSON
      return {
        hiddenConnections: this.extractListFromText(content, 'connections'),
        predictedNextSteps: this.extractListFromText(content, 'next steps'),
        customProtocols: this.extractListFromText(content, 'protocols'),
        riskFactors: this.extractListFromText(content, 'risk'),
        clinicalInsights: this.extractListFromText(content, 'insights'),
        confidence: 0.7
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.getEmptyAnalysis();
    }
  }

  private extractListFromText(text: string, keyword: string): string[] {
    // Simple extraction logic - can be enhanced
    const lines = text.split('\n');
    const items: string[] = [];
    let capturing = false;
    
    for (const line of lines) {
      if (line.toLowerCase().includes(keyword)) {
        capturing = true;
        continue;
      }
      if (capturing && line.trim().startsWith('-')) {
        items.push(line.trim().substring(1).trim());
      } else if (capturing && line.trim() === '') {
        break;
      }
    }
    
    return items;
  }

  private ruleBasedAnalysis(
    selectedItems: Record<string, SelectedItem>,
    patient: Patient
  ): AIAnalysisResult {
    const items = Object.values(selectedItems).map(s => s.item);
    const result: AIAnalysisResult = {
      hiddenConnections: [],
      predictedNextSteps: [],
      customProtocols: [],
      riskFactors: [],
      clinicalInsights: [],
      confidence: 0.5
    };

    // Rule-based pattern recognition
    if (items.includes('Fever') && items.includes('Hypotensive')) {
      result.riskFactors.push('High risk for sepsis - monitor closely');
      result.predictedNextSteps.push('Blood Cultures', 'Lactate Level', 'Antibiotics');
      result.customProtocols.push('Initiate Sepsis Bundle');
    }

    if (items.includes('Chest Pain') && items.includes('SOB')) {
      result.hiddenConnections.push('Possible cardiac vs pulmonary etiology');
      result.predictedNextSteps.push('EKG', 'Troponin', 'D-dimer');
      result.clinicalInsights.push('Consider both ACS and PE in differential');
    }

    if (patient.age && parseInt(patient.age) > 65) {
      result.riskFactors.push('Geriatric patient - consider polypharmacy');
      result.clinicalInsights.push('Adjust protocols for elderly population');
    }

    return result;
  }

  private getEmptyAnalysis(): AIAnalysisResult {
    return {
      hiddenConnections: [],
      predictedNextSteps: [],
      customProtocols: [],
      riskFactors: [],
      clinicalInsights: [],
      confidence: 0
    };
  }
}

// Export singleton instance
export const aiService = new AIService();