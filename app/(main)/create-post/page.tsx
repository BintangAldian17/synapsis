import FormPost from "@/components/form/FormPost";
import PageHeader from "@/components/PageHeader";
import { Divider, Flex } from "antd";

export default function CreatePost() {
  return (
    <main className="w-full">
      <PageHeader title="Blog Management" />
      <Flex vertical className="w-full px-[32px] mt-[35px]">
        <h2 className="text-[20px]">Create Post</h2>
        <Divider style={{ marginTop: 10 }} />
        <FormPost type="create" />
      </Flex>
    </main>
  );
}
