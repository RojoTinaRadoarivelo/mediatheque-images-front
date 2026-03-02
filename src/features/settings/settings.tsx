import "./settings.scss";

function settings() {
  return (
    <div className="w-full h-screen flex gap-4">
      <div className="border-r border-r-gray-500 w-96 p-2"></div>
      <div className="flex flex-col flex-1 p-2 bg-white">
        <form className="">
          {/* user form */}
          <div className="w-full pr-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                type="email"
                placeholder="email@exemple.com"
                // {...register("email")}
                className="mt-1 w-1/2 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )} */}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Layout
              </label>
              <input
                type="text"
                placeholder="Username"
                // {...register("userName")}
                className="mt-1 w-1/2 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* {errors.userName && (
                <p className="text-red-500">{errors.userName.message}</p>
              )} */}
            </div>
          </div>
          {/* ACTIONS */}
          <div className="mt-6 flex justify-start">
            <div className="flex gap-3">
              <button
                // onClick={() => Cancel()}
                className="px-6 py-2  bordered  rounded-lg hover:bg-gray-500 hover:text-white "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default settings;
