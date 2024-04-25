import * as React from 'react';

// eslint-disable-next-line patternfly-react/import-tokens-icons
import { MobileAltIcon as Icon1 } from '@patternfly/react-icons';

import {
  ColaLayout,
  ComponentFactory,
  CREATE_CONNECTOR_DROP_TYPE,
  DefaultEdge,
  DefaultGroup,
  DefaultNode,
  Edge,
  EdgeAnimationSpeed,
  EdgeModel,
  EdgeStyle,
  EdgeTerminalType,
  Graph,
  GraphComponent,
  LabelPosition,
  Layout,
  LayoutFactory,
  Model,
  ModelKind,
  Node,
  nodeDragSourceSpec,
  nodeDropTargetSpec,
  NodeModel,
  NodeShape,
  NodeStatus,
  SELECTION_EVENT,
  TopologySideBar,
  TopologyView,
  Visualization,
  VisualizationProvider,
  VisualizationSurface,
  withContextMenu,
  WithContextMenuProps,
  ContextMenuSeparator,
  ContextMenuItem,
  withDndDrop,
  withDragNode,
  WithDragNodeProps,
  withSelection,
  WithSelectionProps
} from '@patternfly/react-topology';

interface CustomNodeProps {
  element: Node;
}

interface DataEdgeProps {
  element: Edge;
}

const CONNECTOR_SOURCE_DROP = 'connector-src-drop';
const CONNECTOR_TARGET_DROP = 'connector-target-drop';

const DataEdge: React.FC<DataEdgeProps> = ({ element, ...rest }) => (
  <DefaultEdge
    element={element}
    startTerminalType={EdgeTerminalType.cross}
    endTerminalType={EdgeTerminalType.directionalAlt}
    {...rest}
  />
);

const CustomNode: React.FC<CustomNodeProps & WithSelectionProps & WithDragNodeProps & WithContextMenuProps> = ({
  element,
  selected,
  onContextMenu, 
  contextMenuOpen,
  onSelect,
  ...rest
}) => {
  const Icon = Icon1;

  return (
    <DefaultNode
      element={element}
      onContextMenu={onContextMenu}
      contextMenuOpen={contextMenuOpen}
      showStatusDecorator
      selected={selected}
      onSelect={onSelect}
      labelPosition={LabelPosition.right}
      {...rest}
    >
      <g transform={`translate(25, 25)`}>
        <Icon style={{ color: '#393F44' }} width={25} height={25} />
      </g>
    </DefaultNode>
  );
};

const customLayoutFactory: LayoutFactory = (type: string, graph: Graph): Layout | undefined =>
  new ColaLayout(graph, { layoutOnDrag: false });

const customComponentFactory: ComponentFactory = (kind: ModelKind, type: string) => {
  const contextMenuItem = (label: string, i: number): React.ReactElement => {
    if (label === '-') {
      return <ContextMenuSeparator component="li" key={`separator:${i.toString()}`} />;
    }
    return (
      // eslint-disable-next-line no-alert
      <ContextMenuItem key={label} onClick={() => alert(`Selected: ${label}`)}>
        {label}
      </ContextMenuItem>
    );
  };

  const createContextMenuItems = (...labels: string[]): React.ReactElement[] => labels.map(contextMenuItem);

  const contextMenu = createContextMenuItems('Start', 'Stop', 'Restart',);
  switch (type) {
    case 'group':
      return DefaultGroup;
    default:
      switch (kind) {
        case ModelKind.graph:
          return GraphComponent;
        case ModelKind.node:
          return withContextMenu(() => contextMenu)(withSelection()(CustomNode));
        case ModelKind.edge:
          return withSelection() (DefaultEdge);
        default:
          return undefined;
      }
  }
};

const NODE_DIAMETER = 75;

const NODES: NodeModel[] = [
  {
    id: 'UE',
    type: 'node',
    label: 'UE',
    labelPosition: LabelPosition.bottom,
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.rect,
    status: NodeStatus.danger,
    x: 100,
    y: 100
  },
  {
    id: 'RRU',
    type: 'node',
    label: 'RRU',
    labelPosition: LabelPosition.bottom,
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.ellipse,
    status: NodeStatus.warning,
    x: 400,
    y: 100
  },
  {
    id: 'DU',
    type: 'node',
    label: 'DU',
    labelPosition: LabelPosition.bottom,
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.ellipse,
    status: NodeStatus.warning,
    x: 600,
    y: 100
  },
  {
    id: 'CU',
    type: 'node',
    label: 'CU',
    labelPosition: LabelPosition.bottom,
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.ellipse,
    status: NodeStatus.warning,
    x: 700,
    y: 100
  },
  {
    id: 'AMF',
    type: 'node',
    label: 'AMF',
    labelPosition: LabelPosition.bottom,
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.octagon,
    status: NodeStatus.success,
    x: 1050,
    y: 200
  },
  {
    id: 'UPF',
    type: 'node',
    label: 'UPF',
    labelPosition: LabelPosition.bottom,
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.octagon,
    status: NodeStatus.success,
    x: 1050,
    y: 50
  },
  {
    id: 'Group-1',
    children: ['UE'],
    type: 'group',
    group: true,
    label: 'Fronthaul',
    style: {
      padding: 40
    }
  },
  {
    id: 'Group-2',
    children: ['RRU', 'DU', 'CU'],
    type: 'group',
    group: true,
    label: 'Midhaul',
    style: {
      padding: 40
    }
  },
  {
    id: 'Group-3',
    children: ['AMF', 'UPF'],
    type: 'group',
    group: true,
    label: 'Backhaul',
    style: {
      padding: 40
    }
  }
];

const EDGES: EdgeModel[] = [
  {
    id: `UE to RRU`,
    type: 'data-edge',
    source: 'UE',
    target: 'RRU',
    edgeStyle: EdgeStyle.dashedLg,
    animationSpeed: EdgeAnimationSpeed.mediumSlow
  },
  {
    id: `RRU to DU`,
    type: 'data-edge',
    source: 'RRU',
    target: 'DU',
    edgeStyle: EdgeStyle.dashedLg,
    animationSpeed: EdgeAnimationSpeed.mediumSlow
  },
  {
    id: `DU to CU`,
    type: 'data-edge',
    source: 'DU',
    target: 'CU',
    edgeStyle: EdgeStyle.dashedLg,
    animationSpeed: EdgeAnimationSpeed.mediumSlow
  },
  {
    id: `CU to AMF`,
    type: 'data-edge',
    source: 'CU',
    target: 'AMF',
    edgeStyle: EdgeStyle.dashedLg,
    animationSpeed: EdgeAnimationSpeed.mediumSlow
  },
  {
    id: `CU to UPF`,
    type: 'data-edge',
    source: 'CU',
    target: 'UPF',
    edgeStyle: EdgeStyle.dashedLg,
    animationSpeed: EdgeAnimationSpeed.mediumSlow
  }
];

export const TopologyCustomEdgeDemo: React.FC = () => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const controller = React.useMemo(() => {
    const model: Model = {
      nodes: NODES,
      edges: EDGES,
      graph: {
        id: 'g1',
        type: 'graph',
        layout: 'Cola'
      }
    };

    const newController = new Visualization();
    newController.registerLayoutFactory(customLayoutFactory);
    newController.registerComponentFactory(customComponentFactory);

    newController.addEventListener(SELECTION_EVENT, setSelectedIds);

    newController.fromModel(model, false);

    return newController;
  }, []);

  const topologySideBar = (
    <TopologySideBar
      className="topology-example-sidebar"
      show={selectedIds.length > 0}
      onClose={() => setSelectedIds([])}
    >
      <div style={{ marginTop: 27, marginLeft: 20, height: '800px' }}>{selectedIds[0]}</div>
    </TopologySideBar>
  );

  return (
    <TopologyView sideBar={topologySideBar}>
      <VisualizationProvider controller={controller}>
        <VisualizationSurface state={{ selectedIds }} />
      </VisualizationProvider>
    </TopologyView>
  );
};
export default TopologyCustomEdgeDemo;