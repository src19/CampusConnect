import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
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
                image: data.image,
                eventname: data.eventname,
                clubname: data.clubname,
                venue: data.venue,
                description: data.description,
                date: data.date,
                time: data.time,
                reg_link: data.reg_link,
                creator_id: data.creator_id,
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
                image: data.image,
                eventname: data.eventname,
                clubname: data.clubname,
                venue: data.venue,
                description: data.description,
                date: data.date,
                time: data.time,
                reg_link: data.reg_link,
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
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(id: number){
            const {error} = await supabase.from('events').delete().eq('id',id);
            if (error){
                throw new Error(error.message);
            }
        },
        async onSuccess(_, data) {
            await queryClient.invalidateQueries(['events']);
        },
    });
};