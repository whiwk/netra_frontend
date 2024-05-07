import React, { useState, useRef } from 'react';
import {
  TextInput,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement
} from '@patternfly/react-core';
import {  Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,} from '@patternfly/react-table'

// Define the Repository interface for table data
interface Repository {
  keys: string;
  value: string;
}

// Define the possible table keys
type TableKey = 'CU' | 'DU' | 'RU';

// Map of data for each table type
const tableData: Record<TableKey, Repository[]> = {
  CU: [
    { keys: 'cu_id', value: '' },
    { keys: 'cell_id', value: '' },
    { keys: 'f1_int', value: '' },
    { keys: 'f1_cuport', value: '' }
  ],
  DU: [
    { keys: 'f1_duport', value: '' },
    { keys: 'n2_int', value: '' },
    { keys: 'n3_int', value: '' }
  ],
  RU: [
    { keys: 'mcc', value: '' },
    { keys: 'mnc', value: '' },
    { keys: 'tac', value: '' },
    { keys: 'sst', value: '' },
    { keys: 'amf_host', value: '' }
  ]
};

const DynamicTable: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<TableKey>('CU');
  const [repositories, setRepositories] = useState<Repository[]>(tableData.CU);
//   const toggleRef = useRef<MenuToggleElement>(null);

  const onToggleClick = () => setIsOpen(!isOpen);

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number) => {
    const tableKey = value as TableKey;
    setIsOpen(false);
    setSelectedTable(tableKey);
    setRepositories(tableData[tableKey]);
  };

  const handleValueChange = (value: string, index: number) => {
    const updatedRepositories = [...repositories];
    updatedRepositories[index].value = value;
    setRepositories(updatedRepositories);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isOpen}
        onSelect={onSelect}
        onOpenChange={setIsOpen}
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
          Component
        </MenuToggle>
        )}
        ouiaId="BasicDropdown"
        shouldFocusToggleOnSelect
      >
        <DropdownList>
          <DropdownItem value="CU" key="CU">CU</DropdownItem>
          <DropdownItem value="DU" key="DU">DU</DropdownItem>
          <DropdownItem value="RU" key="RU">RU</DropdownItem>
        </DropdownList>
      </Dropdown>
      <Table
        aria-label={`${selectedTable} Table`}
        variant="compact"
        borders={true}
      >
        <Thead>
          <Tr>
            <Th>Keys</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repositories.map((repo, index) => (
            <Tr key={index}>
              <Td dataLabel="Keys">{repo.keys}</Td>
              <Td dataLabel="Value">
                <TextInput
                  value={repo.value || ''}
                  type="text"
                  onChange={(e) => handleValueChange(e.currentTarget.value, index)}
                  aria-label={`Text input for ${repo.keys}`}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export default DynamicTable;
