import { useState, useEffect } from 'react';
import _ from 'lodash';

import useSWR from 'swr';

import { AUTH, SITE_CONFIGURATION } from '../api';
import { SETTINGS } from '../constants';

const useConfig = () => {
  const [config, setConfig] = useState({
    dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
    showLegacyExpiryTime: false,
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
    dateTimeFormatHM: 'DD/MM/YYYY HH:mm',
    timeFormatHM: 'HH:mm',
    temperatureUnit: null,
    densityUnit: null,
    referenceTemperature: null,
    scheduledUnit: null,
    useBaseProductDensityRange: false,
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
    precisionVCF: 5,
    minTemperature: -50,
    maxTemperature: 500,
    minDensity: 0,
    maxDensity: 2000,
    maxLengthTankCode: 10,
    maxLengthBaseCode: 20,
    maxLengthProdCode: 18,
    maxLengthTnkrCode: 20,
    maxLengthPsnlCode: 6,
    maxLengthCmpyCode: 8,
    maxLengthCustAcct: 40,
    maxLengthEqptCode: 20,
    roundingVCF: '',
    siteUseSG: false,
    siteUseAFC: false,
    siteArmPriority: 'LILO',
    siteUseProdOwnership: false,
    siteLabelUser: '',
    useWaterStrapping: false,
    siteOwnershipVolumeMode: 'GSV',
    siteOwnershipMassMode: 'WiV',
    siteStockCalcEnhanced: false,
    siteUllageCalcAuto: false,
    siteMandatoryTankCalcFields: false,
    siteMassFieldMode: 1,
    siteMassInVacuum: true,
    siteMassInAir: false,
    siteUseTankBatch: false,
    siteUseVCF: false,
    siteTankBatchStrictMode: false,
    siteStdLitreUnit: 'COR',
    siteProdOwnershipLevel: 'TANK',
    siteUseNomTpp: false,
    siteUseIntoTransitGainLoss: false,
    siteUseSpecIns: false,
    siteUseSafefillOnly: false,
    siteUseAxleWeightLimit: false,
    siteAxleWeightLimitType: false,
    siteAllowDragDrop: false,
    siteSchdTypeConvertible: false,
    siteSchdPreloadEditable: false,
    siteCloseoutAutoClose: false,
    load_tolerance_type: 'PERCENT',
    siteTransferTankSource: 'FROM',
    siteMtLimitPercent: '0.3',
    refreshAlarm: 10000,
    refreshProductMovement: 10000,
    carrcode_tankernum_tag: false,
    enable_meter_facor: false,
    airBuoyancyFactor: 0.0011,
    heatmapAverageFrom: 40,
    heatmapAverageTo: 149,
    heatmapHighFrom: 150,
    heatmapHighTo: 199,
    heatmapExtremeFrom: 200,
    heatmapExtremeTo: 99999,
    site_default_shls_ld_type: '2',
    popupManualTransaction: false,
    siteEqptPaging: true,
    siteTnkrPaging: true,
    siteJnlPaging: true,
    reports_closeout_job: false,
    decimal_thousand_separator: '10',
    driver_slp_enabled: false,
    equip_slp_enabled: false,
    tanker_slp_enabled: false,
    vin_number_enabled: false,
    fasttrackEnabled: false,
    saveToMeter: false,
    siteUseMultiTerminals: false
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
        useBaseProductDensityRange: configurationObject?.SITE_USE_BASEPROD_DENSRANGE,
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
        site_customer_carrier: configurationObject?.SITE_CUSTOMER_CARRIER,
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
        showLegacyExpiryTime: configurationObject?.SHOW_LEGACY_EXPIRY_TIME || false,
        dateFormat: String(configurationObject?.SITE_DATETIME_FORMAT)?.split(' ')?.[0] || 'DD/MM/YYYY',
        timeFormat: String(configurationObject?.SITE_DATETIME_FORMAT)?.split(' ')?.[1] || 'HH:mm:ss',
        dateTimeFormatHM:
          String(configurationObject?.SITE_DATETIME_FORMAT).substr(
            0,
            String(configurationObject?.SITE_DATETIME_FORMAT).length - 3
          ) || 'DD/MM-YYYY HH:mm',
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
        precisionVCF: _.toNumber(configurationObject?.SITE_VCF_SHOW_PRECISION) || 5,
        // maxLengthTankCode: _.toNumber(configurationObject?.SITE_MAXLEN_TANKCODE) || 10,
        maxLengthTankCode: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_TANKCODE) || 10, 24]),
        maxLengthBaseCode: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_BASECODE) || 20, 20]),
        maxLengthProdCode: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_PRODCODE) || 18, 36]),
        maxLengthTnkrCode: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_TNKRCODE) || 20, 40]),
        maxLengthPsnlCode: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_PSNLCODE) || 6, 12]),
        maxLengthCmpyCode: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_CMPYCODE) || 8, 16]),
        maxLengthCustAcct: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_CUSTACCT) || 40, 40]),
        maxLengthEqptCode: _.min([_.toNumber(configurationObject?.SITE_MAXLEN_EQPTCODE) || 20, 40]),
        roundingVCF: configurationObject?.SITE_VCF_CALC_PRECISION || '',
        siteUseSG: configurationObject?.SITE_USE_SG,
        siteUseAFC: configurationObject?.SITE_USE_ADAPTIVE_FLOW_CONTROL,
        siteArmPriority: configurationObject?.SITE_AFC_ARM_PRIORITY || 'LILO',
        siteUseProdOwnership: configurationObject?.SITE_USE_PROD_OWNERSHIP || false,
        siteLabelUser: !configurationObject?.SITE_LABEL_USER
          ? ''
          : configurationObject?.SITE_LABEL_USER + '.',
        useWaterStrapping: configurationObject?.SITE_USE_WATER_STRAPPING || false,
        siteOwnershipVolumeMode: configurationObject?.SITE_OWNERSHIP_VOLUME_MODE || 'GSV',
        siteOwnershipMassMode: configurationObject?.SITE_OWNERSHIP_MASS_MODE || 'WiV',
        siteStockCalcEnhanced: configurationObject?.SITE_STOCK_CALC_ENHANCED || false,
        siteUllageCalcAuto: configurationObject?.SITE_ULLAGE_AUTO_CALC || false,
        siteMandatoryTankCalcFields: configurationObject?.SITE_TANK_STATUS_FIELDS_MANDATORY || false,
        siteMassFieldMode: _.toNumber(configurationObject?.SITE_MASS_FIELD_MODE || '1'),
        siteMassInVacuum:
          (_.toNumber(configurationObject?.SITE_MASS_FIELD_MODE || '1') & 1) === 1 ? true : false,
        siteMassInAir:
          (_.toNumber(configurationObject?.SITE_MASS_FIELD_MODE || '1') & 2) === 2 ? true : false,
        siteUseTankBatch: configurationObject?.SITE_USE_TANK_BATCH || false,
        siteUseVCF: configurationObject?.SITE_VCF_FIELD_VISIBLE || false,
        siteTankBatchStrictMode: configurationObject?.SITE_TANK_BATCH_STRICT_MODE || false,
        siteStdLitreUnit: configurationObject?.SITE_STD_LITRE_UNIT || 'COR',
        siteProdOwnershipLevel: configurationObject?.SITE_PROD_OWNERSHIP_LEVEL || 'TANK',
        siteUseNomTpp: configurationObject?.SITE_USE_NOM_TPP || false,
        siteUseIntoTransitGainLoss: configurationObject?.SITE_USE_INTO_TRANSIT_GL || false,
        siteUseSpecIns: configurationObject?.SITE_USE_SHLS_SPEC_INS,
        siteUseSafefillOnly: configurationObject?.SITE_USE_SAFEFILL_ONLY,
        siteUseAxleWeightLimit: configurationObject?.SITE_USE_AXLE_WEIGHT_LIMIT,
        siteAxleWeightLimitType: configurationObject?.AXLE_WEIGHT_LIMIT_TYPE,
        siteAllowDragDrop: configurationObject?.SITE_USE_DRAG_DROP || false,
        siteSchdTypeConvertible: configurationObject?.SITE_SCHD_TYPE_CONVERTIBLE || false,
        siteSchdPreloadEditable: configurationObject?.SITE_SCHD_PRELOAD_EDITABLE || false,
        siteCloseoutAutoClose: configurationObject?.CLOSEOUT_AUTO_CLOSE || false,
        load_tolerance_type: configurationObject?.LOAD_TOLERANCE_TYPE || 'PERCENT',
        siteMtLimitPercent: configurationObject?.SITE_MT_LIMIT_PERCENT || '0.3',
        siteTransferTankSource: configurationObject?.SITE_TRANSFER_TANK_SOURCE || 'FROM',
        refreshAlarm: configurationObject?.SITE_REFRESH_ALARM_INTERVAL
          ? configurationObject?.SITE_REFRESH_ALARM_INTERVAL * 1000
          : 10000,
        refreshProductMovement: configurationObject?.SITE_REFRESH_PRODMV_INTERVAL
          ? configurationObject?.SITE_REFRESH_PRODMV_INTERVAL * 1000
          : 10000,
        carrcode_tankernum_tag: configurationObject?.SITE_CARRCODE_TANKERNUM_TAG,
        enable_meter_facor: configurationObject?.SITE_ENABLE_METER_FACTOR,
        airBuoyancyFactor: configurationObject?.AIR_BUOYANCY_FACTOR || 0.0011,
        heatmapAverageFrom: configurationObject?.HEATMAP_AVERAGE_FROM || 10,
        heatmapAverageTo: configurationObject?.HEATMAP_AVERAGE_TO || 30,
        heatmapHighFrom: configurationObject?.HEATMAP_HIGH_FROM || 30,
        heatmapHighTo: configurationObject?.HEATMAP_HIGH_TO || 100,
        heatmapExtremeFrom: configurationObject?.HEATMAP_EXTREME_FROM || 100,
        heatmapExtremeTo: configurationObject?.HEATMAP_EXTREME_TO || 99999,
        site_default_shls_ld_type: configurationObject?.SITE_DEFAULT_SHLS_LD_TYPE || '2',
        popupManualTransaction: configurationObject?.SITE_POPUP_MT || false,
        siteEqptPaging: configurationObject?.SITE_PAGINATION_EQPT_LIST || true,
        siteJnlPaging: configurationObject?.SITE_PAGINATION_JNL_LIST || true,
        siteTnkrPaging: configurationObject?.SITE_PAGINATION_TNKR_LIST || true,
        reports_closeout_job: configurationObject?.REPORTS_CLOSEOUT_JOB || false,
        decimal_thousand_separator: configurationObject?.SITE_DEC_TH_SEPERATORS || '10',
        driver_slp_enabled: configurationObject?.DRIVER_SLP_ENABLED || false,
        equip_slp_enabled: configurationObject?.EQUIP_SLP_ENABLED || false,
        tanker_slp_enabled: configurationObject?.TANKER_SLP_ENABLED || false,
        vin_number_enabled: configurationObject?.VIN_NUMBER_ENABLED || false,
        fasttrackEnabled: configurationObject?.FASTTRACK_ENABLED || false,
        saveToMeter: configurationObject?.FOLIO_SAVE_TO_METERS || false,
        siteUseMultiTerminals: configurationObject?.SITE_ALLOW_MULTI_TERMINALS || false,
      });

      // utils function cannot use hooks, use global constants to by pass
      SETTINGS.GLOBAL_SETTINGS.IGNORE_ADTV_DENS = configurationObject?.SITE_IGNORE_ADTV_DENSITY || false;
    }
    // eslint-disable-next-line
  }, [configuration, features, environment]);

  return config;
};

export default useConfig;
