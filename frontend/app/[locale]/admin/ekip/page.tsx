"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "@/store/api/userApi";
import type { Role } from "@/lib/types";
import { Button, Badge, Field, Input, Select } from "@/components/ui";
import { PageHeader, Modal, Skeleton, EmptyState } from "@/components/admin/primitives";
import { ROLE_LABELS_TR } from "@/components/admin/status";

const ROLES: Role[] = [
  "super_admin",
  "admin",
  "developer",
  "designer",
  "seo_specialist",
  "accountant",
  "viewer",
];

const userSchema = z.object({
  email: z.string().email("Geçerli e-posta girin"),
  fullName: z.string().min(2, "En az 2 karakter").max(120),
  role: z.enum([
    "super_admin",
    "admin",
    "developer",
    "designer",
    "seo_specialist",
    "accountant",
    "viewer",
  ]),
  password: z.string().min(6, "En az 6 karakter"),
});
type UserForm = z.infer<typeof userSchema>;

export default function TeamPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: users, isLoading } = useGetUsersQuery();
  const [updateRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const onRoleChange = async (id: string, role: string) => {
    try {
      await updateRole({ id, role }).unwrap();
    } catch {
      /* hata */
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
    } catch {
      /* hata */
    }
  };

  return (
    <div>
      <PageHeader
        title="Ekip"
        description="Kullanıcılar ve roller"
        action={
          <Button onClick={() => setModalOpen(true)} className="px-4 py-2.5">
            <Plus className="h-4 w-4" /> Yeni Kullanıcı
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : users && users.length > 0 ? (
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-medium">Ad</th>
                <th className="px-4 py-3 font-medium">E-posta</th>
                <th className="px-4 py-3 font-medium">Durum</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface/60">
                  <td className="px-4 py-3 font-medium text-primary">{u.fullName}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        u.status === "active"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }
                    >
                      {u.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => onRoleChange(u.id, e.target.value)}
                      className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs text-primary outline-none focus:border-accent"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS_TR[r] ?? r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onDelete(u.id)}
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
      ) : (
        <EmptyState message="Henüz kullanıcı yok." />
      )}

      <CreateUserModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function CreateUserModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: { role: "developer" },
  });

  const onSubmit = async (data: UserForm) => {
    try {
      await createUser({
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        password: data.password,
      }).unwrap();
      reset({ role: "developer" });
      onClose();
    } catch {
      /* hata */
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Yeni Kullanıcı">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Ad Soyad" error={errors.fullName?.message}>
          <Input {...register("fullName")} />
        </Field>
        <Field label="E-posta" error={errors.email?.message}>
          <Input type="email" {...register("email")} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Rol" error={errors.role?.message}>
            <Select {...register("role")}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS_TR[r] ?? r}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Şifre" error={errors.password?.message}>
            <Input type="password" {...register("password")} />
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="px-4 py-2.5">
            İptal
          </Button>
          <Button type="submit" disabled={isLoading} className="px-4 py-2.5">
            {isLoading ? "Kaydediliyor..." : "Oluştur"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
