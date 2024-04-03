import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ExperimentCrudModule/CreateExperimentModule/CreateItem';
import ExperimentForm from '@/modules/ExperimentCrudModule/Forms/ExperimentForm';

export default function CreateExperimentModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={ExperimentForm} />
    </ErpLayout>
  );
}
