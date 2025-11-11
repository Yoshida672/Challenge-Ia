// MenuItems.ts
export interface MenuItem {
  label: string;
  href: string;
  onlyLoggedIn?: boolean;
  onlyLoggedOut?: boolean;
}

export const menuItems: MenuItem[] = [
  { label: "Início", href: "/" },
  { label: "Lista Motos", href: "/listaMotos", onlyLoggedIn: true },
  { label: "Lista Condições", href: "/listaCondicoes", onlyLoggedIn: true },
  { label: "Cadastro Moto", href: "/cadastroMoto", onlyLoggedIn: true },
  {
    label: "Cadastro Condições",
    href: "/cadastroCondicoes",
    onlyLoggedIn: true,
  },
  { label: "Sobre", href: "/sobre" },
  { label: "Sobre App", href: "/sobreApp" },
  { label: "Login", href: "/login", onlyLoggedOut: true },
  { label: "Mapa", href: "/mapa", onlyLoggedIn: true },
];
