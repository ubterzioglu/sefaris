import { baseApi } from "./baseApi";

export interface DocumentItem {
  id: string;
  folderPath: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes?: number | null;
  accessLevel: string;
  uploadedAt: string;
}

export const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query<DocumentItem[], { folder_path?: string; search?: string } | void>({
      query: (params) => ({ url: "/documents", params: params ?? undefined }),
      providesTags: ["Document"],
    }),
    uploadDocument: builder.mutation<DocumentItem, FormData>({
      query: (body) => ({ url: "/documents", method: "POST", body }),
      invalidatesTags: ["Document"],
    }),
    deleteDocument: builder.mutation<void, string>({
      query: (id) => ({ url: `/documents/${id}`, method: "DELETE" }),
      invalidatesTags: ["Document"],
    }),
  }),
});

export const { useGetDocumentsQuery, useUploadDocumentMutation, useDeleteDocumentMutation } = documentApi;
