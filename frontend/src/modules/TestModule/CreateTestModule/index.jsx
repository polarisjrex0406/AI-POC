import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/TestModule/CreateTestModule/CreateItem';
import TestForm from '@/modules/TestModule/Forms/TestForm';

export default function CreateTestModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={TestForm} />
    </ErpLayout>
  );
}
