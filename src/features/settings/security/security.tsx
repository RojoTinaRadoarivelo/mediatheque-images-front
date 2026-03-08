import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../../shared/services/user.queries";
import { useAuth } from "../../auth/context/auth.context";

function Security() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const {
    mutate: deleteUser,
    isPending: isdeletingUser,
    isError: isdeleteUserError,
    error: deleteUserError,
  } = useDeleteUser();

  const Delete = (id: string) => {
    deleteUser(id, {
      onSuccess: (res) => {
        logout();
        navigate("/home");
      },
    });
  };

  return (
    <div className="">
      <div>Security</div>
      <div className="mt-10 border-t pt-6">
        <h3 className="text-sm font-semibold text-red-600 mb-2">Danger zone</h3>
        <p className="text-sm my-2">
          All infos and photos will be removed permanently after the account
          deletion.
        </p>

        <button
          onClick={() => Delete(user?.id!)}
          className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}

export default Security;
