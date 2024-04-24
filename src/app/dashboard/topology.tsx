import * as React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement,
  Split,
  SplitItem,
  ToolbarItem
} from '@patternfly/react-core';
// eslint-disable-next-line patternfly-react/import-tokens-icons
import { RegionsIcon as Icon1, FolderOpenIcon as Icon2 } from '@patternfly/react-icons';
import {
  action,
  createTopologyControlButtons,
  defaultControlButtonsOptions,
  DefaultEdge,
  DefaultGroup,
  DefaultNode,
  GraphComponent,
  GRAPH_LAYOUT_END_EVENT,
  ModelKind,
  NodeModel,
  NodeShape,
  observer,
  TopologyView,
  TopologyControlBar,
  Visualization,
  VisualizationProvider,
  VisualizationSurface,
  ComponentFactory,
  Model,
  Node,
  NodeStatus,
  Graph,
  Layout,
  LayoutFactory,
  ForceLayout,
  ColaLayout,
  ConcentricLayout,
  DagreLayout,
  GridLayout,
  BreadthFirstLayout,
  ColaGroupsLayout,
  withDragNode,
  WithDragNodeProps,
  withPanZoom
} from '@patternfly/react-topology';

const NODE_DIAMETER = 75;
const NODE_SHAPE = NodeShape.ellipse;

const NODES: NodeModel[] = [
  {
    id: 'node-0',
    type: 'node',
    label: 'UE',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.rhombus,
    status: NodeStatus.info,
    data: {
      isAlternate: false
    }
  },
  {
    id: 'node-1',
    type: 'node',
    label: 'Node 1',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NODE_SHAPE,
    status: NodeStatus.success,
    data: {
      isAlternate: false
    }
  },
  {
    id: 'node-2',
    type: 'node',
    label: 'Node 2',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NODE_SHAPE,
    status: NodeStatus.warning,
    data: {
      isAlternate: true
    }
  },
  {
    id: 'node-3',
    type: 'node',
    label: 'Node 3',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NODE_SHAPE,
    status: NodeStatus.info,
    data: {
      isAlternate: false
    }
  },
  {
    id: 'node-4',
    type: 'node',
    label: 'Node 4',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NODE_SHAPE,
    status: NodeStatus.default,
    data: {
      isAlternate: true
    }
  },
  {
    id: 'node-5',
    type: 'node',
    label: 'Node 5',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NODE_SHAPE,
    data: {
      isAlternate: false
    }
  },
  {
    id: 'Group-1',
    children: ['node-0', 'node-1', 'node-2'],
    type: 'group',
    group: true,
    label: 'Group-1',
    style: {
      padding: 40
    }
  }
];

const EDGES = [
  {
    id: 'edge-node-4-node-5',
    type: 'edge',
    source: 'node-4',
    target: 'node-5'
  },
  {
    id: 'edge-node-0-node-2',
    type: 'edge',
    source: 'node-0',
    target: 'node-2'
  }
];

const customLayoutFactory: LayoutFactory = (type: string, graph: Graph): Layout | undefined => {
  switch (type) {
    case 'BreadthFirst':
      return new BreadthFirstLayout(graph);
    case 'Cola':
      return new ColaLayout(graph);
    case 'ColaNoForce':
      return new ColaLayout(graph, { layoutOnDrag: false });
    case 'Concentric':
      return new ConcentricLayout(graph);
    case 'Dagre':
      return new DagreLayout(graph);
    case 'Force':
      return new ForceLayout(graph);
    case 'Grid':
      return new GridLayout(graph);
    case 'ColaGroups':
      return new ColaGroupsLayout(graph, { layoutOnDrag: false });
    default:
      return new ColaLayout(graph, { layoutOnDrag: false });
  }
};

type CustomNodeProps = {
  element: Node;
} & WithDragNodeProps;

const CustomNode: React.FC<CustomNodeProps> = observer(({ element, ...rest }) => {
  const data = element.getData();
  const Icon = data.isAlternate ? Icon2 : Icon1;

  return (
    <DefaultNode element={element} {...rest}>
      <g transform={`translate(25, 25)`}>
        <Icon style={{ color: '#393F44' }} width={25} height={25} />
      </g>
    </DefaultNode>
  );
});

const customComponentFactory: ComponentFactory = (kind: ModelKind, type: string) => {
  switch (type) {
    case 'group':
      return DefaultGroup;
    default:
      switch (kind) {
        case ModelKind.graph:
          return withPanZoom()(GraphComponent);
        case ModelKind.node:
          return withDragNode()(CustomNode);
        case ModelKind.edge:
          return DefaultEdge;
        default:
          return undefined;
      }
  }
};

export const LayoutsDemo: React.FC = () => {
  const [layoutDropdownOpen, setLayoutDropdownOpen] = React.useState(false);
  const [layout, setLayout] = React.useState<string>('ColaNoForce');

  const controller = React.useMemo(() => {
    const model: Model = {
      nodes: NODES,
      edges: EDGES,
      graph: {
        id: 'g1',
        type: 'graph',
        layout: 'ColaNoForce'
      }
    };

    const newController = new Visualization();
    newController.registerLayoutFactory(customLayoutFactory);
    newController.registerComponentFactory(customComponentFactory);

    newController.addEventListener(GRAPH_LAYOUT_END_EVENT, () => {
      newController.getGraph().fit(80);
    });

    newController.fromModel(model, false);
    return newController;
  }, []);

  const updateLayout = (newLayout: string) => {
    setLayout(newLayout);
    setLayoutDropdownOpen(false);
  };

  React.useEffect(() => {
    if (controller && controller.getGraph().getLayout() !== layout) {
      const model: Model = {
        nodes: NODES,
        edges: EDGES,
        graph: {
          id: 'g1',
          type: 'graph',
          layout
        }
      };

      controller.fromModel(model, false);
    }
  }, [controller, layout]);


  return (
    <TopologyView
      controlBar={
        <TopologyControlBar
          controlButtons={createTopologyControlButtons({
            ...defaultControlButtonsOptions,
            zoomInCallback: action(() => {
              controller.getGraph().scaleBy(4 / 3);
            }),
            zoomOutCallback: action(() => {
              controller.getGraph().scaleBy(0.75);
            }),
            fitToScreenCallback: action(() => {
              controller.getGraph().fit(80);
            }),
            resetViewCallback: action(() => {
              controller.getGraph().reset();
              controller.getGraph().layout();
            }),
            legend: false
          })}
        />
      }
    >
      <VisualizationProvider controller={controller}>
        <VisualizationSurface />
      </VisualizationProvider>
    </TopologyView>
  );
};

export default LayoutsDemo;

