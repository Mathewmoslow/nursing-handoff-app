import React from 'react';
import { Brain, Lightbulb, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { AIAnalysis } from '../../utils/smartLogic';
import './AIInsights.css';

interface AIInsightsProps {
  analysis: AIAnalysis | null;
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  analysis,
  isLoading,
  error,
  darkMode
}) => {
  if (!analysis && !isLoading && !error) return null;

  return (
    <div className={`ai-insights-panel ${darkMode ? 'dark' : ''}`}>
      <div className="ai-header">
        <Brain size={18} />
        <h3>AI Clinical Insights</h3>
        {analysis && (
          <span className="confidence-badge">
            {Math.round(analysis.confidence * 100)}% confidence
          </span>
        )}
      </div>

      {isLoading && (
        <div className="ai-loading">
          <div className="spinner" />
          <span>Analyzing clinical patterns...</span>
        </div>
      )}

      {error && (
        <div className="ai-error">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {analysis && (
        <div className="ai-content">
          {analysis.clinicalInsights.length > 0 && (
            <div className="insight-section">
              <h4>
                <Lightbulb size={14} />
                Key Insights
              </h4>
              <ul>
                {analysis.clinicalInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.riskFactors.length > 0 && (
            <div className="insight-section risk">
              <h4>
                <AlertTriangle size={14} />
                Risk Factors
              </h4>
              <ul>
                {analysis.riskFactors.map((risk, idx) => (
                  <li key={idx}>{risk}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.predictedNextSteps.length > 0 && (
            <div className="insight-section">
              <h4>
                <TrendingUp size={14} />
                Predicted Next Steps
              </h4>
              <ul>
                {analysis.predictedNextSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.customProtocols.length > 0 && (
            <div className="insight-section">
              <h4>
                <Shield size={14} />
                Recommended Protocols
              </h4>
              <ul>
                {analysis.customProtocols.map((protocol, idx) => (
                  <li key={idx}>{protocol}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.hiddenConnections.length > 0 && (
            <div className="insight-section">
              <h4>
                <Brain size={14} />
                Hidden Connections
              </h4>
              <ul>
                {analysis.hiddenConnections.map((connection, idx) => (
                  <li key={idx}>{connection}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
