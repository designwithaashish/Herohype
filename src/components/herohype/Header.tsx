import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[rgba(15,16,20,1)] flex min-h-[90px] w-full items-center gap-[40px_100px] text-black font-normal justify-between flex-wrap px-20 py-5 max-md:max-w-full max-md:px-5">
      <div className="bg-[rgba(183,255,29,1)] border self-stretch flex items-center gap-[5px] text-[35px] whitespace-nowrap text-center tracking-[-0.69px] leading-[1.1] justify-center my-auto px-2.5 py-[5px] border-black border-dashed">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1959439b6d7922b7efdd6200e76d1ae9326c99a2?placeholderIfAbsent=true"
          className="aspect-[0.91] object-contain w-5 self-stretch shrink-0 my-auto"
          alt="Herohype logo icon"
        />
        <div className="self-stretch my-auto">herohype</div>
      </div>

      <nav className="self-stretch flex min-w-60 h-[22px] items-center gap-10 text-[15px] text-white font-medium justify-center w-[342px] my-auto">
        <a
          href="#"
          className="self-stretch my-auto hover:text-gray-300 transition-colors"
        >
          Ecosystem
        </a>
        <a
          href="#"
          className="self-stretch my-auto hover:text-gray-300 transition-colors"
        >
          About Us
        </a>
        <a
          href="#"
          className="self-stretch my-auto hover:text-gray-300 transition-colors"
        >
          Careers
        </a>
        <a
          href="#"
          className="self-stretch my-auto hover:text-gray-300 transition-colors"
        >
          Docs
        </a>
      </nav>

      <div className="self-stretch flex flex-col text-[22px] text-center leading-[1.2] justify-center my-auto">
        <button className="self-stretch bg-white shadow-[6px_6px_8px_rgba(0,0,0,0.2)] gap-2.5 px-5 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Login/ Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
