// import React from 'react';
// import {
//   Button,
//   MenuToggle,
//   MenuToggleElement,
//   Toolbar,
//   ToolbarContent,
//   ToolbarGroup,
//   ToolbarItem,
//   Select,
//   SelectList,
//   SelectOption
// } from '@patternfly/react-core';


// export const ToolbarGroups: React.FunctionComponent = () => {
//   const firstOptions = ['A', 'B', 'C'];

//   const [firstIsExpanded, setFirstIsExpanded] = React.useState(false);
//   const [firstSelected, setFirstSelected] = React.useState('');

//   const onToggle = (filterName: string) => {
//     switch (filterName) {
//       case 'first':
//         setFirstIsExpanded(!firstIsExpanded);
//         break;
//     }
//   };

//   const onFirstSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, selection: string) => {
//     setFirstSelected(selection);
//     setFirstIsExpanded(false);
//   };


//   const filterGroupItems = (
//     <React.Fragment>
//       <ToolbarItem>
//         <Select
//           toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
//             <MenuToggle
//               ref={toggleRef}
//               onClick={() => onToggle('first')}
//               isExpanded={firstIsExpanded}
//               style={
//                 {
//                   width: '88px'
//                 } as React.CSSProperties
//               }
//             >
//               {firstSelected || 'First'}
//             </MenuToggle>
//           )}
//           onSelect={onFirstSelect}
//           onOpenChange={(isOpen) => setFirstIsExpanded(isOpen)}
//           selected={firstSelected}
//           isOpen={firstIsExpanded}
//         >
//           <SelectList>
//             {firstOptions.map((option, index) => (
//               <SelectOption key={index} value={option}>
//                 {option}
//               </SelectOption>
//             ))}
//           </SelectList>
//         </Select>
//       </ToolbarItem>
//     </React.Fragment>
//   );

  

//   const items = (
//     <React.Fragment>
//       <ToolbarGroup variant="filter-group">{filterGroupItems}</ToolbarGroup>
//     </React.Fragment>
//   );

//   return (
//     <Toolbar id="toolbar-group-types">
//       <ToolbarContent>{items}</ToolbarContent>
//     </Toolbar>
//   );
// };

// export default ToolbarGroups;

import React from 'react';
import { Dropdown, DropdownItem, DropdownList, Divider, MenuToggle, MenuToggleElement } from '@patternfly/react-core';

export const DropdownBasic: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    // eslint-disable-next-line no-console
    console.log('selected', value);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={onSelect}
      onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
          Component
        </MenuToggle>
      )}
      ouiaId="BasicDropdown"
      shouldFocusToggleOnSelect
    >
      <DropdownList>
        <DropdownItem value={0} key="action" {
                // updateLayout('Dagre');
              }>
          CU
        </DropdownItem>
        <DropdownItem
          value={1}
          key="link"
          to="#default-link2"
          // Prevent the default onClick functionality for example purposes
          onClick={(ev: any) => ev.preventDefault()}
        >
          DU
        </DropdownItem>
        <DropdownItem value={2} isDisabled key="disabled action">
          UE
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};
