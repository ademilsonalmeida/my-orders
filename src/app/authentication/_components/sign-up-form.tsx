"use client"

import { Loader2 } from "lucide-react"
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form'
import { toast } from "sonner";
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { createProfile } from "@/actions/create-profile";

const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  whatsapp: z.string().trim().min(1, { message: "Whatsapp é obrigatório" }),
  email: z.string().trim().min(1, { message: "E-mail é obrigatório" }).email({ message: "E-mail inválido" }),
  password: z.string().trim().min(8, { message: "A senha deve ter pelo menos 8 caracteres" })  
});

export const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {    
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async () => {          
          try {
            await createProfile(values.whatsapp);
          } catch (error) {
            if (isRedirectError(error)) {
              return;
            }
            toast.error("Erro ao criar o perfil");
          }
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail já cadastrado.");
            return;
          }
          toast.error("Erro ao criar conta.");
        },
      }
    );
  }

  //const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          <CardDescription className="text-center">Preencha os dados abaixo para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">           
          <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />

          <FormField control={form.control} name="whatsapp" render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu telefone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />       

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

          {/* <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>  */}         
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : ("Criar conta")}
          </Button>          
        </CardFooter>
      </Card>   
        </form>
      </Form> 
  )
}
