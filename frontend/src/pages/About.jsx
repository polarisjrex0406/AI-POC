import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'AIPOC'}
      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://www.example.com">www.AIPOC.com</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://github.com/">
              https://github.com/
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://www.example.com/contact-us/`);
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
