import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInsertEventSubscription = () => {
    const queryClient = useQueryClient();
    useEffect(() => {
        const eventsSubscription = supabase.channel('custom-insert-channel')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'events' },
          (payload) => {
            console.log('Change received!', payload);
            queryClient.invalidateQueries(['events']);
          }
        )
        .subscribe()
        
        return () => {
          eventsSubscription.unsubscribe();
        };
    }, []);
}

export const useUpdateEventSubscription = () => {
    const queryClient = useQueryClient();
    useEffect(() => {
        
    const updates = supabase.channel('custom-update-channel')
    .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'events' },
        (payload) => {
            console.log('Change received!', payload);
            queryClient.invalidateQueries(['events']);
        }
    )
    .subscribe()

    return () => {
        updates.unsubscribe();
    };

    },[])
}

export const useDeleteEventSubscription = () => {
    const queryClient = useQueryClient();
    useEffect(() => {
        const deletion = supabase.channel('custom-delete-channel')
        .on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'events' },
            (payload) => {
                console.log('Change received!', payload);
                queryClient.invalidateQueries(['events']);
            }
        )
        .subscribe()

        return () => {
            deletion.unsubscribe();
        };

    },[])
}