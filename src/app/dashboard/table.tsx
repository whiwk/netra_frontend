// import * as React from 'react';
import React, { useState } from 'react';
import { Table, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';//import table for input
import { Card, CardTitle, CardBody, CardFooter, TextInput } from '@patternfly/react-core';
import EditIcon from '@patternfly/react-icons/dist/esm/icons/edit-icon';
import CloneIcon from '@patternfly/react-icons/dist/esm/icons/clone-icon';
import SyncIcon from '@patternfly/react-icons/dist/esm/icons/sync-icon';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownList,
    MenuToggle,
    MenuToggleElement,
    Select,
    SelectList,
    SelectOption,
    Split,
    SplitItem,
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem,
  } from '@patternfly/react-core';
interface Repository {
    keys: string;
    value: any; //ntar diubah ke form
  }

  export const TableBasic: React.FunctionComponent = () => {

    //table
    const modifiers = {
        isCompact: true,
        isFlat: true,
        isRounded: true
      };

      const [repositories, setRepositories] = useState<Repository[]>([
        { keys: 'cu_id', value: ''},
        { keys: 'cell_id', value: ''},
        { keys: 'f1_int', value: ''},
        { keys: 'f1_cuport', value: ''},
        { keys: 'f1_duport', value: ''},
        { keys: 'n2_int', value: ''},
        { keys: 'n3_int', value: ''},
        { keys: 'mcc', value: ''},
        { keys: 'mnc', value: ''},
        { keys: 'tac', value: ''},
        { keys: 'sst', value: ''},
        { keys: 'amf_host', value: ''},
      ]);


      const columnNames = {
        keys: 'Keys',
        value: 'Value',
      };

      const handleValueChange = (value: string, index: number) => {
        const updatedRepositories = [...repositories];
        updatedRepositories[index].value = value;
        setRepositories(updatedRepositories);
      };

return (
    <React.Fragment>
        <Table
        aria-label="Simple table"
        variant="compact"
        borders={true}
        >
        <Thead>
          <Tr>
            <Th>{columnNames.keys}</Th>
            <Th>{columnNames.value}</Th>
          </Tr>
        </Thead>
        <Tbody>
                    {repositories.map((repo, index) => (
                      <Tr key={index}>
                        <Td dataLabel={columnNames.keys}>{repo.keys}</Td>
                        <Td dataLabel={columnNames.value}>
                        <TextInput
                          value={repo.value || ''}
                          type="text"
                          onChange={(_event, value) => handleValueChange(value, index)}
                          aria-label={`text input for ${repo.keys}`}
                        />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
        </Table>
    </React.Fragment>
)
  }

  export default TableBasic;

//   import React, { useState } from 'react';
  // import { TextInput, Toolbar, ToolbarItem, ToolbarContent, Select, SelectList, SelectOption, MenuToggle } from '@patternfly/react-core';
  // import {Table, Thead, Tr, Th, Tbody, Td} from '@patternfly/react-table'
  
  // interface Repository {
  //     keys: string;
  //     value: string;  // Adjust this type as needed
  // }
  
  // type TableKey = 'CU' | 'DU' | 'RU';
  
  // const ToolbarGroupsAndTables: React.FunctionComponent = () => {
  //   const [selectedTable, setSelectedTable] = useState<TableKey>('CU');
  //   const [isExpanded, setIsExpanded] = useState(false);
  
  //   const tableOptions = ['CU', 'DU', 'RU'];
    
  //   const data = {
  //     CU: [
  //       { keys: 'cu_id', value: ''},
  //       { keys: 'cell_id', value: ''},
  //       { keys: 'f1_int', value: ''},
  //       { keys: 'f1_cuport', value: ''},
  //     ],
  //     DU: [
  //       { keys: 'f1_duport', value: ''},
  //       { keys: 'n2_int', value: ''},
  //       { keys: 'n3_int', value: ''},
  //     ],
  //     RU: [
  //       { keys: 'mcc', value: ''},
  //       { keys: 'mnc', value: ''},
  //       { keys: 'tac', value: ''},
  //       { keys: 'sst', value: ''},
  //       { keys: 'amf_host', value: ''},
  //     ]
  //   };
  
  //   const handleValueChange = (value: string, index: number, tableKey: TableKey) => {
  //     const updatedData = [...data[tableKey]];
  //     updatedData[index].value = value;
  //     data[tableKey] = updatedData;
  //   };
  
  //   const onSelect = (event: React.MouseEvent<Element, MouseEvent> | undefined, selection: string) => {
  //     setSelectedTable(selection as TableKey);
  //     setIsExpanded(false);
  //   };
  
  //   return (
  //     <React.Fragment>
  //       <Toolbar id="toolbar-with-dropdown">
  //         <ToolbarContent>
  //           <ToolbarItem>
  //             <Select
  //               toggleId="table-select-toggle"
  //               onToggle={() => setIsExpanded(!isExpanded)}
  //               onSelect={onSelect}
  //               selections={selectedTable}
  //               isOpen={isExpanded}
  //               placeholderText="Select a table"
  //             >
  //               <SelectList>
  //                 {tableOptions.map((option, index) => (
  //                   <SelectOption key={index} value={option}>
  //                     {option}
  //                   </SelectOption>
  //                 ))}
  //               </SelectList>
  //             </Select>
  //           </ToolbarItem>
  //         </ToolbarContent>
  //       </Toolbar>
  //       <Table aria-label={`${selectedTable} Table`} variant="compact" borders={true}>
  //         <Thead>
  //           <Tr>
  //             <Th>Keys</Th>
  //             <Th>Value</Th>
  //           </Tr>
  //         </Thead>
  //         <Tbody>
  //           {data[selectedTable].map((repo, index) => (
  //             <Tr key={index}>
  //               <Td>{repo.keys}</Td>
  //               <Td>
  //                 <TextInput
  //                   value={repo.value}
  //                   type="text"
  //                   onChange={(e) => handleValueChange(e.currentTarget.value, index, selectedTable)}
  //                   aria-label={`Input for ${repo.keys}`}
  //                 />
  //               </Td>
  //             </Tr>
  //           ))}
  //         </Tbody>
  //       </Table>
  //     </React.Fragment>
  //   );
  // };
  
  // export default ToolbarGroupsAndTables;
  