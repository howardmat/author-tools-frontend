import { LogOut } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SignedIn, UserButton } from '@clerk/clerk-react';

export function NavUser({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <SignedIn>
            <UserButton />
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>{fullName}</span>
              <span className='truncate text-xs'>{email}</span>
            </div>
          </SignedIn>
          <LogOut className='ml-auto size-4' />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
