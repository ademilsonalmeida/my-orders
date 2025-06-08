"use client"

import { Eye, EyeOff, Loader2, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { authClient } from "@/lib/auth-client"

const loginSchema = z.object({
  email: z.string().trim().min(1, { message: "E-mail é obrigatório" }).email({ message: "E-mail inválido" }),
  password: z.string().trim().min(8, { message: "A senha deve ter pelo menos 8 caracteres" })  
});

export const LoginForm = () => {  
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: () => {
          toast.error("E-mail ou senha inválidos.");
        },
      },
    );
  }

  return (    
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center">Entre com sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />

          <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Crie uma senha forte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />             
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : ("Entrar")}
          </Button>          
        </CardFooter>
      </Card>    
      </form>
      </Form> 
  )
}
