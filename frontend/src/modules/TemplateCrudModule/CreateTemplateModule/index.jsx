import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/TemplateCrudModule/CreateTemplateModule/CreateItem';
import TemplateForm from '@/modules/TemplateCrudModule/Forms/TemplateForm';

export default function CreateTemplateModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={TemplateForm} />
    </ErpLayout>
  );
}
