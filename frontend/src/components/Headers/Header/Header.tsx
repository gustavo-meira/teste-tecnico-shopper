import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="flex shadow bg-foreground p-4 px-80 justify-around items-center">
      <h1 className="text-white text-xl">Teste Tecnico Shopper</h1>
      <nav className="flex gap-4">
        <Button
          asChild
          variant="link"
        >
          <a href="#">Estimativa</a>
        </Button>
        <Button
          asChild
          variant="link"
        >
          <a href="#">Histórico</a>
        </Button>
      </nav>
    </header>
  );
};
