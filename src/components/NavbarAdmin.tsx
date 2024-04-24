import '@patternfly/patternfly/patternfly.css';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Avatar,
  Brand,
  Button,
  ButtonVariant,
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  MenuToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  SkipToContent,
  Spinner,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import BellIcon from '@patternfly/react-icons/dist/esm/icons/bell-icon';
import { useAuth } from '@/contexts/AuthContext';

export const NavbarAdmin: React.FunctionComponent = () => {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);
  const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    setIsLoading(true);
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await fetch('http://10.30.1.221/api/v1/token/blacklist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setIsLoading(false);
    // Redirect to login page
    router.replace('/auth/login');
  };

  useEffect(() => {
    const navItems: { [key: string]: number } = {
      '/admin/dashboard': 0,
      '/admin/user-management': 1,
      '/admin/monitoring': 2,
    };

    // Check if pathname exists in navItems and update activeItem accordingly
    const itemIndex = navItems[pathname];
    if (itemIndex !== undefined) {
      setActiveItem(itemIndex);
    } else {
      setActiveItem(0); // Default or fallback case
    }
  }, [pathname]);
  

  const onNavSelect = (itemId: number, to: string) => {
    setActiveItem(itemId);
    router.push(to);
  };
  

  const onDropdownToggle = () => setIsDropdownOpen((prevState) => !prevState);
  const onDropdownSelect = () => setIsDropdownOpen(false);
  const onKebabDropdownToggle = () => setIsKebabDropdownOpen((prevState) => !prevState);
  const onKebabDropdownSelect = () => setIsKebabDropdownOpen(false);
  const onFullKebabToggle = () => setIsFullKebabDropdownOpen((prevState) => !prevState);
  const onFullKebabSelect = () => setIsFullKebabDropdownOpen(false);

  const PageNav = (
    <Nav aria-label="Nav" variant="horizontal">
      <NavList>
        <NavItem itemId={0} isActive={activeItem === 0} onClick={() => onNavSelect(0, '/admin/dashboard')}>
          Dashboard
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} onClick={() => onNavSelect(1, '/admin/user-management')}>
          User Management
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} onClick={() => onNavSelect(2, '/admin/monitoring')}>
          Monitoring
        </NavItem>
      </NavList>
    </Nav>
  );
  
  
  const kebabDropdownItems = (
    <>
      <DropdownItem>
        <CogIcon /> Settings
      </DropdownItem>
      <DropdownItem>
        <HelpIcon /> Help
      </DropdownItem>
    </>
  );
  
  const userDropdownItems = (
    <>
      <DropdownItem key="group 2 logout" icon={<Avatar src={'/logout.png'} alt="Logout" />} onClick={handleLogout}>
        {isLoading ? <Spinner size="sm" /> : 'Logout'}
      </DropdownItem>
    </>
  );

  const headerToolbar = (
    <Toolbar id="toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarItem isOverflowContainer>{PageNav}</ToolbarItem>
        <ToolbarGroup
          variant="icon-button-group"
          align={{ default: 'alignRight' }}
          spacer={{ default: 'spacerNone', md: 'spacerMd' }}
        >
          <ToolbarItem>
            <Button aria-label="Notifications" variant={ButtonVariant.plain} icon={<BellIcon />} onClick={() => {}} />
          </ToolbarItem>
          <ToolbarGroup variant="icon-button-group" visibility={{ default: 'hidden', lg: 'visible' }}>
            <ToolbarItem>
              <Button aria-label="Settings" variant={ButtonVariant.plain} icon={<CogIcon />} />
            </ToolbarItem>
            <ToolbarItem>
              <Button aria-label="Help" variant={ButtonVariant.plain} icon={<QuestionCircleIcon />} />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'hidden', md: 'visible', lg: 'hidden' }}>
            <Dropdown
              isOpen={isKebabDropdownOpen}
              onSelect={onKebabDropdownSelect}
              onOpenChange={setIsKebabDropdownOpen}
              popperProps={{ position: 'right' }}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  isExpanded={isKebabDropdownOpen}
                  onClick={onKebabDropdownToggle}
                  variant="plain"
                  aria-label="Settings and help"
                >
                  <EllipsisVIcon aria-hidden="true" />
                </MenuToggle>
              )}
            >
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
          <ToolbarItem visibility={{ md: 'hidden' }}>
            <Dropdown
              isOpen={isFullKebabDropdownOpen}
              onSelect={onFullKebabSelect}
              onOpenChange={setIsFullKebabDropdownOpen}
              popperProps={{ position: 'right' }}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  isExpanded={isFullKebabDropdownOpen}
                  onClick={onFullKebabToggle}
                  variant="plain"
                  aria-label="Toolbar menu"
                >
                  <EllipsisVIcon aria-hidden="true" />
                </MenuToggle>
              )}
            >
              <DropdownGroup key="group 2" aria-label="User actions">
                <DropdownList>{userDropdownItems}</DropdownList>
              </DropdownGroup>
              <Divider />
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
          <Dropdown
            isOpen={isDropdownOpen}
            onSelect={onDropdownSelect}
            onOpenChange={setIsDropdownOpen}
            popperProps={{ position: 'right' }}
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                isExpanded={isDropdownOpen}
                onClick={onDropdownToggle}
                icon={<Avatar src={'/profile.png'} alt="username" />}
                isFullHeight
              >
                {user ? user.username : 'Loading...'}
              </MenuToggle>
            )}
          >
            <DropdownList>{userDropdownItems}</DropdownList>
          </Dropdown>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
  const Header = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <Brand src='/netra_logo.png' alt="Open Netra" heights={{ default: '36px' }} />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const pageId = 'main-content-page-layout-horizontal-nav';
  const PageSkipToContent = <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>;

  return (
    <React.Fragment>
      <Page header={Header} skipToContent={PageSkipToContent} mainContainerId={pageId}>
        {/* The PageSection components and their contents are removed to render the navbar alone */}
      </Page>
    </React.Fragment>
  );
  
};
export default NavbarAdmin;