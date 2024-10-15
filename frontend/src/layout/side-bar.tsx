import { sidebarLinks } from '@/constants/general.const';
import { TSidebarLinks } from '@/types/general.type';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const router = useLocation();
  const { pathname } = router;
  return (
    <div className='px-4 py-4 bg-[#FCFCFC]'>
      <h1 className='mb-6 flex items-center  text-[#B6F09C] justify-center text-4xl font-medium text-center'>
        Golry
      </h1>
      {sidebarLinks.map((link) => (
        <SidebarLink
          isActive={pathname === link.path}
          key={link.title}
          link={link}
        ></SidebarLink>
      ))}
    </div>
  );
};
interface ISidebarLinkProps {
  link: TSidebarLinks;
  isActive: boolean;
}
function SidebarLink({ link, isActive }: ISidebarLinkProps) {
  return (
    <Link
      to={link.path}
      className={`px-10 py-4 flex items-center gap-4 font-medium text-base rounded-xl  ${
        isActive ? 'bg-red-400 text-white' : 'hover:text-primary'
      }`}
    >
      <span>{link.icon}</span>
      <span className=''>{link.title}</span>
    </Link>
  );
}

export default Sidebar;
