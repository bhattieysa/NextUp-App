import React from 'react';
import { Layout, Container, CommonStyles } from '../../constants';
import { DefaultLabel } from './label';
import i18n from 'i18n';
let wide = Layout.width;

const NoData = () => (
  <Container style={[CommonStyles.center, { minHeight: wide }]}>
    <DefaultLabel data={i18n.t('Nodata')} />
  </Container>
);

export default NoData;
