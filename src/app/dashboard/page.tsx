"use client";
import React, { useEffect } from 'react';
import UserLayout from '@/layouts/UserLayout';
import useRequireAuth from '@/hooks/requireAuth';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LayoutsDemo from './topology';
import SimpleDropdown, { TableBasic } from './configuration';
import ComponentCard from './component';
import { Tab, ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';//import table for input
import { Grid, GridItem, PageSection } from '@patternfly/react-core'; //import layout and page section
import { Card, CardTitle, CardBody, CardFooter } from '@patternfly/react-core'; //import card

//layout
const WithGutters: React.FC = () => (
  <Grid hasGutter>
    <GridItem span={12} rowSpan={3}></GridItem>
    <GridItem span={4} rowSpan={6}></GridItem>
    <GridItem span={4} rowSpan={6}></GridItem>
    <GridItem span={4} rowSpan={6}></GridItem>
    <GridItem span={12} rowSpan={3}></GridItem>
  </Grid>
);

const UserDashboard = () => {
  const { isLoading } = useRequireAuth();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Open Netra | Dashboard';
  }, []);

  if (isLoading) {
    return null; 
  }

  if (!user) {
    return null;
  }

  



  return (
    <UserLayout>
      <div style={{ marginTop: '-580px' }}>
        
      </div>
      <PageSection>
        <Grid hasGutter>
          <GridItem span={12} rowSpan={3}>
            <Card ouiaId="BasicCard" style={{ height: '700px' }}>
              <CardTitle>5G Topology</CardTitle>
              <CardBody>
                <LayoutsDemo />
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={4} rowSpan={6}>
            <Card ouiaId="BasicCard" style={{ height: '700px' }}>
              <CardTitle>Components Management Panel</CardTitle>
              <CardBody>
                <ComponentCard />
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={4} rowSpan={6}>
            <Card ouiaId="BasicCard"  style={{ height: '700px' }}>
              <CardTitle>Configuration Panel</CardTitle>
              <CardBody>
                <TableBasic />
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={4} rowSpan={6}>
            <Card ouiaId="BasicCard" style={{ height: '700px' }}>
              <CardTitle>Output</CardTitle>
              <CardBody>
                
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={12} rowSpan={3}>
            <Card ouiaId="BasicCard">
              <CardTitle>Wireshark</CardTitle>
              <CardBody>
                
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      
      </PageSection>
    </UserLayout>

  )
}

export default function UserDashboardWithAuth() {
  return (
    <AuthProvider>
      <UserDashboard />
    </AuthProvider>
  );
}