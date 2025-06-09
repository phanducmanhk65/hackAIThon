export const DashBoard = () => {
  return (
    <div>
      <div className="m-auto h-96 flex justify-center">
        <h1 className="font-bold font-sans break-normal content-center text-gray-900 pt-6 pb-2 text-5xl md:text-5xl">
          Let's get start! How can I help you ?
        </h1>
      </div>
      <div className="h-32 flex justify-center">
        <div className="w-3/4 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <input
            type="text"
            id="large-input"
            className="block h-full w-full  text-gray-900 rounded-lg bg-gray-50 outline-none"
          />
          <div className="flex justify-end">
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
