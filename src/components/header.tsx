import { Outlet, Link, LinkProps } from "react-router-dom";

interface _LinkProps extends LinkProps {
  content: string;
}

const ROUTES: _LinkProps[] = [
  { content: "Home", to: "/" },
  { content: "About", to: "/about" },
  { content: "Contact", to: "/contact" },
  { content: "Items", to: "/items" },
  { content: "Form", to: "/form" },
  { content: "Common", to: "/common" },
];

const link = ({ content, to = "#" }: _LinkProps) => {
  return (
    <li key={content} className="px-4 py-2">
      <Link
        to={to}
        className="text-white decoration-sky-500 decoration-2 hover:underline"
      >
        {content}
      </Link>
    </li>
  );
};

export default function Header() {
  return (
    <div className="relative flex flex-col justify-center">
      <header className="fixed top-0 flex w-full items-center justify-between bg-black py-2 px-4 backdrop-blur-sm md:px-16">
        <h1 className="cursor-pointer text-lg font-bold text-white hover:text-blue-600 md:text-xl">
          Hello World
        </h1>
        <nav>
          <ul className="flex justify-center">
            {ROUTES.map((route) => link(route))}
          </ul>
        </nav>
      </header>

      <main className="container mt-14 space-y-2 self-center p-4">
        <Outlet />
      </main>
    </div>
  );
}
