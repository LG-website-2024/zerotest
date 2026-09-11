export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-15 w-full flex justify-center items-end bg-white">
      <span className="text-primary text-[18px] font-medium leading-7.5">
        © {currentYear} SBOM Archi
      </span>
    </footer>
  );
};

export default Footer;
