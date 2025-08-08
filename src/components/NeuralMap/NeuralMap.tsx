import React, { useEffect, useRef } from 'react';
import { Brain, Network, Sparkles } from 'lucide-react';
import { SelectedItem, RelatedItem, Category } from '../../types';
import { relationshipMap } from '../../constants/relationships';
import * as d3 from 'd3';
import './NeuralMap.css';

interface NeuralMapProps {
  selectedItems: Record<string, SelectedItem>;
  relatedItems: Record<string, RelatedItem>;
  dismissedSuggestions: Record<string, boolean>;
  sbarCategories: Record<string, Category>;
  onItemSelect: (category: string, section: string, item: string) => void;
  onDismissSuggestion: (key: string, e: React.MouseEvent) => void;
}

export const NeuralMap: React.FC<NeuralMapProps> = ({
  selectedItems,
  relatedItems,
  dismissedSuggestions,
  sbarCategories,
  onItemSelect,
  onDismissSuggestion
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: string): string => {
    return sbarCategories[category]?.color || '#6b7280';
  };


  useEffect(() => {
    if (selectedItems && Object.keys(selectedItems).length > 0 && svgRef.current && networkRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        drawConnections();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems, relatedItems]);

  const drawConnections = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('line').remove();
    svg.selectAll('path').remove();

    if (!networkRef.current || !svgRef.current) return;

    // Draw simple connections using the absolute positions we set
    const selectedKeys = Object.keys(selectedItems);
    const svgRect = svgRef.current.getBoundingClientRect();
    
    // Draw connections between selected items
    selectedKeys.forEach((key1, i) => {
      const node1 = networkRef.current?.querySelector(`[data-key="${key1}"]`);
      if (!node1) return;
      
      selectedKeys.slice(i + 1).forEach(key2 => {
        const node2 = networkRef.current?.querySelector(`[data-key="${key2}"]`);
        if (!node2) return;
        
        const item1 = selectedItems[key1].item;
        const item2 = selectedItems[key2].item;
        
        // Check if these items are related
        const score = relationshipMap[item1]?.[item2] || relationshipMap[item2]?.[item1] || 0;
        if (score > 0.3) {
          const rect1 = node1.getBoundingClientRect();
          const rect2 = node2.getBoundingClientRect();
          
          const x1 = rect1.left + rect1.width / 2 - svgRect.left;
          const y1 = rect1.top + rect1.height / 2 - svgRect.top;
          const x2 = rect2.left + rect2.width / 2 - svgRect.left;
          const y2 = rect2.top + rect2.height / 2 - svgRect.top;
          
          svg.append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', Math.max(1, score * 3))
            .attr('opacity', Math.max(0.3, score * 0.8));
        }
      });
    });
    
    // Draw connections from selected to suggested
    Object.entries(relatedItems).forEach(([targetKey, relation]) => {
      if (dismissedSuggestions[targetKey]) return;
      
      const targetNode = networkRef.current?.querySelector(`[data-key="${targetKey}"]`) as Element | null;
      if (!targetNode) return;
      
      // Find source node
      let sourceNode: Element | null = null;
      for (const [key, item] of Object.entries(selectedItems)) {
        if (item.item === relation.source) {
          sourceNode = networkRef.current?.querySelector(`[data-key="${key}"]`) || null;
          break;
        }
      }
      
      if (sourceNode && targetNode) {
        const sourceRect = (sourceNode as Element).getBoundingClientRect();
        const targetRect = (targetNode as Element).getBoundingClientRect();
        
        const x1 = sourceRect.left + sourceRect.width / 2 - svgRect.left;
        const y1 = sourceRect.top + sourceRect.height / 2 - svgRect.top;
        const x2 = targetRect.left + targetRect.width / 2 - svgRect.left;
        const y2 = targetRect.top + targetRect.height / 2 - svgRect.top;
        
        svg.append('line')
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2)
          .attr('stroke', '#f59e0b')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '5,5')
          .attr('opacity', 0.6);
      }
    });
  };

  return (
    <div className="neural-map">
      <div className="map-header">
        <h2>
          <Network size={20} />
          Neural Connections Map
        </h2>
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-dot primary"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot suggested"></div>
            <span>Suggested</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot stat"></div>
            <span>STAT/Urgent</span>
          </div>
          <div className="legend-item">
            <div className="legend-line"></div>
            <span>Connection</span>
          </div>
        </div>
      </div>
      
      {Object.keys(selectedItems).length === 0 ? (
        <div className="empty-map">
          <Brain size={48} />
          <h3>No connections yet</h3>
          <p>Select items to see neural connections</p>
        </div>
      ) : (
        <div className="neural-network" ref={networkRef}>
          <svg className="connections-svg" width="100%" height="100%" ref={svgRef}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#f59e0b"
                  opacity="0.6"
                />
              </marker>
            </defs>
            {/* Connection lines would be drawn here with D3.js or similar */}
          </svg>
          
          <div className="neural-nodes">
            {/* Primary selected nodes */}
            {Object.entries(selectedItems).map(([key, item], index) => {
              const totalItems = Object.keys(selectedItems).length;
              const angle = (index * 2 * Math.PI) / totalItems - Math.PI / 2; // Start from top
              const radius = Math.min(180, 400 / Math.max(3, totalItems)); // Dynamic radius
              const centerX = 300; // Center of container
              const centerY = 250;
              const x = Math.cos(angle) * radius + centerX;
              const y = Math.sin(angle) * radius + centerY;
              
              return (
                <div 
                  key={key} 
                  className="primary-node"
                  data-key={key}
                  style={{ 
                    '--node-color': getCategoryColor(item.category),
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)'
                  } as React.CSSProperties}
                >
                  <div className="node-content">
                    <span className="node-category">{item.category}</span>
                    <span className="node-item">{item.item}</span>
                  </div>
                </div>
              );
            })}
            
            {/* Suggested nodes */}
            {Object.entries(relatedItems).map(([key, relation], index) => {
              if (dismissedSuggestions[key]) return null;
              
              const activeRelated = Object.keys(relatedItems).filter(k => !dismissedSuggestions[k]);
              const actualIndex = activeRelated.indexOf(key);
              const totalItems = activeRelated.length;
              const angle = (actualIndex * 2 * Math.PI) / totalItems - Math.PI / 2;
              const radius = Math.min(280, 500 / Math.max(3, totalItems));
              const centerX = 300;
              const centerY = 250;
              const x = Math.cos(angle) * radius + centerX;
              const y = Math.sin(angle) * radius + centerY;
              
              return (
                <div
                  key={key}
                  className="suggested-node"
                  data-key={key}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => {
                    // Find the item in formSections to get its category and section
                    const [cat, sec, itemName] = key.split('-');
                    if (cat && sec && itemName) {
                      onItemSelect(cat, sec, itemName);
                    }
                  }}
                >
                  <span className="node-item">{relation.item}</span>
                  <Sparkles size={10} className="sparkle-icon" />
                  <button
                    className="dismiss-node"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDismissSuggestion(key, e);
                    }}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};