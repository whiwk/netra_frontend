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
  
type ExampleType = 'CU' | 'DU' | 'UE';

  export const TableBasic: React.FunctionComponent = () => {
    //toolbar
    const componentOptions = ['CU', 'DU', 'UE']

    const [componentIsExpanded, setComponentIsExpanded] = React.useState(false);
    const [componentSelected, setComponentSelected] = React.useState('');

    const onToggle = (filterName: string) => {
      switch (filterName) {
        case 'component':
          setComponentIsExpanded(!componentIsExpanded);
          break;
      }
    }

    const onComponentSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, selection: string) => {
      setComponentSelected(selection);
      setComponentIsExpanded(false);
    };

    const filterGroupItems = (
      <React.Fragment>
        <ToolbarItem>
          <Select
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => onToggle('component')}
                isExpanded={componentIsExpanded}
                style={
                  {
                    width: '88px'
                  } as React.CSSProperties
                }
              >
                {componentSelected || 'Component'}
              </MenuToggle>
            )}
            onSelect={onComponentSelect}
            onOpenChange={(isOpen) => setComponentIsExpanded(isOpen)}
            selected={componentSelected}
            isOpen={componentIsExpanded}
          >
            <SelectList>
              {componentOptions.map((option, index) => (
                <SelectOption key={index} value={option}>
                  {option}
                </SelectOption>
              ))}
            </SelectList>
          </Select>
        </ToolbarItem>
      </React.Fragment>
    );

    const items = (
      <React.Fragment>
        <ToolbarGroup variant="filter-group">{filterGroupItems}</ToolbarGroup>
      </React.Fragment>
    );

    //table
    const modifiers = {
        isCompact: true,
        isFlat: true,
        isRounded: true
      };

      // const [repositories, setRepositories] = useState<Repository[]>([
      //   { keys: 'cu_id', value: ''},
      //   { keys: 'cell_id', value: ''},
      //   { keys: 'f1_int', value: ''},
      //   { keys: 'f1_cuport', value: ''},
      //   { keys: 'f1_duport', value: ''},
      //   { keys: 'n2_int', value: ''},
      //   { keys: 'n3_int', value: ''},
      //   { keys: 'mcc', value: ''},
      //   { keys: 'mnc', value: ''},
      //   { keys: 'tac', value: ''},
      //   { keys: 'sst', value: ''},
      //   { keys: 'amf_host', value: ''},
      // ]);

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

      // const cuData = [...commonData, { keys: 'ip_f1_cu', value: '' }];

      const columnNames = {
        keys: 'Keys',
        value: 'Value',
      };

      const handleValueChange = (value: string, index: number) => {
        const updatedRepositories = [...repositories];
        updatedRepositories[index].value = value;
        setRepositories(updatedRepositories);
      };

      // const layoutDropdown = (
      //   <Split>
      //     <SplitItem>
      //       <label className="pf-v5-u-display-inline-block pf-v5-u-mr-md pf-v5-u-mt-sm">Input Configuration</label>
      //     </SplitItem>
      //     <SplitItem>
      //       <Dropdown
      //         toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
      //           <MenuToggle ref={toggleRef} onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}>
      //             {layout}
      //           </MenuToggle>
      //         )}
      //         isOpen={layoutDropdownOpen}
      //       >
      //         <DropdownList>
      //           <DropdownItem key={1} onClick={() => { updateLayout('CU');}}>
      //             CU
      //           </DropdownItem>
      //           <DropdownItem key={2} onClick={() => { updateLayout('DU');}}>
      //             DU
      //           </DropdownItem>
      //           <DropdownItem key={3} onClick={() => { updateLayout('RU');}}>
      //             RU
      //           </DropdownItem>
      //         </DropdownList>
      //       </Dropdown>
      //     </SplitItem>
      //   </Split>
      // );

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

// import React, { useState } from 'react';
// import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
// import { Dropdown, DropdownItem, DropdownList, MenuToggle, TextInput } from '@patternfly/react-core';

// export const TableBasic: React.FunctionComponent = () => {
//   const [selectedTable, setSelectedTable] = useState('CU');
//   const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);

//   // Data for each table. Assume each type has different data requirements
//   const commonData = [
//     { keys: 'mcc', value: '' },
//     { keys: 'mnc', value: '' },
//     { keys: 'tac', value: '' },
//     { keys: 'net', value: '' },
//   ];

//   const cuData = [...commonData, { keys: 'ip_f1_cu', value: '' }];
//   const duData = [...commonData, { keys: 'ip_f1_du', value: '' }];
//   const ruData = [...commonData, { keys: 'ip_amf', value: '' }];

//   const tables = {
//     CU: cuData,
//     DU: duData,
//     RU: ruData,
//   };

//   const handleValueChange = (value: string, index: number) => {
//     const updatedData = [...tables[selectedTable]];
//     updatedData[index].value = value;
//     tables[selectedTable] = updatedData;
//   };

//   const updateLayout = (layout: string) => {
//     setSelectedTable(layout);
//     setLayoutDropdownOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Dropdown
//         toggle={(
//           <MenuToggle
//             onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}
//             isExpanded={layoutDropdownOpen}
//           >
//             {selectedTable}
//           </MenuToggle>
//         )}
//         isOpen={layoutDropdownOpen}
//       >
//         <DropdownList>
//           <DropdownItem key="CU" onClick={() => updateLayout('CU')}>CU</DropdownItem>
//           <DropdownItem key="DU" onClick={() => updateLayout('DU')}>DU</DropdownItem>
//           <DropdownItem key="RU" onClick={() => updateLayout('RU')}>RU</DropdownItem>
//         </DropdownList>
//       </Dropdown>

//       {Object.keys(tables).map((key) => (
//         selectedTable === key && (
//           <Table key={key} aria-label={`${key} Table`} variant="compact" borders={true}>
//             <Thead>
//               <Tr>
//                 <Th>Keys</Th>
//                 <Th>Value</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {tables[key].map((item, index) => (
//                 <Tr key={index}>
//                   <Td>{item.keys}</Td>
//                   <Td>
//                     <TextInput
//                       value={item.value}
//                       type="text"
//                       onChange={(_event, value) => handleValueChange(value, index)}
//                       aria-label={`Input for ${item.keys}`}
//                     />
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         )
//       ))}
//     </React.Fragment>
//   );
// };

// export default TableBasic;