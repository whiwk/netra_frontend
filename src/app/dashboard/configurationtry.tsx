import React, { useState } from 'react';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { 
  Button,
  Dropdown, 
  DropdownItem, 
  DropdownList, 
  MenuToggle, 
  MenuToggleElement,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Select, 
  SelectList, 
  SelectOption, 
  TextInput } from '@patternfly/react-core';
import { stringify } from 'querystring';
import { Anybody } from 'next/font/google';

interface Repository {
    keys: string;
    value: any;  // Ideally, replace 'any' with a more specific type
}

type TableKey = 'CU' | 'DU' | 'RU';

interface Tables {
    CU: Repository[];
    DU: Repository[];
    RU: Repository[];
}

export const CombinedComponent: React.FunctionComponent = () => {
  const resourceOptions = ['All resources', 'Deployment', 'Pod'];
  const [resourceIsExpanded, setResourceIsExpanded] = useState(false);
  const [resourceSelected, setResourceSelected] = useState('');
  const [selectedTable, setSelectedTable] = useState('CU');
  const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);
  // const toggleRef = useRef(null);  // Ref for the toggle


const tables: Tables = {
  CU: [{ keys: 'mcc', value: '' }, { keys: 'ip_f1_cu', value: '' }],
  DU: [{ keys: 'mcc', value: '' }, { keys: 'ip_f1_du', value: '' }],
  RU: [{ keys: 'mcc', value: '' }, { keys: 'ip_amf', value: '' }],
};

  const handleValueChange = (value: string, index: number, tableKey: TableKey) => {
    const updatedData = tables[tableKey].map((item, idx) => {
        if (idx === index) {
            return { ...item, value };
        }
        return item;
    });
    tables[tableKey] = updatedData;
};

  const updateLayout = (layout: TableKey) => {
    setSelectedTable(layout);
    setLayoutDropdownOpen(false);
  };

  const onResourceToggle = () => {
    setResourceIsExpanded(!resourceIsExpanded);
  };

  const onResourceSelect = (_event: React.MouseEvent | React.ChangeEvent, selection: string) => {
    setResourceSelected(selection);
    setResourceIsExpanded(false);
  };

  return (
    <React.Fragment>
      <Dropdown
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
          <MenuToggle
            ref={toggleRef}
            onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}
            isExpanded={layoutDropdownOpen}
          >
            {selectedTable}
          </MenuToggle>
        )}
        isOpen={layoutDropdownOpen}
      >
        <DropdownList>
          <DropdownItem key="CU" onClick={() => updateLayout('CU')}>CU</DropdownItem>
          <DropdownItem key="DU" onClick={() => updateLayout('DU')}>DU</DropdownItem>
          <DropdownItem key="RU" onClick={() => updateLayout('RU')}>RU</DropdownItem>
        </DropdownList>
      </Dropdown>

      <Select
        toggleId="resource-select-toggle"
        onToggle={onResourceToggle}
        onSelect={onResourceSelect}
        selections={resourceSelected}
        isOpen={resourceIsExpanded}
        placeholderText="Select a resource"
      >
        <SelectList aria-label="Select a resource">
          {resourceOptions.map((option, index) => (
            <SelectOption key={index} value={option}>
              {option}
          </SelectOption>
          ))}
        </SelectList>
      </Select>

      {Object.keys(tables).map((key) => (
        selectedTable === key && (
          <Table key={key} aria-label={`${key} Table`} variant="compact" borders={true}>
            <Thead>
              <Tr>
                <Th>Keys</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tables[key].map((item, index) => (
                <Tr key={index}>
                  <Td>{item.keys}</Td>
                  <Td>
                    <TextInput
                      value={item.value}
                      type="text"
                      onChange={(_event, value) => handleValueChange(value, index, key)}
                      aria-label={`Input for ${item.keys}`}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )
      ))}
    </React.Fragment>
  );
};

export default CombinedComponent;

  // const commonData = [
  //   { keys: 'mcc', value: '' },
  //   { keys: 'mnc', value: '' },
  //   { keys: 'tac', value: '' },
  //   { keys: 'net', value: '' },
  // ];

  //   const handleValueChange = (value: string, index: number, tableKey: string) => {
//     const updatedData = tables[tableKey].map((item, idx) => {
//       if (idx === index) {
//         return { ...item, value };
//       }
//       return item;
//     });
//     tables[tableKey] = updatedData;
//   };