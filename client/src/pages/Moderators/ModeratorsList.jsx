import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useListModerators from '../../api/moderators/useListModerators';
import useVeriftyModerator from '../../api/moderators/useVeriftyModerator';
import useDeleteUser from '../../api/users/useDeleteUser';

import { useQueryClient } from 'react-query';

const ModeratorsList = () => {
  const queryClient = useQueryClient();
  const { data: mods, isSuccess } = useListModerators();

  const { mutate: deleteMod } = useDeleteUser();

  const { mutate: verifyMod } = useVeriftyModerator();

  const handleDelete = (id) => {
    deleteMod(id);
    queryClient.invalidateQueries({ queryKey: ['users'] });

  };

  const handleVerify = (id) => {
    verifyMod(id);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Moderators" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  First Name
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Last Name
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  faculty
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Email
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isSuccess ? (
                mods.data.data.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.firstName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.lastName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.faculty}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {item.email}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        {/* Add your action buttons here */}

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="hover:bg-red-600 transition-colors text-white  bg-red-500 py-2 px-4 rounded-lg"
                        >
                          Remove
                        </button>
                        {!item.verifiedByAdmin && (
                          <button
                            onClick={() => handleVerify(item._id)}
                            className="hover:bg-blue-600 transition-colors text-white  bg-blue-500 py-2 px-4 rounded-lg"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ModeratorsList;
