import React, { useState } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import useListModerators from "../../api/moderators/useListModerators";
import useVeriftyModerator from "../../api/moderators/useVeriftyModerator";
import { useQueryClient } from "react-query";
import useConfirm from "../../hooks/useConfirm";
import Title from "../../components/Title";

const ModeratorsList = () => {
  const [openModal, ConfirmationModalComponent] = useConfirm();
  const queryClient = useQueryClient();
  const { data: mods, isSuccess } = useListModerators();
  const { mutate: verifyMod } = useVeriftyModerator();
  const [expandedRows, setExpandedRows] = useState({});

  const handleDelete = (mod) => {
    openModal(() => {
      console.log("delete done");
      // queryClient.invalidateQueries({ queryKey: ["users"] });
    }, `Вы уверены, что хотите удалить пользователя ${mod.lastName}?`);
  };

  const handleVerify = (mod) => {
    openModal(() => {
      verifyMod(mod._id);
    }, `Вы уверены, что хотите добавить ${mod.lastName} в качестве модератора?`);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderModeratorRow = (mod) => (
    <React.Fragment key={mod._id}>
      <tr>
        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
          <Link to={`/user-profile/${mod._id}`}>
            <h5 className="font-medium text-black dark:text-white">{mod.fullName}</h5>
          </Link>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
          <h5 className="font-medium text-black dark:text-white">{mod.faculty}</h5>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
          <h5 className="font-medium text-black dark:text-white">{mod.department}</h5>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
          <h5 className="font-medium text-black dark:text-white">{mod.jobTitle}</h5>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => handleDelete(mod)}
              className="hover:bg-red-600 transition-colors text-white bg-red-500 py-2 px-4 rounded-lg"
            >
              Удалить
            </button>
            {!mod.verifiedByAdmin && (
              <button
                onClick={() => handleVerify(mod)}
                className="hover:bg-blue-600 transition-colors text-white bg-blue-500 py-2 px-4 rounded-lg"
              >
                Подтвердить
              </button>
            )}
          </div>
        </td>
        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
          <button
            onClick={() => toggleRow(mod._id)}
            className="hover:bg-blue-600 transition-colors text-white bg-blue-500 py-2 px-4 rounded-lg"
          >
            {expandedRows[mod._id] ? "Скрыть" : "Показать"}
          </button>
        </td>
      </tr>
      {expandedRows[mod._id] && (
        <tr>
          <td colSpan="6" className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-black dark:text-white">
                <b>Email:</b> {mod.email}
              </p>
              <p className="text-black dark:text-white">
                <b>Phone:</b> {mod.phoneNumber}
              </p>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );

  return (
    <DefaultLayout>
      <Title>Модераторы</Title>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {["ФИО", "Факультет/Институт", "Кафедра", "Должность", "Действия", "Подробнее"].map((heading) => (
                  <th key={heading} className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{isSuccess && mods.data.data.map(renderModeratorRow)}</tbody>
          </table>
        </div>
      </div>
      <ConfirmationModalComponent />
    </DefaultLayout>
  );
};

export default ModeratorsList;
