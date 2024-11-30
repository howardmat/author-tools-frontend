'use client';

import * as React from 'react';
import { Bot, GalleryVerticalEnd, Settings2 } from 'lucide-react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { WorkspaceSwitcher } from './workspace-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useUser } from '@clerk/clerk-react';

const data = {
  workspaces: [
    {
      name: 'Default Workspace',
      logo: GalleryVerticalEnd,
      description: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Characters',
      url: '/characters',
      icon: Bot,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
  ],
};

export function SidebarMenu({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const userFullName = user?.fullName ?? '';
  const userEmail = user?.emailAddresses[0]?.emailAddress ?? '';

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={data.workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser fullName={userFullName} email={userEmail} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
