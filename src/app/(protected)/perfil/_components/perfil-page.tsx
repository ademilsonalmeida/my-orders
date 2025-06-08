"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/actions/get-profile";
import { updateProfile } from "@/actions/update-profile";
import { Shimmer } from "@/components/ui/shimmer";

import { AppSidebar } from "../../_components/app-sidebar";
import { deleteUser } from "@/actions/delete-user";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const profileSchema = z.object({
  whatsapp: z.string().trim().min(1, { message: "Whatsapp é obrigatório" }),
});

export default function PerfilPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
  }>();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      whatsapp: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await getProfile();
        if (userProfile) {
          setUserProfile(userProfile.data?.session);
          form.reset({
            whatsapp: userProfile.data?.profile.whatsapp,
          });
        }
      } catch (error) {
        toast.error("Erro ao carregar perfil");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [form]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      await updateProfile({ whatsapp: values.whatsapp });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    }
  }

  async function handleDeleteAccount() {
    try {
      await deleteUser();
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      toast.error("Erro ao remover a conta");
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage className="text-muted-foreground">
                    Painel de Controle
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Perfil</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
              <p className="text-muted-foreground">
                Aqui estão todos os seus dados.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {isLoading ? (
                <>
                  <div className="space-y-2">
                    <div className="h-4 w-20">
                      <Shimmer className="h-full w-full rounded" />
                    </div>
                    <div className="h-10">
                      <Shimmer className="h-full w-full rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-20">
                      <Shimmer className="h-full w-full rounded" />
                    </div>
                    <div className="h-10">
                      <Shimmer className="h-full w-full rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-20">
                      <Shimmer className="h-full w-full rounded" />
                    </div>
                    <div className="h-10">
                      <Shimmer className="h-full w-full rounded-md" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input value={userProfile?.name} disabled />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input value={userProfile?.email} disabled />
                    </FormControl>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu telefone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || isLoading}
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Salvar alterações
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  type="button"
                  disabled={form.formState.isSubmitting || isLoading}
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Remover minha conta
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
