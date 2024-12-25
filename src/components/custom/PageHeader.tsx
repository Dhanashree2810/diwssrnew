import Link from 'next/link';

interface HeaderProps {
  title: string;
}

const PageHeader = ({ title }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full bg-white border-b border-gray-300 px-3 py-3">
      <Link href="/product" passHref>
        <div className="flex items-center flex-1 cursor-pointer">
          <h1 className="ml-2 text-sm font-semibold capitalize text-gray-600">{title}</h1>
        </div>
      </Link>      
    </div>
  );
};

export default PageHeader;
