import { useEffect, MouseEvent, useRef } from 'react';
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
import { useBreadcrumbContext } from '@/store/breadcrumb/use-breadcrumb-context';
import { IWorkspace } from '@/types';
import {
  BreadcrumbActionTypes,
  SetActiveWorkspaceAction,
  SetBreadcrumbWorkspaceAction,
  WorkspaceActionTypes,
} from '@/actions';
import EditWorkspaceDialog from '@/components/dialog/edit-workspace-dialog';
import { getWorkspaceIcon } from '@/lib/tsx-utils';
import {
  invalidateEntityQueries,
  useDeleteWorkspaceMutation,
  useGetWorkspacesQuery,
  usePostWorkspaceMutation,
  usePutWorkspaceMutation,
} from '@/http';
import styles from './workspace-switcher.module.css';
import { toast } from '@/hooks/use-toast';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { DEFAULT_WORKSPACE_ID } from '@/lib/constants';
import { useWorkspaceContext } from '@/store/workspace/use-workspace-context';

const WorkspaceSwitcher: React.FC = () => {
  const { isMobile } = useSidebar();
  const { state: workspaceState, dispatch: workspaceDispatch } =
    useWorkspaceContext();
  const { dispatch: breadcrumbDispatch } = useBreadcrumbContext();
  const dropdownContentRef = useRef(null);

  const activeWorkspace = workspaceState.workspace;

  const setActiveWorkspace = (workspace: IWorkspace) => {
    const previousWorkspaceId = activeWorkspace.id;

    const setActiveWorkspaceAction: SetActiveWorkspaceAction = {
      type: WorkspaceActionTypes.SET_ACTIVE_WORKSPACE,
      payload: {
        ...workspace,
      },
    };
    workspaceDispatch(setActiveWorkspaceAction);

    invalidateEntityQueries(previousWorkspaceId);
  };

  const { data, isPending } = useGetWorkspacesQuery();
  const { mutate: postMutate, isPending: postPending } =
    usePostWorkspaceMutation({
      onSuccess: () => {
        toast({
          title: 'Awesome!',
          description: 'The workspace was created',
          variant: 'success',
        });
      },
      onError: (error?: Error) => {
        toast({
          title: 'Error!',
          description: error?.message ?? 'An unexpected error occurred',
          variant: 'destructive',
        });
      },
    });
  const { mutate: putMutate, isPending: putPending } = usePutWorkspaceMutation({
    onSuccess: (workspace) => {
      toast({
        title: 'Awesome!',
        description: 'The workspace was updated',
        variant: 'success',
      });

      if (workspace.id === activeWorkspace.id) {
        setActiveWorkspace(workspace);
        setBreadcrumbWorkspace(workspace.name);
      }
    },
    onError: (error?: Error) => {
      toast({
        title: 'Error!',
        description: error?.message ?? 'An unexpected error occurred',
        variant: 'destructive',
      });
    },
  });
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteWorkspaceMutation({
      onSuccess: (deletedId) => {
        toast({
          title: 'Awesome!',
          description: 'The workspace was deleted',
          variant: 'success',
        });

        if (deletedId === activeWorkspace.id && data) {
          const nextWorkspace = data.find((w) => w.id !== deletedId);
          if (nextWorkspace) {
            setActiveWorkspace(nextWorkspace);
            setBreadcrumbWorkspace(nextWorkspace.name);
          }
        }
      },
      onError: (error?: Error) => {
        toast({
          title: 'Error!',
          description: error?.message ?? 'An unexpected error occurred',
          variant: 'destructive',
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
      setBreadcrumbWorkspace(workspace.name);
    }
  };

  const setBreadcrumbWorkspace = (name: string) => {
    const setBreadcrumbWorkspaceAction: SetBreadcrumbWorkspaceAction = {
      type: BreadcrumbActionTypes.SET_BREADCRUMB_WORKSPACE,
      payload: name,
    };
    breadcrumbDispatch(setBreadcrumbWorkspaceAction);
  };

  useEffect(() => {
    if (data?.length && activeWorkspace.id === DEFAULT_WORKSPACE_ID) {
      setActiveWorkspace(data[0]);
      setBreadcrumbWorkspace(data[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
};

export default WorkspaceSwitcher;
