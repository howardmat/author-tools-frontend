import { postFile } from "@/http";
import { JWT_TEMPLATE } from "@/lib/constants";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

export function usePostFileMutation({
  onSuccess,
  onError,
}: {
  onSuccess: (fileId: string | undefined) => void;
  onError: (error: Error) => void;
}) {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = (await getToken({ template: JWT_TEMPLATE })) || '';
      return await postFile({ formData, token });
    },
    onSuccess: onSuccess,
    onError: onError,
  });
}