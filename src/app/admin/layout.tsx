import { AppUser } from '@/types/app'; // <-- import it!

const { user } = useUser(); // Assuming useUser gives you 'User | null'

const appUser = user as AppUser;

useEffect(() => {
  if (appUser && !appUser.user_metadata?.is_admin) {
    router.push('/unauthorized');
  }
}, [appUser, router]);

