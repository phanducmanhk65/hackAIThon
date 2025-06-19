import { Spin } from "antd";

export const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900/40 backdrop-blur-sm ">
      <div className="flex items-center gap-6">
        <p className="text-2xl text-white">loading </p>
        <Spin />
      </div>
    </div>
  );
};
