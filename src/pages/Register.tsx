
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="bg-[rgba(183,255,29,1)] border flex items-center gap-[5px] text-[35px] whitespace-nowrap text-center tracking-[-0.69px] leading-[1.1] justify-center px-2.5 py-[5px] border-black border-dashed">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8b29b4aea7404ee7976097919bff4a39/1959439b6d7922b7efdd6200e76d1ae9326c99a2?placeholderIfAbsent=true"
                className="aspect-[0.91] object-contain w-5 self-stretch shrink-0 my-auto"
                alt="Herohype logo icon"
              />
              <div className="self-stretch my-auto">herohype</div>
            </div>
          </div>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
