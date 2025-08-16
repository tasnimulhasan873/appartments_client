import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useApartmentDetails = (id) => {
    const axiosSecure = useAxiosSecure();
    return useQuery({
        queryKey: ['apartmentDetails', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await axiosSecure.get(`/apartments/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export default useApartmentDetails;
