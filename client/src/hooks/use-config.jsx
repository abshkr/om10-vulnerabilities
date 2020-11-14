import { useState, useEffect } from 'react';
import _ from 'lodash';

import useSWR from 'swr';

import { AUTH, SITE_CONFIGURATION } from '../api';

const useConfig = () => {
  const [config, setConfig] = useState({
    dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    dateTimeFormatHM: 'DD/MM/YYYY HH:mm',
    timeFormatHM: 'HH:mm',
    temperatureUnit: null,
    densityUnit: null,
    referenceTemperature: null,
    scheduledUnit: null,
    manageBaseProductDensityRange: false,
    manageDCS: false,
    manageHotProduct: false,
    manageAPI: false,
    manageTankStrapping: false,
    manageDangerousGoods: false,
    manageCompanyRelations: false,
    manageAuditing: false,
    manageCustomizedExpiryDates: false,
    managePartnersAndPartnership: false,
    manageDateRangeFilter: false,
    manageAutoFilter: false,
    manageTankLevelAlarms: false,
    manageAdditionalHostData: false,
    manageMakeManualTransaction: false,
    manageViewDeliveryDetails: false,
    manageTankView: false,
    manageAdaptiveFlow: false,
    autoLogOut: false,
    showBOL: false,
    showDOR: false,
    manageADHOC: false,
    sealNumSource: false,
    sealPostFix: false,
    manage2FA: false,
    manageAuditingScreen: false,
    siteCompanyRelationAllowed: false,
    allocationsDateRange: false,
    auditDateRange: false,
    openOrderDateRange: false,
    journalDateRange: false,
    scheduleDateRange: false,
    transactionsDateRange: false,
    nominationDateRange: false,
    defaultEquipmentExpiry: false,
    defaultTankerExpiry: false,
    canEditDOR: false,
    showDORNumber: false,
    expiryDateMode: false,
    maxSealsPerCompartment: false,
    maxTags: false,
    accessOpenOrderFromSchdules: false,
    filterOpenOrderByExpiry: false,
    filterNominationByExpiry: false,
    openOrderCloseAllLoads: false,
    openOrderResetOrder: false,
    partnershipEnabled: false,
    railTankAvailable: false,
    rigidShipAvailable: false,
    tankStatusEnforced: false,
    vsmCompensation: 15,
    safefillCheckByHighTemp: false,
    showLSI: false,
    showSeals: false,
    externalBlendAllowed: false,
    offset: null,
    serverTime: null,
    id: null,
    loading: true,
    precisionAPI: 2,
    precisionTemperature: 2,
    precisionDensity: 3,
    precisionLevel: 0,
    precisionVolume: 0,
    precisionMass: 0,
    precisionAdditive: 3,
    precisionSG: 6,
    minTemperature: -18,
    maxTemperature: 150,
    minDensity: 0,
    maxDensity: 2000,
    maxLengthTankCode: 10,
    siteUseSG: false,
    load_tolerance_type: 'PERCENT',
    siteTransferTankSource: "FROM",
  });

  const { data: configuration } = useSWR(SITE_CONFIGURATION.READ, { revalidateOnFocus: false });
  const { data: features } = useSWR(SITE_CONFIGURATION.FEATURES, { revalidateOnFocus: false });
  const { data: environment } = useSWR(AUTH.ENVIRONMENT, { revalidateOnFocus: false });

  const formatter = (value) => {
    switch (value) {
      case 'Y':
        return true;

      case 'N':
        return false;

      case '':
        return false;

      case null:
        return false;

      case undefined:
        return false;

      default:
        return value;
    }
  };

  useEffect(() => {
    if (features?.records && configuration?.records && environment) {
      // flattening the objects to increas speed of access without looping.

      const featuresObject = Object.assign(
        {},
        ...features?.records.map((field) => {
          return { [field.feature_code]: formatter(field.feature_flag) };
        })
      );

      const configurationObject = Object.assign(
        {},
        ...configuration?.records.map((field) => {
          return { [field.config_key]: formatter(field.config_value) };
        })
      );

      setConfig({
        ...config,
        temperatureUnit: environment?.SITE_TEMPERATURE_UNIT || 'degC',
        densityUnit: environment?.SITE_DENSITY_UNIT || 'kg/m3',
        referenceTemperature: environment?.TEMP_COMP_REF_TEMPERATURE || '15',
        vsmCompensation: environment?.VSM_COMPENSATION_PT || '15',
        scheduledUnit: environment?.SCHEDUNITS,
        manageBaseProductDensityRange: featuresObject?.BASE_PROD__DENS_RANGE,
        manageDCS: featuresObject?.DCS,
        manageHotProduct: featuresObject?.HOT_PRODUCT_BITUMEN,
        manageAPI: featuresObject?.API,
        manageTankStrapping: featuresObject?.TANK_STRAPPING,
        manageDangerousGoods: featuresObject?.DANGEROUS_GOODS,
        manageCompanyRelations: featuresObject?.COMPANY_RELATIONS,
        manageAuditing: featuresObject?.AUDITING,
        manageCustomizedExpiryDates: featuresObject?.CUSTOM_EXPIRY_DATES,
        managePartnersAndPartnership: featuresObject?.PARTNERSHIP,
        manageDateRangeFilter: featuresObject?.DATE_RANGE_FILTER,
        manageAutoFilter: featuresObject?.AUTO_FILTER_WHEN_OPEN_SCREEN,
        manageTankLevelAlarms: featuresObject?.TANK_LEVEL_ALARMS,
        manageAdditionalHostData: featuresObject?.DOR,
        manageMakeManualTransaction: featuresObject?.MAKE_MANUAL_TRANSACTION,
        manageViewDeliveryDetails: featuresObject?.VIEW_DELIVERY_DETAILS,
        manageTankView: featuresObject?.VIEW_TANK_VIEW,
        manageAdaptiveFlow: featuresObject?.VIEW_ADAPTIVE_FLOW,
        autoLogOut: configurationObject?.URBAC_AUTO_LOGOFF,
        bolVersion: configurationObject?.BOL_VERSION,
        ldReportVersion: configurationObject?.LDREPORT_VERSION,
        site_customer_product: configurationObject?.SITE_CUSTOMER_PRODUCT,
        showBOL: configurationObject?.BOL_DN_TEMPLATE_GUI_ENABLED,
        showDOR: configurationObject?.SITE_DOR_HISTORY_AVAILABLE,
        manageADHOC: configurationObject?.ID_ADHOC_FLAG_ENABLED,
        sealNumSource: configurationObject?.SEALNUM_SOURCE,
        sealPreFix: configurationObject?.SEAL_PREFIX,
        sealPostFix: configurationObject?.SEAL_POSTFIX,
        manage2FA: configurationObject?.SITE_2FA_ENABLED,
        manageAuditingScreen: configurationObject?.SITE_AUDIT_SCREEN_ENABLED,
        siteCompanyRelationAllowed: configurationObject?.SITE_COMPANY_RELATION_ALLOWED,
        allocationsDateRange: configurationObject?.SITE_DEFAULT_DATERANGE_ALLOCATION,
        auditDateRange: configurationObject?.SITE_DEFAULT_DATERANGE_AUDIT,
        openOrderDateRange: configurationObject?.SITE_DEFAULT_DATERANGE_CUSTORDER,
        journalDateRange: configurationObject?.SITE_DEFAULT_DATERANGE_JOURNAL,
        scheduleDateRange: configurationObject?.SITE_DEFAULT_DATERANGE_SCHEDULE,
        transactionsDateRange: configurationObject?.SITE_DEFAULT_DATERANGE_TRANSACTION,
        nominationDateRange: configurationObject?.SITE_DEFAULT_DATERANGE_NOMINATION,
        defaultEquipmentExpiry: configurationObject?.SITE_DEFAULT_EQPT_EXPIRY,
        defaultTankerExpiry: configurationObject?.SITE_DEFAULT_TNKR_EXPIRY,
        canEditDOR: configurationObject?.SITE_DOR_NUMBER_EDITABLE,
        showDORNumber: configurationObject?.SITE_DOR_NUMBER_VISIBLE,
        expiryDateMode: configurationObject?.SITE_EXPIRY_DATE_MANAGE_MODE,
        maxSealsPerCompartment: configurationObject?.SITE_MAX_SEALS_PER_CMPT,
        maxTags: configurationObject?.SITE_MAX_TAGS,
        accessOpenOrderFromSchdules: configurationObject?.SITE_OO_ASSN_FROM_SCHD_CMPT,
        filterOpenOrderByExpiry: configurationObject?.SITE_OO_FILTER_BY_EXPIRY,
        filterNominationByExpiry: configurationObject?.SITE_NOM_FILTER_BY_EXPIRY,
        openOrderCloseAllLoads: configurationObject?.SITE_ORDER_LISTING_CLOSE_ALL_LOADS_VISIBLE,
        openOrderResetOrder: configurationObject?.SITE_ORDER_LISTING_RESET_ORDER_VISIBLE,
        partnershipEnabled: configurationObject?.SITE_PARTNERSHIP_ENABLED,
        railTankAvailable: configurationObject?.SITE_RAIL_TANK_AVAILABLE,
        rigidShipAvailable: configurationObject?.SITE_RIGID_SHIP_AVAILABLE,
        tankStatusEnforced: configurationObject?.SITE_TANK_STATUS_ENFORCEMENT_FLAG,
        showLSI: configurationObject?.SITE_USE_LSI,
        showSeals: configurationObject?.SITE_USE_SEAL,
        safefillCheckByHighTemp: configurationObject?.SITE_LOAD_SAFEFILL_CHECK_BY_HIGHTEMP,
        userAutoLogoff: configurationObject?.URBAC_AUTO_LOGOFF,
        passwordAutoExpire: configurationObject?.URBAC_PWD_AUTO_EXPIRE,
        passwordAutoLock: configurationObject?.URBAC_PWD_AUTO_LOCK,
        passwordComplexity: configurationObject?.URBAC_PWD_COMPLEXITY,
        passwordLenMax: configurationObject?.URBAC_PWD_LEN_MAX,
        passwordLenMin: configurationObject?.URBAC_PWD_LEN_MIN,
        passwordReuse: configurationObject?.URBAC_PWD_REUSE,
        passwordUpdInterval: configurationObject?.URBAC_PWD_UPD_INTERVAL,
        sessionPerUser: configurationObject?.URBAC_SESSION_PER_USER,
        userAutoDelete: configurationObject?.URBAC_USER_AUTO_DELETE,
        userAutoLock: configurationObject?.URBAC_USER_AUTO_LOCK,
        externalBlendAllowed: configurationObject?.SITE_EXTERNAL_BLENDING_ALLOWED,
        dateTimeFormat: configurationObject?.SITE_DATETIME_FORMAT || 'DD/MM/YYYY HH:mm:ss',
        dateFormat: String(configurationObject?.SITE_DATETIME_FORMAT)?.split(' ')?.[0] || 'DD/MM/YYYY',
        timeFormat: String(configurationObject?.SITE_DATETIME_FORMAT)?.split(' ')?.[1] || 'HH:mm:ss',
        dateTimeFormatHM: String(configurationObject?.SITE_DATETIME_FORMAT).substr(0,(String(configurationObject?.SITE_DATETIME_FORMAT).length-3)) || 'DD/MM-YYYY HH:mm',
        timeFormatHM: 'HH:mm',
        offset: configurationObject?.SERVER_TIME_OFFSET || '+00:00',
        serverTime: configurationObject?.SERVER_TIME,
        id: configurationObject?.SITE_IDENTIFIER,
        loading: false,
        precisionAPI: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_API) || 2,
        precisionTemperature: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_TEMPERATURE) || 2,
        precisionDensity: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_DENSITY) || 3,
        precisionLevel: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_LEVEL) || 0,
        precisionVolume: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_VOLUME) || 0,
        precisionMass: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_MASS) || 0,
        precisionAdditive: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_ADDITIVE) || 3,
        precisionSG: _.toNumber(configurationObject?.SITE_DEFAULT_PRECISION_SG) || 6,
        maxLengthTankCode: _.toNumber(configurationObject?.SITE_MAXLEN_TANKCODE) || 10,
        siteUseSG: configurationObject?.SITE_USE_SG,
        load_tolerance_type: configurationObject?.LOAD_TOLERANCE_TYPE,
        siteTransferTankSource: configurationObject?.SITE_TRANSFER_TANK_SOURCE || "FROM",
      });
    }
    // eslint-disable-next-line
  }, [configuration, features, environment]);

  return config;
};

export default useConfig;
