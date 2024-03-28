import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";


export const useEventsList = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
          const {data,error} = await supabase.from('events').select('*');
          if (error){
            throw new Error(error.message);
          }
          return data;
        },
    });
};

export const useEvent = (id: number) => {
    return useQuery({
        queryKey: ['events', id],
        queryFn: async () => {
          const {data,error} = await supabase.from('events').select('*').eq('id', id).single();
          if (error){
            throw new Error(error.message);
          }
          return data;
        },
    });
};

export const useInsertEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(data: any){
            const {error,data: newEvent} = await supabase.from('events').insert({
                eventname: data.eventname,
                clubname: data.clubname,
                venue: data.venue,
                date: data.date,
                time: data.time,
            })
            .single();
            if (error){
                throw new Error(error.message);
            }
            return newEvent;
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['events']);
        }
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(data: any){
            const {error,data: updatedEvent} = await supabase.from('events').update({
                eventname: data.eventname,
                clubname: data.clubname,
                venue: data.venue,
                date: data.date,
                time: data.time,
            })
            .eq('id',data.id)
            .select()
            .single();
            if (error){
                throw new Error(error.message);
            }
            return updatedEvent;
        },
        async onSuccess(_, data) {
            await queryClient.invalidateQueries(['events']);
            await queryClient.invalidateQueries(['events', data.id]);
        }
    });
}