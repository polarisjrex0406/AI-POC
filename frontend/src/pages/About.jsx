import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'RULETHEPROMPT'}
      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://www.ruletheprompt.com">www.ruletheprompt.com</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://github.com/RuleThePrompt/RTPServices">
              https://github.com/RuleThePrompt/RTPServices
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://www.ruletheprompt.com/contact-us/`);
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
