import React, { useEffect, useRef, useState } from 'react';
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

interface Node {
  id: string;
  x?: number;
  y?: number;
  z?: number;
  fx?: number | null;
  fy?: number | null;
  type: 'selected' | 'suggested' | 'stat';
  label: string;
  category?: string;
  color?: string;
  key: string;
}

interface Link {
  source: string | Node;
  target: string | Node;
  strength: number;
  type: 'connection' | 'suggestion';
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
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);

  const getCategoryColor = (category: string): string => {
    return sbarCategories[category]?.color || '#6b7280';
  };

  useEffect(() => {
    // Build nodes and links from selected and related items
    const newNodes: Node[] = [];
    const newLinks: Link[] = [];
    const nodeMap = new Map<string, Node>();

    // Add selected items as nodes
    Object.entries(selectedItems).forEach(([key, item]) => {
      const node: Node = {
        id: key,
        type: 'selected',
        label: item.item,
        category: item.category,
        color: getCategoryColor(item.category),
        key: key
      };
      newNodes.push(node);
      nodeMap.set(key, node);
    });

    // Add suggested items as nodes
    Object.entries(relatedItems).forEach(([key, relation]) => {
      if (!dismissedSuggestions[key]) {
        const node: Node = {
          id: key,
          type: relation.score > 0.8 ? 'stat' : 'suggested',
          label: relation.item,
          color: '#f59e0b',
          key: key
        };
        newNodes.push(node);
        nodeMap.set(key, node);
      }
    });

    // Create links between related nodes
    newNodes.forEach((node1, i) => {
      newNodes.slice(i + 1).forEach(node2 => {
        if (node1.type === 'selected' && node2.type === 'selected') {
          const item1 = selectedItems[node1.key]?.item;
          const item2 = selectedItems[node2.key]?.item;
          if (item1 && item2) {
            const score = relationshipMap[item1]?.[item2] || relationshipMap[item2]?.[item1] || 0;
            if (score > 0.3) {
              newLinks.push({
                source: node1.id,
                target: node2.id,
                strength: score,
                type: 'connection'
              });
            }
          }
        }
      });
    });

    // Add links from selected to suggested
    Object.entries(relatedItems).forEach(([targetKey, relation]) => {
      if (!dismissedSuggestions[targetKey]) {
        // Find source node
        const sourceNode = newNodes.find(n => {
          const item = selectedItems[n.key];
          return item && item.item === relation.source;
        });
        
        if (sourceNode) {
          newLinks.push({
            source: sourceNode.id,
            target: targetKey,
            strength: relation.score,
            type: 'suggestion'
          });
        }
      }
    });

    setNodes(newNodes);
    setLinks(newLinks);
  }, [selectedItems, relatedItems, dismissedSuggestions, sbarCategories]);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create force simulation with 3D-like behavior
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links)
        .id(d => d.id)
        .distance(d => 100 / (d.strength || 1))
        .strength(d => d.strength || 0.5))
      .force('charge', d3.forceManyBody()
        .strength(d => d.type === 'selected' ? -300 : -150))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collision', d3.forceCollide()
        .radius(d => d.type === 'selected' ? 40 : 30))
      .force('x', d3.forceX(centerX).strength(0.05))
      .force('y', d3.forceY(centerY).strength(0.05));

    // Store simulation reference
    simulationRef.current = simulation;

    // Create link elements
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => d.type === 'suggestion' ? '#f59e0b' : '#3b82f6')
      .attr('stroke-opacity', d => Math.max(0.3, d.strength * 0.8))
      .attr('stroke-width', d => Math.max(1, d.strength * 3))
      .attr('stroke-dasharray', d => d.type === 'suggestion' ? '5,5' : 'none');

    // Create node container
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('class', d => `node-group ${d.type}`)
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

    // Add circles for nodes
    node.append('circle')
      .attr('r', d => d.type === 'selected' ? 25 : 20)
      .attr('fill', d => d.color || '#6b7280')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // Add labels
    node.append('text')
      .text(d => d.label)
      .attr('x', 0)
      .attr('y', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', '10px')
      .style('font-weight', '600')
      .style('pointer-events', 'none');

    // Add category labels for selected nodes
    node.filter(d => d.type === 'selected')
      .append('text')
      .text(d => d.category || '')
      .attr('x', 0)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.color || '#666')
      .style('font-size', '8px')
      .style('text-transform', 'uppercase')
      .style('pointer-events', 'none');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x || 0)
        .attr('y1', d => (d.source as Node).y || 0)
        .attr('x2', d => (d.target as Node).x || 0)
        .attr('y2', d => (d.target as Node).y || 0);

      node
        .attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
    });

    // Drag functions
    function dragStarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Handle node clicks for suggested items
    node.filter(d => d.type === 'suggested' || d.type === 'stat')
      .on('click', function(event, d) {
        const [cat, sec, itemName] = d.key.split('-');
        if (cat && sec && itemName) {
          onItemSelect(cat, sec, itemName);
        }
      });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, links, onItemSelect]);

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
      
      {nodes.length === 0 ? (
        <div className="empty-map">
          <Brain size={48} />
          <h3>No connections yet</h3>
          <p>Select items to see neural connections</p>
        </div>
      ) : (
        <div className="neural-network" ref={networkRef}>
          <svg className="connections-svg" ref={svgRef}>
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
          </svg>
        </div>
      )}
    </div>
  );
};