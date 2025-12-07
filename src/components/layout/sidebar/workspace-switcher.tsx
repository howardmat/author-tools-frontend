import { MouseEvent, useRef } from 'react';
import { ChevronsUpDown, LoaderCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { IWorkspace } from '@/types';
import EditWorkspaceDialog from '@/components/dialog/edit-workspace-dialog';
import { getWorkspaceIcon } from '@/lib/tsx-utils';
import styles from './workspace-switcher.module.css';
import { toast } from 'sonner';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import {
  useDeleteWorkspaceMutation,
  useGetWorkspacesQuery,
  usePostWorkspaceMutation,
  usePutWorkspaceMutation,
} from '@/hooks/use-workspace-query';
import {
  useGetActiveWorkspace,
  useSetActiveWorkspace,
} from '@/hooks/use-workspace';

export default function WorkspaceSwitcher() {
  const { isMobile } = useSidebar();
  const dropdownContentRef = useRef(null);

  const activeWorkspace = useGetActiveWorkspace();
  const setActiveWorkspace = useSetActiveWorkspace();

  const { data, isPending } = useGetWorkspacesQuery();
  const { mutate: postMutate, isPending: postPending } =
    usePostWorkspaceMutation({
      onSuccess: () => {
        toast.success('Awesome!', {
          description: 'The workspace was created',
        });
      },
      onError: (error?: Error) => {
        toast.error('Oops!', {
          description: error?.message ?? 'An unexpected error occurred',
        });
      },
    });
  const { mutate: putMutate, isPending: putPending } = usePutWorkspaceMutation({
    onSuccess: (workspace) => {
      toast.success('Awesome!', {
        description: 'The workspace was updated',
      });

      if (workspace.id === activeWorkspace.id) {
        setActiveWorkspace(workspace);
      }
    },
    onError: (error?: Error) => {
      toast.error('Oops!', {
        description: error?.message ?? 'An unexpected error occurred',
      });
    },
  });
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteWorkspaceMutation({
      onSuccess: (deletedId) => {
        toast.success('Awesome!', {
          description: 'The workspace was deleted',
        });

        if (deletedId === activeWorkspace.id && data) {
          const nextWorkspace = data.find((w) => w.id !== deletedId);
          if (nextWorkspace) {
            setActiveWorkspace(nextWorkspace);
          }
        }
      },
      onError: (error?: Error) => {
        toast.error('Oops!', {
          description: error?.message ?? 'An unexpected error occurred',
        });
      },
    });

  const handleWorkspaceChange = (
    event: MouseEvent<HTMLElement>,
    workspace: IWorkspace
  ) => {
    event.stopPropagation();
    if (workspace.id !== activeWorkspace.id) {
      setActiveWorkspace(workspace);
    }
  };

  const onWorkspaceAdd = (workspace: IWorkspace) => {
    postMutate(workspace);
  };

  const onWorkspaceDelete = (workspaceId: string) => {
    deleteMutate(workspaceId);
  };

  const onWorkspaceUpdate = (workspace: IWorkspace) => {
    putMutate({ id: workspace.id, workspace });
  };

  if (isPending || postPending || putPending || deletePending || !data) {
    return (
      <LoaderCircle className={`${styles.spin} w-18 h-18 text-gray-300`} />
    );
  }

  const activeWorkspaceIcon = getWorkspaceIcon(activeWorkspace.icon);

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
                {activeWorkspaceIcon}
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
            className='w-auto min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
            ref={dropdownContentRef}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Workspaces
            </DropdownMenuLabel>
            {data.map((workspace) => (
              <DropdownMenuItem asChild key={workspace.name}>
                <EditWorkspaceDialog
                  workspace={workspace}
                  onSave={onWorkspaceUpdate}
                  onDelete={onWorkspaceDelete}
                  onClick={(event) => handleWorkspaceChange(event, workspace)}
                />
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <EditWorkspaceDialog
              addMode
              onSave={onWorkspaceAdd}
              onDelete={onWorkspaceDelete}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
