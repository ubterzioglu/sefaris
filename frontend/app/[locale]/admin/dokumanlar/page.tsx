"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { Upload, Trash2, FileText, Folder } from "lucide-react";
import {
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  type DocumentItem,
} from "@/store/api/documentApi";
import { formatDate } from "@/lib/utils";
import { Button, Card, Badge, Field, Input, Select } from "@/components/ui";
import { PageHeader, Skeleton, EmptyState } from "@/components/admin/primitives";

function formatSize(bytes?: number | null): string {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const { data: documents, isLoading } = useGetDocumentsQuery();
  const [uploadDocument, { isLoading: uploading, isError }] = useUploadDocumentMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const [file, setFile] = useState<File | null>(null);
  const [folderPath, setFolderPath] = useState("/");
  const [accessLevel, setAccessLevel] = useState("team");
  const inputRef = useRef<HTMLInputElement>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, DocumentItem[]>();
    for (const d of documents ?? []) {
      const key = d.folderPath || "/";
      const arr = map.get(key) ?? [];
      arr.push(d);
      map.set(key, arr);
    }
    return Array.from(map.entries());
  }, [documents]);

  const onUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderPath", folderPath || "/");
    formData.append("accessLevel", accessLevel);
    try {
      await uploadDocument(formData).unwrap();
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      /* isError ile gösterilir */
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteDocument(id).unwrap();
    } catch {
      /* hata */
    }
  };

  return (
    <div>
      <PageHeader title="Dokümanlar" description="Klasör bazlı dosya yönetimi" />

      <Card className="mb-6">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-primary">
          <Upload className="h-5 w-5 text-accent" /> Dosya Yükle
        </h2>
        <form onSubmit={onUpload} className="grid gap-4 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <Field label="Dosya">
              <input
                ref={inputRef}
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-primary file:mr-3 file:rounded-md file:border-0 file:bg-accent-light file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-hover"
              />
            </Field>
          </div>
          <Field label="Klasör">
            <Input value={folderPath} onChange={(e) => setFolderPath(e.target.value)} placeholder="/" />
          </Field>
          <Field label="Erişim">
            <Select value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
              <option value="public">Herkese Açık</option>
              <option value="team">Ekip</option>
              <option value="private">Özel</option>
            </Select>
          </Field>
          <div className="sm:col-span-4 flex items-center gap-3">
            <Button type="submit" disabled={!file || uploading} className="px-4 py-2.5">
              {uploading ? "Yükleniyor..." : "Yükle"}
            </Button>
            {isError && <span className="text-sm text-danger">Yükleme başarısız.</span>}
          </div>
        </form>
      </Card>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : grouped.length > 0 ? (
        <div className="space-y-6">
          {grouped.map(([folder, docs]) => (
            <div key={folder}>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <Folder className="h-4 w-4 text-accent" /> {folder}
              </div>
              <div className="overflow-hidden rounded-card border border-line bg-white">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-line">
                    {docs.map((d) => (
                      <tr key={d.id} className="hover:bg-surface/60">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-slate-400" />
                            <a
                              href={d.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-primary hover:text-accent-hover"
                            >
                              {d.fileName}
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-slate-100 text-slate-600 border border-slate-200">
                            {d.accessLevel}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{formatSize(d.fileSizeBytes)}</td>
                        <td className="px-4 py-3 text-slate-500">{formatDate(d.uploadedAt)}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => onDelete(d.id)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-danger"
                            aria-label="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="Henüz doküman yok." />
      )}
    </div>
  );
}
