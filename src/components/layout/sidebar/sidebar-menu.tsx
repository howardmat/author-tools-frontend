import * as React from 'react';
import { Bot, MapPinned, Settings2, Skull } from 'lucide-react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useUser } from '@clerk/clerk-react';
import WorkspaceSwitcher from './workspace-switcher';

const data = {
  navMain: [
    {
      title: 'Characters',
      url: '/characters',
      icon: Bot,
    },
    {
      title: 'Creatures',
      url: '/creatures',
      icon: Skull,
    },
    {
      title: 'Locations',
      url: '/locations',
      icon: MapPinned,
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
        <WorkspaceSwitcher />
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
