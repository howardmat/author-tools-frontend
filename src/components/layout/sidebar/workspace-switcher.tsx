import * as React from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { IWorkspace } from '@/types';
import { ActionTypes, SetBreadcrumbWorkspaceAction } from '@/actions';

export function WorkspaceSwitcher({
  workspaces,
}: {
  workspaces: IWorkspace[];
}) {
  const { isMobile } = useSidebar();
  const [activeWorkspace, setActiveWorkspace] = React.useState(workspaces[0]);
  const { dispatch } = useBreadcrumbContext();

  const handleWorkspaceChange = (workspace: IWorkspace) => {
    setActiveWorkspace(workspace);
    setBreadcrumbWorkspace(workspace.name);
  };

  const setBreadcrumbWorkspace = (name: string) => {
    const setBreadcrumbWorkspaceAction: SetBreadcrumbWorkspaceAction = {
      type: ActionTypes.SET_BREADCRUMB_WORKSPACE,
      payload: name,
    };
    dispatch(setBreadcrumbWorkspaceAction);
  };

  React.useEffect(() => {
    setBreadcrumbWorkspace(workspaces[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <activeWorkspace.logo className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeWorkspace.name}
                </span>
                <span className='truncate text-xs'>
                  {activeWorkspace.description}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.name}
                onClick={() => handleWorkspaceChange(workspace)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <workspace.logo className='size-4 shrink-0' />
                </div>
                {workspace.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>
                Add Workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
