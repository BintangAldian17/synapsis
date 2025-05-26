import FormUser from "@/components/form/FormUser";
import PageHeader from "@/components/PageHeader";
import { Divider, Flex } from "antd";

export default function CreateUser() {
  return (
    <main className="w-full">
      <PageHeader title="Blog Management" />
      <Flex vertical className="w-full px-[32px] mt-[35px]">
        <h2 className="text-[20px]">Create User</h2>
        <Divider style={{ marginTop: 10 }} />
        <FormUser type="create" />
      </Flex>
    </main>
  );
}
