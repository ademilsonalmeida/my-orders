# My Orders

My Orders é uma aplicação web moderna desenvolvida com Next.js 15, TypeScript e Tailwind CSS para gerenciamento de pedidos. A aplicação oferece uma interface intuitiva e responsiva para gerenciar pedidos de forma eficiente.

## 🚀 Tecnologias

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Radix UI](https://www.radix-ui.com/)

## ✨ Funcionalidades

- Autenticação de usuários
- Gerenciamento de pedidos
- Interface moderna e responsiva
- Validação de formulários

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ademilsonalmeida/my-orders.git
cd my-orders
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL=sua_url_do_banco_de_dados
NEXTAUTH_SECRET=seu_secret_do_nextauth
NEXTAUTH_URL=http://localhost:3000
```

4. Execute as migrações do banco de dados:
```bash
drizzle-kit push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

[@ademilsonalmeida](https://github.com/ademilsonalmeida)

---

Feito com ❤️ por [Ademilson Almeida](https://github.com/ademilsonalmeida)
