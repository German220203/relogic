import Link from "next/link";

type AdminButtonProps = {
  isAdmin?: boolean;
};

export default function AdminButton({ isAdmin }: AdminButtonProps) {


  if (isAdmin) {
    return (
      <Link href="/admin" className="font-bold rounded-md border-2  px-4 py-2 rounded hover:bg-gray-100 transition">
        Administración
      </Link>
    );
  }

  return null;
}