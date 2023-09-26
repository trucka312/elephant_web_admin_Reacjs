import { Layout, Table } from "antd";
import { useEffect } from "react";
import { identityTable } from "../../constants/tables/identityTable";
import { useIdentityRequestsStore } from "../../store/identityRequestStore";

export default function IdentityRequest() {
  const { identityRequests, getAllIdentityRequest, loading } =
    useIdentityRequestsStore((state) => state);

  useEffect(() => {
    const onSuccess = (res) => {
      console.log(res);
    };
    const onFail = (err) => {
      alert.error(err)
    };
    getAllIdentityRequest(onSuccess, onFail);
  }, []);

  return (
    <Layout.Content className="mt-4 px-5">
      <p className="my-4 font-semibold text-[20px]">Danh sách yêu cầu</p>
      <Table
        columns={identityTable}
        scroll={{ x: true }}
        size="middle"
        bordered
        dataSource={identityRequests.length ? identityRequests : []}
        loading={loading}
      />
    </Layout.Content>
  );
}
